// src/screens/DiaryScreen.tsx

import React, { useState, useEffect } from 'react'; // useEffect 추가
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
import { useNavigation } from '@react-navigation/native';

const MOODS = ['😊', '🙂', '😐', '😢', '😠'];

function DiaryScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [diaryText, setDiaryText] = useState('');

  const { missions, saveDiary } = useMissions();
  const navigation = useNavigation();

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const today = `${year}-${month}-${day}`;

  const todaysDiary = missions[today]; // 오늘의 전체 기록을 가져옵니다.
  const hasDiaryToday = !!todaysDiary?.diary; // 일기 작성 여부 확인

  // --- 아래 useEffect 로직을 추가합니다 ---
  // 화면이 보일 때마다, 그리고 저장된 데이터가 바뀔 때마다 실행
  useEffect(() => {
    if (hasDiaryToday) {
      // 이미 작성된 일기가 있으면, 상태를 그 내용으로 채워줍니다.
      setSelectedMood(todaysDiary.mood || null);
      setDiaryText(todaysDiary.diary || '');
    } else {
      // 작성된 일기가 없으면, 상태를 깨끗하게 비웁니다.
      setSelectedMood(null);
      setDiaryText('');
    }
  }, [hasDiaryToday, missions]); // 의존성 배열에 hasDiaryToday, missions 추가

  const handleSave = () => {
    if (hasDiaryToday) return;

    if (!selectedMood) {
      Alert.alert('알림', '오늘의 기분을 선택해주세요.');
      return;
    }
    if (!diaryText.trim()) {
      Alert.alert('알림', '한 줄 일기를 작성해주세요.');
      return;
    }

    saveDiary(today, diaryText, selectedMood);

    Keyboard.dismiss();
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
            onPress={() => !hasDiaryToday && setSelectedMood(mood)}
            disabled={hasDiaryToday} // 비활성화 추가
          >
            <Text style={styles.moodText}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.textInput}
        placeholder={
          hasDiaryToday
            ? '오늘의 일기는 이미 작성되었어요.'
            : '오늘 하루, 어떤 소중한 순간이 있었나요?'
        }
        value={diaryText} // 이제 이 값은 항상 동기화됩니다.
        onChangeText={setDiaryText}
        editable={!hasDiaryToday}
        multiline
      />
      <TouchableOpacity
        style={[styles.completeButton, hasDiaryToday && styles.disabledButton]}
        onPress={handleSave}
        disabled={hasDiaryToday}
      >
        <Text style={styles.buttonText}>
          {hasDiaryToday ? '오늘도 아보하' : '기록하기'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default DiaryScreen;
