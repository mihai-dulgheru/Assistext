import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import * as Clipboard from 'expo-clipboard';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {borderRadius, colors} from '../theme';
import Layout from './Layout';

const fetchCompletion = async (inputText) => {
  try {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const response = await axios.post(`${apiUrl}/completions`, {
      prompt: inputText,
      maxTokens: 16,
      temperature: 0,
    });
    return response.data.choices[0].text.split(/[\n.]/)[0].trim();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Server returned an error:', error.response.data);
      } else if (error.request) {
        console.error('No response received from server:', error.request);
      } else {
        console.error('Request setup error:', error.message);
      }
    } else {
      console.error('Request error:', error.message);
    }
    return '';
  }
};

export default function SuggestionsScreen() {
  const [inputText, setInputText] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const timerRef = useRef(null);

  const handleChangeText = useCallback((text) => {
    setInputText(text);
    setSuggestion('');
  }, []);

  useEffect(() => {
    if (inputText.length >= 3) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        fetchCompletion(inputText).then((result) => {
          setSuggestion(result);
        });
      }, 5000);
    } else {
      setSuggestion('');
    }
    return () => clearTimeout(timerRef.current);
  }, [inputText]);

  const addSuggestionToText = useCallback(() => {
    if (suggestion) {
      setInputText((prevText) => prevText.trim() + ' ' + suggestion);
      setSuggestion('');
    }
  }, [suggestion]);

  const copyToClipboard = useCallback(async () => {
    await Clipboard.setStringAsync(inputText);
  }, [inputText]);

  return (
    <Layout>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder='Introdu textul aici...'
          onChangeText={handleChangeText}
          value={inputText}
          multiline
          numberOfLines={4}
        />
        <Text style={styles.placeholderText}>{suggestion}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={addSuggestionToText}
            style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Adaugă Sugestia</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
            <Ionicons name='copy' size={24} color='white' />
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  textInput: {
    minHeight: 100,
    borderColor: colors.primary,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    backgroundColor: colors.white,
    textAlignVertical: 'top',
    borderRadius: borderRadius['2xl'],
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  placeholderText: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
    fontWeight: '400',
    color: colors.text,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: borderRadius['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '600',
  },
  copyButton: {
    backgroundColor: colors.accent,
    padding: 15,
    borderRadius: borderRadius['2xl'],
    shadowColor: colors.accent,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  copyButtonText: {
    color: colors.white,
    fontSize: 18,
    lineHeight: 28,
  },
});
