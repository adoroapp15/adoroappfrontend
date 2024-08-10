import React, {useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  TextInput,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import PlusIcon from '../assets/svg/PlusIcon';
import {useTheme} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import Draggable from 'react-native-draggable';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowWidth1 = Dimensions.get('screen').width;
const windowHeight1 = Dimensions.get('screen').height;
const desiredWidth = 0.2 * windowWidth;
const desiredHeight = 0.2 * windowHeight;

const NextScreen = ({route, navigation}) => {
  const [dimensions, setDimensions] = React.useState({width: 0, height: 0});

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
  React.useEffect(() => {}, [dimensions]);

  const viewShotRef = useRef();
  const {selectedLayout} = route.params;
  const {colors} = useTheme();
  const [textInputState, setTextInputState] = React.useState({
    text: '',
    color: 'black',
    size: 20,
    x: 75, // Initial position x
    y: 100, // Initial position y
    width: 200, // Initial width
    height: 50, // Initial height
  });

  const [textElements, setTextElements] = React.useState([
    {id: 'top', text: 'Top Text', isEditing: false},
    {id: 'bottom', text: 'Bottom Text', isEditing: false},
    {id: 'text1', text: 'Text', isEditing: false},
    {id: 'text2', text: 'Text', isEditing: false},
  ]);

  const handleTextPress = id => {
    setTextElements(prevState =>
      prevState.map(textElement =>
        textElement.id === id
          ? {...textElement, isEditing: true, text: ''}
          : textElement,
      ),
    );
  };

  const handleTextInputChange = (id, text) => {
    setTextElements(prevState =>
      prevState.map(textElement =>
        textElement.id === id ? {...textElement, text} : textElement,
      ),
    );
  };

  const saveEditedText = id => {
    setTextElements(prevState =>
      prevState.map(textElement =>
        textElement.id === id
          ? {...textElement, isEditing: false}
          : textElement,
      ),
    );
  };

  const handleTextDrag = (x, y) => {
    setTextInputState(prevState => ({
      ...prevState,
      x: x,
      y: y,
    }));
  };

  const handleTextResize = (width, height) => {
    setTextInputState(prevState => ({
      ...prevState,
      width: width,
      height: height,
    }));
  };

  const [selectedImage, setSelectedImage] = React.useState(null); // State to hold selected image URI

  const handleImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      // Set the selected image URI to state
      getImageSize(image.path);
      setSelectedImage(image.path);
    } catch (error) {
      console.log('Image picker error:', error);
      Alert.alert('Error', 'Failed to pick an image.');
    }
  };
  const [selectedImage1, setSelectedImage1] = React.useState(null); // State to hold selected image URI

  const handleImagePicker1 = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      // Set the selected image URI to state
      getImageSize(image.path);

      setSelectedImage1(image.path);
    } catch (error) {
      console.log('Image picker error:', error);
      Alert.alert('Error', 'Failed to pick an image.');
    }
  };
  const [selectedImage2, setSelectedImage2] = React.useState(null); // State to hold selected image URI

  const handleImagePicker2 = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      // Set the selected image URI to state
      getImageSize(image.path);

      setSelectedImage2(image.path);
    } catch (error) {
      console.log('Image picker error:', error);
      Alert.alert('Error', 'Failed to pick an image.');
    }
  };
  const [selectedImage3, setSelectedImage3] = React.useState(null); // State to hold selected image URI

  const handleImagePicker3 = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      // Set the selected image URI to state
      getImageSize(image.path);

      setSelectedImage3(image.path);
    } catch (error) {
      console.log('Image picker error:', error);
      Alert.alert('Error', 'Failed to pick an image.');
    }
  };
  //   const handleImagePicker = useCallback(() => {
  //     ImagePicker.openPicker({
  //       // width: 400,
  //       // height: 500,
  //       cropping: true,
  //       cropperActiveWidgetColor: '#4286BC',
  //       cropperToolbarColor: colors.color_TabBarColor,
  //       cropperToolbarWidgetColor: colors.color_CropTxtWidget,
  //       // freeStyleCropEnabled: true,
  //       //showCropGuidelines:true,
  //     })
  //       .then(async image => {
  //         if (!image) {
  //           console.log('User Cancelled Image picker');
  //           return;
  //         }

  //         const imageUri = image.path;
  //         try {
  //           const imageSize = await RNFS.stat(imageUri).then(
  //             fileStat => fileStat.size,
  //           );

  //           if (imageSize > 1000000000) {
  //             Alert.alert(
  //               'Image size exceeds the limit (100MB). Please choose a smaller image.',
  //             );
  //             return;
  //           }
  //           getImageSize(imageUri);
  //           setProfile(imageUri);
  //           console.log('profileeeeeeeeee imggggg', imageUri, image);
  //           setSelectedpost({
  //             uri: imageUri,
  //             type: image.mime,
  //             fileName: 'abxcgg',
  //           });
  //           setVisible(false);
  //         } catch (error) {
  //           console.log('Error while validating image size:', error);
  //         }
  //       })
  //       .catch(error => {
  //         console.log('Image Picker error:', error);
  //         // Handle error gracefully, such as displaying an error message to the user
  //       });
  //   }, []);

  const renderTextElement = textElement => {
    if (textElement.isEditing) {
      return (
        <TextInput
          style={{alignSelf: 'center', textAlignVertical: 'center'}}
          value={textElement.text}
          onChangeText={text => handleTextInputChange(textElement.id, text)}
          onBlur={() => saveEditedText(textElement.id)}
        />
      );
    }

    return (
      <TouchableOpacity onPress={() => handleTextPress(textElement.id)}>
        <Text style={styles.text}>{textElement.text}</Text>
      </TouchableOpacity>
    );
  };
  const renderSelectedLayout = () => {
    switch (selectedLayout) {
      case 1:
        return (
          <View
            style={{
              height: 600,
              width: '90%',
              // borderWidth: 1,
              // borderRadius: 5,
              // borderColor: 'black',
              marginLeft: 5,
              //   position: 'relative',
            }}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              {renderTextElement(textElements[0])}
              {selectedImage ? (
                <Image
                  source={{uri: selectedImage}}
                  // style={{
                  //   width: dimensions.width || windowWidth,
                  //   height: dimensions.height || 300,
                  // }}
                  style={{width: '80%', height: 300}}
                />
              ) : (
                <TouchableOpacity onPress={handleImagePicker}>
                  <Image
                    source={require('../assets/gallery.png')}
                    style={{height: 60, width: 60}}
                  />
                </TouchableOpacity>
              )}

              {renderTextElement(textElements[1])}
            </View>
          </View>
        );
      case 2:
        return (
          <View
            style={{
              height: 600,
              width: '90%',
              // borderWidth: 1,
              // borderRadius: 5,
              // borderColor: 'black',
              marginLeft: 5,
              //   position: 'relative',
            }}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              {renderTextElement(textElements[0])}
              {selectedImage ? (
                <Image
                  source={{uri: selectedImage}}
                  // style={{
                  //   width: dimensions.width || windowWidth,
                  //   height: dimensions.height || 300,
                  // }}
                  style={{width: '80%', height: 300}}
                />
              ) : (
                <TouchableOpacity onPress={handleImagePicker}>
                  <Image
                    source={require('../assets/gallery.png')}
                    style={{height: 60, width: 60}}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      case 3:
        return (
          <View
            style={{
              height: 450,
              width: '90%',
              // borderWidth: 1,
              // borderRadius: 5,
              // borderColor: 'black',
              marginLeft: 5,
              //   position: 'relative',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 30,
              }}>
              {selectedImage ? (
                <Image
                  source={{uri: selectedImage}}
                  style={{width: '80%', height: 300}}
                />
              ) : (
                <TouchableOpacity onPress={handleImagePicker}>
                  <Image
                    source={require('../assets/gallery.png')}
                    style={{height: 60, width: 60}}
                  />
                </TouchableOpacity>
              )}
              {selectedImage1 ? (
                <Image
                  source={{uri: selectedImage1}}
                  style={{width: '80%', height: 300}}
                />
              ) : (
                <TouchableOpacity onPress={handleImagePicker1}>
                  <Image
                    source={require('../assets/gallery.png')}
                    style={{height: 60, width: 60}}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      case 4:
        return (
          // <View
          //   style={{
          //     height: 600,
          //     width: '90%',
          //     // borderWidth: 1,
          //     // borderRadius: 5,
          //     // borderColor: 'black',
          //     marginLeft: 5,
          //     //   position: 'relative',
          //   }}>
          //   <View
          //     style={{
          //       flex: 1,
          //       justifyContent: 'center',
          //       alignItems: 'center',
          //       // gap: 10,
          //     }}>
          //     <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          //       {selectedImage ? (
          //         <Image
          //           source={{uri: selectedImage}}
          //           style={{width: '60%', height: 300}}
          //         />
          //       ) : (
          //         <TouchableOpacity onPress={handleImagePicker}>
          //           <Image
          //             source={require('../assets/gallery.png')}
          //             style={{height: 60, width: 60}}
          //           />
          //         </TouchableOpacity>
          //       )}
          //       <View style={{alignSelf: 'center', marginBottom:20}}>
          //         {renderTextElement(textElements[2])}
          //       </View>
          //     </View>
          //     <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          //       {selectedImage1 ? (
          //         <Image
          //           source={{uri: selectedImage1}}
          //           style={{width: '60%', height: 300}}
          //         />
          //       ) : (
          //         <TouchableOpacity onPress={handleImagePicker1}>
          //           <Image
          //             source={require('../assets/gallery.png')}
          //             style={{height: 60, width: 60}}
          //           />
          //         </TouchableOpacity>
          //       )}
          //       <View style={{alignSelf: 'center', marginBottom:20}}>
          //         {renderTextElement(textElements[3])}
          //       </View>
          //     </View>
          //   </View>
          // </View>
          <View
            style={{
              height: 600,
              width: '90%',
              // marginLeft: 5,
              gap: -20,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {selectedImage ? (
                  <Image
                    source={{uri: selectedImage}}
                    style={{width: '60%', height: 300}}
                  />
                ) : (
                  <TouchableOpacity onPress={handleImagePicker}>
                    <Image
                      source={require('../assets/gallery.png')}
                      style={{height: 60, width: 60}}
                    />
                  </TouchableOpacity>
                )}
                <View style={{marginLeft: 10}}>
                  {renderTextElement(textElements[2])}
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {selectedImage1 ? (
                  <Image
                    source={{uri: selectedImage1}}
                    style={{width: '60%', height: 300}}
                  />
                ) : (
                  <TouchableOpacity onPress={handleImagePicker1}>
                    <Image
                      source={require('../assets/gallery.png')}
                      style={{height: 60, width: 60}}
                    />
                  </TouchableOpacity>
                )}
                <View style={{marginLeft: 10}}>
                  {renderTextElement(textElements[3])}
                </View>
              </View>
            </View>
          </View>
        );
      case 5:
        return (
          <View
            style={{
              height: 600,
              width: '90%',
              // borderWidth: 1,
              // borderRadius: 5,
              // borderColor: 'black',
              marginLeft: 5,
              //   position: 'relative',
            }}>
            <View style={{}}>
              <View style={{alignSelf: 'center', marginTop: 60}}>
                {renderTextElement(textElements[0])}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 70,
                }}>
                {selectedImage ? (
                  <Image
                    source={{uri: selectedImage}}
                    style={{width: '45%', height: 300}}
                  />
                ) : (
                  <TouchableOpacity onPress={handleImagePicker}>
                    <Image
                      source={require('../assets/gallery.png')}
                      style={{height: 60, width: 60}}
                    />
                  </TouchableOpacity>
                )}
                {selectedImage1 ? (
                  <Image
                    source={{uri: selectedImage1}}
                    style={{width: '40%', height: 300}}
                  />
                ) : (
                  <TouchableOpacity onPress={handleImagePicker1}>
                    <Image
                      source={require('../assets/gallery.png')}
                      style={{height: 60, width: 60}}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        );
      case 6:
        return (
          <View
            style={{
              height: 600,
              width: '90%',
              // borderWidth: 1,
              // borderRadius: 5,
              // borderColor: 'black',
              marginLeft: 5,
              //   position: 'relative',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                // gap: 50,
              }}>
              {selectedImage ? (
                <Image
                  source={{uri: selectedImage}}
                  style={{width: '80%', height: 170}}
                />
              ) : (
                <TouchableOpacity onPress={handleImagePicker}>
                  <Image
                    source={require('../assets/gallery.png')}
                    style={{height: 60, width: 60}}
                  />
                </TouchableOpacity>
              )}
              <View
                style={{height: 1, width: '100%', backgroundColor: 'black'}}
              />
              {selectedImage1 ? (
                <Image
                  source={{uri: selectedImage1}}
                  style={{width: '80%', height: 170}}
                />
              ) : (
                <TouchableOpacity onPress={handleImagePicker1}>
                  <Image
                    source={require('../assets/gallery.png')}
                    style={{height: 60, width: 60}}
                  />
                </TouchableOpacity>
              )}
              <View
                style={{height: 1, width: '100%', backgroundColor: 'black'}}
              />
              {selectedImage2 ? (
                <Image
                  source={{uri: selectedImage2}}
                  style={{width: '80%', height: 170}}
                />
              ) : (
                <TouchableOpacity onPress={handleImagePicker2}>
                  <Image
                    source={require('../assets/gallery.png')}
                    style={{height: 60, width: 60}}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      default:
        return null;
    }
  };
  const captureAndShareScreenshot = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      await Share.open({
        url: uri,
        type: 'image/jpeg',
        message: 'Share this meme!',
      });
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  const handleDownload = useCallback(async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (
        permission !== PermissionsAndroid.RESULTS.GRANTED &&
        permission === PermissionsAndroid.RESULTS.GRANTED
      ) {
        Alert.alert(
          'Permission Denied',
          'Cannot save image without permission.',
        );
        return;
      }

      await CameraRoll.save(uri, {type: 'photo'});
      Alert.alert('Success', 'Image has been saved to the gallery.');
    } catch (error) {
      console.log('Error capturing and saving view:', error);
      Alert.alert('Error', 'Failed to capture and save the view.');
    }
  }, []);

  const [screenshotUri, setScreenshotUri] = React.useState(null);

  const handleSavePress = () => {
    viewShotRef.current.capture().then(uri => {
      setScreenshotUri(uri);
      navigation.navigate('CreatePost', {screenshotUri: uri});
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Selected Layout</Text>
        <ViewShot
          style={{
            height: 600,
            width: '90%',
            // borderWidth: 1,
            // borderRadius: 5,
            // borderColor: 'black',
            marginLeft: 5,
            backgroundColor: 'white',
            //   position: 'relative',
          }}
          ref={viewShotRef}
          options={{format: 'png', quality: 0.9, backgroundColor: 'white'}}>
          {renderSelectedLayout()}
        </ViewShot>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
          <TouchableOpacity style={{flex: 1}} onPress={handleImagePicker3}>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'black',
                width: 100,
                height: 30,
                marginLeft: 10,
              }}>
              <Text
                style={{
                  //   flex: 1,
                  marginLeft: 20,
                  fontSize: 20,
                  color: 'black',
                  fontWeight: '700',
                }}>
                Image
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                borderColor: 'black',
                borderWidth: 1,
                height: 30,
                width: 70,
                alignSelf: 'center',
                marginRight: 40,
              }}>
              <Text
                style={{
                  // marginRight: 75,
                  fontSize: 20,
                  color: 'black',
                  fontWeight: '700',
                  alignSelf: 'center',
                }}>
                Text
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{}}>
            <View
              style={{
                marginRight: 10,
                borderColor: 'black',
                borderWidth: 1,
                height: 30,
                width: 100,
              }}>
              <Text
                style={{
                  // justifyContent: 'flex-end',
                  // marginRight: 20,
                  fontSize: 20,
                  alignSelf: 'center',
                  color: 'black',
                  fontWeight: '700',
                }}>
                Sticker
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
          <TouchableOpacity style={{flex: 1}} onPress={handleDownload}>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'black',
                width: 120,
                height: 30,
                marginLeft: 10,
              }}>
              <Text
                style={{
                  // flex: 1,
                  // marginLeft: 20,
                  fontSize: 20,
                  color: 'black',
                  fontWeight: '700',
                  alignSelf: 'center',
                }}>
                Download
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={captureAndShareScreenshot}>
            <View
              style={{
                borderColor: 'black',
                borderWidth: 1,
                height: 30,
                width: 70,
                alignSelf: 'center',
                marginRight: 40,
              }}>
              <Text
                style={{
                  // marginRight: 75,
                  fontSize: 20,
                  color: 'black',
                  fontWeight: '700',
                  alignSelf: 'center',
                }}>
                Share
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{}} onPress={handleSavePress}>
            <View
              style={{
                marginRight: 10,
                borderColor: 'black',
                borderWidth: 1,
                height: 30,
                width: 100,
              }}>
              <Text
                style={{
                  // justifyContent: 'flex-end',
                  // marginRight: 20,
                  fontSize: 20,
                  alignSelf: 'center',
                  color: 'black',
                  fontWeight: '700',
                }}>
                Save
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Draggable x={75} y={100}>
          <Image
            source={{uri: selectedImage3}}
            style={{width: 100, height: 100}}
          />
        </Draggable>
        {/* <Draggable
          x={textInputState.x}
          y={textInputState.y}
          renderSize={textInputState.size}
          renderColor={textInputState.color}
          onShortPressRelease={handleTextPress}
          onDrag={(_, x, y) => handleTextDrag(x, y)}
          onResizing={(_, width, height) => handleTextResize(width, height)}
          renderText={() => (
            <TextInput
              style={{
                width: textInputState.width,
                height: textInputState.height,
                color: textInputState.color,
                fontSize: textInputState.size,
              }}
              onChangeText={handleTextInputChange}
              value={textInputState.text}
            />
          )}
        /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:"center",
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  layoutContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default NextScreen;
