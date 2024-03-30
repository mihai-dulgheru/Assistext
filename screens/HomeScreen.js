import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import useFocusNotifyOnChangeProps from '../hooks/use-focus-notify-on-change-props';
import {borderRadius, colors} from '../theme';

const HomeScreen = ({navigation}) => {
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();

  const {data, error, status} = useQuery({
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
      {item.sections?.[0]?.subtitle && (
        <Text style={styles.lessonSubtitle}>
          {item.sections?.[0]?.subtitle}
        </Text>
      )}
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
    paddingVertical: 10,
    backgroundColor: colors.white,
  },
  lessonCard: {
    backgroundColor: colors.secondary,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: borderRadius['2xl'],
    elevation: 3,
    shadowColor: colors.secondary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  lessonTitle: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '500',
  },
  lessonSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '300',
  },
});

export default HomeScreen;
