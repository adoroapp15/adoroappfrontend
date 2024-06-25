import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import PlusIcon from '../assets/svg/PlusIcon';
import {useTheme} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import Draggable from 'react-native-draggable';

const NextScreen = ({route}) => {
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

  const handleTextInputChange = text => {
    setTextInputState(prevState => ({
      ...prevState,
      text: text,
    }));
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

  const handleTextPress = () => {
    // Change text color
    setTextInputState(prevState => ({
      ...prevState,
      color: 'red', // Example of changing color
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

  const renderSelectedLayout = () => {
    switch (selectedLayout) {
      case 1:
        return (
          <View
            style={{
              height: 450,
              width: '90%',
              borderWidth: 1,
              borderRadius: 5,
              borderColor: 'black',
              marginLeft: 5,
              //   position: 'relative',
            }}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: '600',
                  marginBottom: 30,
                }}>
                Top text
              </Text>
              {selectedImage ? (
                <Image
                  source={{uri: selectedImage}}
                  style={{width: 100, height: 100}}
                />
              ) : (
                <TouchableOpacity onPress={handleImagePicker}>
                  <View style={{borderWidth: 1, borderColor: 'black'}}>
                    <PlusIcon color={colors.color_CardIcon} />
                  </View>
                </TouchableOpacity>
              )}
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: '600',
                  marginTop: 20,
                }}>
                Bottom Text
              </Text>
            </View>
          </View>
        );
      case 2:
        return (
          <View
            style={{
              height: 450,
              width: '90%',
              borderWidth: 1,
              borderRadius: 5,
              borderColor: 'black',
              marginLeft: 5,
              //   position: 'relative',
            }}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: '600',
                  marginBottom: 30,
                }}>
                Top text
              </Text>
              {selectedImage ? (
                <Image
                  source={{uri: selectedImage}}
                  style={{width: 100, height: 100}}
                />
              ) : (
                <TouchableOpacity onPress={handleImagePicker}>
                  <View style={{borderWidth: 1, borderColor: 'black'}}>
                    <PlusIcon color={colors.color_CardIcon} />
                  </View>
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
              borderWidth: 1,
              borderRadius: 5,
              borderColor: 'black',
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
                  style={{width: 100, height: 100}}
                />
              ) : (
                <TouchableOpacity onPress={handleImagePicker}>
                  <View style={{borderWidth: 1, borderColor: 'black'}}>
                    <PlusIcon color={colors.color_CardIcon} />
                  </View>
                </TouchableOpacity>
              )}
              {selectedImage1 ? (
                <Image
                  source={{uri: selectedImage1}}
                  style={{width: 100, height: 100}}
                />
              ) : (
                <TouchableOpacity onPress={handleImagePicker1}>
                  <View style={{borderWidth: 1, borderColor: 'black'}}>
                    <PlusIcon color={colors.color_CardIcon} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      case 4:
        return (
          <View
            style={{
              height: 450,
              width: '90%',
              borderWidth: 1,
              borderRadius: 5,
              borderColor: 'black',
              marginLeft: 5,
              //   position: 'relative',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 50,
              }}>
              <View
                style={{flexDirection: 'row', alignSelf: 'center', gap: 50}}>
                {selectedImage ? (
                  <Image
                    source={{uri: selectedImage}}
                    style={{width: 100, height: 100}}
                  />
                ) : (
                  <TouchableOpacity onPress={handleImagePicker}>
                    <View style={{borderWidth: 1, borderColor: 'black'}}>
                      <PlusIcon color={colors.color_CardIcon} />
                    </View>
                  </TouchableOpacity>
                )}
                <Text
                  style={{
                    color: 'black',
                    fontSize: 20,
                    fontWeight: '600',
                  }}>
                  Text
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', alignSelf: 'center', gap: 50}}>
                {selectedImage1 ? (
                  <Image
                    source={{uri: selectedImage1}}
                    style={{width: 100, height: 100}}
                  />
                ) : (
                  <TouchableOpacity onPress={handleImagePicker1}>
                    <View style={{borderWidth: 1, borderColor: 'black'}}>
                      <PlusIcon color={colors.color_CardIcon} />
                    </View>
                  </TouchableOpacity>
                )}
                <Text
                  style={{
                    color: 'black',
                    fontSize: 20,
                    fontWeight: '600',
                  }}>
                  Text
                </Text>
              </View>
            </View>
          </View>
        );
      case 5:
        return (
          <View
            style={{
              height: 450,
              width: '90%',
              borderWidth: 1,
              borderRadius: 5,
              borderColor: 'black',
              marginLeft: 5,
              //   position: 'relative',
            }}>
            <View style={{}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: '600',
                  alignSelf: 'center',
                  marginTop: 10,
                }}>
                Text
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 50,
                  marginTop: 70,
                }}>
                {selectedImage ? (
                  <Image
                    source={{uri: selectedImage}}
                    style={{width: 100, height: 100}}
                  />
                ) : (
                  <TouchableOpacity onPress={handleImagePicker}>
                    <View style={{borderWidth: 1, borderColor: 'black'}}>
                      <PlusIcon color={colors.color_CardIcon} />
                    </View>
                  </TouchableOpacity>
                )}
                {selectedImage1 ? (
                  <Image
                    source={{uri: selectedImage1}}
                    style={{width: 100, height: 100}}
                  />
                ) : (
                  <TouchableOpacity onPress={handleImagePicker1}>
                    <View style={{borderWidth: 1, borderColor: 'black'}}>
                      <PlusIcon color={colors.color_CardIcon} />
                    </View>
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
              borderWidth: 1,
              borderRadius: 5,
              borderColor: 'black',
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
                  style={{width: '80%', height: 150}}
                />
              ) : (
                <TouchableOpacity onPress={handleImagePicker}>
                  <View style={{borderWidth: 1, borderColor: 'black'}}>
                    <PlusIcon color={colors.color_CardIcon} />
                  </View>
                </TouchableOpacity>
              )}
              {selectedImage1 ? (
                <Image
                  source={{uri: selectedImage1}}
                  style={{width: '80%', height: 150}}
                />
              ) : (
                <TouchableOpacity onPress={handleImagePicker1}>
                  <View style={{borderWidth: 1, borderColor: 'black', marginTop:20}}>
                    <PlusIcon color={colors.color_CardIcon} style={{alignSelf:"center"}} />
                  </View>
                </TouchableOpacity>
              )}
              {selectedImage2 ? (
                <Image
                  source={{uri: selectedImage2}}
                  style={{width: '80%', height: 150}}
                />
              ) : (
                <TouchableOpacity onPress={handleImagePicker2}>
                  <View style={{borderWidth: 1, borderColor: 'black',marginTop:20}}>
                    <PlusIcon color={colors.color_CardIcon} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Selected Layout</Text>
        {renderSelectedLayout()}
        <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
          <TouchableOpacity style={{flex: 1}} onPress={handleImagePicker3}>
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
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                marginRight: 75,
                fontSize: 20,
                color: 'black',
                fontWeight: '700',
              }}>
              Text
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{}}>
            <Text
              style={{
                // justifyContent: 'flex-end',
                marginRight: 20,
                fontSize: 20,
                color: 'black',
                fontWeight: '700',
              }}>
              Sticker
            </Text>
          </TouchableOpacity>
        </View>
        <Draggable x={75} y={100} >
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
