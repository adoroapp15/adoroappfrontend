// // import {
// //   SafeAreaView,
// //   StatusBar,
// //   StyleSheet,
// //   Text,
// //   View,
// //   Image,
// //   useWindowDimensions,
// //   TouchableOpacity,
// //   FlatList,
// //   Dimensions,
// // } from 'react-native';
// // import React, {useState, useEffect} from 'react';
// // import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
// // import LinearGradient from 'react-native-linear-gradient';
// // import axios from 'axios';
// // import {config} from '../config';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import Video from 'react-native-video';
// // const MyTemplates = () => (
// //   <View contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
// //     {/* {!posts || posts.length === 0 ? (
// //       <View style={{alignItems: 'center'}}>
// //         <Text style={{alignSelf: 'center'}}>No posts available</Text>
// //       </View>
// //     ) : (
// //       <FlatList
// //         data={posts}
// //         numColumns={3}
// //         renderItem={({item, index}) => (
// //           <View
// //             style={{
// //               flex: 1,
// //               aspectRatio: 1,
// //               margin: 3,
// //             }}>
// //             {item && item.fileName && item.type == 'image' && (
// //               <Image
// //                 key={index}
// //                 source={{
// //                   uri: `https://www.adoro.social/UserPost/${item.fileName}`,
// //                 }}
// //                 style={{width: '100%', height: '100%', borderRadius: 12}}
// //               />
// //             )}
// //             {item.type === 'video' && (
// //               <Image
// //                 key={index}
// //                 source={{
// //                   uri: `https://www.adoro.social/UserPost/${item.fileName}`,
// //                 }}
// //                 style={{width: '100%', height: '100%', borderRadius: 12}}
// //                 resizeMode="cover"
// //                 controls={true}
// //               />
// //             )}
// //           </View>
// //         )}
// //       />
// //     )} */}
// //   </View>
// // );
 
// // const windowWidth = Dimensions.get('window').width;
// // const windowHeight = Dimensions.get('window').height;
 
// // const desiredWidth = 0.2 * windowWidth;
// // const desiredHeight = 0.2 * windowHeight;
// // const Profile = ({navigation, route}) => {
// //   const [follow, setFollow] = useState(false);
// //   const {mobileNo, profil} = route.params || {};
// //   const layout = useWindowDimensions();
// //   const [index, setIndex] = useState(0);
// //   const [user, setUser] = useState(null);
// //   const [posts, setPosts] = useState([]);
// //   const [profile, setProfile] = useState(null);
// //   const [follower, setFollower] = useState([]);
// //   const [following,setFollowing]=useState([])
 
// //   const [isPlaying, setIsPlaying] = React.useState({});
// //   const togglePlayPause = postId => {
// //     setIsPlaying(prevIsPlaying => ({
// //       ...prevIsPlaying,
// //       [postId]: !prevIsPlaying[postId],
// //     }));
// //   };
// //   const [routes] = useState([
// //     {key: 'first', title: 'AllPosts'},
// //     {key: 'second', title: 'My Templates'},
// //   ]);
// //   const AllPosts = () => (
// //     <View contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
// //       {!posts || posts.length === 0 ? (
// //         <View style={{alignItems: 'center'}}>
// //           <Text style={{alignSelf: 'center'}}>No posts available</Text>
// //         </View>
// //       ) : (
// //         <FlatList
// //           data={posts}
// //           numColumns={3}
// //           renderItem={({item, index}) => (
// //             <View
// //               style={{
// //                 flex: 1,
// //                 aspectRatio: 1,
// //                 margin: 3,
// //               }}>
// //               {item && item.fileName && item.type == 'image' && (
// //                 <Image
// //                   key={index}
// //                   source={{
// //                     uri: `https://www.adoro.social/UserPost/${item.fileName}`,
// //                   }}
// //                   style={{width: '100%', height: '100%', borderRadius: 12}}
// //                 />
// //               )}
// //               {item.type === 'video' && (
// //                 <>
// //                   <Video
// //                     key={index}
// //                     source={{
// //                       uri: `https://www.adoro.social/UserPost/${item.fileName}`,
// //                     }}
// //                     style={{width: '100%', height: '100%', borderRadius: 12}}
// //                     resizeMode="cover"
// //                     paused={!isPlaying[item.Id]}
// //                   />
// //                   <TouchableOpacity
// //                     style={{
// //                       // top: 140,
// //                       width: desiredWidth,
// //                       height: desiredHeight,
// //                       flex: 1,
// //                       justifyContent: 'center',
// //                       alignItems: 'center',
// //                       position: 'absolute',
// //                       top: '50%',
// //                       left: '50%',
// //                       marginLeft: -35, // Adjust based on the width of your button
// //                       marginTop: -45,
// //                     }}
// //                     onPress={() => togglePlayPause(item.Id)}>
// //                     {isPlaying[item.Id] ? (
// //                       <Image
// //                         source={require('../assets/pause.png')}
// //                         style={{
// //                           width: 50,
// //                           height: 50,
// //                           backgroundColor: '#fff',
// //                           borderRadius: 25,
// //                         }}
// //                       />
// //                     ) : (
// //                       <Image
// //                         source={require('../assets/play.png')}
// //                         style={{
// //                           width: 50,
// //                           height: 50,
// //                           backgroundColor: '#fff',
// //                           borderRadius: 25,
// //                         }}
// //                       />
// //                     )}
// //                   </TouchableOpacity>
// //                 </>
// //               )}
// //             </View>
// //           )}
// //         />
// //       )}
// //     </View>
// //   );
 
