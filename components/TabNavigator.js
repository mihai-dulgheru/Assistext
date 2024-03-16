import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React from 'react'
import SettingsScreen from './SettingsScreen'
import StackNavigator from './StackNavigator'

const Tab = createBottomTabNavigator()

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={StackNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigator
