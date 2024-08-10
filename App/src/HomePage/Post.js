// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   FlatList,
//   ActivityIndicator,
//   BackHandler,
//   Alert,
//   Clipboard,
//   Button,
//   ScrollView,
// } from 'react-native';
// import {NavigationContainer, useTheme} from '@react-navigation/native';
// import useStore from '../store';
// import Pinchable from 'react-native-pinchable';
// import FastImage from 'react-native-fast-image';
// import {Avatar, Card} from 'react-native-paper';
// import {useCallback} from 'react';
// import Modal from 'react-native-modal';
// import Video from 'react-native-video';
// import {useIsFocused} from '@react-navigation/native';
// import {Share} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import {config} from '../config';
// import CardTitle from '../assets/svg/CardTitle';
// import AdoroLogos from '../assets/svg/AdoroLogos';
// import Notifications from '../assets/svg/Notifications';
// import FontFamily from '../common/components/FontFamily';
// import Message from '../assets/svg/Message';
// import HamBurger from '../assets/svg/HamBurger';
// import DeleteIcon from '../assets/svg/DeletIcon';
// import ReportSpam from '../assets/svg/ReportSpam';
// import Unfollow from '../assets/svg/Unfollow';
// import CopyLink from '../assets/svg/CopyLink';
// import SharePost from '../assets/svg/SharePost';
// import HeartIcon from '../assets/svg/HeartIcon';
// import CommentIcon from '../assets/svg/CommentIcon';
// import ShareIcon from '../assets/svg/ShareIcon';
// import RedHeartIcon from '../assets/svg/RedHeartIcon';
// import HideIcon from '../assets/svg/HideIcon';
// import BlockIcon from '../assets/svg/BlockIcon';
// import Orientation from 'react-native-orientation-locker';
// import Player from './Player';
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// const windowWidth1 = Dimensions.get('screen').width;
// const windowHeight1 = Dimensions.get('screen').height;
// const desiredWidth = 0.2 * windowWidth;
// const desiredHeight = 0.2 * windowHeight;

// const Post = ({
//   navigation,
//   post,
//   index,
//   Screen,
//   handleHidePost,
//   handleBlockPost,
//   profile,
// }) => {
//   const [isPlaying, setIsPlaying] = React.useState({});
//   const [follow, setFollow] = useState([]);
//   const [likes, setlikes] = useState([]);
//   const [expanded, setExpanded] = useState(false);
//   const {dark, toggleTheme} = useStore();
//   const {colors} = useTheme();
//   const [likecount, setLikecount] = useState(post.LikesCount);
//   const [commentcount, setCommentcount] = useState(post.CommentCount);

//   const togglePlayPause = postId => {
//     setIsPlaying(prevIsPlaying => ({
//       ...prevIsPlaying,
//       [postId]: !prevIsPlaying[postId],
//     }));
//   };
//   const isFocused = useIsFocused();
//   const flatListRef = React.useRef(null);
//   const [imageHeart, setImageHeart] = useState(false);
//   const [videoHeart, setVideoHeart] = useState(false);
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [selectedPost, setSelectedPost] = useState({});
//   const [posts, setPosts] = useState([]);
//   const [user, setUser] = useState({});
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [isliked, setIsliked] = useState(false);
//   // const [load,setLoad]=

//   const [videoDimensions, setVideoDimensions] = useState({
//     width: windowWidth * 0.95,
//     height: 300,
//   });
//   // State to manage loading state of the image
//   const [loadingImage, setLoadingImage] = useState(true);

//   // Image onLoad callback to set loading state to false when image is loaded
//   const handleImageLoad = () => {
//     setLoadingImage(false);
//   };

//   const [scrollToTop, setScrollToTop] = useState(false);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const videoRef = React.createRef();
//   const [play, setPlay] = useState(false);
//   const [showControl, setShowControl] = useState(true);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   const handlePlayPause = () => {
//     if (play) {
//       setPlay(false);
//       setShowControl(true);
//       return;
//     }
//     setTimeout(() => setShowControl(false), 2000);
//     setPlay(true);
//   };
//   const handleControls = () => {
//     if (showControl) {
//       setShowControl(false);
//     } else {
//       setShowControl(true);
//     }
//   };

//   const handlePlay = () => {
//     setTimeout(() => setShowControl(false), 500);
//     setPlay(true);
//   };

