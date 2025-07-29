// src/context/MissionContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Context가 가지게 될 값들의 타입 정의
interface MissionContextType {
  completedDates: string[];
  addCompletedDate: (date: string) => void;
}

// Context 생성 (기본값은 undefined)
const MissionContext = createContext<MissionContextType | undefined>(undefined);

// 다른 컴포넌트들을 감싸서 Context를 제공할 Provider 컴포넌트
export const MissionProvider = ({ children }: { children: ReactNode }) => {
  const [completedDates, setCompletedDates] = useState<string[]>([]);

  const addCompletedDate = (date: string) => {
    // 이미 추가된 날짜는 다시 추가하지 않음
    if (!completedDates.includes(date)) {
      setCompletedDates(prevDates => [...prevDates, date]);
    }
  };

  return (
    <MissionContext.Provider value={{ completedDates, addCompletedDate }}>
      {children}
    </MissionContext.Provider>
  );
};

// 다른 컴포넌트에서 쉽게 Context를 사용하게 해줄 커스텀 훅
export const useMissions = () => {
  const context = useContext(MissionContext);
  if (context === undefined) {
    throw new Error('useMissions must be used within a MissionProvider');
  }
  return context;
};
