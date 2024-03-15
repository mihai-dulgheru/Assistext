import * as Speech from "expo-speech";
import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function SpeechScreen() {
  const text = "Acesta este un text pe care vreau să-l aud.";

  const speak = () => {
    const options = {
      language: "ro-RO",
      pitch: 1.0,
      rate: 1.0,
    };
    Speech.speak(text, options);
  };

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Button title="Press to hear some words" onPress={speak} />
    </View>
  );
}

const styles = StyleSheet.create({});