// //   const renderScene = SceneMap({
// //     first: ({posts}) => <AllPosts posts={posts || []} isPlayable={false} />,
// //     second: ({posts}) => <MyTemplates />,
// //   });
 
// //   useEffect(() => {
// //     const fetchProfilePicture = async () => {
// //       try {
// //         const response = await axios.get(
// //           `${config.production}/app/user/userdetails`,
// //           {
// //             params: {mobileNo},
// //           },
// //         );
 
// //         if (response.data.status === 200) {
// //           setUser(response.data.data);
// //           setProfile(response.data.data.ProfileDp);
// //           console.log('Id is',response.data.data.Id)
// //           getfollower(response.data.data.Id)
// //           getfollowers(response.data.data.userName)
// //           getfollowing(response.data.data.Id)
// //         } else {
// //           console.log('Profile Pic not Found');
// //           setProfile(null);
// //         }
 
// //         const res = await axios.get(`${config.production}/app/user/userpost`, {
// //           params: {mobileNo},
// //         });
 
// //         if (res.status == 200) {
// //           setPosts(res.data.posts);
// //         } else {
// //           setPosts([]);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching user data:', error);
// //       }
// //     };
 
// //     fetchProfilePicture();
   
// //   }, []);
 
// //   const getfollower = async Id => {
// //     console.log('Id in this is',Id)
// //     const userString = await AsyncStorage.getItem('user');
 
// //     if (userString) {
// //       const parsedUser = JSON.parse(userString);
   
// //       const res = await axios.get(`${config.production}/app/user/getfollow`, {
// //         params: {Id:parsedUser.userName},
// //       });
 
// //       if (res.status == 200) {
// //         const follower = res.data.followers;
// //         console.log('userrr name and ',Id)
// //         follower.map(item => {
// //           console.log('userrr name and ',Id)
// //           if (item.Follow_id == Id) {
// //             setFollow(true);
// //           }
// //         });
// //       }
// //     }
// //   };
 
 
// //   const getfollowers = async Id => {
// //     console.log('followers')
// //    try{
// //     const res = await axios.get(`${config.production}/app/user/getfollow`, {
// //       params: {Id},
 
// //     });
 
// //     if (res.status == 200) {
// //       const follower = res.data.followers;
// //       setFollowing(res.data.followers)
// //       console.log('userrr name and ',Id)
     
// //     }
// //    }
// //    catch(err){
// //     console.log('Facing the errors ',err)
// //    }
// //   };
 
// //   const getfollowing = async Id =>{
// //     console.log('Followings',Id)
// //     try{
// //       const res = await axios.get(`${config.production}/app/user/getfollowers`, {
// //         params: {Id},
// //       });
 
// //       if (res.status == 200) {
// //         const follower = res.data.followers;
// //        setFollower(follower)
// //       }
// //     }
// //     catch(err){
// //       console.log('Facing error while fetching',err)
// //     }
// //   }
 
// //   const handleFollow = async () => {
// //     try {
// //       const userString = await AsyncStorage.getItem('user');
 
// //       console.log('follow is', user);
// //       if (userString) {
// //         const parsedUser = JSON.parse(userString);
// //         const obj = {
// //           follow_id: user.Id,
// //           userName: parsedUser.userName,
// //         };
// //         console.log('obj is', obj, `${config.production}/app/user/follow`);
 
// //         const response = await axios.post(
// //           `${config.production}/app/user/follow`,
// //           obj,
// //         );
 
// //         if (response.status == 200) {
// //           console.log('Followed');
// //           getfollowing(user.userName)
// //           setFollow(true);
// //         }
// //       }
// //     } catch (err) {
// //       console.log('Facing error', err);
// //     }
// //   };
 
// //   const renderTabBar = props => (
// //     <TabBar
// //       {...props}
// //       indicatorStyle={{
// //         backgroundColor: '#242760',
// //       }}
// //       style={{
// //         backgroundColor: 'white',
// //         height: 44,
// //       }}
// //       renderLabel={({focused, route}) => (
// //         <Text style={[{color: focused ? 'black' : 'gray'}]}>{route.title}</Text>
// //       )}
// //     />
// //   );
 
// //   console.log('follow and following',follower,following)
 
