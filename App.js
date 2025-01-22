import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddTimerScreen from './screens/AddTimerScreen';
import TimerListScreen from './screens/TimerListScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Timer List" component={TimerListScreen} />
        <Stack.Screen name="Add Timer" component={AddTimerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
