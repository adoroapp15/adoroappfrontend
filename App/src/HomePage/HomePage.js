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
//   ScrollView,
// } from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import TrendingTemplate from './TrendingTemplate';
// import useStore from '../store';
// import {Avatar} from 'react-native-paper';
// import LinearGradient from 'react-native-linear-gradient';
// import Modal from 'react-native-modal';
// import {useIsFocused} from '@react-navigation/native';
// import {Share} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Relevant from './Relevant';
// import axios from 'axios';
// import {config} from '../config';
// import AdoroLogos from '../assets/svg/AdoroLogos';
// import Notifications from '../assets/svg/Notifications';
// import FontFamily from '../common/components/FontFamily';
// import HamBurger from '../assets/svg/HamBurger';
// import DeleteIcon from '../assets/svg/DeletIcon';
// import ReportSpam from '../assets/svg/ReportSpam';
// import Unfollow from '../assets/svg/Unfollow';
// import CopyLink from '../assets/svg/CopyLink';
// import SharePost from '../assets/svg/SharePost';
// import Post from './Post';
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// const windowWidth1 = Dimensions.get('screen').width;
// const windowHeight1 = Dimensions.get('screen').height;

// const desiredWidth = 0.2 * windowWidth;
// const desiredHeight = 0.2 * windowHeight;

// const HomePage = ({navigation, route}) => {
//   const [isPlaying, setIsPlaying] = React.useState({});
//   const [follow, setFollow] = useState([]);
//   const [likes, setlikes] = useState([]);

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

//   const [videoDimensions, setVideoDimensions] = useState({
//     width: windowWidth * 0.95,
//     height: 300,
//   });
//   const [scrollToTop, setScrollToTop] = useState(false);
//   const [isModalVisible, setModalVisible] = useState(false);

//   const handleCopyToClipboard = () => {
//     Clipboard.setString(
//       `https://www.adoro.social/UserPost/${selectedPost.fileName}`,
//     );
//     Alert.alert('Clipboard copied');
//   };
//   // useEffect(() => {
//   //   // ... existing useEffect code

//   //   if (route.params?.scrollToTop) {
//   //     // Scroll to the top of the FlatList when scrollToTop parameter is true
//   //     flatListRef.current.scrollToOffset({animated: true, offset: 0});
//   //     setScrollToTop(false);
//   //     navigation.setParams({scrollToTop: false});
//   //   }
//   // }, [route.params?.scrollToTop]);
//   useEffect(() => {
//     if (route.params?.scrollToTop && flatListRef.current) {
//       flatListRef.current.scrollToOffset({animated: true, offset: 0});
//       setScrollToTop(false);
//       navigation.setParams({scrollToTop: false});
//     }
//   }, [route.params?.scrollToTop, flatListRef.current]);

//   const handleBackPress = () => {
//     if (isModalVisible) {
//       setModalVisible(false);
//       return true; // Stop the default back action
//     }

//     if (isFocused) {
//       BackHandler.exitApp();
//       return true; // Stop the default back action
//     }

//     return false;
//   };
//   useEffect(() => {
//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       handleBackPress,
//     );

//     return () => {
//       backHandler.remove(); // Remove the event listener on component unmount
//     };
//   }, [isFocused]);
//   const LeftContent = ({profile, mobileNo}) => (
//     <View>
//       <TouchableOpacity
//         onPress={() => {
//           navigation.navigate('Profile', {
//             mobileNo,
//             profile,
//           });
//         }}>
//         <Avatar.Image
//           size={40}
//           style={{}}
//           source={{uri: `https://www.adoro.social/UserProfilePic/${profile}`}}
//         />
//       </TouchableOpacity>
//     </View>
//   );

//   useEffect(() => {
//     fetchUserData();
//   }, [isFocused]);

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
//           const interest = response.data.data.Interest;
//           const res = await axios.get(
//             `${config.production}/app/user/userinterest`,
//             {params: {interest: interest, UserId: parsedUser.Id}},
//           );
//           if (res.data.status === 200) {
//             console.log('postssssssss issss', res.data.posts);

//             setPosts(res.data.posts);
//           } else {
//             console.log('User Posts not Found');
//             setPosts([]);
//           }
//         } else {
//           console.log('Profile Pic not Found');
//           // setProfile(null);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleDropdown = post => {
//     setDropdownVisible(!dropdownVisible);
//     setSelectedPost(post);
//   };
//   const onEndReached = () => {
//     if (hasMore && !loading) {
//       // setLoading(true);
//       fetchUserData(page + 1);
//       setPage(page + 1);
//     }
//   };
//   // const navigation = useNavigation();

//   const handleDrawerIconPress = () => {
//     navigation.toggleDrawer(); // Toggle the drawer on press
//   };
//   const [expanded, setExpanded] = useState(false);
//   const [selectedButton, setSelectedButton] = useState('Trending');

//   useEffect(() => {
//     renderSelectedContent();
//   }, [selectedButton]);

//   const handleButtonPress = async buttonName => {
//     if (buttonName == 'Relevant' && buttonName == 'Trending') {
//       return;
//     }
//     console.log('selecteddddddddddd button    isssssss', buttonName);
//     setSelectedButton(buttonName);
//   };

