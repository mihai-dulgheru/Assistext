import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SpeechProvider} from './components/SpeechContext';
import TabNavigator from './components/TabNavigator';

export default function App() {
  return (
    <SpeechProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SpeechProvider>
  );
}
