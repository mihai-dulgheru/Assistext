import Ionicons from '@expo/vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';
import React, {useCallback, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Layout from '../components/Layout';
import useDelayedAutoComplete from '../hooks/use-delayed-auto-complete';
import styles from '../styles/SuggestionsScreen.styles.js';

export default function SuggestionsScreen() {
  const [inputText, setInputText] = useState('');
  const [suggestion, setSuggestion] = useState('');
  useDelayedAutoComplete(inputText, setSuggestion, 3000);

  const handleChangeText = useCallback((text) => {
    setInputText(text);
    setSuggestion('');
  }, []);

  const addSuggestionToText = useCallback(() => {
    if (suggestion) {
      setInputText((prevText) => prevText.trim() + ' ' + suggestion);
      setSuggestion('');
    }
  }, [suggestion]);

  const copyToClipboard = useCallback(
    async (event) => {
      event.preventDefault();
      await Clipboard.setStringAsync(inputText);
    },
    [inputText],
  );

  return (
    <Layout>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder='Introdu textul aici...'
          onChangeText={handleChangeText}
          value={inputText}
          multiline
          numberOfLines={8}
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
