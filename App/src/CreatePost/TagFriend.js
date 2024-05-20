import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  TextInput,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import {config} from '../config';

const TagFriend = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${config.production}/app/user/allusers`,
      );
      if (response.data.status === 200) {
        setData(response.data.data);
      } else {
        Alert.alert('Error in fetching User Details');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error in fetching User Details');
    }
  };

  const handleFilter = searchword => {
    const newFilter = data.filter(value =>
      value.userName.toLowerCase().includes(searchword.toLowerCase()),
    );
    setFilteredData(newFilter);
  };

  const handleItemPress = item => {
    // Toggle the selection status
    if (selectedUsers.includes(item.userName)) {
      const updatedSelectedUsers = selectedUsers.filter(
        userName => userName !== item.userName,
      );
      setSelectedUsers(updatedSelectedUsers);
    } else {
      setSelectedUsers(prevUsers => [...prevUsers, item.userName]);
    }
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <Image
          style={styles.searchIcon}
          source={require('../assets/Search.png')}
        />
        <TextInput
          style={styles.input}
          placeholder="Search.."
          onChangeText={handleFilter}
        />
      </View>

      {filteredData.length === 0 ? (
        <Text style={styles.noDataText}>No data available</Text>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={item => item.Id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => handleItemPress(item)}>
              <Text>{item.userName}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Display selected users below */}
      <View style={styles.selectedUsersContainer}>
        <Text style={styles.selectedUsersText}>{selectedUsers.join(', ')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  searchIcon: {
    top: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  selectedUsersContainer: {
    margin: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  selectedUsersText: {
    fontWeight: 'bold',
  },
});

export default TagFriend;
