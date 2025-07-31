// src/navigation/AppNavigator.tsx

import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useMissions } from '../context/MissionContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
        screenOptions={({ route }) => ({
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';

            if (route.name === '미션 달력') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === '메인') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === '한 줄 일기') {
              iconName = focused ? 'create' : 'create-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6200EE',
          tabBarInactiveTintColor: 'gray',
          // --- 아래 스타일을 새로 추가합니다 ---
          tabBarStyle: {
            backgroundColor: '#F5EFE6', // 탭 메뉴 배경색을 크림색으로 지정
          },
        })}
      >
        <Tab.Screen
          name="미션 달력"
          component={CalendarScreen}
          options={{
            headerTitle: '아 보 하 : 미션 달력',
            headerStyle: {
              backgroundColor: '#F5EFE6',
            },
            headerTintColor: '#333333',
          }}
        />
        <Tab.Screen
          name="메인"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="한 줄 일기"
          component={DiaryScreen}
          options={{
            headerTitle: '아 보 하 : 한 줄 일기',
            headerStyle: {
              backgroundColor: '#F5EFE6',
            },
            headerTintColor: '#333333',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
