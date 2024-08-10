import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import Size from '../common/components/Size';

const Licensed = ({navigation}) => {
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
  ];
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();

  const [select, setSelect] = React.useState(Data);
  const handleOnpress = imageId => {
    navigation.navigate('Licenseds', {imageId});
  };
  return (
    <View style={{height: '100%'}}>
      <Text
        style={{
          flex: 1,
          textAlignVertical: 'center',
          alignSelf: 'center',
          fontSize: Size.title,
          color: colors.color_Logintext,
        }}>
        We're currenly expanding our licensed {'\n'} template library,but in the
        meantime, {'\n'} let's explore a custom design solution
      </Text>
    </View>
  );
};

export default Licensed;

const styles = StyleSheet.create({
  flatlist: {
    marginTop: 10,
    alignItems: 'center',
  },
  image: {
    margin: 2,
  },
});
