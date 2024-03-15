import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import SpeechScreen from "./components/SpeechScreen";
import SuggestionsScreen from "./components/SuggestionsScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <SpeechScreen />
      <SuggestionsScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
