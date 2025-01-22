import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import ProgressBar from './ProgressBar';

export default function TimerCard({ timer, fetchTimers }) {
  const [remainingTime, setRemainingTime] = useState(timer.duration);
  const [status, setStatus] = useState('Pending');
  const [showModal, setShowModal] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);

  const halfwayPoint = Math.floor(timer.duration / 2);

  useEffect(() => {
    let interval;
    if (status === 'Running') {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev > 0) {
            setTimeTaken((taken) => taken + 1);

            if (prev === halfwayPoint) {
              Alert.alert(
                'Halfway Alert',
                `You're halfway through the "${timer.name}" timer!\nRemaining Time: ${prev}s\nCategory: ${timer.category}`
              );
            }

            return prev - 1;
          }
          clearInterval(interval);
          setStatus('Completed');
          setShowModal(true);
          return 0;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [status]);

  const handleStart = () => {
    setStatus('Running');
  };

  const handlePause = () => {
    setStatus('Paused');
  };

  const handleReset = () => {
    setRemainingTime(timer.duration);
    setStatus('Pending');
    setTimeTaken(0);
    setShowModal(false);
  };

  const progressPercentage = Math.round(
    ((timer.duration - remainingTime) / timer.duration) * 100
  );

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{timer.name}</Text>
      <Text style={styles.category}>Category: {timer.category}</Text>
      <Text style={styles.remainingTime}>Time Left: {remainingTime}s</Text>
      <Text style={styles.status}>Status: {status}</Text>
      <ProgressBar duration={timer.duration} remainingTime={remainingTime} />
      <Text style={styles.percentage}>{progressPercentage}%</Text>

      <View style={styles.buttons}>
        <Pressable
          style={[styles.button, { backgroundColor: '#4caf50' }]}
          onPress={handleStart}
        >
          <Text style={styles.buttonText}>Start</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: '#ffa500' }]}
          onPress={handlePause}
        >
          <Text style={styles.buttonText}>Pause</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: '#f44336' }]}
          onPress={handleReset}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>🎉 Congratulations!</Text>
            <Text style={styles.modalText}>
              You’ve completed the "{timer.name}" timer.
            </Text>
            <Text style={styles.modalCategory}>Category: {timer.category}</Text>
            <Text style={styles.modalTime}>
              Total Time: {Math.floor(timeTaken / 60)}m {timeTaken % 60}s
            </Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#333',
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  remainingTime: {
    fontSize: 14,
    color: '#444',
    marginBottom: 3,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 5,
  },
  percentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4caf50',
    textAlign: 'center',
    marginBottom: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 3,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 280,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
    color: '#333',
  },
  modalCategory: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
    color: '#666',
  },
  modalTime: {
    fontSize: 14,
    marginTop: 3,
    textAlign: 'center',
    color: '#666',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#4caf50',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
