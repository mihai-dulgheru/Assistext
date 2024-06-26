import Ionicons from '@expo/vector-icons/Ionicons';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
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
import {useSpeechContext} from '../context/SpeechContext';
import useFocusNotifyOnChangeProps from '../hooks/use-focus-notify-on-change-props';
import {borderRadius, colors} from '../theme';

const FirstLineIndentation = (str) => {
  const indentedText = `    ${str}`;

  return <Text>{indentedText}</Text>;
};

const LessonDetailsScreen = ({route}) => {
  const {lessonId} = route.params;
  if (!lessonId) {
    throw new Error('Lesson ID is required');
  }

  const [isSpeaking, setIsSpeaking] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();
  const {speechOptions} = useSpeechContext();

  const {data, error, status} = useQuery({
    queryKey: ['lessons', lessonId],
    queryFn: async () => {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const response = await axios.get(`${apiUrl}/lessons/${lessonId}`);
      return response.data;
    },
    notifyOnChangeProps,
  });

  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (status === 'error') {
    return <Text>Error: {error.message}</Text>;
  }

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
      const fullText = `${data?.title}. `.concat(
        data?.sections?.map(
          (section) => `${section.subtitle}. ${section.content}`,
        ),
      );
      Speech.speak(fullText, {
        ...speechOptions,
        onDone: () => handleSpeechStatus(false),
        onStart: () => handleSpeechStatus(true),
      });
    }
  }, [data, isSpeaking, speechOptions, handleSpeechStatus]);

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{data?.title}</Text>
        {data?.sections?.map((section, index) => (
          <View key={index}>
            {section.subtitle && (
              <Text style={styles.subtitle}>{section.subtitle}</Text>
            )}
            <Text style={styles.content}>
              {FirstLineIndentation(section.content)}
            </Text>
          </View>
        ))}
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
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: colors.text,
    marginBottom: 25,
  },
  readButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: borderRadius.full,
    alignSelf: 'center',
    marginTop: 25,
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  reading: {
    backgroundColor: colors.tertiary,
    shadowColor: colors.tertiary,
  },
  notReading: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
  },
});

export default LessonDetailsScreen;
