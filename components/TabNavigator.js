import Ionicons from '@expo/vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import SettingsScreen from './SettingsScreen';
import StackNavigator from './StackNavigator';
import SuggestionsScreen from './SuggestionsScreen';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Suggestions':
              iconName = focused ? 'bulb' : 'bulb-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            default:
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name='Home'
        component={StackNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen name='Suggestions' component={SuggestionsScreen} />
      <Tab.Screen name='Settings' component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
