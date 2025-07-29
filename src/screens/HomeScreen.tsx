// src/screens/HomeScreen.tsx

import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { MISSIONS } from '../data/missions'; // 미션 데이터 가져오기
import { styles } from '../styles/styles'; // 스타일 가져오기

function HomeScreen() {
  const [todayMission, setTodayMission] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * MISSIONS.length);
    setTodayMission(MISSIONS[randomIndex]);
  }, []);

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

        <TouchableOpacity style={styles.completeButton}>
          <Text style={styles.buttonText}>미션 성공</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
