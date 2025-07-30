// src/context/MissionContext.tsx

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 타입 정의
export interface DayData {
  completed: boolean;
  mission: string;
  diary?: string;
  mood?: string;
}
interface MissionData {
  [date: string]: DayData;
}
interface MissionContextType {
  missions: MissionData;
  completeMission: (date: string, mission: string) => void;
  saveDiary: (date: string, diary: string, mood: string) => void;
  setDailyMission: (date: string, mission: string) => void;
  resetToday: (date: string) => void;
  isLoading: boolean;
}

// Context 생성
const MissionContext = createContext<MissionContextType | undefined>(undefined);

const STORAGE_KEY = '@avoha_missions_data';

// Provider 컴포넌트
export const MissionProvider = ({ children }: { children: ReactNode }) => {
  const [missions, setMissions] = useState<MissionData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMissions = async () => {
      try {
        const savedMissions = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedMissions !== null) {
          setMissions(JSON.parse(savedMissions));
        }
      } catch (e) {
        console.error('Failed to load missions.', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadMissions();
  }, []);

  useEffect(() => {
    const saveMissions = async () => {
      if (!isLoading) {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(missions));
        } catch (e) {
          console.error('Failed to save missions.', e);
        }
      }
    };
    saveMissions();
  }, [missions, isLoading]);

  const completeMission = (date: string, mission: string) => {
    setMissions(prev => ({
      ...prev,
      [date]: { ...prev[date], completed: true, mission: mission },
    }));
  };

  const saveDiary = (date: string, diary: string, mood: string) => {
    setMissions(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        diary: diary,
        mood: mood,
        completed: prev[date]?.completed || false,
        mission: prev[date]?.mission || '',
      },
    }));
  };

  const setDailyMission = (date: string, mission: string) => {
    setMissions(prev => {
      if (!prev[date] || !prev[date].mission) {
        return {
          ...prev,
          [date]: {
            completed: prev[date]?.completed || false,
            mission: mission,
          },
        };
      }
      return prev;
    });
  };

  const resetToday = (date: string) => {
    setMissions(prev => {
      const newMissions = { ...prev };
      delete newMissions[date];
      return newMissions;
    });
  };

  return (
    <MissionContext.Provider
      value={{
        missions,
        completeMission,
        saveDiary,
        setDailyMission,
        resetToday,
        isLoading,
      }}
    >
      {children}
    </MissionContext.Provider>
  );
};

// --- 커스텀 훅 ---
// 이 부분이 정상적으로 채워져 있어야 합니다.
export const useMissions = () => {
  const context = useContext(MissionContext);
  if (context === undefined) {
    throw new Error('useMissions must be used within a MissionProvider');
  }
  return context;
};
