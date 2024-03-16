import Ionicons from '@expo/vector-icons/Ionicons';
import * as Speech from 'expo-speech';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSpeechContext} from './SpeechContext';

const LessonDetailsScreen = ({route}) => {
  const {lesson} = route.params;
  const {speechOptions} = useSpeechContext();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const handleSpeechStatus = useCallback(
    (status) => {
      setIsSpeaking(status);
      status ? startAnimation() : animation.setValue(0);
    },
    [animation],
  );

  useEffect(() => {
    return Speech.stop;
  }, []);

  const startAnimation = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [animation]);

  const toggleReadContent = useCallback(async () => {
    if (isSpeaking) {
      await Speech.stop();
      handleSpeechStatus(false);
    } else {
      const fullText = `${lesson.title}. ${lesson.subtitle}. ${lesson.content}`;
      Speech.speak(fullText, {
        ...speechOptions,
        onDone: () => handleSpeechStatus(false),
        onStart: () => handleSpeechStatus(true),
      });
    }
  }, [isSpeaking, lesson, speechOptions, handleSpeechStatus]);

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.subtitle}>{lesson.subtitle}</Text>
        <Text style={styles.content}>{lesson.content}</Text>
      </ScrollView>
      <Animated.View style={{transform: [{scale}]}}>
        <TouchableOpacity
          onPress={toggleReadContent}
          style={[
            styles.readButton,
            isSpeaking ? styles.reading : styles.notReading,
          ]}>
          <Ionicons
            name={isSpeaking ? 'pause' : 'play'}
            size={32}
            color='white'
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 15,
    color: '#444',
  },
  content: {
    fontSize: 18,
    marginBottom: 25,
    lineHeight: 24,
    color: '#555',
  },
  readButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  reading: {
    backgroundColor: '#FF6347',
    shadowColor: '#FF6347',
  },
  notReading: {
    backgroundColor: '#4CAF50',
    shadowColor: '#4CAF50',
  },
});

export default LessonDetailsScreen;
