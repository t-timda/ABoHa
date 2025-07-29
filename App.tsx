import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// --- HomeScreen 시작 ---
// 메인 화면을 이제 제대로 꾸며줍니다.
function HomeScreen() {
  const todayMission = '오늘 하루 하늘 한번 바라보기'; // 임시 미션 텍스트

  return (
    <View style={styles.container}>
      <View style={styles.missionContainer}>
        <Text style={styles.missionText}>{todayMission}</Text>
      </View>
      <TouchableOpacity style={styles.completeButton}>
        <Text style={styles.buttonText}>미션 성공</Text>
      </TouchableOpacity>
    </View>
  );
}
// --- HomeScreen 끝 ---

function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Text>여기는 미션 달력 화면입니다!</Text>
    </View>
  );
}

function DiaryScreen() {
  return (
    <View style={styles.container}>
      <Text>여기는 한 줄 일기 화면입니다!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

// --- 스타일(디자인)을 정의하는 부분 ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // 화면에 여백 추가
  },
  missionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  missionText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center', // 텍스트 가운데 정렬
  },
  completeButton: {
    backgroundColor: '#6200EE', // 버튼 배경색
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25, // 버튼 모서리를 둥글게
    marginBottom: 40, // 버튼 하단 여백
  },
  buttonText: {
    color: 'white', // 버튼 글자색
    fontSize: 18,
    fontWeight: 'bold',
  },
});

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTitle: '아보하',
          headerTitleAlign: 'center',
        }}
      >
        <Tab.Screen name="미션 달력" component={CalendarScreen} />
        <Tab.Screen name="메인" component={HomeScreen} />
        <Tab.Screen name="한 줄 일기" component={DiaryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
