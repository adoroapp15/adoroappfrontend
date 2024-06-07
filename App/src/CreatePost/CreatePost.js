import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {BlurView} from '@react-native-community/blur';
import RNFS from 'react-native-fs';
import axios from 'axios';
import Modal from 'react-native-modal';
import {config} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import {useIsFocused} from '@react-navigation/native';
import Video from 'react-native-video';
import FontFamily from '../common/components/FontFamily';
import PlusIcon from '../assets/svg/PlusIcon';
import CancelIcon from '../assets/svg/CancelIcon';
import VideoIcon from '../assets/svg/VideoIcon';
import GIFIcon from '../assets/svg/GifIcon';
import ChooseTemplateIcon from '../assets/svg/ChooseTemplateIcon';
import PhotoIcon from '../assets/svg/PhotoIcon';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import Size from '../common/components/Size';
const photos = [
  {id: '1', source: 'Savage', selected: false},
  {id: '2', source: 'Relatable', selected: false},
  {id: '3', source: 'Dank', selected: false},
  {id: '4', source: 'Shitpost', selected: false},
  {id: '5', source: 'Movies', selected: false},
  {id: '6', source: 'Wholesome', selected: false},
  {id: '7', source: 'Anime', selected: false},
  {id: '8', source: 'Desi', selected: false},
  {id: '9', source: 'Webseries', selected: false},
  {id: '10', source: 'Celeb', selected: false},
  {id: '11', source: 'Gaming', selected: false},
  {id: '12', source: 'History', selected: false},
  {id: '13', source: 'Tech', selected: false},
  {id: '14', source: 'Nostalgia', selected: false},
  {id: '15', source: 'Sports', selected: false},
  {id: '16', source: 'Sadpost', selected: false},
  {id: '17', source: 'Parody', selected: false},
  {id: '18', source: 'Politics', selected: false},
];
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowWidth1 = Dimensions.get('screen').width;
const windowHeight1 = Dimensions.get('screen').height;
const desiredWidth = 0.2 * windowWidth;
const desiredHeight = 0.2 * windowHeight;
const CreatePost = ({navigation}) => {
  const [talk, setTalk] = React.useState('');
  const {dark, toggleTheme} = useStore();
  const {colors} = useTheme();
  const [isLoading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [visible, setVisible] = React.useState(false);
  const [profile, setProfile] = React.useState(null);
  const [videoUri, setVideoUri] = React.useState(null);
  const [gif, setGif] = React.useState(null);
  const [selectedpost, setSelectedpost] = React.useState({});
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);
  const [selectedPhoto, setSelectedPhoto] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [data, setData] = React.useState(photos);
  const [pro, setPro] = React.useState({});
  const [successImageVisible, setSuccessImageVisible] = React.useState(false);
  const [isButtonDisabled, setButtonDisabled] = React.useState(false);
  const searchRef = React.useRef();
  const showSuccessImage = () => {
    setSuccessImageVisible(true);
    setTimeout(() => {
      setSuccessImageVisible(false);
    }, 2000);
  };
  const [allFieldsFilled, setAllFieldsFilled] = React.useState(false);

  // Effect to check if all fields are filled
  React.useEffect(() => {
    // Check if all required fields are filled
    if (talk && selectedPhoto && selectedpost.uri) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
      setFullNameError(false);
    }
  }, [talk, selectedPhoto, selectedpost]);
  const onSearch = search => {
    if (search !== '') {
      let tempData = data.filter(item => {
        return item.country.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(photos);
    }
  };
  const isFocused = useIsFocused();
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const [fullNameError, setFullNameError] = React.useState(false);

  const savePost = async () => {
    try {
      setButtonDisabled(true);

      if (!talk || !selectedPhoto || !selectedpost.uri) {
        setFullNameError(true);
        setButtonDisabled(false);
        return;
      }
      console.log('selectedddd post', selectedpost);

      const formData = new FormData();
      formData.append('file', {
        uri: selectedpost.uri,
        type: selectedpost.type,
        name: selectedpost.fileName,
      });
      formData.append('mobileNo', user.mobileNo);
      formData.append('category', selectedPhoto);
      formData.append('content', talk);
      formData.append('profile', pro.ProfileDp);
      formData.append('fullName', pro.fullName),
        formData.append('userName', pro.userName);

      console.log('formmmm dataaaaaaaa iss', formData);
      const response = await axios.post(
        `${config.production}/app/user/createpost`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data.status === 200) {
        showSuccessImage();
        setTimeout(() => {
          navigation.navigate('HomePage');
        }, 2000);
      } else {
        Alert.alert('Getting Error While Posting');
      }
      setButtonDisabled(false);
    } catch (error) {
      Alert.alert('Facing Problem While Posting');
      console.error('Error in savePost:', error);
      setButtonDisabled(false);
    }
  };
  const getImageSize = url => {
    try {
      Image.getSize(url, (width, height) => {
        const aspectRatio = width / height;
        const imageHeight = windowWidth1 / aspectRatio;
        setDimensions({width: windowWidth1, height: imageHeight});
        console.log(
          'Image dimensions:',
          width,
          height,
          url,
          windowWidth1,
          imageHeight,
        );
      });
    } catch (error) {
      console.error('Error getting image size:', error);
    }
  };
  useEffect(() => {
    // getImageSize(profile);
    console.log('Updated dimensions:', dimensions.width, dimensions.height);
  }, [dimensions]);

  const imagePick = useCallback(() => {
    ImagePicker.openPicker({
      // width: 400,
      // height: 500,
      cropping: true,
      cropperActiveWidgetColor: '#4286BC',
      cropperToolbarColor: colors.color_TabBarColor,
      cropperToolbarWidgetColor: colors.color_CropTxtWidget,
      // freeStyleCropEnabled: true,
      //showCropGuidelines:true,
    })
      .then(async image => {
        if (!image) {
          console.log('User Cancelled Image picker');
          return;
        }

        const imageUri = image.path;
        try {
          const imageSize = await RNFS.stat(imageUri).then(
            fileStat => fileStat.size,
          );

          if (imageSize > 1000000000) {
            Alert.alert(
              'Image size exceeds the limit (100MB). Please choose a smaller image.',
            );
            return;
          }
          getImageSize(imageUri);
          setProfile(imageUri);
          console.log('profileeeeeeeeee imggggg', imageUri, image);
          setSelectedpost({
            uri: imageUri,
            type: image.mime,
            fileName: 'abxcgg',
          });
          setVisible(false);
        } catch (error) {
          console.log('Error while validating image size:', error);
        }
      })
      .catch(error => {
        console.log('Image Picker error:', error);
        // Handle error gracefully, such as displaying an error message to the user
      });
  }, []);

  const openImagePicker = useCallback(() => {
    ImagePicker.openPicker({
      mediaType: 'video',
      compressVideoPreset: 'MediumQuality', // Adjust compression quality if needed
    })
      .then(async video => {
        if (!video) {
          console.log('User Cancelled Video picker');
          return;
        }
        const videoUri = video.path;

        setVideoUri(videoUri);
        setSelectedpost({
          uri: videoUri,
          type: video.mime,
          fileName: 'vfdgfdgfd',
        });
        setVisible(false);
      })
      .catch(error => {
        console.log('Video Picker error:', error);
      });
  }, []);

  const gifpick = useCallback(() => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
    })
      .then(async gif => {
        if (!gif) {
          console.log('User Cancelled GIF picker');
          return;
        }
        const gifUri = gif.path;

        setGif(gifUri);
        setSelectedpost({
          uri: gifUri,
          type: gif.mime,
          fileName: 'sdsdsd',
        });
        setVisible(false);
      })
      .catch(error => {
        console.log('GIF Picker error:', error);
      });
  }, []);
  const clearData = () => {
    setTalk('');
    // setUser({});
    setVisible(false);
    setProfile(null);
    setVideoUri(null);
    setGif(null);
    setSelectedpost({});
    setIsPlaying(false);
    setClicked(false);
    setSelectedPhoto('');
    setSearch('');
    setFullNameError(false);
    setData(photos);
    // setPro({});
    setSuccessImageVisible(false);
    setButtonDisabled(false);
  };

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const userr = await AsyncStorage.getItem('user');
        const other = await AsyncStorage.getItem('token');

        const parsedUser = JSON.parse(userr, other);
        setUser(parsedUser);
        if (isFocused) {
          setProfile(null);
          setVideoUri(null);
          setGif(null);
          setTalk('');
          setSelectedPhoto('');
          setFullNameError(false);
        }
        const response = await axios.get(
          `${config.production}/app/user/userdetails`,

          {
            params: {mobileNo: parsedUser.mobileNo},
          },
        );

        console.log('responseeee', response);
        if (response.data.status === 200) {
          setPro(response.data.data);
        } else {
          setPro(null);
        }
      } catch (error) {
        console.log('Error fetching profile picture:', error);
      }
    };
    fetchProfilePicture();
  }, [isFocused]);
  console.log('profileee dp iss', pro, user);

  const [videoDimensions, setVideoDimensions] = React.useState({
    width: windowWidth * 0.95,
    height: 300,
  });

  // ... (other code)

  const handleVideoLoad = (event, postId) => {
    const {naturalSize} = event;
    setVideoDimensions(prevDimensions => ({
      ...prevDimensions,
      [postId]: {
        width: windowWidth * 0.95,
        height: (windowWidth * 0.8 * naturalSize.height) / naturalSize.width,
      },
    }));
  };
  const [isTextInputFocused, setIsTextInputFocused] = React.useState(false);

  // Effect to reset fullNameError when TextInput is focused
  useEffect(() => {
    if (isTextInputFocused) {
      setFullNameError(false);
    }
  }, [isTextInputFocused]);
  const [dimensions, setDimensions] = React.useState({width: 0, height: 0});

  return (
    <View style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.color_PageColor,
        }}>
        <View
          style={{backgroundColor: colors.color_PageColor, minHeight: '100%'}}>
          <View style={{flexDirection: 'row', gap: 5, height: 56}}>
            <TouchableOpacity
              style={{alignSelf: 'center', marginLeft: 10}}
              onPress={() => navigation.navigate('Home')}>
              <CancelIcon color={colors.arrow} />
            </TouchableOpacity>
            <Text
              style={{
                alignSelf: 'center',
                flex: 1,
                color: colors.color_TextNormal,
                fontFamily: FontFamily.semibold,
                fontSize: Size.share,
                // fontWeight: '600',
                textTransform: 'capitalize',
                lineHeight: 26,
                wordWrap: 'break-word',
                left: 10,
              }}>
              Share post
            </Text>
            <TouchableOpacity
              style={{
                width: '30%', // Set the width of the TouchableOpacity
                justifyContent: 'flex-end',
                alignSelf: 'center',
              }}
              disabled={isButtonDisabled}
              onPress={savePost}>
              <LinearGradient
                colors={
                  isButtonDisabled
                    ? ['#f0f0f0', '#e0e0e0']
                    : [
                        'rgba(0,255,255,0.4)',
                        'rgba(255,192,203,1)',
                        'rgba(255,255,0,0.5)',
                      ]
                }
                angle={45}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={{
                  // bottom: 25,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 8,
                  paddingBottom: 8,
                  padding: 10,
                  justifyContent: 'center',
                  borderRadius: 10,
                  marginRight: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    // fontWeight: 'bold',
                    fontFamily: FontFamily.semibold,
                    fontSize: Size.buttonText,
                    textAlign: 'center',
                  }}>
                  Post
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <View
              style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
              <Image
                style={{
                  width: 45,
                  height: 45,
                  margin: 10,
                  borderRadius: 99,
                }}
                source={
                  pro.ProfileDp
                    ? {
                        uri: `https://www.adoro.social/UserProfilePic/${pro.ProfileDp}`,
                      }
                    : require('../assets/Profile.png')
                }
              />
              <View style={{flexDirection: 'column', alignSelf: 'center'}}>
                <Text
                  style={{
                    // margin: 8,
                    // marginLeft: 2,
                    color: colors.color_TextNormal,
                    fontSize: Size.tabtext,
                    fontFamily: FontFamily.semibold,
                    // fontWeight: 600,
                  }}>
                  {user ? user.fullName : ''}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    // backgroundColor: 'white',
                    // borderRadius: 10,
                    gap: 15,
                  }}>
                  {/* <Modal isVisible={successImageVisible}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          // padding: 20,
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: 200,
                          width: 200,
                        }}>
                        <LottieView
                          style={{height: '50%', width: '50%'}}
                          source={require('../assets/success lottie.json')} // Provide the path to your JSON animation file
                          autoPlay
                          loop={false} // Play only once
                        />
                      </View>
                    </View>
                  </Modal> */}
                  <Modal
                    animationType="fade"
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    transparent={true}
                    isVisible={successImageVisible}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        height: 200,
                        width: 200,
                      }}>
                      <LottieView
                        style={{height: 100, width: 100}}
                        source={require('../assets/success lottie.json')}
                        autoPlay
                        loop // Play only once

                        // loop
                      />
                    </View>
                  </Modal>
                </View>
              </View>
            </View>
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.categoryButton,
                      {
                        backgroundColor:
                          selectedPhoto === item.source
                            ? colors.color_SelectedTabColor // Set transparent background for selected button
                            : colors.color_ListBgUnselected, // Set white background for unselected buttons
                      },
                    ]}
                    onPress={() => {
                      setSelectedPhoto(item.source);
                      setClicked(false); // Close the dropdown after selecting a category
                      onSearch('');
                      setSearch('');
                    }}>
                    <Text
                      style={[
                        styles.categoryButtonText,
                        {
                          color:
                            selectedPhoto === item.source
                              ? colors.color_ListTxtSelected
                              : colors.color_ListTxtUnselected, // Set text color based on selection
                        },
                      ]}>
                      {item.source}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <TextInput
              style={{
                color: colors.color_TextNormal,
                fontSize: Size.title,
                fontFamily: FontFamily.semibold,
                // fontWeight: '800',
                lineHeight: 20.8,
                // borderWidth: 1,
                // borderColor: 'black',
                margin: 10,
                marginTop: 30,
                paddingLeft: 10,
              }}
              onChangeText={setTalk}
              value={talk}
              placeholder="What do you want to talk about?"
              placeholderTextColor={colors.color_PlaceHolderColor}
              onFocus={() => setIsTextInputFocused(true)} // Set isTextInputFocused to true when TextInput is focused
              onBlur={() => setIsTextInputFocused(false)} // Set isTextInputFocused to false when TextInput is blurred
            />

            {fullNameError && !isTextInputFocused ? (
              <Text style={styles.errorText}>Please fill this field*</Text>
            ) : null}
            {!profile && !videoUri && !gif && (
              <TouchableOpacity onPress={() => setVisible(true)}>
                <View
                  style={{
                    width: '80%',
                    height: 200,
                    alignSelf: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                    backgroundColor: colors.color_CardBgColor,
                    borderWidth: 2,
                    borderColor: colors.color_BorderColor,
                    justifyContent: 'center',
                  }}>
                  <PlusIcon color={colors.color_CardIcon} />
                  <Text
                    style={{
                      marginTop: 20,
                      fontSize: Size.title,
                      fontFamily: FontFamily.semibold,
                      textAlignVertical: 'center',
                      color: colors.color_CardTxtColor,
                    }}>
                    Click here to upload
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            <View>
              {(!profile || !videoUri || !gif) && (
                <View>
                  {profile && (
                    <Image
                      style={{
                        width: dimensions.width || windowWidth,
                        height: dimensions.height || 300,
                        alignSelf: 'center',
                      }}
                      source={profile ? {uri: profile} : null}
                    />
                  )}
                  {videoUri && (
                    <>
                      <View style={{alignSelf: 'center'}}>
                        <Video
                          source={videoUri ? {uri: videoUri} : null}
                          style={{
                            width: videoDimensions[videoUri.Id]?.width || '75%',
                            // width: 300,
                            height: videoDimensions[videoUri.Id]?.height || 200, // 16:9 aspect ratio
                          }}
                          onLoad={event => handleVideoLoad(event, videoUri.Id)}
                          paused={!isPlaying}
                        />
                        <TouchableOpacity
                          style={{
                            top: 200,
                            width: desiredWidth,
                            height: desiredHeight,
                            position: 'absolute',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            // borderRadius:40
                          }}
                          onPress={() => {
                            togglePlayPause();
                          }}>
                          {isPlaying ? (
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
                      </View>
                      {/* ... existing play/pause button code ... */}
                    </>
                  )}
                  {gif && (
                    <Image
                      style={{margin: 10, width: 300, height: 300}}
                      source={gif ? {uri: gif} : null}
                    />
                  )}
                </View>
              )}
            </View>
            {/* <TouchableOpacity style={{marginTop:20, marginBottom:20}} onPress={() => navigation.navigate('CreateMeme')}>
                <View
                  style={{
                    width: '80%',
                    height: 200,
                    alignSelf: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                    backgroundColor: colors.color_CardBgColor,
                    borderWidth: 2,
                    borderColor: colors.color_BorderColor,
                    justifyContent: 'center',
                  }}>
                  <PlusIcon color={colors.color_CardIcon} />
                  <Text
                    style={{
                      marginTop: 20,
                      fontSize: Size.title,
                      fontFamily: FontFamily.semibold,
                      textAlignVertical: 'center',
                      color: colors.color_CardTxtColor,
                    }}>
                    Click here to Create Meme
                  </Text>
                </View>
              </TouchableOpacity> */}
          </View>

          <Modal
            style={{width: '100%', marginLeft: 0, marginBottom: 0}}
            onBackButtonPress={() => {
              setVisible(false);
            }}
            onBackdropPress={() => setVisible(false)}
            isVisible={visible}>
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
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: 30,
                  flexDirection: 'row',
                  alignItems: 'center',
                  // borderWidth: 1,
                  // borderColor: '#F1F1F1',
                }}
                onPress={imagePick}>
                <PhotoIcon color={colors.arrow} />
                <Text
                  style={{
                    marginLeft: 15,
                    color: colors.color_TextNormal,
                    fontFamily: FontFamily.semibold,
                  }}>
                  {' '}
                  Upload a photo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: 30,
                  flexDirection: 'row',
                  alignItems: 'center',
                  // borderWidth: 1,
                  // borderColor: '#F1F1F1',
                }}
                onPress={openImagePicker}>
                <VideoIcon color={colors.arrow} />
                <Text
                  style={{
                    marginLeft: 15,
                    color: colors.color_TextNormal,
                    fontFamily: FontFamily.semibold,
                  }}>
                  {' '}
                  Upload a video
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: 30,
                  flexDirection: 'row',
                  alignItems: 'center',
                  // borderWidth: 1,
                  // borderColor: '#F1F1F1',
                }}
                onPress={gifpick}>
                <GIFIcon color={colors.arrow} />
                <Text
                  style={{
                    marginLeft: 15,
                    color: colors.color_TextNormal,
                    fontFamily: FontFamily.semibold,
                  }}>
                  {' '}
                  Upload a gif
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: 30,
                  flexDirection: 'row',
                  alignItems: 'center',
                  // borderWidth: 1,
                  // borderColor: '#F1F1F1',
                }}
                onPress={() => navigation.navigate('Browse Template')}>
                <ChooseTemplateIcon color={colors.arrow} />
                <Text
                  style={{
                    marginLeft: 15,
                    color: colors.color_TextNormal,
                    fontFamily: FontFamily.semibold,
                  }}>
                  {' '}
                  Choose a template
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        {isLoading && allFieldsFilled && (
          <BlurView // Blur the background
            style={{...StyleSheet.absoluteFillObject}}
            blurType="light"
            blurAmount={10}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="small" color="rgba(0,255,255,0.4)" />
            </View>
          </BlurView>
        )}
      </ScrollView>
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  input: {
    color: '#07142E',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '800',
    lineHeight: 20.8,
    // borderWidth: 1,
    // borderColor: 'black',
    margin: 10,
    marginTop: 30,
    paddingLeft: 10,
  },
  categoryButton: {
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 10,
    padding: 10,
    // borderWidth: 1,
    // borderColor: '#F1F1F1',
    overflow: 'hidden',
  },
  categoryButtonGradient: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  categoryButtonText: {
    fontSize: Size.title,
    fontFamily: FontFamily.medium,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginLeft: 20,
    marginBottom: 15,
    fontFamily: FontFamily.semibold,
  },
});
