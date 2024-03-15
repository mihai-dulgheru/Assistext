import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useSpeechContext } from "./SpeechContext";

export default function SettingsScreen() {
  const { speechOptions, setSpeechOptions } = useSpeechContext();

  const updateSpeechOption = (option, value) => {
    setSpeechOptions({ ...speechOptions, [option]: value });
  };

  return (
    <View style={styles.container}>
      <Text>Limba (Language):</Text>
      <Picker
        selectedValue={speechOptions.language}
        style={styles.input}
        onValueChange={(itemValue) => updateSpeechOption("language", itemValue)}
      >
        <Picker.Item label="Română (România)" value="ro-RO" />
        <Picker.Item label="Engleză (SUA)" value="en-US" />
        <Picker.Item label="Franțeză (Franța)" value="fr-FR" />
      </Picker>

      <Text>Înălțimea tonului de voce (Pitch):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        // if parseFloat(value) is not a number, it will return 0
        onChangeText={(value) =>
          updateSpeechOption("pitch", parseFloat(value) || 0)
        }
        value={speechOptions.pitch.toString()}
      />

      <Text>Viteza de vorbire (Rate):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(value) =>
          updateSpeechOption("rate", parseFloat(value) || 0)
        }
        value={speechOptions.rate.toString()}
      />

      <Text>Volumul (Volume):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(value) =>
          updateSpeechOption("volume", parseFloat(value) || 0)
        }
        value={speechOptions.volume.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
});
