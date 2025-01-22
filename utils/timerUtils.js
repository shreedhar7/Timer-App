import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTimer = async (timer) => {
  let timers = await loadTimers();
  timers.push(timer);
  await AsyncStorage.setItem('timers', JSON.stringify(timers));
};

export const loadTimers = async () => {
  const storedTimers = await AsyncStorage.getItem('timers');
  return storedTimers ? JSON.parse(storedTimers) : [];
};

export const saveHistory = async (timer) => {
  let history = await loadHistory();
  history.push({ ...timer, completionTime: new Date().toLocaleString() });
  await AsyncStorage.setItem('history', JSON.stringify(history));
};

export const loadHistory = async () => {
  const storedHistory = await AsyncStorage.getItem('history');
  return storedHistory ? JSON.parse(storedHistory) : [];
};
