import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {colors} from '../theme';

export default function Layout({children}) {
  return <ScrollView style={styles.container}>{children}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
