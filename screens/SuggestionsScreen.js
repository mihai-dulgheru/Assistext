import Ionicons from '@expo/vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';
import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../components/Layout';
import useDelayedAutoComplete from '../hooks/use-delayed-auto-complete';
import {borderRadius, colors} from '../theme';

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
