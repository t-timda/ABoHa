// src/screens/CalendarScreen.tsx

import React from 'react';
import { View, Alert } from 'react-native';
// LocaleConfig import를 제거합니다.
import { Calendar, DateData } from 'react-native-calendars';
import { useMissions } from '../context/MissionContext';

// 달력에 표시할 날짜 객체의 타입을 직접 정의합니다.
type CustomMarkedDates = {
  [key: string]: {
    selected: boolean;
    selectedColor: string;
    dotColor?: string;
    marked?: boolean;
  };
};

// --- 여기 있던 LocaleConfig 관련 코드를 모두 삭제합니다. ---

function CalendarScreen() {
  const { missions } = useMissions();

  const markedDates = Object.keys(missions).reduce((acc, date) => {
    const missionData = missions[date];
    if (missionData.completed) {
      acc[date] = { selected: true, selectedColor: '#6200EE' };
    }
    if (missionData.diary) {
      acc[date] = { ...acc[date], marked: true, dotColor: 'orange' };
    }
    return acc;
  }, {} as CustomMarkedDates);

  const handleDayPress = (day: DateData) => {
    const missionData = missions[day.dateString];
    if (missionData) {
      const missionText = missionData.mission
        ? `- 미션: ${missionData.mission}`
        : '- 완료된 미션이 없어요.';
      const diaryText = missionData.diary
        ? `\n- 일기: ${missionData.diary} ${missionData.mood}`
        : '\n- 작성된 일기가 없어요.';
      Alert.alert(day.dateString, missionText + diaryText);
    } else {
      Alert.alert(day.dateString, '이 날은 기록이 없어요.');
    }
  };

  return (
    <View style={{ paddingTop: 50, flex: 1, backgroundColor: 'white' }}>
      <Calendar markedDates={markedDates} onDayPress={handleDayPress} />
    </View>
  );
}

export default CalendarScreen;
