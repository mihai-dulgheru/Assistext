// import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useSpeechContext} from './SpeechContext';

export default function SettingsScreen() {
  const {speechOptions, setSpeechOptions} = useSpeechContext();

  const updateSpeechOption = (option, value) => {
    const settingValue = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    setSpeechOptions({...speechOptions, [option]: settingValue});
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Limba (Language):</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={speechOptions.language}
          style={styles.picker}
          onValueChange={(itemValue) =>
            updateSpeechOption('language', itemValue)
          }>
          <Picker.Item label='Română (România)' value='ro-RO' />
          <Picker.Item label='Engleză (SUA)' value='en-US' />
        </Picker>
      </View> */}

      <Text style={styles.label}>Înălțimea tonului de voce (Pitch):</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        onChangeText={(value) => updateSpeechOption('pitch', value)}
        value={speechOptions.pitch.toString()}
      />

      <Text style={styles.label}>Viteza de vorbire (Rate):</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        onChangeText={(value) => updateSpeechOption('rate', value)}
        value={speechOptions.rate.toString()}
      />

      <Text style={styles.label}>Volumul (Volume):</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        onChangeText={(value) => updateSpeechOption('volume', value)}
        value={speechOptions.volume.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 50,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
});
