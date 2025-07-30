// src/screens/HomeScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { useMissions } from '../context/MissionContext';
import { MISSIONS } from '../data/missions';
import { styles } from '../styles/styles'; // 우리의 공용 스타일 파일을 다시 사용합니다.

const weeklyImages = [
  require('../assets/7.png'), // 일요일
  require('../assets/1.png'), // 월요일
  require('../assets/2.png'), // 화요일
  require('../assets/3.png'), // 수요일
  require('../assets/4.png'), // 목요일
  require('../assets/5.png'), // 금요일
  require('../assets/6.png'), // 토요일
];

function HomeScreen() {
  const [todayMission, setTodayMission] = useState('오늘의 미션을 확인 중...');
  const { missions, completeMission, setDailyMission, isLoading } =
    useMissions();

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const today = `${year}-${month}-${day}`;

  const dayOfWeek = now.getDay();
  const backgroundImage = weeklyImages[dayOfWeek];

  useEffect(() => {
    if (!isLoading) {
      const savedMission = missions[today]?.mission;
      if (savedMission) {
        setTodayMission(savedMission);
      } else {
        const newMission =
          MISSIONS[Math.floor(Math.random() * MISSIONS.length)];
        setTodayMission(newMission);
        setDailyMission(today, newMission);
      }
    }
  }, [isLoading, missions]);

  const isCompletedToday = missions[today]?.completed === true;

  const handleCompleteMission = () => {
    if (!isCompletedToday) {
      completeMission(today, todayMission);
      Alert.alert('참 잘했어요!', '오늘의 미션을 성공적으로 마쳤습니다.');
    }
  };

  return (
    // 1. 가장 바깥을 일반 View로 감싸서 안정성을 확보합니다.
    <View style={styles.homeContainer}>
      {/* 2. 배경 이미지는 절대 위치를 이용해 전체 화면을 채웁니다. */}
      <ImageBackground
        source={backgroundImage}
        style={StyleSheet.absoluteFillObject} // 내장된 전체화면 스타일
      />

      {/* 3. 모든 내용은 별도의 투명한 View 안에 배치합니다. */}
      <View style={styles.container}>
        <View style={styles.customHeaderContainer}>
          <Text style={styles.headerTitle}>아보하 : 아주 보통의 하루</Text>
          <Text style={styles.headerSubtitle}>
            일상 속에서 잊고 지낸 소중한 순간
          </Text>
        </View>
        <View style={styles.missionContainer}>
          <Text style={styles.missionText}>{todayMission}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.completeButton,
            isCompletedToday && styles.disabledButton,
          ]}
          onPress={handleCompleteMission}
          disabled={isCompletedToday}
        >
          <Text style={styles.buttonText}>
            {isCompletedToday ? '오늘도 아보하' : '미션 성공'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;
