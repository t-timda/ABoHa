// src/screens/HomeScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useMissions } from '../context/MissionContext';
import { MISSIONS } from '../data/missions';
import { styles } from '../styles/styles';

function HomeScreen() {
  const [todayMission, setTodayMission] = useState('');
  // 이제 addCompletedDate 대신 completeMission 함수를 가져옵니다.
  const { completeMission } = useMissions();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * MISSIONS.length);
    setTodayMission(MISSIONS[randomIndex]);
  }, []);

  const handleCompleteMission = () => {
    const today = new Date().toISOString().split('T')[0];
    // 날짜와 함께 오늘의 미션 내용도 함께 저장합니다.
    completeMission(today, todayMission);
    Alert.alert('참 잘했어요!', '오늘의 미션을 성공적으로 마쳤습니다.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
          style={styles.completeButton}
          onPress={handleCompleteMission}
        >
          <Text style={styles.buttonText}>미션 성공</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