//   const renderSelectedContent = () => {
//     if (selectedButton === 'Trending') {
//       return (
//         <TrendingTemplate
//           navigation={navigation}
//           ref={flatListRef}
//           userId={user.Id}
//         />
//       );
//     } else if (selectedButton === 'Relevant') {
//       return (
//         <Relevant navigation={navigation} ref={flatListRef} />
//         // <FlatList
//         //   ref={flatListRef}
//         //   data={posts.slice().reverse()}
//         //   keyExtractor={(item, index) => index.toString()}
//         //   renderItem={({item, index}) => (
//         //     <Post
//         //       navigation={navigation}
//         //       post={item}
//         //       index={index}
//         //       Screen={'Home'}
//         //     />
//         //   )}
//         //   ListEmptyComponent={<Text />}
//         //   refreshing={loading}
//         //   onEndReached={onEndReached}
//         //   onEndReachedThreshold={0.1}
//         //   ListFooterComponent={() =>
//         //     loading && (
//         //       <View style={{padding: 10}}>
//         //         <ActivityIndicator size="small" color="#0000ff" />
//         //       </View>
//         //     )
//         //   }
//         // />
//       );
//     } else {
//       const filteredPosts = posts.filter(item => {
//         console.log('Intersts ifffff', item.category, selectedButton);
//         return item.category === selectedButton;
//       });

//       console.log('filterrrrrrrrrrr posttttttttttttt', filteredPosts);

//       return (
//         <FlatList
//           ref={flatListRef}
//           data={filteredPosts}
//           keyExtractor={(item, index) => index.toString()}
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
//           ListEmptyComponent={<Text />}
//           refreshing={loading}
//           onEndReached={onEndReached}
//           onEndReachedThreshold={0.1}
//           ListFooterComponent={() =>
//             loading && (
//               <View style={{padding: 10}}>
//                 <ActivityIndicator size="small" color="#0000ff" />
//               </View>
//             )
//           }
//         />
//       );
//     }
//   };

//   const handleHidePost = postId => {
//     setPosts(posts.filter(post => post.Id !== postId));
//   };

//   const handleBlockPost = userName => {
//     setPosts(posts.filter(post => post.userName !== userName));
//   };

//   const renderButtons = () => {
//     console.log('userrrrrrrrrrrr issss', user);
//     if (user && user.Interest) {
//       const interest = user.Interest;
//       const interestArray = interest.split(' ');
//       const buttons = ['Relevant', 'Trending', ...interestArray];
//       console.log('buttonsssssss isssssssss', buttons);

//       return buttons.map((buttonName, index) => (
//         <TouchableOpacity
//           key={index}
//           style={[
//             styles.button,
//             selectedButton === buttonName ? styles.selectedButton : null,
//           ]}
//           onPress={() => handleButtonPress(buttonName)}>
//           {selectedButton === buttonName ? (
//             <LinearGradient
//               colors={[
//                 'rgba(0,255,255,0.4)',
//                 'rgba(255,192,203,1)',
//                 'rgba(255,255,0,0.5)',
//               ]}
//               start={{x: 0, y: 0}}
//               end={{x: 1, y: 1}}
//               style={styles.linearGradient}>
//               <Text style={{color: 'white', fontFamily: FontFamily.semibold}}>
//                 {buttonName}
//               </Text>
//             </LinearGradient>
//           ) : (
//             <Text style={styles.buttonText}>{buttonName}</Text>
//           )}
//         </TouchableOpacity>
//       ));
//     } else {
//       console.log('uuuuuuuserrrrrrrrrrrr undeiiiiiiiiiii');
//       return null;
//     }
//   };

//   const [dimensions, setDimensions] = useState({width: 0, height: 0});
//   const {dark, toggleTheme} = useStore();
//   const {colors} = useTheme();
//   const {hasNewNotifications} = route.params || {};
//   console.log('sssppp', hasNewNotifications);
//   // Inside your component or function where you want to fetch image dimensions
//   return (
//     <View style={{backgroundColor: colors.color_PageColor, height: '100%'}}>
//       <View
//         style={{
//           flexDirection: 'row',
//           backgroundColor: colors.color_TabBarColor,
//           height: 56,
//         }}>
//         <TouchableOpacity
//           style={{left: 10, alignSelf: 'center'}}
//           onPress={handleDrawerIconPress}>
//           <HamBurger color={colors.arrow} />
//         </TouchableOpacity>
//         <View style={{flex: 1, left: 20, alignSelf: 'center'}}>
//           <TouchableOpacity
//             onPress={() => {
//               console.log('ss');
//               // Trigger the scroll to the top of the FlatList in the HomePage component
//               navigation.navigate('Home', {
//                 screen: 'HomePage',
//                 params: {scrollToTop: true},
//               });
//             }}>
//             <AdoroLogos />
//           </TouchableOpacity>
//         </View>
//         <View style={{flexDirection: 'row', gap: 10}}>
//           <>
//             <TouchableOpacity
//               style={{marginRight: 12, alignSelf: 'center'}}
//               onPress={() => navigation.navigate('Notification')}>
//               <Notifications color={colors.arrow} />
//             </TouchableOpacity>
//             {hasNewNotifications && (
//               <View
//                 style={{
//                   position: 'absolute',
//                   backgroundColor: 'red',
//                   width: 10,
//                   height: 10,
//                   borderRadius: 5,
//                   top: -5,
//                   right: -5,
//                 }}
//               />
//             )}
//           </>
//           {/* <TouchableOpacity
//             style={{marginRight: 8, alignSelf: 'center'}}
//             onPress={() => navigation.navigate('Message')}>
//             <Message />
//           </TouchableOpacity> */}
//         </View>
//       </View>
//       <View style={{backgroundColor: colors.color_TabBarColor}}>
//         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//           {renderButtons()}
//         </ScrollView>
//       </View>
//       {renderSelectedContent()}
//       {/* <FlatList
//         ref={flatListRef}
//         data={posts.slice().reverse()}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({item, index}) => (
//           <Post
//             navigation={navigation}
//             post={item}
//             index={index}
//             Screen={'Home'}
//           />
//         )}
//         ListEmptyComponent={<Text />}
//         refreshing={loading}
//         onEndReached={onEndReached}
//         onEndReachedThreshold={0.1}
//         ListFooterComponent={() =>
//           loading && (
//             <View style={{padding: 10}}>
//               <ActivityIndicator size="small" color="#0000ff" />
//             </View>
//           )
//         }
//       /> */}
//     </View>
//   );
// };

