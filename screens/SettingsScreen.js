import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useSpeechContext} from '../context/SpeechContext';
import {borderRadius, colors} from '../theme';

export default function SettingsScreen() {
  const {speechOptions, setSpeechOptions} = useSpeechContext();

  const updateSpeechOption = (option, value) => {
    const settingValue = parseFloat(value) || 1;
    setSpeechOptions((prevOptions) => ({
      ...prevOptions,
      [option]: settingValue,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Înălțimea tonului (Pitch):</Text>
      <TextInput
        style={styles.input}
        keyboardType='decimal-pad'
        onEndEditing={(e) => updateSpeechOption('pitch', e.nativeEvent.text)}
        defaultValue={speechOptions.pitch.toString()}
      />
      <Text style={styles.label}>Viteza de vorbire (Rate):</Text>
      <TextInput
        style={styles.input}
        keyboardType='decimal-pad'
        onEndEditing={(e) => updateSpeechOption('rate', e.nativeEvent.text)}
        defaultValue={speechOptions.rate.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  label: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: colors.text,
  },
  input: {
    height: 50,
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: borderRadius['2xl'],
    paddingHorizontal: 10,
  },
});
