import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import BackArrow from '../assets/svg/BackArrow';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import axios from 'axios';
import {config} from '../config';
import Video from 'react-native-video';
import FontFamily from '../common/components/FontFamily';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const desiredWidth = 0.2 * windowWidth;
const desiredHeight = 0.2 * windowHeight;

const TrendingTemplate = ({navigation}) => {
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();
  const [isPlaying, setIsPlaying] = React.useState({});

  const [data, setData] = useState([]);
  useEffect(() => {
    gettemplates();
  }, []);

  const togglePlayPause = postId => {
    setIsPlaying(prevIsPlaying => ({
      ...prevIsPlaying,
      [postId]: !prevIsPlaying[postId],
    }));
  };

  const gettemplates = async () => {
    const response = await axios.get(
      `${config.production}/app/user/gettrendingtemplate`,
    );
    if (response.status == 200) {
      setData(response.data.trendingtemplate);
    } else {
      console.log('getting error in getting trending templates');
    }
  };

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
  const [select, setSelect] = React.useState(Data);
  console.log('selectedItem', select);

  console.log('data isss ', data);
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          height: 56,
          backgroundColor: colors.color_TabBarColor,
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
            fontSize: 20,
          }}>
          Trending Template
        </Text>
      </View>
      <View style={{backgroundColor: colors.color_PageColor, height: '100%'}}>
        <FlatList
          data={data}
          numColumns={3}
          renderItem={({item, index}) => (
            <View
              style={{
                flex: 1,
                aspectRatio: 1,
                margin: 3,
                marginTop: 20,
              }}>
              {item && item.fileName && item.type == 'image' && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Trending Templates', {
                      selectedItem: item,
                      data: data,
                    })
                  }>
                  <Image
                    key={index}
                    source={{
                      uri: `https://www.adoro.social/TrendingTemplate/${item.fileName}`,
                    }}
                    style={styles.templateImage}
                  />
                </TouchableOpacity>
              )}
              {item.type === 'video' && (
                <>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Trending Templates', {
                        selectedItem: item,
                      })
                    }>
                    <Video
                      key={index}
                      source={{
                        uri: `https://www.adoro.social/TrendingTemplate/${item.fileName}`,
                      }}
                      style={{width: '100%', height: '100%', borderRadius: 12}}
                      resizeMode="cover"
                      paused={!isPlaying[item.Id]}
                    />
                    <TouchableOpacity
                      style={{
                        width: desiredWidth,
                        height: desiredHeight,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginLeft: -35,
                        marginTop: -45,
                      }}
                      onPress={() => togglePlayPause(item.Id)}>
                      {isPlaying[item.Id] ? (
                        <Image
                          source={require('../assets/pause.png')}
                          style={{
                            width: 50,
                            height: 50,
                            backgroundColor: '#fff',
                            borderRadius: 25,
                          }}
                        />
                      ) : (
                        <Image
                          source={require('../assets/play.png')}
                          style={{
                            width: 50,
                            height: 50,
                            backgroundColor: '#fff',
                            borderRadius: 25,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        />
      </View>
    </>
  );
};

export default TrendingTemplate;

const styles = StyleSheet.create({
  flatlist: {
    marginTop: 10,
    alignSelf: 'center',
  },
  image: {
    margin: 5,
    // flex: 1,
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
});
