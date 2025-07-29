// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MissionProvider } from './src/context/MissionContext'; // MissionProvider 불러오기

import HomeScreen from './src/screens/HomeScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import DiaryScreen from './src/screens/DiaryScreen';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    // MissionProvider로 전체 앱을 감쌉니다.
    <MissionProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="메인"
          screenOptions={{
            headerTitle: '아보하 : 아주 보통의 하루',
            headerTitleAlign: 'center',
          }}
        >
          <Tab.Screen name="미션 달력" component={CalendarScreen} />
          <Tab.Screen
            name="메인"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen name="한 줄 일기" component={DiaryScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </MissionProvider>
  );
}

export default App;
