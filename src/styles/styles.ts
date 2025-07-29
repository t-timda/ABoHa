// src/styles/styles.ts

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  customHeaderContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'gray',
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
});
