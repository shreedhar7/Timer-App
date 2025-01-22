import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProgressBar({ duration, remainingTime, label }) {
  const progress = (remainingTime / duration) * 100;

  return (
    <View style={styles.container}>
      {/* Optional label to display progress percentage */}
      {label && <Text style={styles.label}>{`${Math.round(progress)}%`}</Text>}
      <View style={styles.progressBackground}>
        <LinearGradient
          colors={['#2196F3', '#00E5FF']} // Blue to Cyan gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.bar, { width: `${progress}%` }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  progressBackground: {
    height: 12,
    backgroundColor: '#f2f2f2', // Light gray background
    borderRadius: 6,
    overflow: 'hidden',
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bar: {
    height: '100%',
    borderRadius: 6,
  },
});
