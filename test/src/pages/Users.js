import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import UserDetails from '../components/UserDetails'; // Importa el componente UserDetails
import axios from 'axios';

const Stack = createStackNavigator();

export const Users = () => {
  const navigation = useNavigation();
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
    <TouchableOpacity
      onPress={() => navigation.navigate('UserDetails', {user: item})}>
      <View style={styles.userContainer}>
        <Text style={styles.nameText}>Name: {item.first_name}</Text>
        <Text style={styles.emailText}>Email: {item.email}</Text>
        <Text style={styles.nameText}>Last Name: {item.last_name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Stack.Navigator>
      <Stack.Screen name="Usuarios" options={{headerShown: false}}>
        {() => (
          <View>
            <FlatList
              data={users}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
            />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="UserDetails"
        component={UserDetails}
        options={({route}) => ({title: route.params.user.first_name})}
      />
    </Stack.Navigator>
  );
};

export default Users;

const styles = StyleSheet.create({
  userContainer: {
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#99d5e7',
    borderRadius: 5,
    gap: 12,
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