// export default HomePage;

// const styles = StyleSheet.create({
//   Title: {
//     color: '#07142E',
//     fontSize: 20,
//     fontFamily: FontFamily.bold,
//     // fontWeight: '600',
//     textTransform: 'capitalize',
//     wordWrap: 'break-word',
//   },
//   cardBox: {
//     marginTop: 5,
//     backgroundColor: 'white',
//     borderRadius: 0,
//   },
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
// });

// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Dimensions,
//   FlatList,
//   ActivityIndicator,
//   BackHandler,
//   Alert,
//   Clipboard,
//   ScrollView,
// } from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import TrendingTemplate from './TrendingTemplate';
// import useStore from '../store';
// import {Avatar} from 'react-native-paper';
// import LinearGradient from 'react-native-linear-gradient';
// import Modal from 'react-native-modal';
// import {useIsFocused} from '@react-navigation/native';
// import {Share} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Relevant from './Relevant';
// import axios from 'axios';
// import {config} from '../config';
// import AdoroLogos from '../assets/svg/AdoroLogos';
// import Notifications from '../assets/svg/Notifications';
// import FontFamily from '../common/components/FontFamily';
// import HamBurger from '../assets/svg/HamBurger';
// import DeleteIcon from '../assets/svg/DeletIcon';
// import ReportSpam from '../assets/svg/ReportSpam';
// import Unfollow from '../assets/svg/Unfollow';
// import CopyLink from '../assets/svg/CopyLink';
// import SharePost from '../assets/svg/SharePost';
// import Post from './Post';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// const windowWidth1 = Dimensions.get('screen').width;
// const windowHeight1 = Dimensions.get('screen').height;

// const HomePage = ({navigation, route}) => {
//   const [isPlaying, setIsPlaying] = React.useState({});
//   const [follow, setFollow] = useState([]);
//   const [likes, setlikes] = useState([]);
//   const categoryList = [
//     'Savage',
//     'Relatable',
//     'Dank',
//     'Shitpost',
//     'Movies',
//     'Wholesome',
//     'Anime',
//     'Desi',
//     'Webseries',
//     'Celeb',
//     'Gaming',
//     'History',
//     'Tech',
//     'Nostalgia',
//     'Sports',
//     'Sadpost',
//     'Parody',
//     'Politics',
//   ];
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

//   const [videoDimensions, setVideoDimensions] = useState({
//     width: windowWidth * 0.95,
//     height: 300,
//   });
//   const [scrollToTop, setScrollToTop] = useState(false);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [availableCategories, setAvailableCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([
//     'Relevant',
//     'Trending',
//   ]);

//   const handleCopyToClipboard = () => {
//     Clipboard.setString(
//       `https://www.adoro.social/UserPost/${selectedPost.fileName}`,
//     );
//     Alert.alert('Clipboard copied');
//   };

//   useEffect(() => {
//     if (route.params?.scrollToTop && flatListRef.current) {
//       flatListRef.current.scrollToOffset({animated: true, offset: 0});
//       setScrollToTop(false);
//       navigation.setParams({scrollToTop: false});
//     }
//   }, [route.params?.scrollToTop, flatListRef.current]);

//   const handleBackPress = () => {
//     if (isModalVisible) {
//       setModalVisible(false);
//       return true; // Stop the default back action
//     }

//     if (isFocused) {
//       BackHandler.exitApp();
//       return true; // Stop the default back action
//     }

//     return false;
//   };

//   useEffect(() => {
//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       handleBackPress,
//     );

//     return () => {
//       backHandler.remove(); // Remove the event listener on component unmount
//     };
//   }, [isFocused]);

//   const LeftContent = ({profile, mobileNo}) => (
//     <View>
//       <TouchableOpacity
//         onPress={() => {
//           navigation.navigate('Profile', {
//             mobileNo,
//             profile,
//           });
//         }}>
//         <Avatar.Image
//           size={40}
//           style={{}}
//           source={{uri: `https://www.adoro.social/UserProfilePic/${profile}`}}
//         />
//       </TouchableOpacity>
//     </View>
//   );

//   useEffect(() => {
//     fetchUserData();
//   }, [isFocused]);

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
//           const interest = response.data.data.Interest;
//           const res = await axios.get(
//             `${config.production}/app/user/userinterest`,
//             {params: {interest: interest, UserId: parsedUser.Id}},
//           );
//           if (res.data.status === 200) {
//             console.log('postssssssss issss', res.data.posts);
//             console.log('sdfdsa', response.data.data.Interest);