// //   return (
// //     <SafeAreaView
// //       style={{
// //         flex: 1,
// //       }}>
// //       <StatusBar backgroundColor={'gray'} />
// //       <View>
// //         <Image
// //           source={require('../assets/Background.png')}
// //           resizeMode="cover"
// //           style={{
// //             height: 120,
// //             width: '100%',
// //           }}
// //         />
// //       </View>
// //       <View style={{flex: 1, alignItems: 'center'}}>
// //         <Image
// //           source={
// //             profile
// //               ? {uri: `https://www.adoro.social/UserProfilePic/${profile}`}
// //               : require('../assets/Profile.png')
// //           }
// //           resizeMode="contain"
// //           style={{
// //             height: 80,
// //             width: 80,
// //             borderRadius: 999,
// //             borderWidth: 2,
// //             marginTop: -50,
// //           }}
// //         />
// //         <Text
// //           style={{
// //             color: '#07142E',
// //             fontWeight: '800',
// //           }}>
// //           {user ? user.fullName : ''}
// //         </Text>
// //         <Text
// //           style={{
// //             color: '#6F7F92',
// //             fontWeight: '500',
// //           }}>
// //           {user ? user.userName : ''}
// //         </Text>
// //         <View
// //           style={{
// //             paddingVertical: 15,
// //             gap: 50,
// //             flexDirection: 'row',
// //           }}>
// //           <View
// //             style={{
// //               flexDirection: 'column',
// //               alignItems: 'center',
// //               marginHorizontal: 10,
// //             }}>
// //             <Text
// //               style={{
// //                 color: '#6F7F92',
// //               }}>
// //               Posts
// //             </Text>
// //             <Text
// //               style={{
// //                 color: '#07142E',
// //                 fontWeight: '800',
// //               }}>
// //               {posts ? posts.length : 0}
// //             </Text>
// //           </View>
// //           <View
// //             style={{
// //               flexDirection: 'column',
// //               alignItems: 'center',
// //               marginHorizontal: 10,
// //             }}>
// //             <TouchableOpacity
// //               onPress={() => navigation.navigate('Followers/Following',{follower,following})}>
// //               <Text
// //                 style={{
// //                   color: '#6F7F92',
// //                 }}>
// //                 Followers
// //               </Text>
// //             </TouchableOpacity>
// //             <Text
// //               style={{
// //                 color: '#07142E',
// //                 fontWeight: '800',
// //               }}>
// //               {follower.length}
// //             </Text>
// //           </View>
// //           <View
// //             style={{
// //               flexDirection: 'column',
// //               alignItems: 'center',
// //               marginHorizontal: 10,
// //             }}>
// //             <TouchableOpacity
// //               onPress={()  => navigation.navigate('Followers/Following',{follower,following})}>
// //               <Text
// //                 style={{
// //                   color: '#6F7F92',
// //                 }}>
// //                 Following
// //               </Text>
// //             </TouchableOpacity>
// //             <Text
// //               style={{
// //                 color: '#07142E',
// //                 fontWeight: '800',
// //               }}>
// //               {following.length}
// //             </Text>
// //           </View>
// //         </View>
// //         <View>
// //           {!follow ? (
// //             <TouchableOpacity onPress={() => handleFollow()}>
// //               <LinearGradient
// //                 colors={[
// //                   'rgba(0,255,255,0.4)',
// //                   'rgba(255,192,203,1)',
// //                   'rgba(255,255,0,0.5)',
// //                 ]}
// //                 start={{x: 0, y: 0}}
// //                 end={{x: 1, y: 1}}
// //                 style={{
// //                   width: 330,
// //                   height: 36,
// //                   alignItems: 'center',
// //                   justifyContent: 'center',
// //                   backgroundColor: '#FFFFFF',
// //                   borderRadius: 10,
// //                   marginHorizontal: 8,
// //                 }}>
// //                 <Text
// //                   style={{
// //                     color: 'white',
// //                     alignItems: 'center',
// //                     fontWeight: '800',
// //                   }}>
// //                   Follow
// //                 </Text>
// //               </LinearGradient>
// //             </TouchableOpacity>
// //           ) : (
// //             <View style={{flexDirection: 'row'}}>
// //               <TouchableOpacity
// //                 style={{
// //                   width: 165,
// //                   height: 36,
// //                   alignItems: 'center',
// //                   justifyContent: 'center',
// //                   backgroundColor: '#FFFFFF',
// //                   borderRadius: 10,
// //                   marginHorizontal: 8,
// //                 }}
// //                 onPress={() => setFollow(false)}>
// //                 <Text>Following</Text>
// //               </TouchableOpacity>
// //               <TouchableOpacity
// //                 style={{
// //                   width: 165,
// //                   height: 36,
// //                   alignItems: 'center',
// //                   justifyContent: 'center',
// //                   backgroundColor: '#FFFFFF',
// //                   borderRadius: 10,
// //                   marginHorizontal: 8,
// //                 }}
// //                 onPress={() => navigation.navigate('Chat')}>
// //                 <Text>Message</Text>
// //               </TouchableOpacity>
// //             </View>
// //           )}
// //         </View>
// //       </View>
// //       <View
// //         style={{
// //           flex: 1,
// //           marginHorizontal: 22,
// //           marginTop: -170,
// //           backgroundColor: 'white',
// //         }}>
// //         <TabView
// //           navigationState={{index, routes}}
// //           renderScene={props => renderScene({...props, posts})}
// //           initialLayout={{width: layout.width}}
// //           onIndexChange={setIndex}
// //           renderTabBar={renderTabBar}
// //         />
// //       </View>
// //     </SafeAreaView>
// //   );
// // };
 
// // export default Profile;
 
// // const styles = StyleSheet.create({});


// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   useWindowDimensions,
//   TouchableOpacity,
//   FlatList,
//   Dimensions,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
// import LinearGradient from 'react-native-linear-gradient';
// import axios from 'axios';
// import {config} from '../config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Video from 'react-native-video';
// const MyTemplates = () => (
//   <View contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
//     {/* {!posts || posts.length === 0 ? (
//       <View style={{alignItems: 'center'}}>
//         <Text style={{alignSelf: 'center'}}>No posts available</Text>
//       </View>
//     ) : (
//       <FlatList
//         data={posts}
//         numColumns={3}
//         renderItem={({item, index}) => (
//           <View
//             style={{
//               flex: 1,
//               aspectRatio: 1,
//               margin: 3,
//             }}>
//             {item && item.fileName && item.type == 'image' && (
//               <Image
//                 key={index}
//                 source={{
//                   uri: `https://www.adoro.social/UserPost/${item.fileName}`,
//                 }}
//                 style={{width: '100%', height: '100%', borderRadius: 12}}
//               />
//             )}
//             {item.type === 'video' && (
//               <Image
//                 key={index}
//                 source={{
//                   uri: `https://www.adoro.social/UserPost/${item.fileName}`,
//                 }}
//                 style={{width: '100%', height: '100%', borderRadius: 12}}
//                 resizeMode="cover"
//                 controls={true}
//               />
//             )}
//           </View>
//         )}
//       />
//     )} */}
//   </View>
// );

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// const desiredWidth = 0.2 * windowWidth;
// const desiredHeight = 0.2 * windowHeight;
// const Profile = ({navigation, route}) => {
//   const [follow, setFollow] = useState(false);
//   const {mobileNo, profil} = route.params || {};
//   const layout = useWindowDimensions();
//   const [index, setIndex] = useState(0);
//   const [user, setUser] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [profile, setProfile] = useState(null);
//   const [follower, setFollower] = useState([]);
//   const [following,setFollowing]=useState([])

//   const [isPlaying, setIsPlaying] = React.useState({});
//   const togglePlayPause = postId => {
//     setIsPlaying(prevIsPlaying => ({
//       ...prevIsPlaying,
//       [postId]: !prevIsPlaying[postId],
//     }));
//   };
//   const [routes] = useState([
//     {key: 'first', title: 'All Posts'},
//     {key: 'second', title: 'My Templates'},
//   ]);
//   const AllPosts = () => (
//     <View contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
//       {!posts || posts.length === 0 ? (
//         <View style={{alignItems: 'center'}}>
//           <Text style={{alignSelf: 'center'}}>No posts available</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={posts}
//           numColumns={3}
//           renderItem={({item, index}) => (
//             <View
//               style={{
//                 flex: 1,
//                 aspectRatio: 1,
//                 margin: 3,
//               }}>
//               {item && item.fileName && item.type == 'image' && (
//                 <TouchableOpacity
//                 onPress={() => navigation.navigate('All Post', {posts})}>
//                 <Image
//                   key={index}
//                   source={{
//                     uri: `https://www.adoro.social/UserPost/${item.fileName}`,
//                   }}
//                   style={{width: '100%', height: '100%', borderRadius: 12}}
//                 />
//                 </TouchableOpacity>
//               )}
//               {item.type === 'video' && (
//                 <>
//                  <TouchableOpacity
//                     onPress={() => navigation.navigate('All Post', {posts})}>
//                   <Video
//                     key={index}
//                     source={{
//                       uri: `https://www.adoro.social/UserPost/${item.fileName}`,
//                     }}
//                     style={{width: '100%', height: '100%', borderRadius: 12}}
//                     resizeMode="cover"
//                     paused={!isPlaying[item.Id]}
//                   />
//                   <TouchableOpacity
//                     style={{
//                       // top: 140,
//                       width: desiredWidth,
//                       height: desiredHeight,
//                       flex: 1,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       position: 'absolute',
//                       top: '50%',
//                       left: '50%',
//                       marginLeft: -35, // Adjust based on the width of your button
//                       marginTop: -45,
//                     }}
//                     onPress={() => togglePlayPause(item.Id)}>
//                     {isPlaying[item.Id] ? (
//                       <Image
//                         source={require('../assets/pause.png')}
//                         style={{
//                           width: 50,
//                           height: 50,
//                           backgroundColor: '#fff',
//                           borderRadius: 25,
//                         }}
//                       />
//                     ) : (
//                       <Image
//                         source={require('../assets/play.png')}
//                         style={{
//                           width: 50,
//                           height: 50,
//                           backgroundColor: '#fff',
//                           borderRadius: 25,
//                         }}
//                       />
//                     )}
//                   </TouchableOpacity>
//                   </TouchableOpacity>
//                 </>
//               )}
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );

//   const renderScene = SceneMap({
//     first: ({posts}) => <AllPosts posts={posts || []} isPlayable={false} />,
//     second: ({posts}) => <MyTemplates />,
//   });

//   useEffect(() => {
//     const fetchProfilePicture = async () => {
//       try {
//         const response = await axios.get(
//           `${config.production}/app/user/userdetails`,
//           {
//             params: {mobileNo},
//           },
//         );

//         if (response.data.status === 200) {
//           setUser(response.data.data);
//           setProfile(response.data.data.ProfileDp);
//           console.log('Id is',response.data.data.Id)
//           getfollower(response.data.data.Id)
//           getfollowers(response.data.data.userName)
//           getfollowing(response.data.data.Id)
//         } else {
//           console.log('Profile Pic not Found');
//           setProfile(null);
//         }

//         const res = await axios.get(`${config.production}/app/user/userpost`, {
//           params: {mobileNo},
//         });

//         if (res.status == 200) {
//           setPosts(res.data.posts);
//         } else {
//           setPosts([]);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchProfilePicture();
    
//   }, []);

//   const getfollower = async Id => {
//     console.log('Id in this is',Id)
//     const userString = await AsyncStorage.getItem('user');

//     if (userString) {
//       const parsedUser = JSON.parse(userString);
    
