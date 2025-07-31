// src/screens/CalendarScreen.tsx

import React from 'react';
// --- 이 부분에 TouchableOpacity와 Text를 추가합니다 ---
import {
  View,
  Alert,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { useMissions } from '../context/MissionContext';
import { PANORAMA_IMAGES } from '../data/images';
import { styles } from '../styles/styles';

type CustomMarkedDates = {
  [key: string]: {
    selected: boolean;
    selectedColor: string;
    dotColor?: string;
    marked?: boolean;
  };
};

interface CustomDayProps {
  date?: DateData;
  state?: 'today' | 'disabled' | 'selected' | 'inactive' | '';
  marking?: {
    selected?: boolean;
    marked?: boolean;
  };
  onPress?: (date: DateData) => void;
}

const CustomDay = ({ date, state, marking, onPress }: CustomDayProps) => {
  const isSelected = marking?.selected;
  const hasDiary = marking?.marked;

  const containerStyle = [
    styles.dayContainer,
    isSelected ? styles.selectedDayContainer : {},
  ];

  const dayOfWeek = date ? new Date(date.dateString).getDay() : -1;

  const textStyle = [
    styles.dayText,
    dayOfWeek === 6 ? styles.saturdayText : {},
    dayOfWeek === 0 ? styles.sundayText : {},
    state === 'today' ? styles.todayText : {},
    isSelected ? styles.selectedDayText : {},
    state === 'disabled' || state === 'inactive' ? styles.disabledDayText : {},
  ];

  return (
    <TouchableOpacity
      onPress={() => date && onPress && onPress(date)}
      style={containerStyle}
    >
      <Text style={textStyle}>{date?.day}</Text>
      {hasDiary && <View style={styles.diaryDot} />}
    </TouchableOpacity>
  );
};

function CalendarScreen() {
  const { missions } = useMissions();

  const backgroundImage = PANORAMA_IMAGES[new Date().getDay()].left;

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
    <View style={styles.homeContainer}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImageFullScreen}
      />
      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleDayPress}
          dayComponent={CustomDay}
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            arrowColor: 'white',
            monthTextColor: 'white',
            textMonthFontWeight: 'bold',
            textMonthFontSize: 18,
            textSectionTitleColor: 'rgba(255, 255, 255, 0.8)',
          }}
        />
      </View>
    </View>
  );
}

export default CalendarScreen;
