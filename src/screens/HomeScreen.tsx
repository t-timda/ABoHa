// src/screens/HomeScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import { useMissions } from '../context/MissionContext';
import { MISSIONS } from '../data/missions';
import { PANORAMA_IMAGES } from '../data/images'; // 새로 만든 이미지 데이터 불러오기
import { styles } from '../styles/styles';

function HomeScreen() {
  const [todayMission, setTodayMission] = useState('오늘의 미션을 확인 중...');
  const { missions, completeMission, setDailyMission, isLoading } =
    useMissions();

  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(now.getDate()).padStart(2, '0')}`;

  // 오늘 요일에 맞는 "중앙" 이미지를 선택합니다.
  const backgroundImage = PANORAMA_IMAGES[now.getDay()].center;

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
    <View style={styles.homeContainer}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImageFullScreen}
      />
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
