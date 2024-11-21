// import React, {useEffect, useState} from 'react';
// import {View, Text, FlatList} from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {config} from '../config';
// import Post from './Post';

// const Relevant = React.forwardRef(({navigation}, ref) => {
//   const [data, setData] = useState([]);
//   const {colors} = useTheme();

//   const getTemplates = async () => {
//     try {
//       const userString = await AsyncStorage.getItem('user');
//       const otherString = await AsyncStorage.getItem('token');

//       if (userString && otherString) {
//         const parsedUser = JSON.parse(userString);
//         const response = await axios.get(
//           `${config.production}/app/user/getrelevantpost`,
//           {
//             params: {userName: parsedUser.userName, userId: parsedUser.Id},
//           },
//         );
//         if (response.data.status === 200) {
//           setData(response.data.data);
//         } else {
//           console.log('Facing error in fetching the posts');
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching relevant posts:', error);
//     }
//   };

//   const handleHidePost = postId => {
//     setData(data.filter(post => post.Id !== postId));
//   };

//   const handleBlockPost = userName => {
//     setData(data.filter(post => post.userName !== userName));
//   };

//   useEffect(() => {
//     getTemplates();
//   }, []);

//   return (
//     <>
//       {data.length === 0 && (
//         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//           <Text style={{color: colors.color_Logintext}}>
//             No posts to show. Follow someone to see their posts here.
//           </Text>
//         </View>
//       )}
//       {data.length > 0 && (
//         <FlatList
//         ref={ref}
//           data={data}
//           renderItem={({item, index}) => (
//             <Post
//               navigation={navigation}
//               post={item}
//               index={index}
//               Screen="Home"
//               handleHidePost={handleHidePost}
//               handleBlockPost={handleBlockPost}
//             />
//           )}
//           keyExtractor={(item, index) => index.toString()}
//         />
//       )}
//     </>
//   );
// });

// export default Relevant;

import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {useTheme} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from '../config';
import Post from './Post';

const Relevant = React.forwardRef(({navigation}, ref) => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const {colors} = useTheme();

  const PAGE_SIZE = 20; // Number of templates per page

  const getTemplates = async (currentOffset = 0) => {
    console.log(`Fetching relevant templates: offset ${currentOffset}`);
    setLoading(true);
    try {
      const userString = await AsyncStorage.getItem('user');
      const otherString = await AsyncStorage.getItem('token');

      if (userString && otherString) {
        const parsedUser = JSON.parse(userString);
        const response = await axios.get(
          `${config.production}/app/user/getrelevantpost`,
          {
            params: {
              userName: parsedUser.userName,
              userId: parsedUser.Id,
              limit: PAGE_SIZE,
              offset: currentOffset,
            },
          },
        );
        if (response.data.status === 200) {
          const newPosts = response.data.data;
          console.log(`Fetched ${newPosts.length} posts`);
          setData(prevData =>
            currentOffset === 0 ? newPosts : [...prevData, ...newPosts],
          );
          setHasMore(newPosts.length === PAGE_SIZE);
        } else {
          console.log('Facing error in fetching the posts');
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Error fetching relevant posts:', error);
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
    getTemplates(offset);
  }, [offset]);

  return (
    <>
      {data.length === 0 && !loading && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: colors.color_Logintext}}>
            Looks a little empty here! Follow creators to start seeing their
            awesome posts
          </Text>
        </View>
      )}
      {data.length > 0 && (
        <FlatList
          ref={ref}
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
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => loading && <ActivityIndicator />}
        />
      )}
    </>
  );
});

export default Relevant;
