// src/screens/CalendarScreen.tsx

import React from 'react';
import { View } from 'react-native';
// MarkedDates를 import 목록에서 제거합니다.
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useMissions } from '../context/MissionContext';

// 달력에 표시할 날짜 객체의 타입을 직접 정의합니다.
type CustomMarkedDates = {
  [key: string]: {
    selected: boolean;
    selectedColor: string;
  };
};

// 달력 한글 설정
LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'kr';

function CalendarScreen() {
  const { completedDates } = useMissions();

  // 우리가 직접 만든 CustomMarkedDates 타입을 사용합니다.
  const markedDates = completedDates.reduce((acc, date) => {
    acc[date] = { selected: true, selectedColor: '#6200EE' };
    return acc;
  }, {} as CustomMarkedDates); // <-- 여기를 CustomMarkedDates로 변경!

  return (
    <View style={{ paddingTop: 50, flex: 1, backgroundColor: 'white' }}>
      <Calendar markedDates={markedDates} />
    </View>
  );
}

export default CalendarScreen;
