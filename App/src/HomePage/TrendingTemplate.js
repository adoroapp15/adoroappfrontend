import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import BackArrow from '../assets/svg/BackArrow';
import FontFamily from '../common/components/FontFamily';
import TemplateItem from './TemplateItem';
import axios from 'axios';
import {config} from '../config';
import Post from './Post';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
const TrendingTemplates = ({navigation, ref, userId}) => {
  const [data, setData] = useState([]);
  const {colors} = useTheme();
 
  const gettemplates = async () => {
    const userString = await AsyncStorage.getItem('user');
    if (userString) {
      const parsedUser = JSON.parse(userString);
      const response = await axios.get(
        `${config.production}/app/user/getallpost`,
        {
          params: {userId: parsedUser.Id},
        },
      );
      if (response.status == 200) {
        setData(response.data.posts);
      } else {
        console.log('Faing error in fetching the posts');
      }
    } else {
      console.log('Cants find user from Async Storage');
    }
  };
 
  const handleHidePost = postId => {
    setData(data.filter(post => post.Id !== postId));
  };
 
  const handleBlockPost = userName => {
    setData(data.filter(post => post.userName !== userName));
  };
  useEffect(() => {
    gettemplates();
  }, []);
  // Dummy data array containing image and video informatio
 
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          // height: 56,
          backgroundColor: colors.color_TabBarColor,
        }}>
        {/* <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => navigation.push('Trending Template')}>
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
        </Text> */}
      </View>
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <Post
            navigation={navigation}
            post={item}
            index={index}
            Screen={'Home'}
            handleHidePost={handleHidePost}
            handleBlockPost={handleBlockPost}
          />
        )} // Render each item using TemplateItem component
        keyExtractor={(item, index) => index.toString()} // Use index as key for simplicity
      />
    </>
  );
};
 
export default TrendingTemplates;
 