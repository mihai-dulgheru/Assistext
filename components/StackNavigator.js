import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './HomeScreen';
import LessonDetailsScreen from './LessonDetailsScreen';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Lessons' component={HomeScreen} />
      <Stack.Screen name='Details' component={LessonDetailsScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
