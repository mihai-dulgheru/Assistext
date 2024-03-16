import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React from 'react'
import SettingsScreen from './SettingsScreen'
import StackNavigator from './StackNavigator'
import SuggestionsScreen from './SuggestionsScreen'

const Tab = createBottomTabNavigator()

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Suggestions" component={SuggestionsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigator
