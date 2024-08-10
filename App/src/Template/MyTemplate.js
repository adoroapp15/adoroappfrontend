import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {config} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackArrow from '../assets/svg/BackArrow';
import FontFamily from '../common/components/FontFamily';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import Size from '../common/components/Size';

const MyTemplate = ({navigation}) => {
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();

  const [select, setSelect] = React.useState(Data);
  const Data = [
    {id: '1', source: require('../assets/Savage.png'), selected: false},
    {id: '2', source: require('../assets/Relatable.png'), selected: false},
    {id: '3', source: require('../assets/Dank.png'), selected: false},
    {id: '4', source: require('../assets/Shitpost.png'), selected: false},
    {id: '5', source: require('../assets/Movies.png'), selected: false},
    {id: '6', source: require('../assets/Wholesome.png'), selected: false},
    {id: '7', source: require('../assets/Anime.png'), selected: false},
    {id: '8', source: require('../assets/Desi.png'), selected: false},
    {id: '9', source: require('../assets/Webseries.png'), selected: false},
    {id: '10', source: require('../assets/Celeb.png'), selected: false},
    {id: '11', source: require('../assets/Gaming.png'), selected: false},
    {id: '12', source: require('../assets/History.png'), selected: false},
    {id: '13', source: require('../assets/Tech.png'), selected: false},
    {id: '14', source: require('../assets/Nostalgia.png'), selected: false},
    {id: '15', source: require('../assets/Sports.png'), selected: false},
    {id: '16', source: require('../assets/Sadpost.png'), selected: false},
    {id: '17', source: require('../assets/Parody.png'), selected: false},
    {id: '18', source: require('../assets/Politics.png'), selected: false},
  ];
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  const handleOnpress = item => {
    const newItem = select.map(val => {
      if (val.id === item.id) {
        return {...val, selected: !val.selected};
      } else {
        return val;
      }
    });
    setSelect(newItem);
  };

  useEffect(() => {
    getTemplate();
  }, []);

  const getTemplate = async () => {
    try {
      const userr = await AsyncStorage.getItem('user');
      const other = await AsyncStorage.getItem('token');

      const parsedUser = JSON.parse(userr, other);
      setUser(parsedUser);

      const res = await axios.get(
        `${config.production}/app/user/getusertemplate`,
        {
          params: {user: parsedUser.userName},
        },
      );
      if (res.status == 200) {
        setData(res.data.templates);
        // setData([])
      }
    } catch (err) {
      console.log('Getting Error');
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.color_PageColor}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.color_TabBarColor,
          height: 56,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => navigation.push('Template')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: Size.tabtext,
          }}>
          My Template
        </Text>
      </View>
      <View style={styles.flatlist}>
        {data.length === 0 ? (
          <Text style={styles.noMatchText}>No Templates Uploaded</Text>
        ) : (
          <FlatList
            data={data}
            numColumns={3}
            keyExtractor={item => item.Id.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
              // style={{flex: 1, margin: 3}}
              // onPress={() => handleOnPress(item)}
              >
                {item && item.fileName && (
                  <Image
                    source={{
                      uri: `https://www.adoro.social/UserTemplate/${item.fileName}`,
                    }}
                    style={{height: 100, width: 100, margin: 5}}
                  />
                )}
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default MyTemplate;

const styles = StyleSheet.create({
  flatlist: {
    marginTop: 10,
    alignSelf: 'center',
  },
  image: {
    margin: 5,
    // flex: 1,
  },
  noMatchText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
    fontFamily: FontFamily.semibold,
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
    width: '50%',
    height: '50%',
    borderRadius: 12,
    // backgroundColor: 'red',
  },
});