//       const res = await axios.get(`${config.production}/app/user/getfollow`, {
//         params: {Id:parsedUser.userName},
//       });

//       if (res.status == 200) {
//         const follower = res.data.followers;
//         console.log('userrr name and ',Id)
//         follower.map(item => {
//           console.log('userrr name and ',Id)
//           if (item.Follow_id == Id) {
//             setFollow(true);
//           }
//         });
//       }
//     }
//   };

  
//   const getfollowers = async Id => {
//     console.log('followers')
//    try{
//     const res = await axios.get(`${config.production}/app/user/getfollow`, {
//       params: {Id},

//     });

//     if (res.status == 200) {
//       const follower = res.data.followers;
//       setFollowing(res.data.followers)
//       console.log('userrr name and ',Id)
      
//     }
//    }
//    catch(err){
//     console.log('Facing the errors ',err)
//    }
//   };

//   const getfollowing = async Id =>{
//     console.log('Followings',Id)
//     try{
//       const res = await axios.get(`${config.production}/app/user/getfollowers`, {
//         params: {Id},
//       });

//       if (res.status == 200) {
//         const follower = res.data.followers;
//        setFollower(follower)
//       }
//     }
//     catch(err){
//       console.log('Facing error while fetching',err)
//     }
//   }

//   const handleFollow = async () => {
//     try {
//       const userString = await AsyncStorage.getItem('user');

//       console.log('follow is', user);
//       if (userString) {
//         const parsedUser = JSON.parse(userString);
//         const obj = {
//           follow_id: user.Id,
//           userName: parsedUser.userName,
//         };
//         console.log('obj is', obj, `${config.production}/app/user/follow`);

//         const response = await axios.post(
//           `${config.production}/app/user/follow`,
//           obj,
//         );

//         if (response.status == 200) {
//           console.log('Followed');
//           getfollowing(user.userName)
//           setFollow(true);
//         }
//       }
//     } catch (err) {
//       console.log('Facing error', err);
//     }
//   };

//   const renderTabBar = props => (
//     <TabBar
//       {...props}
//       indicatorStyle={{
//         backgroundColor: '#242760',
//       }}
//       style={{
//         backgroundColor: 'white',
//         height: 44,
//       }}
//       renderLabel={({focused, route}) => (
//         <Text style={[{color: focused ? 'black' : 'gray'}]}>{route.title}</Text>
//       )}
//     />
//   );

//   console.log('follow and following',follower,following)

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//       }}>
//       <StatusBar backgroundColor={'gray'} />
//       <View>
//         <Image
//           source={require('../assets/Background.png')}
//           resizeMode="cover"
//           style={{
//             height: 120,
//             width: '100%',
//           }}
//         />
//       </View>
//       <View style={{flex: 1, alignItems: 'center'}}>
//         <Image
//           source={
//             profile
//               ? {uri: `https://www.adoro.social/UserProfilePic/${profile}`}
//               : require('../assets/Profile.png')
//           }
//           resizeMode="contain"
//           style={{
//             height: 80,
//             width: 80,
//             borderRadius: 999,
//             borderWidth: 2,
//             marginTop: -50,
//           }}
//         />
//         <Text
//           style={{
//             color: '#07142E',
//             fontWeight: '800',
//           }}>
//           {user ? user.fullName : ''}
//         </Text>
//         <Text
//           style={{
//             color: '#6F7F92',
//             fontWeight: '500',
//           }}>
//           {user ? '@'+ user.userName : ''}
//         </Text>
//         <View
//           style={{
//             paddingVertical: 15,
//             gap: 50,
//             flexDirection: 'row',
//           }}>
//           <View
//             style={{
//               flexDirection: 'column',
//               alignItems: 'center',
//               marginHorizontal: 10,
//             }}>
//             <Text
//               style={{
//                 color: '#6F7F92',
//               }}>
//               Posts
//             </Text>
//             <Text
//               style={{
//                 color: '#07142E',
//                 fontWeight: '800',
//               }}>
//               {posts ? posts.length : 0}
//             </Text>
//           </View>
//           <View
//             style={{
//               flexDirection: 'column',
//               alignItems: 'center',
//               marginHorizontal: 10,
//             }}>
//             <TouchableOpacity
//               onPress={() => navigation.navigate('Followers/Following',{follower,following,user})}>
//               <Text
//                 style={{
//                   color: '#6F7F92',
//                 }}>
//                 Followers
//               </Text>
//             </TouchableOpacity>
//             <Text
//               style={{
//                 color: '#07142E',
//                 fontWeight: '800',
//               }}>
//               {follower.length}
//             </Text>
//           </View>
//           <View
//             style={{
//               flexDirection: 'column',
//               alignItems: 'center',
//               marginHorizontal: 10,
//             }}>
//             <TouchableOpacity
//               onPress={()  => navigation.navigate('Followers/Following',{follower,following,user})}>
//               <Text
//                 style={{
//                   color: '#6F7F92',
//                 }}>
//                 Following
//               </Text>
//             </TouchableOpacity>
//             <Text
//               style={{
//                 color: '#07142E',
//                 fontWeight: '800',
//               }}>
//               {following.length}
//             </Text>
//           </View>
//         </View>
//         <View>
//           {!follow ? (
//             <TouchableOpacity onPress={() => handleFollow()}>
//               <LinearGradient
//                 colors={[
//                   'rgba(0,255,255,0.4)',
//                   'rgba(255,192,203,1)',
//                   'rgba(255,255,0,0.5)',
//                 ]}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 1}}
//                 style={{
//                   width: 330,
//                   height: 36,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   backgroundColor: '#FFFFFF',
//                   borderRadius: 10,
//                   marginHorizontal: 8,
//                 }}>
//                 <Text
//                   style={{
//                     color: 'white',
//                     alignItems: 'center',
//                     fontWeight: '800',
//                   }}>
//                   Follow
//                 </Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           ) : (
//             <View style={{flexDirection: 'row'}}>
//               <TouchableOpacity
//                 style={{
//                   width: 165,
//                   height: 36,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   backgroundColor: '#FFFFFF',
//                   borderRadius: 10,
//                   marginHorizontal: 8,
//                 }}
//                 onPress={() => setFollow(false)}>
//                 <Text>Following</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={{
//                   width: 165,
//                   height: 36,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   backgroundColor: '#FFFFFF',
//                   borderRadius: 10,
//                   marginHorizontal: 8,
//                 }}
//                 onPress={() => navigation.navigate('Chat')}>
//                 <Text>Message</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       </View>
//       <View
//         style={{
//           flex: 1,
//           // marginHorizontal: 22,
//           marginTop: -170,
//           backgroundColor: 'white',
//         }}>
//         <TabView
//           navigationState={{index, routes}}
//           renderScene={props => renderScene({...props, posts})}
//           initialLayout={{width: layout.width}}
//           onIndexChange={setIndex}
//           renderTabBar={renderTabBar}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Profile;

