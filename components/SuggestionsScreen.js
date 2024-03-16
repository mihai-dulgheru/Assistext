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

const fetchCompletion = async (inputText) => {
  try {
    const response = await axios.post(
      'https://d6e5-86-121-161-196.ngrok-free.app/completions',
      {prompt: inputText, maxTokens: 16, temperature: 0},
    );
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
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder='Introdu textul aici...'
        onChangeText={handleChangeText}
        value={inputText}
        multiline
        numberOfLines={16}
      />
      <Text style={styles.placeholderText}>{suggestion}</Text>
      <TouchableOpacity
        onPress={addSuggestionToText}
        style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Adaugă Sugestia</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
        <Text style={styles.copyButtonText}>Copiază textul</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  text: {
    marginTop: 10,
  },
  placeholderText: {
    color: '#a1a1a1',
    marginBottom: 10,
  },
  copyButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  actionButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  copyButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