//   const onLoadEnd = data => {
//     setDuration(data.duration);
//     setCurrentTime(data.currentTime);
//   };

//   const onProgress = data => {
//     setCurrentTime(data.currentTime);
//   };

//   const onSeek = data => {
//     videoRef.current.seek(data.seekTime);
//     setCurrentTime(data.seekTime);
//   };

//   const onEnd = () => {
//     setPlay(false);
//     videoRef.current.seek(0);
//   };
//   // setIsliked(userlike.some(like => like.postId === post.Id))
//   const handleCopyToClipboard = () => {
//     Clipboard.setString(
//       `https://www.adoro.social/UserPost/${selectedPost.fileName}`,
//     );
//     Alert.alert('Clipboard copied');
//   };
//   const LeftContent = ({profile, mobileNo}) => (
//     <Avatar.Image
//       size={40}
//       source={
//         profile
//           ? {
//               uri: `https://www.adoro.social/UserProfilePic/${profile}`,
//             }
//           : require('../assets/Profile.png')
//       }
//     />
//   );

//   useEffect(() => {
//     fetchUserData();
//     getlike();
//   }, [isliked]);

//   const fetchUserData = async () => {
//     try {
//       setLoading(true);
//       const userString = await AsyncStorage.getItem('user');
//       const otherString = await AsyncStorage.getItem('token');

//       if (userString && otherString) {
//         const parsedUser = JSON.parse(userString, otherString);
//         const response = await axios.get(
//           `${config.production}/app/user/userdetails`,
//           {params: {mobileNo: parsedUser.mobileNo}},
//         );
//         if (response.data.status === 200) {
//           setUser(response.data.data);
//         } else {
//           console.log('Profile Pic not Found');
//           // setProfile(null);
//         }
//         const followres = await axios.get(
//           `${config.production}/app/user/getusernamefollow`,
//           {
//             params: {userName: parsedUser.userName},
//           },
//         );

//         if (followres.status == 200) {
//           setFollow(followres.data.data);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getTimeDifference = postDateTime => {
//     // Split the date-time string into date and time parts
//     const [datePart, timePart] = postDateTime.split('_');
//     // Split the date part into year, month, and day
//     const [year, month, day] = datePart.split('-').map(Number);
//     // Split the time part into hours, minutes, and seconds
//     const [hoursPart, minutesPart, secondsPart] = timePart
//       .split(':')
//       .map(Number);
//     // Create a Date object using the extracted date and time components
//     const postDate = new Date(
//       year,
//       month - 1,
//       day,
//       hoursPart,
//       minutesPart,
//       secondsPart,
//     );

//     // Get current date and time in IST
//     const currentDate = new Date();
//     const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
//     const currentIST = new Date(currentDate.getTime() + istOffset);

//     const differenceInSeconds = Math.floor((currentIST - postDate) / 1000);
//     const days = Math.floor(differenceInSeconds / (24 * 3600));
//     const remainingHours = Math.floor(
//       (differenceInSeconds % (24 * 3600)) / 3600,
//     );
//     const remainingMinutes = Math.floor((differenceInSeconds % 3600) / 60);
//     const remainingSeconds = differenceInSeconds % 60;
//     if (days > 0) {
//       return `${days} day${days > 1 ? 's' : ''} ago`;
//     } else if (remainingHours > 0) {
//       return `${remainingHours} hour${remainingHours > 1 ? 's' : ''} ago`;
//     } else if (remainingMinutes > 0) {
//       return `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''} ago`;
//     } else {
//       return `${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''} ago`;
//     }
//   };

//   const getlike = async () => {
//     const getlike = await axios.get(`${config.production}/app/user/getlikes`, {
//       params: {postId: post.Id},
//     });
//     const userString = await AsyncStorage.getItem('user');
//     const parsedUser = JSON.parse(userString);

//     if (getlike.status === 200) {
//       setlikes(getlike.data.likes);
//       const Liked = getlike.data.likes.some(
//         like => like.userName == parsedUser.userName,
//       );
//       setIsliked(Liked);
//     } else {
//       console.log('Errow while fetching the likes');
//     }
//   };
//   const toggleDropdown = post => {
//     if (Screen == 'Home') {
//       setDropdownVisible(!dropdownVisible);
//       setSelectedPost(post);
//     }
//   };

