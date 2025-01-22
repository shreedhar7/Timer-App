import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToStorage = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = async (key) => {
  const value = await AsyncStorage.getItem(key);
  return JSON.parse(value);
};
