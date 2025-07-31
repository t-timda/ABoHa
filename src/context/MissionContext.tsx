// src/context/MissionContext.tsx

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  isLoading: boolean;
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

const STORAGE_KEY = '@avoha_missions_data';

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

  return (
    <MissionContext.Provider
      value={{
        missions,
        completeMission,
        saveDiary,
        setDailyMission,
        isLoading,
      }}
    >
      {children}
    </MissionContext.Provider>
  );
};

export const useMissions = () => {
  const context = useContext(MissionContext);
  if (context === undefined) {
    throw new Error('useMissions must be used within a MissionProvider');
  }
  return context;
};
