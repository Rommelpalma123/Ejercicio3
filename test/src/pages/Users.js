import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/users');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.userContainer}>
      <Text style={styles.nameText}>Name: {item.first_name}</Text>
      <Text style={styles.emailText}>Email: {item.email}</Text>
      <Text style={styles.nameText}>LastName: {item.last_name}</Text>
      <Image style={styles.avatar} source={{uri: item.avatar}} />
    </View>
  );

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#99d5e7',
    borderRadius: 5,
    gap: 12
  },
  nameText: {
    color: 'black',
    marginLeft: 10,
    fontSize: 18,
  },
  emailText: {
    marginLeft: 10,
    color: 'black',
    fontSize: 16,
  },
  avatarText: {
    marginLeft: 10,
    color: 'black',
    fontSize: 14,
  },
});