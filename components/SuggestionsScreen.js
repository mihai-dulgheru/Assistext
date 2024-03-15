import axios from "axios";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const fetchCompletion = async (inputText) => {
  try {
    const response = await axios.post(
      "https://d6e5-86-121-161-196.ngrok-free.app/completions",
      { prompt: inputText, maxTokens: 16, temperature: 0 }
    );

    return response.data.choices[0].text.split(/[\n.]/)[0].trim();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Server returned an error:", error.response.data);
      } else if (error.request) {
        console.error("No response received from server:", error.request);
      } else {
        console.error("Request setup error:", error.message);
      }
    } else {
      console.error("Request error:", error.message);
    }
    return "";
  }
};

export default function SuggestionsScreen() {
  const [inputText, setInputText] = useState("");
  const [completion, setCompletion] = useState("");

  const handleCompletionRequest = async () => {
    const result = await fetchCompletion(inputText);
    setCompletion(result);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Introdu textul aici..."
        onChangeText={(text) => setInputText(text)}
        value={inputText}
      />
      <Button title="Obține Completare" onPress={handleCompletionRequest} />
      {completion !== "" && (
        <Text style={styles.text}>Completare: {completion}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
  text: {
    marginTop: 10,
  },
});
