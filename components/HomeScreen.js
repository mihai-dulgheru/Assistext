import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const lessons = [
  {
    id: '1',
    title: 'Lecția 1',
    subtitle: 'Introducere în curs',
    content: 'Acesta este conținutul lecției 1.',
  },
  {
    id: '2',
    title: 'Lecția 2',
    subtitle: 'Capitolul următor',
    content: 'Acesta este conținutul lecției 2.',
  },
];

const HomeScreen = ({navigation}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.lessonCard}
      onPress={() => navigation.navigate('LessonDetails', {lesson: item})}>
      <Text style={styles.lessonTitle}>{item.title}</Text>
      <Text>{item.subtitle}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={lessons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  lessonCard: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    elevation: 3,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 20,
  },
});

export default HomeScreen;
