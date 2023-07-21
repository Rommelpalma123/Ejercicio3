import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { create } from 'react-test-renderer';

export default function UserDetails ({route}) {
  const {user} = route.params;

  return (
    <View style={styles.detailsContainer}>
      <Image style={styles.image} source={{uri: user.avatar}} />
      <Text style={styles.textDetails}>Name: {user.first_name}</Text>
      <Text style={styles.textDetails}>Name: {user.last_name}</Text>
      <Text style={styles.textDetails}>Email: {user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    marginLeft: 10,
    marginRight: 10,
    color: 'black',
  },

  textDetails: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 15,
  },

  textDetail: {
    color: 'black',
    fontSize: 20,
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
});
