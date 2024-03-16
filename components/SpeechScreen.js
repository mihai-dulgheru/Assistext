import * as Speech from 'expo-speech'
import React from 'react'
import {Button, StyleSheet, Text, View} from 'react-native'
import {useSpeechContext} from './SpeechContext'

export default function SpeechScreen() {
  const {speechOptions} = useSpeechContext()
  const text = 'Acesta este un text pe care vreau să-l aud.'

  const speak = () => {
    Speech.speak(text, speechOptions)
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Button title="Press to hear some words" onPress={speak} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})
