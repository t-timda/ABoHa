// src/context/MissionContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';

// 날짜별로 저장될 데이터의 타입 정의
export interface DayData {
  completed: boolean;
  mission: string;
  diary?: string;
  mood?: string;
}

// 전체 데이터 구조의 타입 정의
interface MissionData {
  [date: string]: DayData;
}

// Context가 가지게 될 값들의 타입 정의
interface MissionContextType {
  missions: MissionData;
  completeMission: (date: string, mission: string) => void;
  saveDiary: (date: string, diary: string, mood: string) => void;
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export const MissionProvider = ({ children }: { children: ReactNode }) => {
  const [missions, setMissions] = useState<MissionData>({});

  // 미션 완료 시 실행될 함수
  const completeMission = (date: string, mission: string) => {
    setMissions(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        completed: true,
        mission: mission,
      },
    }));
  };

  // 일기 저장 시 실행될 함수
  const saveDiary = (date: string, diary: string, mood: string) => {
    setMissions(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        diary: diary,
        mood: mood,
        // 미션을 완료하지 않고 일기만 쓸 수도 있으므로, completed와 mission은 기존 값을 유지하거나 새로 생성
        completed: prev[date]?.completed || false,
        mission: prev[date]?.mission || '',
      },
    }));
  };

  return (
    <MissionContext.Provider value={{ missions, completeMission, saveDiary }}>
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