//             setPosts(res.data.posts);
//             setAvailableCategories(categoryList); // example categories
//           } else {
//             console.log('User Posts not Found');
//             setPosts([]);
//           }
//         } else {
//           console.log('Profile Pic not Found');
//           // setProfile(null);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleDropdown = post => {
//     setDropdownVisible(!dropdownVisible);
//     setSelectedPost(post);
//   };

//   const onEndReached = () => {
//     if (hasMore && !loading) {
//       fetchUserData(page + 1);
//       setPage(page + 1);
//     }
//   };

//   const handleDrawerIconPress = () => {
//     navigation.toggleDrawer(); // Toggle the drawer on press
//   };

//   const [expanded, setExpanded] = useState(false);
//   const [selectedButton, setSelectedButton] = useState('Trending');

//   useEffect(() => {
//     renderSelectedContent();
//   }, [selectedButton]);

//   const handleButtonPress = buttonName => {
//     setSelectedButton(buttonName);
//   };

//   const renderSelectedContent = () => {
//     if (selectedButton === 'Trending') {
//       return (
//         <TrendingTemplate
//           navigation={navigation}
//           ref={flatListRef}
//           userId={user.Id}
//         />
//       );
//     } else if (selectedButton === 'Relevant') {
//       return <Relevant navigation={navigation} ref={flatListRef} />;
//     } else {
//       const filteredPosts = posts.filter(
//         item => item.category === selectedButton,
//       );

//       return (
//         <FlatList
//           ref={flatListRef}
//           data={filteredPosts}
//           keyExtractor={(item, index) => index.toString()}
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
//           ListEmptyComponent={<Text />}
//           refreshing={loading}
//           onEndReached={onEndReached}
//           onEndReachedThreshold={0.1}
//           ListFooterComponent={() =>
//             loading && (
//               <View style={{padding: 10}}>
//                 <ActivityIndicator size="small" color="#0000ff" />
//               </View>
//             )
//           }
//         />
//       );
//     }
//   };

//   const handleHidePost = postId => {
//     setPosts(posts.filter(post => post.Id !== postId));
//   };

//   const handleBlockPost = userName => {
//     setPosts(posts.filter(post => post.userName !== userName));
//   };


//   const renderButtons = () => {
//     if (user && user.Interest) {
//       const interest = user.Interest;
//       const interestArray = interest.split(' ');
//       const buttons = [...selectedCategories, ...interestArray];

//       return buttons.map((buttonName, index) => (
//         <TouchableOpacity
//           key={index}
//           style={[
//             styles.button,
//             selectedButton === buttonName ? styles.selectedButton : null,
//           ]}
//           onPress={() => handleButtonPress(buttonName)}>
//           {selectedButton === buttonName ? (
//             <LinearGradient
//               colors={[
//                 'rgba(0,255,255,0.4)',
//                 'rgba(255,192,203,1)',
//                 'rgba(255,255,0,0.5)',
//               ]}
//               start={{x: 0, y: 0}}
//               end={{x: 1, y: 1}}
//               style={styles.linearGradient}>
//               <Text style={{color: 'white', fontFamily: FontFamily.semibold}}>
//                 {buttonName}
//               </Text>
//             </LinearGradient>
//           ) : (
//             <Text style={styles.buttonText}>{buttonName}</Text>
//           )}
//         </TouchableOpacity>
//       ));
//     } else {
//       return null;
//     }
//   };

//   const renderAvailableCategories = () => {
//     return availableCategories.map((category, index) => (
//       <TouchableOpacity
//         key={index}
//         style={styles.modalButton}
//         onPress={() => handleAddCategory(category)}>
//         <Text style={styles.buttonText}>{category}</Text>
//       </TouchableOpacity>
//     ));
//   };
//   const handleAddCategory = category => {
//     setSelectedCategories([...selectedCategories, category]);
//     setAvailableCategories(availableCategories.filter(cat => cat !== category));
//     setSelectedButton(category);
//     setModalVisible(false);
//   };
 
//   const [dimensions, setDimensions] = useState({width: 0, height: 0});
//   const {dark, toggleTheme} = useStore();
//   const {colors} = useTheme();
//   const {hasNewNotifications} = route.params || {};

//   return (
//     <View style={{backgroundColor: colors.color_PageColor, height: '100%'}}>
//       <View
//         style={{
//           flexDirection: 'row',
//           backgroundColor: colors.color_TabBarColor,
//           height: 56,
//         }}>
//         <TouchableOpacity
//           style={{left: 10, alignSelf: 'center'}}
//           onPress={handleDrawerIconPress}>
//           <HamBurger color={colors.arrow} />
//         </TouchableOpacity>
//         <View style={{flex: 1, left: 20, alignSelf: 'center'}}>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.navigate('Home', {
//                 screen: 'HomePage',
//                 params: {scrollToTop: true},
//               });
//             }}>
//             <AdoroLogos />
//           </TouchableOpacity>
//         </View>
//         <View style={{flexDirection: 'row', gap: 10}}>
//           <>
//             <TouchableOpacity
//               style={{marginRight: 12, alignSelf: 'center'}}
//               onPress={() => navigation.navigate('Notification')}>
//               <Notifications color={colors.arrow} />
//             </TouchableOpacity>
//             {hasNewNotifications && (
//               <View
//                 style={{
//                   position: 'absolute',
//                   backgroundColor: 'red',
//                   width: 10,
//                   height: 10,
//                   borderRadius: 5,
//                   top: -5,
//                   right: -5,
//                 }}
//               />
//             )}
//           </>
//         </View>
//       </View>
//       <View style={{backgroundColor: colors.color_TabBarColor}}>
//         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//           {renderButtons()}
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => setModalVisible(true)}>
//             <Text style={styles.buttonText}>Add More</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </View>
//       {renderSelectedContent()}
//       <Modal
//       style={{height:"70%"}}
//         isVisible={isModalVisible}
//         onBackdropPress={() => setModalVisible(false)}>
//           <ScrollView>
//         <View style={styles.modalContent}>
//           <Text style={styles.modalTitle}>Select Category</Text>
//           {renderAvailableCategories()}
//         </View>
//         </ScrollView>
//       </Modal>
//     </View>
//   );
// };

