import Ionicons from '@expo/vector-icons/Ionicons';
import {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {borderRadius, colors} from '../theme';

export default function TabBar({state, descriptors, navigation}) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (isKeyboardVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          let iconName;

          switch (route.name) {
            case 'Acasă':
              iconName = isFocused ? 'home' : 'home-outline';
              break;
            case 'Autocompletare':
              iconName = isFocused ? 'bulb' : 'bulb-outline';
              break;
            case 'Setări':
              iconName = isFocused ? 'settings' : 'settings-outline';
              break;
            default:
              break;
          }

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole='button'
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}>
              <Ionicons
                name={iconName}
                size={25}
                color={isFocused ? colors.primary : colors.text}
              />
              <Text
                style={isFocused ? styles.tabLabelFocused : styles.tabLabel}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: colors.background,
    borderRadius: borderRadius['2xl'],
    marginHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 16,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  tabLabelFocused: {
    color: colors.primary,
    fontSize: 12,
    lineHeight: 16,
    fontStyle: 'normal',
    fontWeight: '400',
  },
});