//   const handleunfollow = async () => {
//     const obj = {
//       userName: user.userName,
//       Id_name: selectedPost.userName,
//     };
//     const deleted = await axios.post(
//       `${config.production}/app/user/deletefollow`,
//       obj,
//     );
//     setDropdownVisible(false);
//   };

//   const handleDelete = async () => {
//     try {
//       if (selectedPost.mobileNo == user.mobileNo) {
//         const deleted = await axios.delete(
//           `${config.production}/app/user/deletepost`,
//           {
//             params: {Id: selectedPost.Id},
//           },
//         );
//         if (deleted.data.status === 200) {
//           Alert.alert('Deleted Successfully');
//           setPosts(prevPosts =>
//             prevPosts.filter(post => post.Id !== selectedPost.Id),
//           );
//         } else {
//           Alert.alert('Unable to delete the post');
//         }
//         // Close the modal
//         setModalVisible(false);
//       } else {
//         Alert.alert('Not Authorized');
//         setModalVisible(false);
//       }
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   };

//   const handleShare = async () => {
//     try {
//       await Share.share({
//         message: `https://www.adoro.social/UserPost/${post.fileName}`,
//       });
//     } catch (error) {
//       console.error('Error sharing:', error.message);
//     }
//     setDropdownVisible(false);
//   };
//   const handleVideoLoad = (event, postId) => {
//     const {naturalSize} = event;
//     setVideoDimensions(prevDimensions => ({
//       ...prevDimensions,
//       [postId]: {
//         width: windowWidth * 0.95,
//         height: (windowWidth * 0.95 * naturalSize.height) / naturalSize.width,
//       },
//     }));
//   }; // ... (unchanged code)
//   const onEndReached = () => {
//     if (hasMore && !loading) {
//       // setLoading(true);
//       fetchUserData(page + 1);
//       setPage(page + 1);
//     }
//   };
//   const [dimensions, setDimensions] = useState({width: 0, height: 0});
//   const getImageSize = url => {
//     try {
//       Image.getSize(url, (width, height) => {
//         const aspectRatio = width / height;
//         const imageHeight = windowWidth1 / aspectRatio;
//         setDimensions({width: windowWidth1, height: imageHeight});
//       });
//     } catch (error) {
//       console.error('Error getting image size:', error);
//     }
//   };
//   useEffect(() => {
//     getImageSize(`https://www.adoro.social/UserPost/${post.fileName}`);
//   }, [dimensions]);

//   const handlenavigation = async (mobileNo, profile) => {
//     if (user.mobileNo == mobileNo) {
//       navigation.navigate('UserProfile');
//     } else {
//       navigation.navigate('Profile', {
//         mobileNo,
//         profile,
//       });
//     }
//   };

//   const handleLike = async () => {
//     if (isliked) {
//       const unlikeres = await axios.delete(
//         `${config.production}/app/user/unlike`,
//         {
//           params: {
//             postId: post.Id,
//             userId: user.Id,
//           },
//         },
//       );
//       if (unlikeres.status == 200) {
//         setIsliked(false);
//         setLikecount(prevCount => prevCount - 1); // <-- Corrected line
//       }
//     } else {
//       const unlikeres = await axios.post(
//         `${config.production}/app/user/hitlike`,
//         {
//           postId: post.Id,
//           userId: user.Id,
//           userName: user.userName,
//         },
//       );
//       if (unlikeres.status == 200) {
//         setIsliked(true); // <-- Corrected line
//         setLikecount(prevCount => prevCount + 1); // <-- Corrected line
//       }
//     }
//   };
//   const handleblock = useCallback(async () => {
//     const blockres = await axios.post(`${config.production}/app/user/block`, {
//       BlockedUserName: post.userName,
//       UserId: user.Id,
//     });
//     if (blockres.status == 200) {
//       handleBlockPost(post.userName);
//     } else {
//       console.log('Facing Eroor ');
//     }
//     setDropdownVisible(false);
//   }, []);

//   const handlehide = async () => {
//     const hideres = await axios.post(`${config.production}/app/user/hide`, {
//       PostId: post.Id,
//       UserId: user.Id,
//     });

