import {getHeaderTitle} from '@react-navigation/elements';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Header from './Header';
import HomeScreen from './HomeScreen';
import LessonDetailsScreen from './LessonDetailsScreen';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({route, options}) => {
          const title = getHeaderTitle(options, route.name);
          return <Header style={options.headerStyle} title={title} />;
        },
      }}>
      <Stack.Screen name='Lecții' component={HomeScreen} />
      <Stack.Screen
        name='Details'
        component={LessonDetailsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
