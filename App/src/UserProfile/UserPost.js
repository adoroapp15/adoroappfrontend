import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import {Avatar, Button, Card} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import FontFamily from '../common/components/FontFamily';
import LinearGradient from 'react-native-linear-gradient';
import React, {useState} from 'react';
import Post from '../HomePage/Post';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import BackArrow from '../assets/svg/BackArrow';
const avtarImage = require('../assets/User.png');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const desiredWidth = 0.2 * windowWidth;
const desiredHeight = 0.2 * windowHeight;

const UserPost = ({route}) => {
  const {dark, toggleTheme} = useStore();
  const {colors} = useTheme();
  const {posts} = route.params;
  const [isPlaying, setIsPlaying] = React.useState({});
  const [imageHeart, setImageHeart] = useState(false);
  const [videoHeart, setVideoHeart] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(1); // Initial page number
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const togglePlayPause = postId => {
    setIsPlaying(prevIsPlaying => ({
      ...prevIsPlaying,
      [postId]: !prevIsPlaying[postId],
    }));
  };
  const [videoDimensions, setVideoDimensions] = useState({
    width: windowWidth * 0.95,
    height: 300,
  });
  const onEndReached = () => {
    if (hasMore && !loading) {
      // setLoading(true);
      // posts(page + 1);
      setPage(page + 1);
    }
  };
  const toggleModal = post => {
    setSelectedPost(post);
    setModalVisible(!isModalVisible);
  };
  const handleVideoLoad = (event, postId) => {
    const {naturalSize} = event;
    setVideoDimensions(prevDimensions => ({
      ...prevDimensions,
      [postId]: {
        width: windowWidth * 0.95,
        height: (windowWidth * 0.95 * naturalSize.height) / naturalSize.width,
      },
    }));
  }; // ... (unchanged code)
  const LeftContent = ({profile, mobileNo}) => (
    <View>
      <TouchableOpacity>
        <Avatar.Image
          size={50}
          style={{right: 10}}
          source={{uri: `https://www.adoro.social/UserProfilePic/${profile}`}}
        />
      </TouchableOpacity>
    </View>
  );
  // const flatlistRef = React.useRef();
  // const scrollToIndex = () => {
  //   console.log('scroll to index called !');
  //   let index = 3;
  //   flatlistRef.current.scrollToIndex({animated: true, index: index});
  // };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     scrollToIndex();
  //   }, []),
  // );
  const flatListRef = React.useRef(null);
  const navigation = useNavigation();

  React.useEffect(() => {
    // Access the params passed during navigation
    // const indexToScroll = navigation.getParam('indexToScroll', 0);
    // Scroll the FlatList to the desired index
    if (route.params.indexToScroll !== null && flatListRef.current) {
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: route.params.indexToScroll,
      });
    }
  }, [route.params.indexToScroll]);

  const getItemLayout = (data, index) => ({
    length: 50,
    offset: 450 * index,
    index,
  });

  return (
    <>
      {/* <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.color_TabBarColor,
          zIndex: 1,
          height: 56,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => navigation.navigate('User profile')}>
          <BackArrow
           color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: 20,
          }}>
          All post
        </Text>
      </View> */}
      <View style={{backgroundColor: colors.color_PageColor}}>
        <FlatList
          ref={flatListRef}
          data={posts.slice().reverse()}
          keyExtractor={post => post.Id.toString()}
          renderItem={({item, index}) => (
            <Post
              navigation={navigation}
              post={item}
              index={index}
              Screen={'User Profile'}
            />
            // <Card key={index} style={styles.cardBox}>
            //   <Card.Title
            //     title={
            //       <TouchableOpacity
            //         onPress={() => {
            //           navigation.navigate('Profile', {
            //             mobileNo: post.mobileNo,
            //             profile: post.fileName,
            //           });
            //         }}>
            //         <Text
            //           style={{
            //             fontWeight: '500',
            //             fontSize: 18,
            //             color: 'black',
            //             right: 10,
            //           }}>
            //           {post.fullName ? post.fullName : ''}
            //         </Text>
            //       </TouchableOpacity>
            //     }
            //     // subtitle={post.date}
            //     left={props => (
            //       <LeftContent
            //         {...props}
            //         profile={post.profile}
            //         mobileNo={post.mobileNo}
            //       />
            //     )}
            //     right={() => (
            //       <TouchableOpacity
            //         style={{height: 50}}
            //         onPress={() => toggleModal(post)}>
            //         <Image
            //           style={{top: 10, right: 10}}
            //           source={require('../assets/cardtitle.png')}
            //         />
            //       </TouchableOpacity>
            //     )}
            //     rightStyle={{right: 8}}
            //   />
            //   <Card.Content>
            //     <Text variant="titleLarge" style={{color: 'black'}}>
            //       {post.content}
            //     </Text>
            //   </Card.Content>
            //   {
            //     post.type === 'image' ? (
            //       <Image
            //         source={{
            //           uri: `https://www.adoro.social/UserPost/${post.fileName}`,
            //         }}
            //         style={{
            //           height: 350, // Set height dynamically
            //           // margin: 10,
            //           resizeMode: 'cover', // Use 'cover' to make the image cover the entire container
            //           width: windowWidth * 0.99, // Set width to 100%
            //         }}
            //       />
            //     ) : post.type === 'video' ? (
            //       // Display video if content type is 'video'
            //       <>
            //         <View
            //           style={{
            //             flex: 1,
            //             justifyContent: 'center',
            //             alignItems: 'center',
            //           }}>
            //           <Video
            //             source={{
            //               uri: `https://www.adoro.social/UserPost/${post.fileName}`,
            //             }}
            //             style={{
            //               height: videoDimensions[post.Id]?.height || 200,
            //               resizeMode: 'contain',
            //               width: '70%', // Set width to 100% to occupy the entire card width
            //             }}
            //             paused={!isPlaying[post.Id]}
            //             onLoad={event => handleVideoLoad(event, post.Id)}
            //           />
            //         </View>
            //         <TouchableOpacity
            //           style={{
            //             // top: 140,
            //             width: desiredWidth,
            //             height: desiredHeight,
            //             flex: 1,
            //             justifyContent: 'center',
            //             alignItems: 'center',
            //             position: 'absolute',
            //             top: '50%',
            //             left: '50%',
            //             marginLeft: -35, // Adjust based on the width of your button
            //             marginTop: -25,
            //           }}
            //           onPress={() => togglePlayPause(post.Id)}>
            //           {isPlaying[post.Id] ? (
            //             <Image
            //               source={require('../assets/pause.png')}
            //               style={{
            //                 width: 50,
            //                 height: 50,
            //                 backgroundColor: '#fff',
            //                 borderRadius: 25,
            //               }}
            //             />
            //           ) : (
            //             <Image
            //               source={require('../assets/play.png')}
            //               style={{
            //                 width: 50,
            //                 height: 50,
            //                 backgroundColor: '#fff',
            //                 borderRadius: 25,
            //               }}
            //             />
            //           )}
            //         </TouchableOpacity>
            //       </>
            //     ) : null /* Handle other content types as needed */
            //   }
            //   <Card.Actions>
            //     <View style={{flexDirection: 'row', gap: 5}}>
            //       <View style={{gap: 10, right: 180, flexDirection: 'row'}}>
            //         {
            //           post.type === 'image' ? (
            //             <TouchableOpacity
            //               onPress={() => {
            //                 const updatedHearts = {...imageHeart};
            //                 updatedHearts[post.Id] = !updatedHearts[post.Id];
            //                 setImageHeart(updatedHearts);
            //               }}>
            //               {imageHeart[post.Id] ? (
            //                 <Image
            //                   style={{
            //                     height: 18,
            //                     width: 18,
            //                     borderColor: '#6F7F92',
            //                   }}
            //                   source={require('../assets/Heart1.png')}
            //                 />
            //               ) : (
            //                 <Image
            //                   style={{height: 18, width: 18, color: '#6F7F92'}}
            //                   source={require('../assets/Heart.png')}
            //                 />
            //               )}
            //             </TouchableOpacity>
            //           ) : post.type === 'video' ? (
            //             <TouchableOpacity
            //               onPress={() => {
            //                 const updatedHearts = {...videoHeart};
            //                 updatedHearts[post.Id] = !updatedHearts[post.Id];
            //                 setVideoHeart(updatedHearts);
            //               }}>
            //               {videoHeart[post.Id] ? (
            //                 <Image
            //                   style={{height: 18, width: 18}}
            //                   source={require('../assets/Heart1.png')}
            //                 />
            //               ) : (
            //                 <Image
            //                   style={{height: 18, width: 18, color: '#6F7F92'}}
            //                   source={require('../assets/Heart.png')}
            //                 />
            //               )}
            //             </TouchableOpacity>
            //           ) : null /* Handle other content types as needed */
            //         }
            //         <TouchableOpacity
            //           onPress={() =>
            //             navigation.navigate('Comments', {
            //               Id: post.Id,
            //               user: user.userName,
            //               profile: user.ProfileDp,
            //             })
            //           }>
            //           <Image
            //             style={{
            //               height: 20,
            //               width: 20,
            //               bottom: 2,
            //               color: '#6F7F92',
            //             }}
            //             source={require('../assets/Chat.png')}
            //           />
            //         </TouchableOpacity>
            //         <TouchableOpacity onPress={() => navigation.navigate('Send')}>
            //           <Image
            //             style={{
            //               height: 20,
            //               width: 20,
            //               bottom: 2,
            //               right: 2,
            //               color: '#6F7F92',
            //             }}
            //             source={require('../assets/Send.png')}
            //           />
            //         </TouchableOpacity>
            //       </View>
            //       <Text style={{color: '#6F7F92'}}>
            //         {post.comments ? post.comments.length : 0} comments
            //       </Text>
            //     </View>
            //   </Card.Actions>
            // </Card>
          )}
          ListEmptyComponent={<Text />}
          // onRefresh={handleRefresh}
          refreshing={loading}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1} // Adjust the threshold as needed
          ListFooterComponent={() =>
            loading && (
              <View style={{padding: 10}}>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            )
          }
          getItemLayout={getItemLayout}
        />
      </View>
    </>
  );
};

export default UserPost;

const styles = StyleSheet.create({
  Title: {
    color: '#07142E',
    fontSize: 20,
    fontFamily: FontFamily.bold,
    // fontWeight: '600',
    textTransform: 'capitalize',
    wordWrap: 'break-word',
  },
  cardBox: {
    margin: 1,
    backgroundColor: 'white',
  },
  know: {
    marginTop: 60,
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 15,
    width: '140%',
    alignSelf: 'center',
    marginRight: 110,
  },
});