//     if (hideres.status == 200) {
//       console.log('Hide  Succesffully');
//       handleHidePost(post.Id);
//     } else {
//       console.log('Facing Eroor ');
//     }
//     setDropdownVisible(false);
//   };
//   return (
//     <>
//       <Card
//         elevation={0}
//         key={index}
//         style={{
//           marginTop: 5,
//           backgroundColor: colors.color_PostBgColor,
//           borderRadius: 0,
//         }}>
//         <Card.Title
//           left={props => (
//             <View style={{flexDirection: 'row', flex: 1, gap: 10}}>
//               <TouchableOpacity
//                 onPress={() => {
//                   handlenavigation(post.mobileNo, post.profile);
//                 }}>
//                 <Image
//                   // size={40}
//                   style={{height:40,width:40, borderRadius:20}}
//                   source={
//                     post.profile
//                       ? {
//                           uri: `https://www.adoro.social/UserProfilePic/${post.profile}`,
//                         }
//                       : require('../assets/Profile.png')
//                   }
//                 />
//               </TouchableOpacity>
//               <View
//                 style={{
//                   flexDirection: 'column',
//                   width: 300,
//                 }}>
//                 <TouchableOpacity
//                   onPress={() => handlenavigation(post.mobileNo, post.profile)}>
//                   <Text
//                     style={{
//                       fontWeight: '200',
//                       fontFamily: FontFamily.semibold,
//                       fontSize: 14,
//                       color: colors.color_TextNormal,
//                       // marginRight: 10,
//                     }}>
//                     {post.fullName ? post.fullName : ''}
//                   </Text>
//                 </TouchableOpacity>
//                 <Text
//                   style={{
//                     fontFamily: FontFamily.semibold,
//                     color: colors.color_TextNormal,
//                     fontSize: 10,
//                   }}>
//                   {getTimeDifference(post.date)}
//                 </Text>
//               </View>
//             </View>
//           )}
//           leftStyle={{alignSelf: 'center', bottom: 2}}
//           right={() => (
//             <TouchableOpacity
//               onPress={() => toggleDropdown(post)}
//               style={{marginRight: 12}}>
//               <CardTitle color={colors.arrow} />
//             </TouchableOpacity>
//           )}
//         />
//         {/* Rest of your card content */}
//         <Card.Content>
//           <View style={{flexDirection: 'row'}}>
//             <Text
//               numberOfLines={expanded ? undefined : 2}
//               style={{
//                 flex: 1,
//                 marginRight: 10,
//                 fontFamily: FontFamily.semibold,
//                 color: colors.color_TextNormal,
//               }}>
//               {post.content}
//             </Text>
//             {!expanded && post.content.length > 50 && (
//               <TouchableOpacity onPress={() => setExpanded(true)}>
//                 <Text>more</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </Card.Content>
//         {
//           post.type === 'image' ? (
//             <Pinchable style={styles.pinchable}>
//               <FastImage
//                 style={{
//                   width: dimensions.width || windowWidth,
//                   height: dimensions.height || 300,
//                   marginTop: 10,
//                   // top: 10,
//                   alignSelf: 'center',
//                 }}
//                 source={{
//                   uri: `https://www.adoro.social/UserPost/${post.fileName}`,
//                   priority: FastImage.priority.high,
//                 }}
//                 // resizeMode={FastImage.resizeMode.contain}
//               />
//             </Pinchable>
//           ) : post.type === 'video' ? (
//             // Display video if content type is 'video'
//             <>
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <Video
//                   ref={videoRef}
//                   source={{
//                     uri: `https://www.adoro.social/UserPost/${post.fileName}`,
//                     // uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
//                   }}
//                   style={{
//                     // height: videoDimensions[post.Id]?.height || 200,
//                     height: 265,
//                     marginBottom: 20,
//                     resizeMode: 'contain',
//                     width: '70%', // Set width to 100% to occupy the entire card width
//                   }}
//                   controls={false}
//                   resizeMode={'contain'}
//                   onLoad={event => handleVideoLoad(event, post.Id)}
//                 />
//               </View>
//             </>
//           ) : null /* Handle other content types as needed */
//         }
//         <Card.Actions>
//           <View
//             style={{
//               flexDirection: 'row',
//               backgroundColor: 'green,',
//               width: '100%',
//             }}>
//             <View style={{gap: 10, flexDirection: 'row', flex: 1}}>
//               {post.type === 'image' ? (
//                 <View style={{flexDirection: 'column', alignItems: 'center'}}>
//                   <TouchableOpacity
//                     onPress={() => {
//                       handleLike();
//                     }}>
//                     {isliked ? (
//                       <RedHeartIcon />
//                     ) : (
//                       <HeartIcon color={colors.arrow} />
//                     )}
//                   </TouchableOpacity>
//                   <Text style={{marginLeft: 5, color: colors.color_TextNormal}}>
//                     {likecount}
//                   </Text>
//                 </View>
//               ) : post.type === 'video' ? (
//                 <View style={{flexDirection: 'column', alignItems: 'center'}}>
//                   <TouchableOpacity
//                     onPress={() => {
//                       handleLike();
//                     }}>
//                     {isliked ? (
//                       <RedHeartIcon />
//                     ) : (
//                       <HeartIcon color={colors.arrow} />
//                     )}
//                   </TouchableOpacity>
//                   <Text style={{marginLeft: 5, color: colors.color_TextNormal}}>
//                     {likecount}
//                   </Text>
//                 </View>
//               ) : null}
//               <TouchableOpacity
//                 onPress={() =>
//                   navigation.navigate('Comments', {
//                     Id: post.Id,
//                     user: user.userName,
//                     profile: user.ProfileDp,
//                   })
//                 }>
//                 <CommentIcon color={colors.arrow} />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={handleShare}>
//                 <ShareIcon color={colors.arrow} />
//               </TouchableOpacity>
//             </View>
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate('Comments', {
//                   Id: post.Id,
//                   user: user.userName,
//                   profile: user.ProfileDp,
//                 })
//               }>
//               <Text
//                 style={{
//                   color: colors.color_TextNormal,
//                   marginRight: 8,
//                   fontFamily: FontFamily.semibold,
//                 }}>
//                 {commentcount} comments
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </Card.Actions>
//       </Card>
//       <Modal
//         style={{width: '100%', marginLeft: 0, marginBottom: 0}}
//         isVisible={dropdownVisible}
//         onBackdropPress={() => setDropdownVisible(false)}>
//         <View
//           style={{
//             backgroundColor: colors.color_BottomSheet,
//             padding: 15,
//             position: 'absolute',
//             bottom: 0,
//             right: 0,
//             left: 0,
//             width: '100%',
//             borderTopLeftRadius: 10,
//             borderTopRightRadius: 10,
//             // borderRadius: 10,
//             flexDirection: 'column',
//             gap: 20,
//           }}>
//           <View
//             style={{
//               height: '1%',
//               width: '30%',
//               alignSelf: 'center',
//               backgroundColor: colors.arrow,
//               borderRadius: 10,
//             }}
//           />
//           <TouchableOpacity onPress={() => handleShare(selectedPost.content)}>
//             <View style={{flexDirection: 'row', gap: 10}}>
//               <SharePost color={colors.arrow} />
//               <Text
//                 style={{
//                   color: colors.color_TextNormal,
//                   fontFamily: FontFamily.semibold,
//                 }}>
//                 Share
//               </Text>
//             </View>
//           </TouchableOpacity>
//           {selectedPost.mobileNo === user.mobileNo && (
//             <TouchableOpacity onPress={handleDelete}>
//               <View style={{flexDirection: 'row', gap: 10}}>
//                 <DeleteIcon color={colors.arrow} />
//                 <Text
//                   style={{
//                     color: colors.color_TextNormal,
//                     top: 5,
//                     fontFamily: FontFamily.semibold,
//                   }}>
//                   Delete
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           )}
//           <TouchableOpacity onPress={handleCopyToClipboard}>
//             <View style={{flexDirection: 'row', gap: 10}}>
//               <CopyLink color={colors.arrow} />
//               <Text
//                 style={{
//                   color: colors.color_TextNormal,
//                   top: 5,
//                   fontFamily: FontFamily.semibold,
//                 }}>
//                 Copy link
//               </Text>
//             </View>
//           </TouchableOpacity>
//           {follow &&
//             follow.length > 0 &&
//             selectedPost.mobileNo != user.mobileNo &&
//             follow.some(user => user.userName === selectedPost.userName) && (
//               <TouchableOpacity onPress={handleunfollow}>
//                 <View style={{flexDirection: 'row', gap: 10}}>
//                   <Unfollow color={colors.arrow} />
//                   <Text
//                     style={{
//                       color: colors.color_TextNormal,
//                       fontFamily: FontFamily.semibold,
//                     }}>
//                     Unfollow
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             )}
//           <TouchableOpacity onPress={handlehide}>
//             <View style={{flexDirection: 'row', gap: 10}}>
//               <HideIcon color={colors.arrow} />
//               <Text
//                 style={{
//                   color: colors.color_TextNormal,
//                   fontFamily: FontFamily.semibold,
//                 }}>
//                 Hide
//               </Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleblock}>
//             <View style={{flexDirection: 'row', gap: 10}}>
//               <BlockIcon color={colors.arrow} />
//               <Text
//                 style={{
//                   color: colors.color_TextNormal,
//                   fontFamily: FontFamily.semibold,
//                 }}>
//                 Block
//               </Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <View style={{flexDirection: 'row', gap: 10}}>
//               <ReportSpam color={colors.arrow} />
//               <Text
//                 style={{
//                   color: colors.color_TextNormal,
//                   fontFamily: FontFamily.semibold,
//                 }}>
//                 Report Post
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </>
//   );
// };

