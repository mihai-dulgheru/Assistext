import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {SpeechProvider} from './components/SpeechContext';
import TabNavigator from './components/TabNavigator';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SpeechProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </SpeechProvider>
    </QueryClientProvider>
  );
}
