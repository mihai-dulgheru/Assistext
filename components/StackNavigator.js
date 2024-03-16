import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import DetailsScreen from './DetailsScreen'
import HomeScreen from './HomeScreen'
import SpeechScreen from './SpeechScreen'
import SuggestionsScreen from './SuggestionsScreen'

const Stack = createNativeStackNavigator()

function StackNavigator() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
      <Stack.Screen name="Speech" component={SpeechScreen} />
      <Stack.Screen name="Suggestions" component={SuggestionsScreen} />
    </Stack.Navigator>
  )
}

export default StackNavigator
