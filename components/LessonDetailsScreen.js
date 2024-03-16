import * as Speech from 'expo-speech';
import React from 'react';
import {Button, ScrollView, StyleSheet, Text} from 'react-native';
import {useSpeechContext} from './SpeechContext';

const LessonDetailsScreen = ({route}) => {
  const {lesson} = route.params;
  const {speechOptions} = useSpeechContext();

  const readContent = () => {
    const fullText = `${lesson.title}. ${lesson.subtitle}. ${lesson.content}`;
    Speech.speak(fullText, speechOptions);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.subtitle}>{lesson.subtitle}</Text>
      <Text style={styles.content}>{lesson.content}</Text>
      <Button title='Citește lecția' onPress={readContent} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default LessonDetailsScreen;
