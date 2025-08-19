// App.tsx

import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { MissionProvider } from './src/context/MissionContext';
import AppNavigator from './src/navigation/AppNavigator';
import { LocaleConfig } from 'react-native-calendars';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import RNBootSplash from 'react-native-bootsplash';

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

// AdMob에서 발급받은 실제 광고 단위 ID로 교체합니다.
const adUnitId = 'ca-app-pub-4780520831029688/3625246124';

function App(): React.JSX.Element {
  useEffect(() => {
    // 데이터 로딩이 끝나고 네비게이터가 준비되면 로딩 화면을 숨깁니다.
    RNBootSplash.hide({ fade: true });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MissionProvider>
            <AppNavigator />
          </MissionProvider>
        </View>

        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
      </View>
    </SafeAreaView>
  );
}

export default App;
