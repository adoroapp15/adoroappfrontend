import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  BackHandler,
  Alert,
  Clipboard,
  Button,
  ScrollView,
} from 'react-native';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import useStore from '../store';
import Pinchable from 'react-native-pinchable';
import FastImage from 'react-native-fast-image';
import {Avatar, Card} from 'react-native-paper';
// import LinearGradient from 'react-native-linear-gradient';
// import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import Modal from 'react-native-modal';
import Video from 'react-native-video';
import {useIsFocused} from '@react-navigation/native';
import {Share} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {config} from '../config';
import CardTitle from '../assets/svg/CardTitle';
import AdoroLogos from '../assets/svg/AdoroLogos';
import Notifications from '../assets/svg/Notifications';
import FontFamily from '../common/components/FontFamily';
import Message from '../assets/svg/Message';
import HamBurger from '../assets/svg/HamBurger';
import DeleteIcon from '../assets/svg/DeletIcon';
import ReportSpam from '../assets/svg/ReportSpam';
import Unfollow from '../assets/svg/Unfollow';
import CopyLink from '../assets/svg/CopyLink';
import SharePost from '../assets/svg/SharePost';
import HeartIcon from '../assets/svg/HeartIcon';
import CommentIcon from '../assets/svg/CommentIcon';
import ShareIcon from '../assets/svg/ShareIcon';
import RedHeartIcon from '../assets/svg/RedHeartIcon';
import HideIcon from '../assets/svg/HideIcon';
import BlockIcon from '../assets/svg/BlockIcon';
import Orientation from 'react-native-orientation-locker';
import Player from './Player';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowWidth1 = Dimensions.get('screen').width;
const windowHeight1 = Dimensions.get('screen').height;
const desiredWidth = 0.2 * windowWidth;
const desiredHeight = 0.2 * windowHeight;

