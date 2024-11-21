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
  Alert,
  RefreshControl,
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
import BackArrow from '../assets/svg/BackArrow';
import {useTheme} from '@react-navigation/native';
import AllPostTemplatesTypeOptions from './AllPostTemplatesTypeOptions';
import PencilIcon from '../assets/svg/PencilIcon';
import CancelIcon from '../assets/svg/CancelIcon';
import Size from '../common/components/Size';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const desiredWidth = 0.2 * windowWidth;
const desiredHeight = 0.2 * windowHeight;
const UserProfile = ({navigation, route}) => {
  const layout = useWindowDimensions();
  const {width, height} = Dimensions.get('window');
  const [refreshing, setRefreshing] = useState(false);
  const imageSize = Math.min(width, height) * 0.8;
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [accountType, setaccountType] = useState(1);

  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isPlaying, setIsPlaying] = React.useState({});
  const onRefresh = () => {
    setRefreshing(true);
    handleRefresh();
    setRefreshing(false);
  };
  const togglePlayPause = postId => {
    setIsPlaying(prevIsPlaying => ({
      ...prevIsPlaying,
      [postId]: !prevIsPlaying[postId],
    }));
  };
  const [scrollToTop, setScrollToTop] = useState(false);

  const flatListRef = React.useRef(null);

  useEffect(() => {

    if (route.params?.scrollToTop) {
      flatListRef.current.scrollToOffset({animated: true, offset: 0});
      setScrollToTop(false);
      navigation.setParams({scrollToTop: false});
    }
  }, [route.params?.scrollToTop]);
  const MyTemplates = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No templates available</Text>
      </View>
    );
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
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        zIndex: 1,
      }}>
      {!posts || posts.length === 0 ? (
        <View
          style={{
            alignItems: 'center',
            height: '80%',
            width: '100%',
            justifyContent: 'center',
          }}>
          <Text style={{fontFamily: FontFamily.semibold, color: 'gray'}}>
            No posts available
          </Text>
        </View>
      ) : (
        <FlatList
          data={posts}
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
                    navigation.navigate('All Post', {
                      posts,
                      indexToScroll: index,
                    })
                  }>
                  <Image
                    key={index}
                    source={{
                      uri: `https://adoro-data-storage.s3.ap-south-1.amazonaws.com/UserPost/${item.fileName}`,
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
                        uri: `https://adoro-data-storage.s3.ap-south-1.amazonaws.com/UserPost/${item.fileName}`,
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
        const userString = await AsyncStorage.getItem('user');
        const otherString = await AsyncStorage.getItem('token');


        if (userString && otherString) {
          const parsedUser = JSON.parse(userString, otherString);

          const response = await axios.get(
            `${config.production}/app/user/userdetails`,
            {
              params: {mobileNo: parsedUser.mobileNo},
            },
          );

          if (response.data.status === 200) {
            setUser(response.data.data);

            setProfile(response.data.data.ProfileDp);
            getfollowers(response.data.data.userName);
            getfollowing(response.data.data.Id);
          } else {
            setProfile(null);
          }

          const res = await axios.get(
            `${config.production}/app/user/userpost`,
            {
              params: {mobileNo: parsedUser.mobileNo},
            },
          );

          if (res.status == 200) {
            setPosts(res.data.posts);
          } else {
            setPosts([]);
          }
        }
      } catch (error) {
      }
    };

    fetchProfilePicture();
  }, []);

  const getfollowers = async Id => {
    try {
      const res = await axios.get(`${config.production}/app/user/getfollow`, {
        params: {Id},
      });

      if (res.status == 200) {
        const follower = res.data.followers;
        setFollowing(res.data.followers);
      }
    } catch (err) {
      console.log('Facing the errors ', err);
    }
  };

  const getfollowing = async Id => {
    try {
      const res = await axios.get(
        `${config.production}/app/user/getfollowers`,
        {
          params: {Id},
        },
      );

      if (res.status == 200) {
        const follower = res.data.followers;
        setFollower(follower);
      }
    } catch (err) {
      console.log('Facing error while fetching', err);
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
  const [data, setData] = useState([]);

  useEffect(() => {
    getTemplate();
  }, []);

  const getTemplate = async () => {
    try {
      const userr = await AsyncStorage.getItem('user');
      const parsedUser = JSON.parse(userr);
      setUser(parsedUser);

      const res = await axios.get(
        `${config.production}/app/user/getusertemplate`,
        {
          params: {user: parsedUser.userName},
        },
      );
      if (res.status == 200) {
        // Alert.alert(JSON.stringify(res.data.templates.length));
        setData(res.data.templates);
        // setData([])
      }
    } catch (err) {
      console.log('Getting Error');
    }
  };
  return (
    <View style={{backgroundColor: colors.color_PageColor}}>
      <FlatList
        data={accountType === 1 ? posts.slice().reverse() : data}
        numColumns={3}
        keyExtractor={item => item.Id.toString()}
        onRefresh={onRefresh}
        renderItem={({item, index}) =>
          accountType === 1 ? (
            <>
              {!posts || posts.length === 0 ? (
                <Text
                  style={{
                    color: colors.color_TextNormal,
                    fontSize: Size.title,
                    fontFamily: FontFamily.semibold,
                    // lineHeight: 24,
                    // wordWrap: 'break-word',
                    // marginLeft: 10,
                  }}>
                  No post available
                </Text>
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
                        navigation.navigate('All Post', {
                          posts,
                          indexToScroll: index,
                        })
                      }>
                      <Image
                        key={index}
                        source={{
                          uri: `https://adoro-data-storage.s3.ap-south-1.amazonaws.com/UserPost/${item.fileName}`,
                        }}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 12,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                  {item.type === 'video' && (
                    <>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('All Post', {posts})
                        }>
                        <Video
                          key={index}
                          source={{
                            uri: `https://adoro-data-storage.s3.ap-south-1.amazonaws.com/UserPost/${item.fileName}`,
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 12,
                          }}
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
          ) : (
            <>
              {!data || data.length === 0 ? (
                <View
                  style={{
                    alignItems: 'center',
                    height: '80%',
                    width: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{fontFamily: FontFamily.semibold, color: 'gray'}}>
                    No templates available
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    aspectRatio: 1,
                    margin: 3,
                    marginTop: 20,
                  }}>
                  {item && item.fileName && (
                     <TouchableOpacity
                     onPress={() =>
                       navigation.navigate('MyTemplatesPost', {
                        data
                        
                       })
                     }>
                      <Image
                        key={index}
                        source={{
                          uri: `https://adoro-data-storage.s3.ap-south-1.amazonaws.com/UserTemplate/${item.fileName}`,
                        }}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 12,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </>
          )
        }
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
        ListHeaderComponent={() => (
          <>
            <View>
              <TouchableOpacity style={styles.backgroundContainer}>
                <Image
                  source={
                    user.wallPaper
                      ? {
                          uri: `https://adoro-data-storage.s3.ap-south-1.amazonaws.com/UserWallpaper/${user.wallPaper}`,
                        }
                      : require('../assets/Background.png')
                  }
                  resizeMode="cover"
                  style={{
                    height: 120,
                    width: '100%',
                  }}
                />
                <View style={styles.chooseButtonContainer}>
                  <TouchableOpacity
                    style={styles.chooseButton}
                    onPress={imagePick}>
                    {/* <Image
                      style={styles.chooseButtonText}
                      source={require('../assets/editable.png')}
                    /> */}
                    {/* <PencilIcon /> */}
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        backgroundColor: '#2F65B9',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'flex-end',
                        marginTop: 10,
                        marginRight: 10,
                        borderColor: 'white',
                        borderWidth: 1,

                        // height: 30,
                        // width: 30,
                        //  bottom: 70,
                        // left: 100,
                      }}>
                      <PencilIcon />
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity onPress={toggleModal}>
                <Image
                  source={
                    profile
                      ? {
                          uri: `https://adoro-data-storage.s3.ap-south-1.amazonaws.com/UserProfilePic/${profile}`,
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
                  fontSize: Size.title,
                  fontFamily: FontFamily.semibold,
                }}>
                {user ? user.fullName : ''}
              </Text>
              <Text
                style={{
                  color: colors.color_TextNormal,
                  fontSize: Size.subtitle,
                  // fontWeight: '500',
                  fontFamily: FontFamily.medium,
                }}>
                {user ? '@' + user.userName : ''}
              </Text>
              <View
                style={{
                  // paddingVertical: 15,
                  // gap: 50,
                  flexDirection: 'row',
                  flex: 1,
                  marginTop: 10,
                  //justifyContent: 'center',
                  //alignItems: 'center',
                  // marginLeft: 25,
                  width: '100%',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
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
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignSelf: 'flex-end',
                    marginHorizontal: 10,
                  }}
                  onPress={() =>
                    navigation.navigate('Followers/Following', {
                      follower,
                      following,
                      user,
                    })
                  }>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      alignItems: 'center',
                      alignSelf: 'center',
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
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignSelf: 'flex-end',
                    marginHorizontal: 10,
                  }}
                  onPress={() =>
                    navigation.navigate('Followers/Following', {
                      follower,
                      following,
                      user,
                    })
                  }>
                  <View
                  >
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
                        alignSelf: 'center',
                        fontFamily: FontFamily.semibold,
                      }}>
                      {following.length}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '100%'}}>
                <TouchableOpacity
                  style={{
                    width: '90%',
                    marginTop: 10,
                    height: 36,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    backgroundColor: colors.color_EditBtnBg,
                    borderRadius: 10,
                    // marginHorizontal: 8,
                  }}
                  onPress={() => navigation.navigate('Edit profile', user)}>
                  <Text
                    style={{
                      color: colors.color_TextNormal,
                      alignItems: 'center',
                      fontFamily: FontFamily.medium,
                    }}>
                    Edit Profile
                  </Text>
                </TouchableOpacity>
                <AllPostTemplatesTypeOptions
                  accountType={accountType}
                  setaccountType={setaccountType}
                  style={{
                    marginTop: 15,
                    marginHorizontal: 5,
                  }}
                />
              </View>
            </View>
          </>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#242760']}
            progressBackgroundColor="#ffffff"
          />
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
            activeOpacity={1} 
          >
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <CancelIcon color={'white'} />
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              <Image
                source={
                  profile
                    ? {
                        uri: `https://adoro-data-storage.s3.ap-south-1.amazonaws.com/UserProfilePic/${profile}`,
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
      ) * 0.4, 
  },
  backgroundContainer: {
    position: 'relative',
  },
  chooseButtonContainer: {
    position: 'absolute',
    width: '100%',
  },
  chooseButtonText: {
    height: 30,
    width: 30,
    bottom: 75,
    left: 160,
  },
});
