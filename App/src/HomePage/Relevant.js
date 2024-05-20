// import React, {useEffect, useState} from 'react';
// import {View, Text, TouchableOpacity, FlatList} from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import BackArrow from '../assets/svg/BackArrow';
// import FontFamily from '../common/components/FontFamily';
// import TemplateItem from './TemplateItem';
// import {config} from '../config';
// import Post from './Post';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const Relevant = ({navigation, ref}) => {
//   const [data, setData] = useState([]);
//   const {colors} = useTheme();
//   const gettemplates = async () => {
//     const userString = await AsyncStorage.getItem('user');
//     const otherString = await AsyncStorage.getItem('token');

//     if (userString && otherString) {
//       const parsedUser = JSON.parse(userString, otherString);
//       const response = await axios.get(
//         `${config.production}/app/user/getrelevantpost`,
//         {params: {userName: parsedUser.userName, userId: parsedUser.Id}},
//       );
//       if (response.status == 200) {
//         setData(response.data.data);
//       } else {
//         console.log('Faing error in fetching the posts');
//       }
//     }
//   };
//   const handleHidePost = postId => {
//     setData(data.filter(post => post.Id !== postId));
//   };

//   const handleBlockPost = userName => {
//     setData(data.filter(post => post.userName !== userName));
//   };

//   useEffect(() => {
//     gettemplates();
//   }, []);
//   // Dummy data array containing image and video informatio

//   return (
//     <>
//       <View
//         style={{
//           flexDirection: 'row',
//           //height: 56,
//           backgroundColor: colors.color_TabBarColor,
//         }}></View>
//       <FlatList
//         data={data}
//         renderItem={({item, index}) => (
//           <Post
//             navigation={navigation}
//             post={item}
//             index={index}
//             Screen={'Home'}
//             handleHidePost={handleHidePost}
//             handleBlockPost={handleBlockPost}
//           />
//         )} // Render each item using TemplateItem component
//         keyExtractor={(item, index) => index.toString()} // Use index as key for simplicity
//       />
//     </>
//   );
// };

// export default Relevant;

import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from '../config';
import Post from './Post';

const Relevant = ({navigation}) => {
  const [data, setData] = useState([]);
  const {colors} = useTheme();

  const getTemplates = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      const otherString = await AsyncStorage.getItem('token');

      if (userString && otherString) {
        const parsedUser = JSON.parse(userString);
        const response = await axios.get(
          `${config.production}/app/user/getrelevantpost`,
          {
            params: {userName: parsedUser.userName, userId: parsedUser.Id},
          },
        );
        console.log('sush', response.data);
        if (response.data.status === 200) {
          setData(response.data.data);
        } else {
          console.log('Facing error in fetching the posts');
        }
      }
    } catch (error) {
      console.error('Error fetching relevant posts:', error);
    }
  };

  const handleHidePost = postId => {
    setData(data.filter(post => post.Id !== postId));
  };

  const handleBlockPost = userName => {
    setData(data.filter(post => post.userName !== userName));
  };

  useEffect(() => {
    getTemplates();
  }, []);

  return (
    <>
      {data.length === 0 && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>No posts to show. Follow someone to see their posts here.</Text>
        </View>
      )}
      {data.length > 0 && (
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <Post
              navigation={navigation}
              post={item}
              index={index}
              Screen="Home"
              handleHidePost={handleHidePost}
              handleBlockPost={handleBlockPost}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </>
  );
};

export default Relevant;