const Post = ({
  navigation,
  post,
  index,
  Screen,
  handleHidePost,
  handleBlockPost,
}) => {
  const [isPlaying, setIsPlaying] = React.useState({});
  const [follow, setFollow] = useState([]);
  const [likes, setlikes] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const {dark, toggleTheme} = useStore();
  const {colors} = useTheme();
  const [likecount, setLikecount] = useState(post.LikesCount);
  const [commentcount, setCommentcount] = useState(post.CommentCount);

  const togglePlayPause = postId => {
    setIsPlaying(prevIsPlaying => ({
      ...prevIsPlaying,
      [postId]: !prevIsPlaying[postId],
    }));
  };
  const isFocused = useIsFocused();
  const flatListRef = React.useRef(null);
  const [imageHeart, setImageHeart] = useState(false);
  const [videoHeart, setVideoHeart] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isliked, setIsliked] = useState(false);
  // const [load,setLoad]=

  const [videoDimensions, setVideoDimensions] = useState({
    width: windowWidth * 0.95,
    height: 300,
  });
  // State to manage loading state of the image
  const [loadingImage, setLoadingImage] = useState(true);

  // Image onLoad callback to set loading state to false when image is loaded
  const handleImageLoad = () => {
    setLoadingImage(false);
  };

  const [scrollToTop, setScrollToTop] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const videoRef = React.createRef();
  const [play, setPlay] = useState(false);
  const [showControl, setShowControl] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = () => {
    if (play) {
      setPlay(false);
      setShowControl(true);
      return;
    }
    setTimeout(() => setShowControl(false), 2000);
    setPlay(true);
  };
  const handleControls = () => {
    if (showControl) {
      setShowControl(false);
    } else {
      setShowControl(true);
    }
  };


  const handlePlay = () => {
    setTimeout(() => setShowControl(false), 500);
    setPlay(true);
  };


  const onLoadEnd = data => {
    setDuration(data.duration);
    setCurrentTime(data.currentTime);
  };

  const onProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const onSeek = data => {
    videoRef.current.seek(data.seekTime);
    setCurrentTime(data.seekTime);
  };

  const onEnd = () => {
    setPlay(false);
    videoRef.current.seek(0);
  };
  // setIsliked(userlike.some(like => like.postId === post.Id))
  const handleCopyToClipboard = () => {
    Clipboard.setString(
      `https://www.adoro.social/UserPost/${selectedPost.fileName}`,
    );
    Alert.alert('Clipboard copied');
  };
  const LeftContent = ({profile, mobileNo}) => (
    <View>
      <TouchableOpacity onPress={() => handlenavigation(mobileNo, profile)}>
        <Avatar.Image
          size={40}
          style={{}}
          source={
            profile
              ? {
                  uri: `https://www.adoro.social/UserProfilePic/${profile}`,
                }
              : require('../assets/Profile.png')
          }
        />
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    fetchUserData();
    getlike();
  }, [isliked]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userString = await AsyncStorage.getItem('user');
      const otherString = await AsyncStorage.getItem('token');

      if (userString && otherString) {
        const parsedUser = JSON.parse(userString, otherString);
        const response = await axios.get(
          `${config.production}/app/user/userdetails`,
          {params: {mobileNo: parsedUser.mobileNo}},
        );
        if (response.data.status === 200) {
          setUser(response.data.data);
          // const interest = response.data.data.Interest;
          // const res = await axios.get(
          //   `${config.production}/app/user/userinterest`,
          //   {params: {interest: interest}},
          // );
          // if (res.data.status === 200) {
          //   setPosts(res.data.posts);
          // } else {
          //   console.log('User Posts not Found');
          //   setPosts([]);
          // }
        } else {
          console.log('Profile Pic not Found');
          // setProfile(null);
        }
        const followres = await axios.get(
          `${config.production}/app/user/getusernamefollow`,
          {
            params: {userName: parsedUser.userName},
          },
        );

        // console.log('follow resssssss isssss', followres);
        if (followres.status == 200) {
          setFollow(followres.data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeDifference = postDateTime => {
    // Split the date-time string into date and time parts
    const [datePart, timePart] = postDateTime.split('_');
    // Split the date part into year, month, and day
    const [year, month, day] = datePart.split('-').map(Number);
    // Split the time part into hours, minutes, and seconds
    const [hoursPart, minutesPart, secondsPart] = timePart
      .split(':')
      .map(Number);
    // Create a Date object using the extracted date and time components
    const postDate = new Date(
      year,
      month - 1,
      day,
      hoursPart,
      minutesPart,
      secondsPart,
    );

    // Get current date and time in IST
    const currentDate = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
    const currentIST = new Date(currentDate.getTime() + istOffset);

    const differenceInSeconds = Math.floor((currentIST - postDate) / 1000);
    const days = Math.floor(differenceInSeconds / (24 * 3600));
    const remainingHours = Math.floor(
      (differenceInSeconds % (24 * 3600)) / 3600,
    );
    const remainingMinutes = Math.floor((differenceInSeconds % 3600) / 60);
    const remainingSeconds = differenceInSeconds % 60;
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (remainingHours > 0) {
      return `${remainingHours} hour${remainingHours > 1 ? 's' : ''} ago`;
    } else if (remainingMinutes > 0) {
      return `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''} ago`;
    } else {
      return `${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''} ago`;
    }
  };

  const getlike = async () => {
    const getlike = await axios.get(`${config.production}/app/user/getlikes`, {
      params: {postId: post.Id},
    });
    const userString = await AsyncStorage.getItem('user');
    const parsedUser = JSON.parse(userString);
 
    if (getlike.status === 200) {
      setlikes(getlike.data.likes);
      const Liked = getlike.data.likes.some(
        like => like.userName == parsedUser.userName,
      );
      setIsliked(Liked);
    } else {
      console.log('Errow while fetching the likes');
    }
  };
  const toggleDropdown = post => {
    if (Screen == 'Home') {
      setDropdownVisible(!dropdownVisible);
      setSelectedPost(post);
    }
  };

  const handleunfollow = async () => {
    const obj = {
      userName: user.userName,
      Id_name: selectedPost.userName,
    };
    console.log(
      'selected Post',
      selectedPost,
      `${config.production}/app/user/deletefollow`,
    );

    const deleted = await axios.post(
      `${config.production}/app/user/deletefollow`,
      obj,
    );
    console.log('deleted follow is ', deleted);
    setDropdownVisible(false);
  };

  const handleDelete = async () => {
    try {
      console.log('sushma', selectedPost.Id);

      if (selectedPost.mobileNo == user.mobileNo) {
        const deleted = await axios.delete(
          `${config.production}/app/user/deletepost`,
          {
            params: {Id: selectedPost.Id},
          },
        );
        // Update the posts state by removing the deleted post
        if (deleted.data.status === 200) {
          Alert.alert('Deleted Successfully');
          setPosts(prevPosts =>
            prevPosts.filter(post => post.Id !== selectedPost.Id),
          );
        } else {
          Alert.alert('Unable to delete the post');
        }
        // Close the modal
        setModalVisible(false);
      } else {
        Alert.alert('Not Authorized');
        setModalVisible(false);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `https://www.adoro.social/UserPost/${selectedPost.fileName}`,
      });
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
    setDropdownVisible(false);
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
  const onEndReached = () => {
    if (hasMore && !loading) {
      // setLoading(true);
      fetchUserData(page + 1);
      setPage(page + 1);
    }
  };
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  // const aspectRatio = 0;
  // const imageHeight = 0;

  // const getImageSize = url => {
  //   return new Promise((resolve, reject) => {
  //     Image.getSize(
  //       url,
  //       (width, height) => {
  //         const aspectRatio = width / height;
  //         const imageHeight = windowWidth1 / aspectRatio;
  //         setDimensions({windowWidth1, imageHeight});
  //         console.log('Image dimensions:', width, height, url);
  //         console.log('Prateek', dimensions.width, dimensions.imageHeight, url);
  //         console.log('prone', windowWidth1, imageHeight, url);
  //         resolve({windowWidth1, imageHeight});
  //       },
  //       error => {
  //         console.error('Error getting image size:', error);
  //         reject(error);
  //       },
  //     );
  //   });
  // };
  const getImageSize = url => {
    try {
      Image.getSize(url, (width, height) => {
        const aspectRatio = width / height;
        const imageHeight = windowWidth1 / aspectRatio;
        setDimensions({width: windowWidth1, height: imageHeight});
        // console.log('Image dimensions:', width, height, url);
      });
    } catch (error) {
      console.error('Error getting image size:', error);
    }
    // return new Promise((resolve, reject) => {
    //   Image.getSize(
    //     url,
    //     (width, height) => {
    //       const aspectRatio = width / height;
    //       const imageHeight = windowWidth1 / aspectRatio;
    //       setDimensions({width: windowWidth1, height: imageHeight});
    //       console.log('Image dimensions:', width, height, url);
    //       resolve({width: windowWidth1, height: imageHeight});
    //     },
    //     error => {
    //       console.error('Error getting image size:', error);
    //       reject(error);
    //     },
    //   );
    // });
  };
  useEffect(() => {
    getImageSize(`https://www.adoro.social/UserPost/${post.fileName}`);
    // console.log('Updated dimensions:', dimensions.width, dimensions.height);
  }, [dimensions]);

  const handlenavigation = async (mobileNo, profile) => {
    console.log('user and mobile is', user.mobileNo, mobileNo);
    if (user.mobileNo == mobileNo) {
      navigation.navigate('UserProfile');
    } else {
      navigation.navigate('Profile', {
        mobileNo,
        profile,
      });
    }
  };

  const handleLike = async () => {
    console.log('handle like issss', isliked);
    console.log('is likeddddd issss', isliked);
    if (isliked) {
      console.log('hittinggg hte eeeeee unlike');
      const unlikeres = await axios.delete(
        `${config.production}/app/user/unlike`,
        {
          params: {
            postId: post.Id,
            userId: user.Id,
          },
        },
      );
      console.log('unlikee res iss', unlikeres);
      if (unlikeres.status == 200) {
        console.log('unlike');
        setIsliked(false);
        setLikecount(prevCount => prevCount - 1); // <-- Corrected line
      }
    } else {
      console.log('hitttingggggggg the likeeeeee button    ');
      const unlikeres = await axios.post(
        `${config.production}/app/user/hitlike`,
        {
          postId: post.Id,
          userId: user.Id,
          userName: user.userName,
        },
      );
      if (unlikeres.status == 200) {
        console.log('like');
        setIsliked(true); // <-- Corrected line
        setLikecount(prevCount => prevCount + 1); // <-- Corrected line
      }
    }
  };

  // const handleblock = async () => {

  //   const blockres = await axios.post(`${config.production}/app/user/block`, {
  //     BlockedUserName: post.userName,
  //     UserId: user.Id,
  //   });

  //   if (blockres.status == 200) {
  //     console.log('Block Succesffully');

  //   } else {
  //     console.log('Facing Eroor ');
  //   }
  //   setDropdownVisible(false);
  // };

  const handleblock = useCallback(async () => {
    const blockres = await axios.post(`${config.production}/app/user/block`, {
      BlockedUserName: post.userName,
      UserId: user.Id,
    });
 console.log('sushma', UserId);
    if (blockres.status == 200) {
      console.log('Block Succesffully');
      console.log('sushma', UserId);
      handleBlockPost(post.userName);
    } else {
      console.log('Facing Eroor ');
    }
    setDropdownVisible(false);
  }, []);

  const handlehide = async () => {
    const hideres = await axios.post(`${config.production}/app/user/hide`, {
      PostId: post.Id,
      UserId: user.Id,
    });

    if (hideres.status == 200) {
      console.log('Hide  Succesffully');
      handleHidePost(post.Id);
    } else {
      console.log('Facing Eroor ');
    }
    setDropdownVisible(false);
  };

  // const handlehide = useCallback(async () => {
  //   console.log('handle hide ',user.Id)
  //   const hideres = await axios.post(`${config.production}/app/user/hide`, {
  //     PostId: post.Id,
  //     UserId: user.Id,
  //   });

  //   if (hideres.status == 200) {
  //     console.log('Hide  Succesffully');
  //   } else {
  //     console.log('Facing Eroor ');
  //   }
  //   setDropdownVisible(false);
  // }, []);

  // Function to handle like button click
  // const handleLike = () => {
  //   const updatedLikesCount = likesCount + 1;
  //   setLikesCount(updatedLikesCount);
  //   // Here, you may want to update the backend with the new like count as well.
  //   // Example: send a request to the server to update the like count for this post.
  // };

  // console.log('userrrrrrrrrr isssss',user)

  return (
    <>
      <Card
        elevation={0}
        key={index}
        style={{
          marginTop: 5,
          backgroundColor: colors.color_PostBgColor,
          borderRadius: 0,
        }}>
        <Card.Title
          left={props => (
            <View style={{flexDirection: 'row', flex: 1, gap: 10}}>
              <LeftContent
                {...props}
                profile={post.profile}
                mobileNo={post.mobileNo}
              />
              <View
                style={{
                  flexDirection: 'column',
                  width: 300,
                }}>
                <TouchableOpacity
                  onPress={() => handlenavigation(post.mobileNo, post.profile)}>
                  <Text
                    style={{
                      fontWeight: '200',
                      fontFamily: FontFamily.semibold,
                      fontSize: 14,
                      color: colors.color_TextNormal,
                      // marginRight: 10,
                    }}>
                    {post.fullName ? post.fullName : ''}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: FontFamily.semibold,
                    color: colors.color_TextNormal,
                    fontSize: 10,
                  }}>
                  {getTimeDifference(post.date)}
                </Text>
              </View>
            </View>
          )}
          leftStyle={{alignSelf: 'center', bottom: 2}}
          // title={
          //   <View>
          //     <TouchableOpacity
          //       onPress={() =>
          //         navigation.navigate('Profile', {
          //           mobileNo: post.mobileNo,
          //           profile: post.fileName,
          //         })
          //       }>
          //       <Text
          //         style={{
          //           fontWeight: '200',
          //           fontFamily: FontFamily.semibold,
          //           fontSize: 14,
          //           color: 'black',
          //           // marginRight: 10,
          //         }}>
          //         {post.fullName ? post.fullName : ''}
          //       </Text>
          //     </TouchableOpacity>
          //     <Text style={{fontFamily: FontFamily.semibold}}>
          //       25 min ago
          //     </Text>
          //   </View>
          // }
          // titleStyle={{
          //   textAlignVertical: 'center',
          //   flexDirection: 'column',
          // }}
          right={() => (
            <TouchableOpacity
              onPress={() => toggleDropdown(post)}
              style={{marginRight: 12}}>
              <CardTitle color={colors.arrow} />
            </TouchableOpacity>
          )}
        />
        {/* Rest of your card content */}
        <Card.Content>
          <View style={{flexDirection: 'row'}}>
            <Text
              numberOfLines={expanded ? undefined : 2}
              style={{
                flex: 1,
                marginRight: 10,
                fontFamily: FontFamily.semibold,
                color: colors.color_TextNormal,
              }}>
              {post.content}
            </Text>
            {!expanded && post.content.length > 50 && (
              <TouchableOpacity onPress={() => setExpanded(true)}>
                <Text>more</Text>
              </TouchableOpacity>
            )}
          </View>
        </Card.Content>
        {
          post.type === 'image' ? (
            <Pinchable style={styles.pinchable}>
              {/* <Image
                source={{
                  uri: `https://www.adoro.social/UserPost/${post.fileName}`,
                }}
                // resizeMode="contain"
                // borderRadius={20}
                onLoad={() =>
                  getImageSize(
                    `https://www.adoro.social/UserPost/${post.fileName}`,
                  )
                }
                style={{
                  width: dimensions.width,
                  height: dimensions.height,
                  marginTop: 10,
                  // top: 10,
                  alignSelf: 'center',
                  backgroundColor: 'red',
                  // borderRadius: 5,
                  //borderWidth: 0,
                  // borderColor: 'red',
                  resizeMode: 'contain', // Use 'cover' to make the image cover the entire container
                  // width: '100%', // Set width to 100%
                }}
              /> */}
              <FastImage
                style={{
                  width: dimensions.width || windowWidth,
                  height: dimensions.height || 300,
                  marginTop: 10,
                  // top: 10,
                  alignSelf: 'center',
                  // backgroundColor: 'red',
                  // borderRadius: 5,
                  //borderWidth: 0,
                  // borderColor: 'red',
                  // resizeMode: 'contain', // Use 'cover' to make the image cover the entire container
                  // width: '100%', // Set width to 100%
                }}
                source={{
                  uri: `https://www.adoro.social/UserPost/${post.fileName}`,
                  priority: FastImage.priority.high,
                }}
                // resizeMode={FastImage.resizeMode.contain}
              />
            </Pinchable>
          ) : post.type === 'video' ? (
            // Display video if content type is 'video'
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Video
                ref={videoRef}

                  source={{
                    uri: `https://www.adoro.social/UserPost/${post.fileName}`,
                    // uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
                  }}
                  style={{
                    // height: videoDimensions[post.Id]?.height || 200,
                    height: 265,
                    marginBottom: 20,
                    resizeMode: 'contain',
                    width: '70%', // Set width to 100% to occupy the entire card width
                  }}
                  controls={false}
                  resizeMode={'contain'}
                  // onLoad={onLoadEnd}
                  // onProgress={onProgress}
                  // onEnd={onEnd}
                  // paused={!play}
                  // muted={true}
      
                  // paused={!isPlaying[post.Id]}
                  onLoad={event => handleVideoLoad(event, post.Id)}
                />
              </View>
              {/* {showControl && (
            <View style={styles.controlOverlay}>
              <Player
                onPlay={handlePlay}
                onPause={handlePlayPause}
                playing={play}
              />
            </View>
          )} */}

              {/* <TouchableOpacity
                style={{
                  // top: 140,
                  width: desiredWidth,
                  height: desiredHeight,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginLeft: -35, // Adjust based on the width of your button
                  marginTop: -25,
                }}
                onPress={() => togglePlayPause(post.Id)}>
                {isPlaying[post.Id] ? (
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
              </TouchableOpacity> */}
            </>
          ) : null /* Handle other content types as needed */
        }
        <Card.Actions>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'green,',
              width: '100%',
            }}>
            <View style={{gap: 10, flexDirection: 'row', flex: 1}}>
              {post.type === 'image' ? (
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      // const updatedHearts = {...imageHeart};
                      // updatedHearts[post.Id] = !updatedHearts[post.Id];
                      // setImageHeart(updatedHearts);
                      handleLike();
                    }}>
                    {/* {imageHeart[post.Id] ? (
                        <RedHeartIcon />
                      ) : (
                        <HeartIcon color={colors.arrow} />
                      )} */}
                    {isliked ? (
                      <RedHeartIcon />
                    ) : (
                      <HeartIcon color={colors.arrow} />
                    )}
                  </TouchableOpacity>
                  <Text style={{marginLeft: 5, color: colors.color_TextNormal}}>
                    {likecount}
                  </Text>
                </View>
              ) : post.type === 'video' ? (
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      // const updatedHearts = {...imageHeart};
                      // updatedHearts[post.Id] = !updatedHearts[post.Id];
                      // setImageHeart(updatedHearts);
                      handleLike();
                    }}>
                    {/* {imageHeart[post.Id] ? (
                        <RedHeartIcon />
                      ) : (
                        <HeartIcon color={colors.arrow} />
                      )} */}
                    {isliked ? (
                      <RedHeartIcon />
                    ) : (
                      <HeartIcon color={colors.arrow} />
                    )}
                  </TouchableOpacity>
                  <Text style={{marginLeft: 5, color: colors.color_TextNormal}}>
                    {likecount}
                  </Text>
                </View>
              ) : null}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Comments', {
                    Id: post.Id,
                    user: user.userName,
                    profile: user.ProfileDp,
                  })
                }>
                <CommentIcon color={colors.arrow} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleShare(selectedPost.content)}>
                <ShareIcon color={colors.arrow} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Comments', {
                  Id: post.Id,
                  user: user.userName,
                  profile: user.ProfileDp,
                })
              }>
              <Text
                style={{
                  color: colors.color_TextNormal,
                  marginRight: 8,
                  fontFamily: FontFamily.semibold,
                }}>
                {commentcount} comments
              </Text>
            </TouchableOpacity>
          </View>
        </Card.Actions>
        {/* <View
          style={{
            flexDirection: 'row',
            // alignSelf: 'center',
            gap: 10,
            margin: 10,
          }}>
          <View style={{flexDirection: 'row', position: 'relative'}}>
            <Image
              source={require('../assets/User1.jpeg')}
              style={{
                zIndex: 1,
                height: 24,
                width: 24,
                borderRadius: 99,
                borderWidth: 1,
                borderColor: '#F1F1F1',
              }} // Adjust margin as needed
            />
            <Image
              source={require('../assets/User2.png')}
              style={{marginLeft: -8, zIndex: 0}} // Adjust margin as needed
            />
            <Image
              source={require('../assets/User3.png')}
              style={{marginLeft: -8, zIndex: -1}} // Adjust margin as needed
            />
          </View>
          <Text
            style={{
              color: colors.color_TextNormal,
              fontFamily: FontFamily.semibold,
            }}>
            Liked by and 1,10 others
          </Text>
        </View> */}
        {/* <View
            style={{
              marginTop: 10,
              marginBottom: -40,
              height: '0.3%',
              width: '90%',
              alignSelf: 'center',
              backgroundColor: '#F1F1F1',
            }}
          /> */}
      </Card>
      <Modal
        style={{width: '100%', marginLeft: 0, marginBottom: 0}}
        isVisible={dropdownVisible}
        onBackdropPress={() => setDropdownVisible(false)}>
        <View
          style={{
            backgroundColor: colors.color_BottomSheet,
            padding: 15,
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            width: '100%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            // borderRadius: 10,
            flexDirection: 'column',
            gap: 20,
          }}>
          <View
            style={{
              height: '1%',
              width: '30%',
              alignSelf: 'center',
              backgroundColor: colors.arrow,
              borderRadius: 10,
            }}
          />
          <TouchableOpacity onPress={() => handleShare(selectedPost.content)}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <SharePost color={colors.arrow} />
              <Text
                style={{
                  color: colors.color_TextNormal,
                  fontFamily: FontFamily.semibold,
                }}>
                Share
              </Text>
            </View>
          </TouchableOpacity>
          {selectedPost.mobileNo === user.mobileNo && (
            <TouchableOpacity onPress={handleDelete}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <DeleteIcon color={colors.arrow} />
                <Text
                  style={{
                    color: colors.color_TextNormal,
                    top: 5,
                    fontFamily: FontFamily.semibold,
                  }}>
                  Delete
                </Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleCopyToClipboard}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <CopyLink color={colors.arrow} />
              <Text
                style={{
                  color: colors.color_TextNormal,
                  top: 5,
                  fontFamily: FontFamily.semibold,
                }}>
                Copy link
              </Text>
            </View>
          </TouchableOpacity>
          {follow &&
            follow.length > 0 &&
            selectedPost.mobileNo != user.mobileNo &&
            follow.some(user => user.userName === selectedPost.userName) && (
              <TouchableOpacity onPress={handleunfollow}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <Unfollow color={colors.arrow} />
                  <Text
                    style={{
                      color: colors.color_TextNormal,
                      fontFamily: FontFamily.semibold,
                    }}>
                    Unfollow
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          <TouchableOpacity onPress={handlehide}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <HideIcon color={colors.arrow} />
              <Text
                style={{
                  color: colors.color_TextNormal,
                  fontFamily: FontFamily.semibold,
                }}>
                Hide
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleblock}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <BlockIcon color={colors.arrow} />
              <Text
                style={{
                  color: colors.color_TextNormal,
                  fontFamily: FontFamily.semibold,
                }}>
                Block
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{flexDirection: 'row', gap: 10}}>
              <ReportSpam color={colors.arrow} />
              <Text
                style={{
                  color: colors.color_TextNormal,
                  fontFamily: FontFamily.semibold,
                }}>
                Report Post
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default Post;

const styles = StyleSheet.create({
  Title: {
    color: '#07142E',
    fontSize: 20,
    fontFamily: FontFamily.bold,
    // fontWeight: '600',
    textTransform: 'capitalize',
    wordWrap: 'break-word',
  },
  // cardBox: {
  //   marginTop: 5,
  //   backgroundColor: colors.color_PostBgColor,
  //   borderRadius: 0,
  // },
  know: {
    marginTop: 60,
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 15,
    width: '140%',
    alignSelf: 'center',
    marginRight: 110,
  },
  // container: {
  //   flex: 1,
  //   paddingTop: 40,
  // },
  button: {
    padding: 10,
    justifyContent: 'center',
    borderRadius: 15,
    marginRight: 10,
  },

  buttonText: {
    color: 'gray',
    fontFamily: FontFamily.semibold,
  },
  linearGradient: {
    // flex: 1,
    borderRadius: 8,
    // padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinchable: {
    flex: 1,
    // margin: 5,
  },
  controlOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000c4',
    justifyContent: 'space-between',
  },
});
