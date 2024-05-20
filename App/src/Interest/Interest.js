import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {config} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Interest = ({navigation}) => {
  const Data = [
    {
      id: '1',
      name: 'Savage',
      source: require('../assets/Savage.png'),
      selected: false,
    },
    {
      id: '2',
      name: 'Relatable',
      source: require('../assets/Relatable.png'),
      selected: false,
    },
    {
      id: '3',
      name: 'Dank',
      source: require('../assets/Dank.png'),
      selected: false,
    },
    {
      id: '4',
      name: 'Shitpost',
      source: require('../assets/Shitpost.png'),
      selected: false,
    },
    {
      id: '5',
      name: 'Movies',
      source: require('../assets/Movies.png'),
      selected: false,
    },
    {
      id: '6',
      name: 'Wholesome',
      source: require('../assets/Wholesome.png'),
      selected: false,
    },
    {
      id: '7',
      name: 'Anime',
      source: require('../assets/Anime.png'),
      selected: false,
    },
    {
      id: '8',
      name: 'Desi',
      source: require('../assets/Desi.png'),
      selected: false,
    },
    {
      id: '9',
      name: 'Webseries',
      source: require('../assets/Webseries.png'),
      selected: false,
    },
    {
      id: '10',
      name: 'Celeb',
      source: require('../assets/Celeb.png'),
      selected: false,
    },
    {
      id: '11',
      name: 'Gaming',
      source: require('../assets/Gaming.png'),
      selected: false,
    },
    {
      id: '12',
      name: 'History',
      source: require('../assets/History.png'),
      selected: false,
    },
    {
      id: '13',
      name: 'Tech',
      source: require('../assets/Tech.png'),
      selected: false,
    },
    {
      id: '14',
      name: 'Nostalgia',
      source: require('../assets/Nostalgia.png'),
      selected: false,
    },
    {
      id: '15',
      name: 'Sports',
      source: require('../assets/Sports.png'),
      selected: false,
    },
    {
      id: '16',
      name: 'Sadpost',
      source: require('../assets/Sadpost.png'),
      selected: false,
    },
    {
      id: '17',
      name: 'Parody',
      source: require('../assets/Parody.png'),
      selected: false,
    },
    {
      id: '18',
      name: 'Politics',
      source: require('../assets/Politics.png'),
      selected: false,
    },
  ];

  const [select, setSelect] = React.useState(Data);
  const [leastCount, setLeastCount] = React.useState([]);
  const [selectedInterests, setSelectedInterests] = React.useState([]);

  const handleOnpress = item => {
    const newItem = select.map(val => {
      if (val.id === item.id) {
        return {...val, selected: !val.selected};
      } else {
        return val;
      }
    });
    setLeastCount(() => newItem.filter(data => data.selected === true));
    const updatedInterests = newItem
      .filter(data => data.selected === true)
      .map(data => data.name);
    setSelectedInterests(updatedInterests);
    setSelect(newItem);
  };

  const handleDone = async () => {
    const user = await AsyncStorage.getItem('user');
    const other = await AsyncStorage.getItem('token');

    const parsedUser = JSON.parse(user, other);
    console.log('Selected is', selectedInterests);
    const response = await axios.post(
      `${config.production}/app/user/saveInterest`,
      {
        mobileNo: parsedUser ? parsedUser.mobileNo : '',
        selectedInterests,
      },
    );
    if (response.status === 200) {
      Alert.alert('Interest Done');
      console.log('NAvigaing   gggggggggggg');
      navigation.navigate('BottomTabScreen');
    }
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <Text style={styles.text}>Welcome to adoro</Text>
      <Text style={styles.text2}>Choose 5 or more meme categories</Text>
      <View style={styles.flatlist}>
        <FlatList
          data={select}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity onPress={() => handleOnpress(item)}>
                  <Image source={item.source} style={styles.image} />
                  {item.selected === true ? (
                    <Image
                      source={require('../assets/Check.png')}
                      style={{
                        width: '20%',
                        height: 25,
                        position: 'absolute',
                        marginLeft: 7,
                        borderRadius: 50,
                      }}
                    />
                  ) : null}
                </TouchableOpacity>
              </View>
            );
          }}
          numColumns={3}
        />
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          disabled={leastCount.length >= 5 ? false : true}
          onPress={handleDone}>
          <LinearGradient
            colors={
              leastCount.length >= 5
                ? [
                    'rgba(0,255,255,0.4)',
                    'rgba(255,192,203,1)',
                    'rgba(255,255,0,0.5)',
                  ]
                : ['#333', '#555']
            }
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{padding: 15, alignItems: 'center', borderRadius: 5}}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>DONE</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Interest;

const styles = StyleSheet.create({
  text: {
    color: 'black',
    marginLeft: 15,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 31.2,
    wordWrap: 'break-word',
  },
  text2: {
    color: 'grey',
    marginLeft: 15,
    fontWeight: '500',
  },
  flatlist: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    width: '95%',
    marginTop: 20,
    marginLeft: 10,
    alignItem: 'center',
  },
  image: {
    margin: 2,
  },
});
