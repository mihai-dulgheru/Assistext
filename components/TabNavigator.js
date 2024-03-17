import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getHeaderTitle} from '@react-navigation/elements';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {colors} from '../theme';
import Header from './Header';
import SettingsScreen from './SettingsScreen';
import StackNavigator from './StackNavigator';
import SuggestionsScreen from './SuggestionsScreen';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated
        backgroundColor={colors.white}
        barStyle='dark-content'
      />
      <Tab.Navigator
        screenOptions={{
          header: ({route, options}) => {
            const title = getHeaderTitle(options, route.name);
            return <Header style={options.headerStyle} title={title} />;
          },
        }}
        tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen
          name='Acasă'
          component={StackNavigator}
          options={{headerShown: false}}
        />
        <Tab.Screen name='Autocompletare' component={SuggestionsScreen} />
        <Tab.Screen name='Setări' component={SettingsScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
