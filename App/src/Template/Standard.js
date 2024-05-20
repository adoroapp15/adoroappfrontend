import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {config} from '../config';
import {useFocusEffect} from '@react-navigation/native';
import _ from 'lodash'; // Import lodash for debounce
import SearchIcon from '../assets/svg/Search';
import FontFamily from '../common/components/FontFamily';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
 
const Standard = ({navigation}) => {
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();
 
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noMatchFound, setNoMatchFound] = useState(false);
 
  useEffect(() => {
    getData();
  }, []);
 
  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.production}/app/user/getalltemplates`,
      );
      if (response.status === 200) {
        const slice = response.data.posts;
        setData(slice);
        setFilteredData(slice);
        setNoMatchFound(slice.length === 0);
      } else {
        console.log('Error getting templates');
      }
    } catch (error) {
      console.error('Error getting templates', error);
    } finally {
      setLoading(false);
    }
  };
 
  const handleOnPress = item => {
   
    const index = data.findIndex(dataItem => dataItem.Id === item.Id);
    console.log('index isss', index)
    navigation.navigate('Standards', {
      selectedData: item,
      allData: data,
      selectedImageId: item.Id,
      indexToScroll: index, // Pass the original index value
    });
  };
 
  const handleFilter = _.debounce(searchword => {
    const newFilter = data.filter(value =>
      value.name.toLowerCase().includes(searchword.toLowerCase()),
    );
    setFilteredData(newFilter);
    setNoMatchFound(newFilter.length === 0);
  }, 300);
 
  return (
    <View style={{backgroundColor: colors.color_PageColor, height: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.color_SearchBgColor,
          margin: 10,
          borderRadius: 15,
        }}>
        <View style={{alignSelf: 'center', marginLeft: 10}}>
          <SearchIcon color={colors.arrow} />
        </View>
        <TextInput
          style={{
            flex: 1,
            alignSelf: 'center',
            marginLeft: 5,
            fontFamily: FontFamily.semibold,
            color: colors.color_TextNormal,
          }}
          onChangeText={handleFilter}
          placeholder="Search templates by file name..."
          placeholderTextColor={colors.color_PlaceHolderColor}
        />
      </View>
 
      {noMatchFound ? (
        <Text style={styles.noMatchText}>No match found</Text>
      ) : (
        <FlatList
          data={filteredData}
          numColumns={3}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => handleOnPress(item)}
              style={styles.templateItem}>
              {item && item.fileName && item.type === 'image' && (
                <Image
                  key={index}
                  source={{
                    uri: `https://www.adoro.social/Template/Image/${item.fileName}`,
                  }}
                  style={styles.templateImage}
                />
              )}
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text />}
          refreshing={loading}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() =>
            loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            )
          }
        />
      )}
    </View>
  );
};
 
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#E6E6E6',
    margin: 10,
    borderRadius: 15,
  },
  searchIcon: {
    top: 12,
    marginLeft: 10,
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    alignSelf: 'center',
    marginLeft: 5,
    fontFamily: FontFamily.semibold,
  },
  noMatchText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  listItem: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
  },
  templateItem: {
    flex: 1,
    aspectRatio: 1,
    margin: 3,
  },
  templateImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  loadingContainer: {
    padding: 10,
  },
});
 
export default Standard;