// export default HomePage;

// const styles = StyleSheet.create({
//   Title: {
//     color: '#07142E',
//     fontSize: 20,
//     fontFamily: FontFamily.bold,
//     textTransform: 'capitalize',
//     wordWrap: 'break-word',
//   },
//   cardBox: {
//     marginTop: 5,
//     backgroundColor: 'white',
//     borderRadius: 0,
//   },
//   know: {
//     marginTop: 60,
//     backgroundColor: '#F8F9FA',
//     padding: 15,
//     borderRadius: 15,
//     width: '140%',
//     alignSelf: 'center',
//     marginRight: 110,
//   },
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
//     borderRadius: 8,
//     paddingLeft: 20,
//     paddingRight: 20,
//     paddingTop: 8,
//     paddingBottom: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//   },
//   modalTitle: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontFamily: FontFamily.semibold,
//   },
//   modalButton: {
//     padding: 10,
//     justifyContent: 'center',
//     borderRadius: 10,
//     marginBottom: 10,
//     backgroundColor: '#f0f0f0',
//   },
// });


// import React, {useEffect, useState, useRef} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Dimensions,
//   FlatList,
//   ActivityIndicator,
//   BackHandler,
//   Alert,
//   Clipboard,
//   ScrollView,
// } from 'react-native';
// import {useTheme, useIsFocused} from '@react-navigation/native';
// import TrendingTemplate from './TrendingTemplate';
// import useStore from '../store';
// import {Avatar} from 'react-native-paper';
// import LinearGradient from 'react-native-linear-gradient';
// import Modal from 'react-native-modal';
// import {Share} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Relevant from './Relevant';
// import axios from 'axios';
// import {config} from '../config';
// import AdoroLogos from '../assets/svg/AdoroLogos';
// import Notifications from '../assets/svg/Notifications';
// import FontFamily from '../common/components/FontFamily';
// import HamBurger from '../assets/svg/HamBurger';
// import Post from './Post';
 
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
 
// const categoryList = [
//   'Savage',
//   'Relatable',
//   'Dank',
//   'Shitpost',
//   'Movies',
//   'Wholesome',
//   'Anime',
//   'Desi',
//   'Webseries',
//   'Celeb',
//   'Gaming',
//   'History',
//   'Tech',
//   'Nostalgia',
//   'Sports',
//   'Sadpost',
//   'Parody',
//   'Politics',
// ];
 
