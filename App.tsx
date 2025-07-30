// App.tsx

import React from 'react';
import { MissionProvider } from './src/context/MissionContext';
import AppNavigator from './src/navigation/AppNavigator'; // 새로 만든 내비게이터 불러오기
import { LocaleConfig } from 'react-native-calendars';

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

function App(): React.JSX.Element {
  return (
    // MissionProvider가 AppNavigator를 감싸는 최종 구조
    <MissionProvider>
      <AppNavigator />
    </MissionProvider>
  );
}

export default App;
