// src/screens/DiaryScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard,
  ImageBackground,
} from 'react-native';
import { styles } from '../styles/styles';
import { useMissions } from '../context/MissionContext';
import { useNavigation } from '@react-navigation/native';
import { PANORAMA_IMAGES } from '../data/images';

const MOODS = ['😊', '🙂', '😐', '😢', '😠'];

function DiaryScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [diaryText, setDiaryText] = useState('');
  const { missions, saveDiary } = useMissions();
  const navigation = useNavigation();

  const backgroundImage = PANORAMA_IMAGES[new Date().getDay()].right;

  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(now.getDate()).padStart(2, '0')}`;
  const todaysDiary = missions[today];
  const hasDiaryToday = !!todaysDiary?.diary;

  useEffect(() => {
    if (hasDiaryToday) {
      setSelectedMood(todaysDiary.mood || null);
      setDiaryText(todaysDiary.diary || '');
    } else {
      setSelectedMood(null);
      setDiaryText('');
    }
  }, [hasDiaryToday, missions]);

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
    <View style={styles.homeContainer}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImageFullScreen}
      />
      <View style={styles.diaryContainer}>
        <View style={styles.diaryTitleContainer}>
          <Text style={styles.diaryTitleText}>오늘 하루는 어땠나요?</Text>
        </View>
        <View style={styles.moodContainer}>
          {MOODS.map(mood => (
            <TouchableOpacity
              key={mood}
              style={[
                styles.moodButton,
                selectedMood === mood && styles.selectedMood,
              ]}
              onPress={() => !hasDiaryToday && setSelectedMood(mood)}
              disabled={hasDiaryToday}
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
          value={diaryText}
          onChangeText={setDiaryText}
          editable={!hasDiaryToday}
          multiline
        />
        <TouchableOpacity
          style={[
            styles.completeButton,
            hasDiaryToday && styles.disabledButton,
          ]}
          onPress={handleSave}
          disabled={hasDiaryToday}
        >
          <Text style={styles.buttonText}>
            {hasDiaryToday ? '오늘도 아보하' : '기록하기'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DiaryScreen;