// export default Post;

// const styles = StyleSheet.create({
//   Title: {
//     color: '#07142E',
//     fontSize: 20,
//     fontFamily: FontFamily.bold,
//     // fontWeight: '600',
//     textTransform: 'capitalize',
//     wordWrap: 'break-word',
//   },
//   // cardBox: {
//   //   marginTop: 5,
//   //   backgroundColor: colors.color_PostBgColor,
//   //   borderRadius: 0,
//   // },
//   know: {
//     marginTop: 60,
//     backgroundColor: '#F8F9FA',
//     padding: 15,
//     borderRadius: 15,
//     width: '140%',
//     alignSelf: 'center',
//     marginRight: 110,
//   },
//   // container: {
//   //   flex: 1,
//   //   paddingTop: 40,
//   // },
//   button: {
//     padding: 10,
//     justifyContent: 'center',
//     borderRadius: 15,
//     marginRight: 10,
//   },

//   buttonText: {
//     color: 'gray',
//     fontFamily: FontFamily.semibold,
//   },
//   linearGradient: {
//     // flex: 1,
//     borderRadius: 8,
//     // padding: 10,
//     paddingLeft: 20,
//     paddingRight: 20,
//     paddingTop: 8,
//     paddingBottom: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   pinchable: {
//     flex: 1,
//     // margin: 5,
//   },
//   controlOverlay: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#000000c4',
//     justifyContent: 'space-between',
//   },
// });

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
// import HeartIcon from '../assets/svg/HeartIcon';
import CommentIcon from '../assets/svg/CommentIcon';
import ShareIcon from '../assets/svg/ShareIcon';
import RedHeartIcon from '../assets/svg/RedHeartIcon';
import HideIcon from '../assets/svg/HideIcon';
import BlockIcon from '../assets/svg/BlockIcon';
import LottieView from 'lottie-react-native';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/Ionicons';
import Player from './Player';
import HeartIcon from '../assets/svg/HeartIcon';
// import ClappingIcon from '../assets/svg/HeartIcon';
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
  profile,
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
  const videoRefs = React.useRef(null);
  const [volume, setVolume] = useState(0);

  const handleVolumeToggle = () => {
    setVolume(prevVolume => (prevVolume === 0 ? 1 : 0));
  };

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
    <Avatar.Image
      size={40}
      source={
        profile
          ? {
              uri: `https://www.adoro.social/UserProfilePic/${profile}`,
            }
          : require('../assets/Profile.png')
      }
    />
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
    const otherString = await AsyncStorage.getItem('token');

    const parsedUser = JSON.parse(userString, otherString);

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
    const deleted = await axios.post(
      `${config.production}/app/user/deletefollow`,
      obj,
    );
    setDropdownVisible(false);
  };

  const handleDelete = async () => {
    try {
      if (selectedPost.mobileNo == user.mobileNo) {
        const deleted = await axios.delete(
          `${config.production}/app/user/deletepost`,
          {
            params: {Id: selectedPost.Id},
          },
        );
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
        message: `https://www.adoro.social/UserPost/${post.fileName}`,
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
  const getImageSize = url => {
    try {
      Image.getSize(url, (width, height) => {
        const aspectRatio = width / height;
        const imageHeight = windowWidth1 / aspectRatio;
        setDimensions({width: windowWidth1, height: imageHeight});
      });
    } catch (error) {
      console.error('Error getting image size:', error);
    }
  };
  useEffect(() => {
    getImageSize(`https://www.adoro.social/UserPost/${post.fileName}`);
  }, [dimensions]);

  const handlenavigation = async (mobileNo, profile) => {
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
    if (isliked) {
      const unlikeres = await axios.delete(
        `${config.production}/app/user/unlike`,
        {
          params: {
            postId: post.Id,
            userId: user.Id,
          },
        },
      );
      if (unlikeres.status == 200) {
        setIsliked(false);
        setLikecount(prevCount => prevCount - 1); // <-- Corrected line
      }
    } else {
      const unlikeres = await axios.post(
        `${config.production}/app/user/hitlike`,
        {
          postId: post.Id,
          userId: user.Id,
          userName: user.userName,
        },
      );
      if (unlikeres.status == 200) {
        setIsliked(true); // <-- Corrected line
        setLikecount(prevCount => prevCount + 1); // <-- Corrected line
      }
    }
  };
  const handleblock = useCallback(async () => {
    const blockres = await axios.post(`${config.production}/app/user/block`, {
      BlockedUserName: post.userName,
      UserId: user.Id,
    });
    if (blockres.status == 200) {
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

  const handlereport = async () => {
    const res = await axios.put(`${config.production}/app/user/report`, {
      Id: post.Id,
    });

    if (res.status == 200) {
      console.log('Succeees');
    } else {
      console.log('failed');
    }
    setDropdownVisible(false);
  };
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
              <TouchableOpacity
                onPress={() => {
                  handlenavigation(post.mobileNo, post.profile);
                }}>
                <Image
                  // size={40}
                  style={{height: 40, width: 40, borderRadius: 20}}
                  source={
                    post.profile
                      ? {
                          uri: `https://www.adoro.social/UserProfilePic/${post.profile}`,
                        }
                      : require('../assets/Profile.png')
                  }
                />
              </TouchableOpacity>
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
              <FastImage
                style={{
                  width: dimensions.width || windowWidth,
                  height: dimensions.height || 300,
                  marginTop: 10,
                  // top: 10,
                  alignSelf: 'center',
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
                  onLoad={event => handleVideoLoad(event, post.Id)}
                  volume={volume}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    // height:300,
                    // width:300,
                    bottom: 10,
                    right: 10,
                    backgroundColor: 'white',
                    padding: 5,
                    // borderRadius: 20,
                  }}
                  onPress={handleVolumeToggle}>
                  {/* <Text style={{flex:1,justifyContent:"flex-end"}}>{volume === 0 ? 'Unmute' : 'Mute'}</Text> */}
                  <Image
                    source={
                      volume === 0
                        ? require('../assets/mute.png')
                        : require('../assets/unmute.png')
                    }
                    style={{width: 25, height: 20}}
                  />
                </TouchableOpacity>
              </View>
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
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      handleLike();
                    }}>
                    {isliked ? (
                      <LottieView
                        style={{height: 50, width: 50, bottom:13}}
                        //  size={30}
                        source={require('../assets/clapping.json')}
                        autoPlay
                        loop={false}
                        //  loop // Play only once

                        // loop
                      />
                    ) : (
                      // <HeartIcon
                      // //  color={colors.arrow} 
                      //  />
                      <Image 
                      source={require('../assets/clapping.png')}
                      style={{height:24,width:24, color:colors.arrow}}
                      />
                    )}
                  </TouchableOpacity>
                  <Text style={{top:2,color: colors.color_TextNormal}}>
                    {likecount}
                  </Text>
                </View>
              ) : post.type === 'video' ? (
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      handleLike();
                    }}>
                    {isliked ? (
                      <LottieView
                        style={{height: 50, width: 50, bottom:15}}
                        //  size={30}
                        source={require('../assets/clapping.json')}
                        autoPlay
                        loop={false}
                        //  loop // Play only once

                        // loop
                      />
                    ) : (
                      // <HeartIcon
                      // //  color={colors.arrow} 
                      //  />
                      <Image 
                      source={require('../assets/clapping.png')}
                      style={{height:24,width:24, color:colors.arrow}}
                      />
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
              <TouchableOpacity onPress={handleShare}>
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
          <TouchableOpacity onPress={handlereport}>
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
