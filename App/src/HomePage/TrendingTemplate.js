// import React, {useEffect, useState} from 'react';
// import {View, Text, TouchableOpacity, FlatList} from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import BackArrow from '../assets/svg/BackArrow';
// import FontFamily from '../common/components/FontFamily';
// import TemplateItem from './TemplateItem';
// import axios from 'axios';
// import {config} from '../config';
// import Post from './Post';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const TrendingTemplates = React.forwardRef(
//   ({navigation, userId}, ref, props) => {
//     const [data, setData] = useState([]);
//     const {colors} = useTheme();

//     const gettemplates = async () => {
//       const userString = await AsyncStorage.getItem('user');
//       if (userString) {
//         const parsedUser = JSON.parse(userString);
//         const response = await axios.get(
//           `${config.production}/app/user/getallpost`,
//           {
//             params: {userId: parsedUser.Id},
//           },
//         );
//         if (response.status == 200) {
//           setData(response.data.posts);
//         } else {
//           console.log('Faing error in fetching the posts');
//         }
//       } else {
//         console.log('Cants find user from Async Storage');
//       }
//     };

//     const handleHidePost = postId => {
//       setData(data.filter(post => post.Id !== postId));
//     };

//     const handleBlockPost = userName => {
//       setData(data.filter(post => post.userName !== userName));
//     };
//     useEffect(() => {
//       gettemplates();
//     }, []);
//     // Dummy data array containing image and video informatio

//     return (
//       <>
//         <View
//           style={{
//             flexDirection: 'row',
//             // height: 56,
//             backgroundColor: colors.color_TabBarColor,
//           }}
//         />
//         <FlatList
//           ref={ref}
//           data={data} // Replace with actual data
//           renderItem={({item, index}) => (
//             <Post
//               navigation={navigation}
//               post={item}
//               index={index}
//               Screen={'Home'}
//               handleHidePost={handleHidePost}
//               handleBlockPost={handleBlockPost}
//             />
//           )}
//           keyExtractor={(item, index) => index.toString()} // Use index as key for simplicity
//         />
//       </>
//     );
//   },
// );

// export default TrendingTemplates;

import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {useTheme} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Post from './Post';
import {config} from '../config';

const TrendingTemplates = React.forwardRef(
  ({navigation, userId}, ref, props) => {
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const {colors} = useTheme();

    const PAGE_SIZE = 20; // Number of templates per page

    const gettemplates = async (currentOffset = 0) => {
      console.log(`Fetching templates: offset ${currentOffset}`);
      setLoading(true);
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const parsedUser = JSON.parse(userString);
        console.log('parsed userrrrrrr', parsedUser);
        try {
          const response = await axios.get(
            `${config.production}/app/user/getallpost`,
            {
              params: {
                userId: parsedUser.Id,
                limit: PAGE_SIZE,
                offset: currentOffset,
              },
            },
          );
          if (response.status === 200) {
            const newPosts = response.data.posts;
            console.log(`Fetched ${newPosts.length} posts`);
            console.log(userId, PAGE_SIZE, offset);
            setData(prevData =>
              currentOffset === 0 ? newPosts : [...prevData, ...newPosts],
            );
            setHasMore(newPosts.length === PAGE_SIZE);
          } else {
            console.log('Error in fetching the posts');
          }
        } catch (error) {
          console.log('Error fetching posts:', error);
        }
      } else {
        console.log('Cannot find user from Async Storage');
      }
      setLoading(false);
    };

    const handleHidePost = postId => {
      setData(data.filter(post => post.Id !== postId));
    };

    const handleBlockPost = userName => {
      setData(data.filter(post => post.userName !== userName));
    };

    const loadMoreData = () => {
      if (!loading && hasMore) {
        console.log('Loading more data');
        setOffset(prevOffset => prevOffset + PAGE_SIZE);
      }
    };

    useEffect(() => {
      gettemplates(offset);
    }, [offset]);

    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: colors.color_TabBarColor,
          }}
        />
        <FlatList
          ref={ref}
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
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => loading && <ActivityIndicator />}
        />
      </>
    );
  },
);

export default TrendingTemplates;
