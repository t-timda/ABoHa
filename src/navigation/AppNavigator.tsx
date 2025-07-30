// src/navigation/AppNavigator.tsx

import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useMissions } from '../context/MissionContext';

import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import DiaryScreen from '../screens/DiaryScreen';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  const { isLoading } = useMissions();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>데이터를 불러오는 중...</Text>
      </View>
    );
  }

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

export default AppNavigator;
