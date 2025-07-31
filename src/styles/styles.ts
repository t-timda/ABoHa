// src/styles/styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  backgroundImageFullScreen: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  calendarContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  customHeaderContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
    marginTop: 8,
  },
  missionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  missionText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  completeButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#a9a9a9',
  },
  // --- 바로 이 부분의 배경색을 수정했습니다 ---
  diaryContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    width: '100%',
    backgroundColor: 'transparent', // 흰색 -> 투명
  },
  diaryTitleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  diaryTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 30,
  },
  moodButton: {
    padding: 10,
    borderRadius: 50,
  },
  selectedMood: {
    backgroundColor: '#e0e0e0',
  },
  moodText: {
    fontSize: 30,
  },
  textInput: {
    width: '90%',
    height: 150,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  // 달력 커스텀 스타일
  dayContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
  },
  dayText: {
    color: 'black',
    fontWeight: 'bold',
  },
  disabledDayText: {
    color: '#c1c1c1',
  },
  todayText: {
    color: '#00adf5',
  },
  selectedDayContainer: {
    backgroundColor: '#6200EE',
  },
  selectedDayText: {
    color: 'white',
  },
  diaryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'orange',
    position: 'absolute',
    bottom: 4,
  },
  // 주말 글자색 스타일
  saturdayText: {
    color: 'blue',
  },
  sundayText: {
    color: 'red',
  },
});
