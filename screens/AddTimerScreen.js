import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Appbar,
  Card,
  useTheme,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { categories } from '../utils/constants'; 

export default function AddTimerScreen({ navigation }) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState(categories[0]); 

  const theme = useTheme();

  const saveTimer = async () => {
    if (!name || !duration) {
      Alert.alert('Error', 'Please fill all fields!');
      return;
    }

    const newTimer = {
      id: Date.now().toString(),
      name,
      duration: parseInt(duration),
      category,
      status: 'Pending',
    };
    const storedTimers = JSON.parse(await AsyncStorage.getItem('timers')) || [];
    await AsyncStorage.setItem('timers', JSON.stringify([...storedTimers, newTimer]));

    Alert.alert('Success', 'Timer added!');
    navigation.goBack();
  };

  return (
    <>
     
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Timer" />
      </Appbar.Header>

     
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.label}>
                Name
              </Text>
              <TextInput
                mode="outlined"
                value={name}
                onChangeText={setName}
                placeholder="Enter timer name"
                style={styles.input}
              />

              <Text variant="titleMedium" style={styles.label}>
                Duration (seconds)
              </Text>
              <TextInput
                mode="outlined"
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
                placeholder="Enter duration"
                style={styles.input}
              />

              <Text variant="titleMedium" style={styles.label}>
                Category
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={category}
                  onValueChange={(itemValue) => setCategory(itemValue)}
                  style={styles.picker}
                >
                  {categories.map((cat) => (
                    <Picker.Item key={cat} label={cat} value={cat} />
                  ))}
                </Picker>
              </View>

              <Button
                mode="contained"
                onPress={saveTimer}
                style={styles.saveButton}
                buttonColor={theme.colors.primary}
              >
                Save Timer
              </Button>
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
  },
  card: {
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 4,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  saveButton: {
    marginTop: 20,
    paddingVertical: 10,
  },
});
