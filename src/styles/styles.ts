// src/styles/styles.ts

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // --- 이 부분이 빠져있었습니다 ---
  homeContainer: {
    flex: 1,
  },
  // ---
  homeSafeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
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
  diaryContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    width: '100%',
    backgroundColor: 'white',
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
  resetButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
});
