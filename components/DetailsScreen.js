import React from 'react'
import {Button, StyleSheet, Text, View} from 'react-native'

const DetailsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aceasta este pagina de detalii.</Text>
      <Button title="Înapoi la Start" onPress={() => navigation.goBack()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 20,
  },
})

export default DetailsScreen