// const styles = StyleSheet.create({});






import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Animated,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {config} from '../config';
import Video from 'react-native-video';
import FontFamily from '../common/components/FontFamily';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../assets/svg/BackArrow';
import {useTheme} from '@react-navigation/native';
import AllPostTemplatesTypeOptions from '../UserProfile/AllPostTemplatesTypeOptions';
import Size from '../common/components/Size';

const MyTemplates = () => (
  <View contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}} />
);
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const desiredWidth = 0.2 * windowWidth;
const desiredHeight = 0.2 * windowHeight;


const UserProfile = ({navigation,route}) => {
  const layout = useWindowDimensions();
  const {width, height} = Dimensions.get('window');
  const imageSize = Math.min(width, height) * 0.8;
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [accountType, setaccountType] = useState(1);
  const [follow, setFollow] = useState(false);
  const {mobileNo, profil} = route.params || {};
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isPlaying, setIsPlaying] = React.useState({});
  const togglePlayPause = postId => {
    setIsPlaying(prevIsPlaying => ({
      ...prevIsPlaying,
      [postId]: !prevIsPlaying[postId],
    }));
  };
  const [routes] = useState([
    {key: 'first', title: 'All posts'},
    {key: 'second', title: 'My templates'},
  ]);
  const handleRefresh = () => {
    setPage(1);
    setHasMore(true);
  };
  useFocusEffect(
    React.useCallback(() => {
      handleRefresh();
    }, []),
  );
  const onEndReached = () => {
    if (hasMore && !loading) {
      setPage(page + 1);
    }
  };
  const AllPosts = () => (
    <View
      contentContainerStyle={{flex: 1, justifyContent: 'center', zIndex: 1, }}>
      {!posts || posts.length === 0 ? (
        <View style={{alignItems: 'center' ,  height:"80%", width:"100%" ,justifyContent:"center"}}>
          <Text style={{fontFamily:FontFamily.semibold, color:"gray"}}>No posts available</Text>
        </View>
      ) : (
        <FlatList
          data={posts.slice().reverse()}
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
                    navigation.navigate('All Post', {posts, indexToScroll: index})
                  }>
                  <Image
                    key={index}
                                        source={{
                                          uri: `https://www.adoro.social/UserPost/${item.fileName}`,
                                        }}
                                        style={{width: '100%', height: '100%', borderRadius: 12}}
                  />
                </TouchableOpacity>
              )}
              {item.type === 'video' && (
                <>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('All Post', {posts})}>
                    <Video
                      key={index}
                      source={{
                        uri: `https://www.adoro.social/UserPost/${item.fileName}`,
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
      )}
    </View>
  );

  const renderScene = SceneMap({
    first: ({posts}) => <AllPosts posts={posts || []} isPlayable={false} />,
    second: ({posts}) => <MyTemplates />,
  });
  useEffect(() => {
        const fetchProfilePicture = async () => {
          try {
            const response = await axios.get(
              `${config.production}/app/user/userdetails`,
              {
                params: {mobileNo},
              },
            );
     
            if (response.data.status === 200) {
              setUser(response.data.data);
              setProfile(response.data.data.ProfileDp);
              console.log('Id is',response.data.data.Id)
              getfollower(response.data.data.Id)
              getfollowers(response.data.data.userName)
              getfollowing(response.data.data.Id)
            } else {
              console.log('Profile Pic not Found');
              setProfile(null);
            }
     
            const res = await axios.get(`${config.production}/app/user/userpost`, {
              params: {mobileNo},
            });
     
            if (res.status == 200) {
              setPosts(res.data.posts);
            } else {
              setPosts([]);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
     
        fetchProfilePicture();
       
      }, []);
     
      const getfollower = async Id => {
        console.log('Id in this is',Id)
        const userString = await AsyncStorage.getItem('user');
        const otherString = await AsyncStorage.getItem('token');

     
        if (userString && otherString) {
          const parsedUser = JSON.parse(userString, otherString);
       
          const res = await axios.get(`${config.production}/app/user/getfollow`, {
            params: {Id:parsedUser.userName},
          });
     
          if (res.status == 200) {
            const follower = res.data.followers;
            console.log('userrr name and ',Id)
            follower.map(item => {
              console.log('userrr name and ',Id)
              if (item.Follow_id == Id) {
                setFollow(true);
              }
            });
          }
        }
      };
     
     
      const getfollowers = async Id => {
        console.log('followers')
       try{
        const res = await axios.get(`${config.production}/app/user/getfollow`, {
          params: {Id},
     
        });
     
        if (res.status == 200) {
          const follower = res.data.followers;
          setFollowing(res.data.followers)
          console.log('userrr name and ',Id)
         
        }
       }
       catch(err){
        console.log('Facing the errors ',err)
       }
      };
     
      const getfollowing = async Id =>{
        console.log('Followings',Id)
        try{
          const res = await axios.get(`${config.production}/app/user/getfollowers`, {
            params: {Id},
          });
     
          if (res.status == 200) {
            const follower = res.data.followers;
           setFollower(follower)
          }
        }
        catch(err){
          console.log('Facing error while fetching',err)
        }
      }
     
      const handleFollow = async () => {
        try {
          const userString = await AsyncStorage.getItem('user');
          const otherString = await AsyncStorage.getItem('token');

     
          console.log('follow is', user);
          if (userString && otherString) {
            const parsedUser = JSON.parse(userString, otherString);
            const obj = {
              follow_id: user.Id,
              userName: parsedUser.userName,
            };
            console.log('obj is', obj, `${config.production}/app/user/follow`);
     
            const response = await axios.post(
              `${config.production}/app/user/follow`,
              obj,
            );
     
            if (response.status == 200) {
              console.log('Followed');
              getfollowing(user.userName)
              setFollow(true);
            }
          }
        } catch (err) {
          console.log('Facing error', err);
        }
      };
     

  

const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: '#242760',
      }}
      // activeColor={'black'}
      // inactiveColor={'gray'}
      style={{
        backgroundColor: colors.color_TabBarColor,
        height: 44,
        marginLeft: 10,
        marginRight: 10,
        elevation: 0,
      }}
      renderLabel={({focused, route}) => (
        <Text
          style={[
            {
              color: focused ? colors.color_TextNormal : 'gray',
              fontFamily: FontFamily.semibold,
            },
          ]}>
          {route.title}
        </Text>
      )}
    />
  );
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Updated onPress handler for the overlay
  const closeOverlay = () => {
    if (modalVisible) {
      toggleModal();
    }
  };


  const imagePick = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
      });

      if (image) {
        const formData = new FormData();
        formData.append('image', {
          uri: image.path,
          type: image.mime,
          name: 'profile.jpg',
        });
        formData.append('mobileNo', user.mobileNo);
        console.log('formm dataaaa', formData);
        try {
          const response = await axios.post(
            `${config.production}/app/user/updatewallpaper`,

            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          );

          console.log('response is', response);
          if (response.data.status === 200) {
            console.log('Wallpaper updated successfully');
          } else {
            console.log('Error updating wallpaper:', response.data.message);
          }
        } catch (error) {
          console.log('Error updating wallpaper:', error);
        }
      }
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };
  const {colors} = useTheme();

  console.log('tttttttttttttttttt', user, profile);
  console.log('profileeee is ', profile);
  return (
    <View style={{backgroundColor: colors.color_PageColor}}>
      <FlatList
          data={posts.slice().reverse()}
          numColumns={3}
          renderItem={({item, index}) => (  
                
                  (accountType === 1) ?  
                  <>
                {!posts || posts.length === 0 ? (
        <View style={{alignItems: 'center' ,  height:"80%", width:"100%" ,justifyContent:"center"}}>
          <Text style={{fontFamily:FontFamily.semibold, color:"gray"}}>No posts available</Text>
        </View>
      ) : (   
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
                    navigation.navigate('All Post', {posts, indexToScroll: index})
                  }>
                  <Image
                    key={index}
                    source={{
                      uri: `https://www.adoro.social/UserPost/${item.fileName}`,
                    }}
                    style={{width: '100%', height: '100%', borderRadius: 12}}
                  />
                </TouchableOpacity>
              )}
              {item.type === 'video' && (
                <>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('All Post', {posts})}>
                    <Video
                      key={index}
                      source={{
                        uri: `https://www.adoro.social/UserPost/${item.fileName}`,
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
            </>
            :
            <MyTemplates />
                        
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
          ListHeaderComponent={()=>
          <>
            <View>
            <TouchableOpacity style={styles.backgroundContainer}>
             <Image
                  source={
                                      user.wallPaper
                                        ? {
                                            uri: `https://www.adoro.social/UserWallpaper/${user.wallPaper}`,
                                          }
                                        : require('../assets/Background.png')
                                    }
                                    resizeMode="cover"
                                    style={{
                                      height: 120,
                                      width: '100%',
                                    }}
              />
              {/* <View style={styles.chooseButtonContainer}>
                <TouchableOpacity
                  style={styles.chooseButton}
                  onPress={imagePick}>
                  <Image
                    style={styles.chooseButtonText}
                    source={require('../assets/editable.png')}
                  />
                </TouchableOpacity>
              </View> */}
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableOpacity onPress={toggleModal}>
              <Image
                source={
                  profile
                    ? {
                        uri: `https://www.adoro.social/UserProfilePic/${profile}`,
                      }
                    : require('../assets/Profile.png')
                }
                resizeMode="contain"
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 999,
                  borderWidth: 2,
                  marginTop: -50,
                }}
              />
            </TouchableOpacity>

            <Text
              style={{
                color: colors.color_TextNormal,
                // fontWeight: '800',
                fontFamily: FontFamily.semibold,
              }}>
              {user ? user.fullName : ''}
            </Text>
            <Text
              style={{
                color: colors.color_color_TextNormal,
                // fontWeight: '500',
                fontFamily: FontFamily.medium,
                fontSize: Size.subtitle,
              }}>
              {user ? '@' + user.userName : ''}
            </Text>
            <View
              style={{
                paddingVertical: 15,
                gap: 50,
                flexDirection: 'row',
                flex:1,
                justifyContent:'center',
                alignItems:'center',
                marginLeft:25,
                width:'100%'
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginHorizontal: 10,
                }}>
                <Text
                  style={{
                    color: colors.color_TextNormal,
                    fontFamily: FontFamily.semibold,
                  }}>
                  Posts
                </Text>
                <Text
                  style={{
                    color: colors.color_TextNormal,
                    // fontWeight: '800',
                    fontFamily: FontFamily.semibold,
                  }}>
                  {posts ? posts.length : 0}
                </Text>
              </View>
              <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Followers/Following', {
                      follower,
                      following,
                      user,
                    })
                  }>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginHorizontal: 10,
                }}>
                  <Text
                    style={{
                      color: colors.color_TextNormal,
                      fontFamily: FontFamily.semibold,
                    }}>
                    Followers
                  </Text>
                
                <Text
                  style={{
                    color: colors.color_TextNormal,
                    // fontWeight: '800',
                    fontFamily: FontFamily.semibold,
                  }}>
                  {follower.length}
                </Text>
              </View>
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={() => () =>
                    navigation.navigate('Followers/Following', {
                      follower,
                      following,
                      user,
                    })}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginHorizontal: 10,
                }}>
              
                  <Text
                    style={{
                      color: colors.color_TextNormal,
                      fontFamily: FontFamily.semibold,
                    }}>
                    Following
                  </Text>
                
                <Text
                  style={{
                    color: colors.color_TextNormal,
                    // fontWeight: '800',
                    fontFamily: FontFamily.semibold,
                  }}>
                  {following.length}
                </Text>
              </View>
              </TouchableOpacity>
            </View>
            <View style={{width: '100%'}}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
          {!follow ? (
            <TouchableOpacity onPress={() => handleFollow()}>
              <LinearGradient
                colors={[
                  'rgba(0,255,255,0.4)',
                  'rgba(255,192,203,1)',
                  'rgba(255,255,0,0.5)',
                ]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{
                  width: 330,
                  height: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  marginHorizontal: 8,
                }}>
                <Text
                  style={{
                    color: 'white',
                    alignItems: 'center',
                    fontWeight: '800',
                  }}>
                  Follow
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  width: 330,
                  height: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  marginHorizontal: 8,
                }}
                onPress={() => setFollow(false)}>
                <Text style={{color:'black'}}>Following</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={{
                  width: 165,
                  height: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  marginHorizontal: 8,
                }}
                onPress={() => navigation.navigate('Chat')}>
                <Text>Message</Text>
              </TouchableOpacity> */}
            </View>
          )}
        </View>
             <AllPostTemplatesTypeOptions
                accountType={accountType}
                setaccountType={setaccountType}
                style={{marginTop:15,marginHorizontal:5,borderRadius:5}}
            />
              {/* <View
                style={{
                  // flex: 1,
                  height: '100%',
                  // marginHorizontal: 12,
                  marginTop: 10,
                  borderRadius: 0,
                  // marginTop: -130,
                  backgroundColor: colors.color_TabBarColor,
                }}>
                <TabView
                  navigationState={{index, routes}}
                  renderScene={props => renderScene({...props, posts})}
                  initialLayout={{width: layout.width}}
                  onIndexChange={setIndex}
                  renderTabBar={renderTabBar}
                />
              </View> */}
            </View>
          </View>
</>

          }
        />
      <Modal
        style={{margin: 0}}
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1} // This ensures the touch doesn't propagate to components behind the overlay
            >
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
            <View style={styles.imageContainer}>
              <Image
                source={
                  profile
                    ? {
                        uri: `https://www.adoro.social/UserProfilePic/${profile}`,
                      }
                    : require('../assets/Profile.png')
                }
                resizeMode="contain"
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 0,
    zIndex: 1,
  },
  closeText: {
    color: 'white',
    fontSize: 18,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width:
      Math.min(
        Dimensions.get('window').width,
        Dimensions.get('window').height,
      ) * 0.8,
    height:
      Math.min(
        Dimensions.get('window').width,
        Dimensions.get('window').height,
      ) * 0.8,
    borderRadius:
      Math.min(
        Dimensions.get('window').width,
        Dimensions.get('window').height,
      ) * 0.4, // Make the image circular
  },
  backgroundContainer: {
    position: 'relative',
  },
  chooseButtonContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  chooseButtonText: {
    height: 30,
    width: 30,
    bottom: 75,
    left: 160,
  },
});
