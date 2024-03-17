import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme';

export default function Header({style, title}) {
  return (
    <View style={[style, styles.container]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
    color: colors.text,
  },
});