// const HomePage = ({navigation, route}) => {
//   const [isPlaying, setIsPlaying] = useState({});
//   const [posts, setPosts] = useState([]);
//   const [user, setUser] = useState({});
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [availableCategories, setAvailableCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([
//     'Relevant',
//     'Trending',
//   ]);
//   const [selectedButton, setSelectedButton] = useState('Trending');
//   const flatListRef = useRef(null);
//   const isFocused = useIsFocused();
 
//   const {colors} = useTheme();
//   const {hasNewNotifications} = route.params || {};
 
//   const togglePlayPause = postId => {
//     setIsPlaying(prevIsPlaying => ({
//       ...prevIsPlaying,
//       [postId]: !prevIsPlaying[postId],
//     }));
//   };
 
//   const handleCopyToClipboard = () => {
//     Clipboard.setString(
//       `https://www.adoro.social/UserPost/${selectedPost.fileName}`,
//     );
//     Alert.alert('Clipboard copied');
//   };
 
//   useEffect(() => {
//     if (route.params?.scrollToTop && flatListRef.current) {
//       flatListRef.current.scrollToOffset({animated: true, offset: 0});
//       navigation.setParams({scrollToTop: false});
//     }
//   }, [route.params?.scrollToTop, flatListRef]);
 
//   const handleBackPress = () => {
//     if (isModalVisible) {
//       setModalVisible(false);
//       return true;
//     }
 
//     if (isFocused) {
//       BackHandler.exitApp();
//       return true;
//     }
 
//     return false;
//   };
 
//   useEffect(() => {
//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       handleBackPress,
//     );
//     return () => {
//       backHandler.remove();
//     };
//   }, [isFocused]);
 
//   useEffect(() => {
//     if (isFocused) {
//       fetchUserData();
//     }
//   }, [isFocused]);
 
//   const fetchUserData = async () => {
//     try {
//       setLoading(true);
//       const userString = await AsyncStorage.getItem('user');
//       const token = await AsyncStorage.getItem('token');
 
//       if (userString && token) {
//         const parsedUser = JSON.parse(userString);
//         const response = await axios.get(
//           `${config.production}/app/user/userdetails`,
//           {
//             params: {mobileNo: parsedUser.mobileNo},
//           },
//         );
//         if (response.data.status === 200) {
//           setUser(response.data.data);
//           const interest = response.data.data.Interest;
//           const res = await axios.get(
//             `${config.production}/app/user/userinterest`,
//             {
//               params: {interest, UserId: parsedUser.Id},
//             },
//           );
//           if (res.data.status === 200) {
//             setPosts(res.data.posts);
//             updateAvailableCategories(parsedUser.Interest);
//           } else {
//             setPosts([]);
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   const updateAvailableCategories = userInterests => {
//     const interestArray = userInterests.split(' ');
//     const filteredCategories = categoryList.filter(
//       category => !interestArray.includes(category),
//     );
//     setAvailableCategories(filteredCategories);
//   };
 
//   const toggleDropdown = post => {
//     setDropdownVisible(!dropdownVisible);
//     setSelectedPost(post);
//   };
 
//   const onEndReached = () => {
//     if (hasMore && !loading) {
//       fetchUserData(page + 1);
//       setPage(page + 1);
//     }
//   };
 
//   const handleDrawerIconPress = () => {
//     navigation.toggleDrawer();
//   };
 
//   useEffect(() => {
//     renderSelectedContent();
//   }, [selectedButton]);
 
//   const handleButtonPress = buttonName => {
//     setSelectedButton(buttonName);
//   };
 
//   const renderSelectedContent = () => {
//     if (selectedButton === 'Trending') {
//       return (
//         <TrendingTemplate
//           navigation={navigation}
//           ref={flatListRef}
//           userId={user.Id}
//         />
//       );
//     } else if (selectedButton === 'Relevant') {
//       return <Relevant navigation={navigation} ref={flatListRef} />;
//     } else {
//       const filteredPosts = posts.filter(
//         item => item.category === selectedButton,
//       );
 
//       return (
//         <FlatList
//           ref={flatListRef}
//           data={filteredPosts}
//           keyExtractor={(item, index) => index.toString()}
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
//           ListEmptyComponent={<Text />}
//           refreshing={loading}
//           onEndReached={onEndReached}
//           onEndReachedThreshold={0.1}
//           ListFooterComponent={() =>
//             loading && (
//               <View style={{padding: 10}}>
//                 <ActivityIndicator size="small" color="#0000ff" />
//               </View>
//             )
//           }
//         />
//       );
//     }
//   };
 
//   const handleHidePost = postId => {
//     setPosts(posts.filter(post => post.Id !== postId));
//   };
 
//   const handleBlockPost = userName => {
//     setPosts(posts.filter(post => post.userName !== userName));
//   };
 
//   const handleAddCategory = category => {
//     setSelectedCategories([...selectedCategories, category]);
//     setAvailableCategories(availableCategories.filter(cat => cat !== category));
//     setSelectedButton(category);
//     setModalVisible(false);
//   };
 
//   const renderButtons = () => {
//     if (user && user.Interest) {
//       const interest = user.Interest;
//       const interestArray = interest.split(' ');
//       const buttons = ['Relevant', 'Trending', ...interestArray];
 
//       return buttons.map((buttonName, index) => (
//         <TouchableOpacity
//           key={index}
//           style={[
//             styles.button,
//             selectedButton === buttonName ? styles.selectedButton : null,
//           ]}
//           onPress={() => handleButtonPress(buttonName)}>
//           {selectedButton === buttonName ? (
//             <LinearGradient
//               colors={[
//                 'rgba(0,255,255,0.4)',
//                 'rgba(255,192,203,1)',
//                 'rgba(255,255,0,0.5)',
//               ]}
//               start={{x: 0, y: 0}}
//               end={{x: 1, y: 1}}
//               style={styles.linearGradient}>
//               <Text style={{color: 'white', fontFamily: FontFamily.semibold}}>
//                 {buttonName}
//               </Text>
//             </LinearGradient>
//           ) : (
//             <Text style={styles.buttonText}>{buttonName}</Text>
//           )}
//         </TouchableOpacity>
//       ));
//     } else {
//       return null;
//     }
//   };
 
//   return (
//     <View style={{backgroundColor: colors.color_PageColor, height: '100%'}}>
//       <View
//         style={{
//           flexDirection: 'row',
//           backgroundColor: colors.color_TabBarColor,
//           height: 56,
//         }}>
//         <TouchableOpacity
//           style={{left: 10, alignSelf: 'center'}}
//           onPress={handleDrawerIconPress}>
//           <HamBurger color={colors.arrow} />
//         </TouchableOpacity>
//         <View style={{flex: 1, left: 20, alignSelf: 'center'}}>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.navigate('HomePage', {
//                 screen: 'HomePage',
//                 params: {scrollToTop: true},
//               });
//             }}>
//             <AdoroLogos color={colors.arrow} />
//           </TouchableOpacity>
//         </View>
//         <View style={{flexDirection: 'row'}}>
//           {hasNewNotifications ? (
//             <TouchableOpacity
//               onPress={() => navigation.navigate('Notifications')}>
//               <Notifications
//                 color={colors.arrow}
//                 style={{
//                   marginRight: 15,
//                   alignSelf: 'center',
//                   right: 16,
//                   top: 8,
//                 }}
//               />
//             </TouchableOpacity>
//           ) : (
//             <Notifications
//               color={colors.arrow}
//               style={{
//                 marginRight: 15,
//                 alignSelf: 'center',
//                 right: 16,
//                 top: 8,
//               }}
//             />
//           )}
//           <TouchableOpacity
//             style={{marginRight: 15, alignSelf: 'center'}}
//             onPress={() => navigation.navigate('Profile')}>
//             {user && user.profilePic ? (
//               <Avatar.Image
//                 size={28}
//                 source={{
//                   uri: user.profilePic.includes('http')
//                     ? user.profilePic
//                     : `${config.image}${user.profilePic}`,
//                 }}
//               />
//             ) : (
//               <Avatar.Text size={28} label="A" />
//             )}
//           </TouchableOpacity>
//         </View>
//       </View>
 
//       <View>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               paddingHorizontal: 10,
//             }}>
//             {renderButtons()}
//             {selectedCategories.length < 5 && (
//               <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={() => setModalVisible(true)}>
//                 <Text style={styles.addButtonText}>Add</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </ScrollView>
//         <View style={styles.separator} />
//       </View>
 
//       <View style={styles.contentContainer}>{renderSelectedContent()}</View>
 
//       <Modal
//         isVisible={isModalVisible}
//         onBackdropPress={() => setModalVisible(false)}>
//         <View style={styles.modalContent}>
//           {availableCategories.length > 0 ? (
//             availableCategories.map((category, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={styles.modalButton}
//                 onPress={() => handleAddCategory(category)}>
//                 <Text style={styles.modalButtonText}>{category}</Text>
//               </TouchableOpacity>
//             ))
//           ) : (
//             <Text>No categories available</Text>
//           )}
//         </View>
//       </Modal>
//     </View>
//   );
// };
 
// const styles = StyleSheet.create({
//   button: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   selectedButton: {
//     backgroundColor: 'transparent',
//   },
//   linearGradient: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 20,
//   },
//   buttonText: {
//     fontFamily: FontFamily.semibold,
//     color: 'white',
//   },
//   addButton: {
//     backgroundColor: 'gray',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 20,
//   },
//   addButtonText: {
//     color: 'white',
//     fontFamily: FontFamily.semibold,
//   },
//   separator: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     marginVertical: 10,
//   },
//   contentContainer: {
//     flex: 1,
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//   },
//   modalButton: {
//     paddingVertical: 10,
//   },
//   modalButtonText: {
//     fontFamily: FontFamily.semibold,
//     color: 'black',
//   },
// });
 
// export default HomePage;


import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
  BackHandler,
  Alert,
  Clipboard,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import TrendingTemplate from './TrendingTemplate';
import useStore from '../store';
import {Avatar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {useIsFocused} from '@react-navigation/native';
import {Share} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Relevant from './Relevant';
import axios from 'axios';
import {config} from '../config';
import AdoroLogos from '../assets/svg/AdoroLogos';
import Notifications from '../assets/svg/Notifications';
import FontFamily from '../common/components/FontFamily';
import HamBurger from '../assets/svg/HamBurger';
import DeleteIcon from '../assets/svg/DeletIcon';
import ReportSpam from '../assets/svg/ReportSpam';
import Unfollow from '../assets/svg/Unfollow';
import CopyLink from '../assets/svg/CopyLink';
import SharePost from '../assets/svg/SharePost';
import Post from './Post';
 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowWidth1 = Dimensions.get('screen').width;
const windowHeight1 = Dimensions.get('screen').height;
 
const HomePage = ({navigation, route}) => {
  const [isPlaying, setIsPlaying] = React.useState({});
  const [follow, setFollow] = useState([]);
  const [likes, setlikes] = useState([]);
  const categoryList = [
    'Savage',
    'Relatable',
    'Dank',
    'Shitpost',
    'Movies',
    'Wholesome',
    'Anime',
    'Desi',
    'Webseries',
    'Celeb',
    'Gaming',
    'History',
    'Tech',
    'Nostalgia',
    'Sports',
    'Sadpost',
    'Parody',
    'Politics',
  ];
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
 
  const [videoDimensions, setVideoDimensions] = useState({
    width: windowWidth * 0.95,
    height: 300,
  });
  const [scrollToTop, setScrollToTop] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([
    'Relevant',
    'Trending',
  ]);
 
  const handleCopyToClipboard = () => {
    Clipboard.setString(
      `https://www.adoro.social/UserPost/${selectedPost.fileName}`,
    );
    Alert.alert('Clipboard copied');
  };
 
  useEffect(() => {
    if (route.params?.scrollToTop && flatListRef.current) {
      flatListRef.current.scrollToOffset({animated: true, offset: 0});
      setScrollToTop(false);
      navigation.setParams({scrollToTop: false});
    }
  }, [route.params?.scrollToTop, flatListRef.current]);
 
  const handleBackPress = () => {
    if (isModalVisible) {
      setModalVisible(false);
      return true; // Stop the default back action
    }
 
    if (isFocused) {
      BackHandler.exitApp();
      return true; // Stop the default back action
    }
 
    return false;
  };
 
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
 
    return () => {
      backHandler.remove(); // Remove the event listener on component unmount
    };
  }, [isFocused]);
 
  const LeftContent = ({profile, mobileNo}) => (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile', {
            mobileNo,
            profile,
          });
        }}>
        <Avatar.Image
          size={40}
          style={{}}
          source={{uri: `https://www.adoro.social/UserProfilePic/${profile}`}}
        />
      </TouchableOpacity>
    </View>
  );
 
  useEffect(() => {
    fetchUserData();
  }, [isFocused]);
 
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
          const interest = response.data.data.Interest;
          const res = await axios.get(
            `${config.production}/app/user/userinterest`,
            {params: {interest: interest, UserId: parsedUser.Id}},
          );
          if (res.data.status === 200) {
            console.log('sdfdsa', response.data.data.Interest);
            const userInterests = response.data.data.Interest.split(' ');
 
            setPosts(res.data.posts);
            const filteredCategories = categoryList.filter(
              category => !userInterests.includes(category),
            );
            setAvailableCategories(filteredCategories);
          } else {
            console.log('User Posts not Found');
            setPosts([]);
          }
        } else {
          console.log('Profile Pic not Found');
          // setProfile(null);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };
 
  const toggleDropdown = post => {
    setDropdownVisible(!dropdownVisible);
    setSelectedPost(post);
  };
 
  const onEndReached = () => {
    if (hasMore && !loading) {
      fetchUserData(page + 1);
      setPage(page + 1);
    }
  };
 
  const handleDrawerIconPress = () => {
    navigation.toggleDrawer(); // Toggle the drawer on press
  };
 
  const [expanded, setExpanded] = useState(false);
  const [selectedButton, setSelectedButton] = useState('Trending');
 
  useEffect(() => {
    renderSelectedContent();
  }, [selectedButton]);
 
  const handleButtonPress = buttonName => {
    setSelectedButton(buttonName);
  };
 
  const renderSelectedContent = () => {
    if (selectedButton === 'Trending') {
      return (
        <TrendingTemplate
          navigation={navigation}
          ref={flatListRef}
          userId={user.Id}
        />
      );
    } else if (selectedButton === 'Relevant') {
      return <Relevant navigation={navigation} ref={flatListRef} />;
    } else {
      const filteredPosts = posts.filter(
        item => item.category === selectedButton,
      );
 
      return (
        <FlatList
          ref={flatListRef}
          data={filteredPosts}
          keyExtractor={(item, index) => index.toString()}
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
          ListEmptyComponent={<Text />}
          refreshing={loading}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() =>
            loading && (
              <View style={{padding: 10}}>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            )
          }
        />
      );
    }
  };
 
  const handleHidePost = postId => {
    setPosts(posts.filter(post => post.Id !== postId));
  };
 
  const handleBlockPost = userName => {
    setPosts(posts.filter(post => post.userName !== userName));
  };
 
  const renderButtons = () => {
    if (user && user.Interest) {
      const interest = user.Interest;
      const interestArray = interest.split(' ');
      const buttons = [...selectedCategories, ...interestArray];
 
      return buttons.map((buttonName, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            selectedButton === buttonName ? styles.selectedButton : null,
          ]}
          onPress={() => handleButtonPress(buttonName)}>
          {selectedButton === buttonName ? (
            <LinearGradient
              colors={[
                'rgba(0,255,255,0.4)',
                'rgba(255,192,203,1)',
                'rgba(255,255,0,0.5)',
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.linearGradient}>
              <Text style={{color: 'white', fontFamily: FontFamily.semibold}}>
                {buttonName}
              </Text>
            </LinearGradient>
          ) : (
            <Text style={styles.buttonText}>{buttonName}</Text>
          )}
        </TouchableOpacity>
      ));
    } else {
      return null;
    }
  };
 
  const renderAvailableCategories = () => {
    return availableCategories.map((category, index) => (
      <TouchableOpacity
        key={index}
        style={styles.modalButton}
        onPress={() => handleAddCategory(category)}>
        <Text style={styles.buttonText}>{category}</Text>
      </TouchableOpacity>
    ));
  };
  const handleAddCategory = category => {
    setSelectedCategories([...selectedCategories, category]);
    setAvailableCategories(availableCategories.filter(cat => cat !== category));
    setSelectedButton(category);
    setModalVisible(false);
  };
 
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  const {dark, toggleTheme} = useStore();
  const {colors} = useTheme();
  const {hasNewNotifications} = route.params || {};
 
  return (
    <View style={{backgroundColor: colors.color_PageColor, height: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.color_TabBarColor,
          height: 56,
        }}>
        <TouchableOpacity
          style={{left: 10, alignSelf: 'center'}}
          onPress={handleDrawerIconPress}>
          <HamBurger color={colors.arrow} />
        </TouchableOpacity>
        <View style={{flex: 1, left: 20, alignSelf: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home', {
                screen: 'HomePage',
                params: {scrollToTop: true},
              });
            }}>
            <AdoroLogos />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', gap: 10}}>
          <>
            <TouchableOpacity
              style={{marginRight: 12, alignSelf: 'center'}}
              onPress={() => navigation.navigate('Notification')}>
              <Notifications color={colors.arrow} />
            </TouchableOpacity>
            {hasNewNotifications && (
              <View
                style={{
                  position: 'absolute',
                  backgroundColor: 'red',
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  top: -5,
                  right: -5,
                }}
              />
            )}
          </>
        </View>
      </View>
      <View style={{backgroundColor: colors.color_TabBarColor}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {renderButtons()}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Add More</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {renderSelectedContent()}
      <Modal
        style={{height: '70%'}}
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <ScrollView>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Category</Text>
            {renderAvailableCategories()}
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};
 
export default HomePage;
 
const styles = StyleSheet.create({
  Title: {
    color: '#07142E',
    fontSize: 20,
    fontFamily: FontFamily.bold,
    textTransform: 'capitalize',
    wordWrap: 'break-word',
  },
  cardBox: {
    marginTop: 5,
    backgroundColor: 'white',
    borderRadius: 0,
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
    borderRadius: 8,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: FontFamily.semibold,
  },
  modalButton: {
    padding: 10,
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
});
 
 
 