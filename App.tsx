// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// 우리가 만든 화면들 불러오기
import HomeScreen from './src/screens/HomeScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import DiaryScreen from './src/screens/DiaryScreen';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="메인"
        screenOptions={{
          headerTitle: '아보하',
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
  );
}

export default App;
