// src/screens/DiaryScreen.tsx

import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard,
} from 'react-native';
import { styles } from '../styles/styles';
import { useMissions } from '../context/MissionContext';
import { useNavigation } from '@react-navigation/native'; // 화면 이동을 위한 훅

const MOODS = ['😊', '🙂', '😐', '😢', '😠'];

function DiaryScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [diaryText, setDiaryText] = useState('');

  const { saveDiary } = useMissions(); // 보관함에서 일기 저장 함수 가져오기
  const navigation = useNavigation(); // 내비게이션 기능 사용

  const handleSave = () => {
    if (!selectedMood) {
      Alert.alert('알림', '오늘의 기분을 선택해주세요.');
      return;
    }
    if (!diaryText.trim()) {
      Alert.alert('알림', '한 줄 일기를 작성해주세요.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    saveDiary(today, diaryText, selectedMood);

    // 키보드를 내리고, 상태 초기화 후 달력으로 이동
    Keyboard.dismiss();
    setDiaryText('');
    setSelectedMood(null);
    Alert.alert('저장 완료!', '오늘의 소중한 기록이 저장되었습니다.', [
      {
        text: '확인',
        onPress: () => navigation.navigate('미션 달력' as never),
      },
    ]);
  };

  return (
    <View style={styles.diaryContainer}>
      <Text style={[styles.headerSubtitle, { marginBottom: 20, fontSize: 18 }]}>
        오늘 하루는 어땠나요?
      </Text>
      <View style={styles.moodContainer}>
        {MOODS.map(mood => (
          <TouchableOpacity
            key={mood}
            style={[
              styles.moodButton,
              selectedMood === mood && styles.selectedMood,
            ]}
            onPress={() => setSelectedMood(mood)}
          >
            <Text style={styles.moodText}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="오늘 하루, 어떤 소중한 순간이 있었나요?"
        value={diaryText}
        onChangeText={setDiaryText}
        multiline
      />
      <TouchableOpacity style={styles.completeButton} onPress={handleSave}>
        <Text style={styles.buttonText}>기록하기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default DiaryScreen;
