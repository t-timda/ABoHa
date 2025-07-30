// src/screens/CalendarScreen.tsx

import React from 'react';
import { View, Alert, TouchableOpacity, Text } from 'react-native';
// LocaleConfig는 App.tsx로 옮겼으므로 여기서 import할 필요 없습니다.
import { Calendar, DateData } from 'react-native-calendars';
import { useMissions } from '../context/MissionContext';
import { styles } from '../styles/styles';

type CustomMarkedDates = {
  [key: string]: {
    selected: boolean;
    selectedColor: string;
    dotColor?: string;
    marked?: boolean;
  };
};

function CalendarScreen() {
  const { missions, resetToday } = useMissions();

  // --- 제가 이전에 실수로 생략했던 부분입니다 ---
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
  // --- 여기까지 입니다 ---

  const handleReset = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;

    resetToday(today);
    Alert.alert('초기화 완료', '오늘의 모든 기록이 삭제되었습니다.');
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ paddingTop: 50 }}>
        <Calendar markedDates={markedDates} onDayPress={handleDayPress} />
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={{ fontSize: 24 }}>🔄</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CalendarScreen;
