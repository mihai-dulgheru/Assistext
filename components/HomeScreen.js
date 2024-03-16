import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import useFocusNotifyOnChangeProps from '../hooks/use-focus-notify-on-change-props';

const HomeScreen = ({navigation}) => {
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();

  const {data, dataUpdatedAt, error, status} = useQuery({
    queryKey: ['lessons'],
    queryFn: async () => {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const response = await axios.get(`${apiUrl}/lessons`);
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

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.lessonCard}
      onPress={() => navigation.navigate('Details', {lessonId: item.id})}>
      <Text style={styles.lessonTitle}>{item.title}</Text>
      <Text>{item.sections?.[0]?.subtitle}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
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
