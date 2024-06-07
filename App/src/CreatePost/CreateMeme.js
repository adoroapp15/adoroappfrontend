// import React, {useState, useRef} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import Draggable from 'react-native-draggable';
// import {useTheme, useFocusEffect} from '@react-navigation/native';
// // import {launchImageLibrary} from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-crop-picker';
// import ViewShot from 'react-native-view-shot';
// import RNFS from 'react-native-fs';
// import {CameraRoll} from '@react-native-camera-roll/camera-roll';
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// const windowWidth1 = Dimensions.get('screen').width;
// const windowHeight1 = Dimensions.get('screen').height;
// export default function Form() {
//   const {colors} = useTheme();
//   const [image, setImage] = useState(null);
//   const [allMemeData, setMemeAllImages] = useState([]);
//   const [imgState, setImageState] = useState(null);
//   const [meme, setMeme] = useState({
//     topText: '',
//     bottomText: '',
//     randomImage: '',
//   });
//   const viewShotRef = useRef(null);
//   const [dimensions, setDimensions] = useState({width: 0, height: 0});
//   const getImageSize = source => {
//     try {
//       Image.getSize(source.uri, (width, height) => {
//         const aspectRatio = width / height;
//         const imageHeight = windowWidth1 / aspectRatio;
//         setDimensions({width: windowWidth1, height: imageHeight});
//         console.log(
//           'Image dimensions:',
//           width,
//           height,
//           source.uri,
//           windowWidth1,
//           imageHeight,
//         );
//       });
//     } catch (error) {
//       console.error('Error getting image size:', error);
//     }
//   };

//   React.useEffect(() => {
//     console.log('Updated dimensions:', dimensions.width, dimensions.height);
//   }, [dimensions]);

//   const handleImagePick = () => {
//     ImagePicker.openPicker({
//       cropping: true,
//       cropperActiveWidgetColor: '#4286BC',
//       cropperToolbarColor: colors.color_TabBarColor,
//       cropperToolbarWidgetColor: colors.color_CropTxtWidget,
//     })
//       .then(image => {
//         const source = {uri: image.path};
//         setImageState(source);
//         getImageSize(source);
//       })
//       .catch(error => {
//         if (error.message !== 'User cancelled image selection') {
//           console.error('ImagePicker Error: ', error.message);
//         }
//       });
//   };

//   const handleRandomImage = () => {
//     if (allMemeData.length > 0) {
//       const randomMeme =
//         allMemeData[Math.floor(Math.random() * allMemeData.length)];
//       setImageState({uri: randomMeme.url});
//     }
//   };

//   const handleChange = (name, value) => {
//     setMeme({
//       ...meme,
//       [name]: value,
//     });
//   };

//   const handleDownload = async () => {
//     if (viewShotRef.current) {
//       try {
//         const uri = await viewShotRef.current.capture();
//         const destPath = `${RNFS.DocumentDirectoryPath}/meme.jpg`;
//         await RNFS.copyFile(uri, destPath);
//         await CameraRoll.save(destPath, {type: 'photo'});
//         alert('Image saved to gallery!');
//       } catch (error) {
//         console.error(error);
//         alert('Failed to save image');
//       }
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.formContainer}>
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.inputText}
//               onChangeText={value => handleChange('topText', value)}
//               value={meme.topText}
//               placeholder="Enter top text"
//             />
//             <TextInput
//               style={styles.inputText}
//               onChangeText={value => handleChange('bottomText', value)}
//               value={meme.bottomText}
//               placeholder="Enter bottom text"
//             />
//           </View>
//           <TouchableOpacity style={styles.button} onPress={handleRandomImage}>
//             <Text style={styles.buttonText}>Get a meme</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={handleImagePick}>
//             <Text style={styles.buttonText}>Get a new random meme</Text>
//           </TouchableOpacity>
//         </View>
//         {imgState && (
//           <ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 1}}>
//             <View style={styles.imageContainer}>
//               <Image
//                 source={imgState}
//                 style={{
//                   width: dimensions.width || windowWidth,
//                   height: dimensions.height || 300,
//                   alignSelf: 'center',
//                 }}
//               />
//               <Draggable x={75} y={100}>
//                 <Text style={styles.memeTextTop}>{meme.topText}</Text>
//               </Draggable>
//               <Draggable x={75} y={200}>
//                 <Text style={styles.memeText}>{meme.bottomText}</Text>
//               </Draggable>
//             </View>
//           </ViewShot>
//         )}
//         {imgState && (
//           <TouchableOpacity
//             style={styles.downloadButton}
//             onPress={handleDownload}>
//             <Text style={styles.buttonText}>Download Image</Text>
//           </TouchableOpacity>
//         )}
//       </SafeAreaView>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   formContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     margin: 20,
//     padding: 20,
//     borderRadius: 15,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 1,
//     shadowOffset: {width: 3, height: 3},
//   },
//   inputContainer: {
//     marginBottom: 20,
//     width: '100%',
//   },
//   inputText: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//     fontSize: 16,
//     paddingVertical: 10,
//     marginBottom: 10,
//     color: 'black',
//   },
//   button: {
//     backgroundColor: 'green',
//     padding: 12,
//     borderRadius: 10,
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   downloadButton: {
//     backgroundColor: 'blue',
//     padding: 12,
//     borderRadius: 10,
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   imageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   memeImage: {
//     width: 300,
//     height: 300,
//     resizeMode: 'contain',
//     borderRadius: 10,
//     borderWidth: 3,
//     borderColor: '#333',
//     shadowColor: '#000',
//     shadowOpacity: 0.4,
//     shadowOffset: {width: 0, height: 4},
//     marginBottom: 20,
//   },
//   memeTextTop: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'crimson',
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: {width: -1, height: 1},
//     textShadowRadius: 10,
//   },
//   memeText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'crimson',
//     textAlign: 'center',
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: {width: -1, height: 1},
//     textShadowRadius: 10,
//   },
// });

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import Draggable from 'react-native-draggable';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import { useTheme, useFocusEffect } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowWidth1 = Dimensions.get('screen').width;
const windowHeight1 = Dimensions.get('screen').height;

export default function Form() {
  const { colors } = useTheme();
  const [image, setImage] = useState(null);
  const [allMemeData, setMemeAllImages] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [imgState, setImageState] = useState(null);
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: '',
  });

  const viewShotRef = useRef();

  const getImageSize = source => {
    try {
      Image.getSize(source.uri, (width, height) => {
        const aspectRatio = width / height;
        const imageHeight = windowWidth1 / aspectRatio;
        setDimensions({ width: windowWidth1, height: imageHeight });
        console.log(
          'Image dimensions:',
          width,
          height,
          source.uri,
          windowWidth1,
          imageHeight,
        );
      });
    } catch (error) {
      console.error('Error getting image size:', error);
    }
  };

  useEffect(() => {
    console.log('Updated dimensions:', dimensions.width, dimensions.height);
  }, [dimensions]);

  useFocusEffect(
    React.useCallback(() => {
      // Clear data when screen goes out of focus
      return () => {
        setImageState(null);
        setMeme({ topText: '', bottomText: '', randomImage: '' });
      };
    }, [])
  );

  const handleImagePick = () => {
    ImagePicker.openPicker({
      cropping: true,
      cropperActiveWidgetColor: '#4286BC',
      cropperToolbarColor: colors.color_TabBarColor,
      cropperToolbarWidgetColor: colors.color_CropTxtWidget,
    })
      .then(image => {
        const source = { uri: image.path };
        setImageState(source);
        getImageSize(source);
      })
      .catch(error => {
        if (error.message !== 'User cancelled image selection') {
          console.error('ImagePicker Error: ', error.message);
        }
      });
  };

  const handleChange = (name, value) => {
    setMeme({
      ...meme,
      [name]: value,
    });
  };

  const handleDownload = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const destPath = `${RNFS.ExternalDirectoryPath}/meme.jpg`;
      await RNFS.moveFile(uri, destPath);
      await CameraRoll.save(destPath, { type: 'photo', album: 'Memes' });
      alert('Image saved to gallery!');
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              onChangeText={value => handleChange('topText', value)}
              value={meme.topText}
              placeholder="Enter top text"
            />
            <TextInput
              style={styles.inputText}
              onChangeText={value => handleChange('bottomText', value)}
              value={meme.bottomText}
              placeholder="Enter bottom text"
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <LinearGradient
              colors={[
                'rgba(0,255,255,0.4)',
                'rgba(255,192,203,1)',
                'rgba(255,255,0,0.5)',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ padding: 10, alignItems: 'center', borderRadius: 15 }}>
              <Text style={styles.buttonText}>Get a meme</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleImagePick}>
            <LinearGradient
              colors={[
                'rgba(0,255,255,0.4)',
                'rgba(255,192,203,1)',
                'rgba(255,255,0,0.5)',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ padding: 10, alignItems: 'center', borderRadius: 15 }}>
              <Text style={styles.buttonText}>Get a new random meme</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {imgState && (
          <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
            <View style={styles.imageContainer}>
              <Image
                source={imgState}
                style={{
                  width: dimensions.width || windowWidth,
                  height: dimensions.height || 300,
                  alignSelf: 'center',
                }}
              />
              <Draggable x={75} y={100}>
                <Text style={styles.memeTextTop}>{meme.topText}</Text>
              </Draggable>
              <Draggable x={75} y={200}>
                <Text style={styles.memeText}>{meme.bottomText}</Text>
              </Draggable>
            </View>
          </ViewShot>
        )}
        {imgState && (
          <TouchableOpacity style={styles.button1} onPress={handleDownload}>
            <LinearGradient
              colors={[
                'rgba(0,255,255,0.4)',
                'rgba(255,192,203,1)',
                'rgba(255,255,0,0.5)',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ padding: 10, alignItems: 'center', borderRadius: 15 }}>
              <Text style={styles.buttonText1}>Download Image</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: { width: 3, height: 3 },
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  inputText: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 10,
    color: 'black',
  },
  button: {
    // backgroundColor: 'green',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  button1: {
    // backgroundColor: 'green',
    padding: 12,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText1: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  memeImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 20,
  },
  memeTextTop: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'crimson',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  memeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'crimson',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

// import React, {useState, useEffect, useRef} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import Draggable from 'react-native-draggable';
// import ImagePicker from 'react-native-image-crop-picker';
// import {useTheme} from '@react-navigation/native';
// import ViewShot from 'react-native-view-shot';
// import RNFS from 'react-native-fs';
// import {CameraRoll} from '@react-native-camera-roll/camera-roll';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// const windowWidth1 = Dimensions.get('screen').width;
// const windowHeight1 = Dimensions.get('screen').height;

// export default function Form() {
//   const {colors} = useTheme();
//   const [image, setImage] = useState(null);
//   const [allMemeData, setMemeAllImages] = useState([]);
//   const [dimensions, setDimensions] = React.useState({width: 0, height: 0});
//   const [imgState, setImageState] = useState(null);
//   const [meme, setMeme] = useState({
//     topText: '',
//     bottomText: '',
//     randomImage: '',
//   });

//   const viewShotRef = useRef();

//   const getImageSize = source => {
//     try {
//       Image.getSize(source.uri, (width, height) => {
//         const aspectRatio = width / height;
//         const imageHeight = windowWidth1 / aspectRatio;
//         setDimensions({width: windowWidth1, height: imageHeight});
//         console.log(
//           'Image dimensions:',
//           width,
//           height,
//           source.uri,
//           windowWidth1,
//           imageHeight,
//         );
//       });
//     } catch (error) {
//       console.error('Error getting image size:', error);
//     }
//   };

//   useEffect(() => {
//     console.log('Updated dimensions:', dimensions.width, dimensions.height);
//   }, [dimensions]);

//   const handleImagePick = () => {
//     ImagePicker.openPicker({
//       cropping: true,
//       cropperActiveWidgetColor: '#4286BC',
//       cropperToolbarColor: colors.color_TabBarColor,
//       cropperToolbarWidgetColor: colors.color_CropTxtWidget,
//     })
//       .then(image => {
//         const source = {uri: image.path};
//         setImageState(source);
//         getImageSize(source);
//       })
//       .catch(error => {
//         if (error.message !== 'User cancelled image selection') {
//           console.error('ImagePicker Error: ', error.message);
//         }
//       });
//   };

//   const handleChange = (name, value) => {
//     setMeme({
//       ...meme,
//       [name]: value,
//     });
//   };

//   const handleDownload = async () => {
//     try {
//       const uri = await viewShotRef.current.capture();
//       const destPath = `${RNFS.ExternalDirectoryPath}/meme.jpg`;
//       await RNFS.moveFile(uri, destPath);
//       await CameraRoll.save(destPath, {type: 'photo', album: 'Memes'});
//       alert('Image saved to gallery!');
//     } catch (error) {
//       console.error('Error saving image:', error);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.formContainer}>
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.inputText}
//               onChangeText={value => handleChange('topText', value)}
//               value={meme.topText}
//               placeholder="Enter top text"
//             />
//             <TextInput
//               style={styles.inputText}
//               onChangeText={value => handleChange('bottomText', value)}
//               value={meme.bottomText}
//               placeholder="Enter bottom text"
//             />
//           </View>
//           <TouchableOpacity style={styles.button}>
//             <Text style={styles.buttonText}>Get a meme</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={handleImagePick}>
//             <Text style={styles.buttonText}>Get a new random meme</Text>
//           </TouchableOpacity>
//         </View>
//         {imgState && (
//           <ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 0.9}}>
//             <View style={styles.imageContainer}>
//               <Image
//                 source={imgState}
//                 style={{
//                   width: dimensions.width || windowWidth,
//                   height: dimensions.height || 300,
//                   alignSelf: 'center',
//                 }}
//               />
//               <Draggable x={75} y={100}>
//                 <Text style={styles.memeTextTop}>{meme.topText}</Text>
//               </Draggable>
//               <Draggable x={75} y={200}>
//                 <Text style={styles.memeText}>{meme.bottomText}</Text>
//               </Draggable>
//             </View>
//           </ViewShot>
//         )}
//         {imgState && (
//           <TouchableOpacity style={styles.button} onPress={handleDownload}>
//             <Text style={styles.buttonText}>Download Image</Text>
//           </TouchableOpacity>
//         )}
//       </SafeAreaView>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   formContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     margin: 20,
//     padding: 20,
//     borderRadius: 15,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 1,
//     shadowOffset: {width: 3, height: 3},
//   },
//   inputContainer: {
//     marginBottom: 20,
//     width: '100%',
//   },
//   inputText: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//     fontSize: 16,
//     paddingVertical: 10,
//     marginBottom: 10,
//     color: 'black',
//   },
//   button: {
//     backgroundColor: 'green',
//     padding: 12,
//     borderRadius: 10,
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   imageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   memeTextTop: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'crimson',
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: {width: -1, height: 1},
//     textShadowRadius: 10,
//   },
//   memeText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'crimson',
//     textAlign: 'center',
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: {width: -1, height: 1},
//     textShadowRadius: 10,
//   },
// });

// import React, {useState, useEffect, useRef} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import Draggable from 'react-native-draggable';
// import ImagePicker from 'react-native-image-crop-picker';
// import {useTheme} from '@react-navigation/native';
// import ViewShot from 'react-native-view-shot';
// import RNFS from 'react-native-fs';
// import {CameraRoll} from '@react-native-camera-roll/camera-roll';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// const windowWidth1 = Dimensions.get('screen').width;
// const windowHeight1 = Dimensions.get('screen').height;

// export default function Form() {
//   const {colors} = useTheme();
//   const [image, setImage] = useState(null);
//   const [allMemeData, setMemeAllImages] = useState([]);
//   const [dimensions, setDimensions] = React.useState({width: 0, height: 0});
//   const [imgState, setImageState] = useState(null);
//   const [meme, setMeme] = useState({
//     topText: '',
//     bottomText: '',
//     randomImage: '',
//   });

//   const viewShotRef = useRef();

//   const getImageSize = source => {
//     try {
//       Image.getSize(source.uri, (width, height) => {
//         const aspectRatio = width / height;
//         const imageHeight = windowWidth1 / aspectRatio;
//         setDimensions({width: windowWidth1, height: imageHeight});
//         console.log(
//           'Image dimensions:',
//           width,
//           height,
//           source.uri,
//           windowWidth1,
//           imageHeight,
//         );
//       });
//     } catch (error) {
//       console.error('Error getting image size:', error);
//     }
//   };

//   useEffect(() => {
//     console.log('Updated dimensions:', dimensions.width, dimensions.height);
//   }, [dimensions]);

//   const handleImagePick = () => {
//     ImagePicker.openPicker({
//       cropping: true,
//       cropperActiveWidgetColor: '#4286BC',
//       cropperToolbarColor: colors.color_TabBarColor,
//       cropperToolbarWidgetColor: colors.color_CropTxtWidget,
//     })
//       .then(image => {
//         const source = {uri: image.path};
//         setImageState(source);
//         getImageSize(source);
//       })
//       .catch(error => {
//         if (error.message !== 'User cancelled image selection') {
//           console.error('ImagePicker Error: ', error.message);
//         }
//       });
//   };

//   const handleChange = (name, value) => {
//     setMeme({
//       ...meme,
//       [name]: value,
//     });
//   };

//   const handleDownload = async () => {
//     try {
//       const uri = await viewShotRef.current.capture();
//       const destPath = `${RNFS.ExternalDirectoryPath}/meme.jpg`;
//       await RNFS.moveFile(uri, destPath);
//       await CameraRoll.save(destPath, {type: 'photo', album: 'Memes'});
//       alert('Image saved to gallery!');
//     } catch (error) {
//       console.error('Error saving image:', error);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.formContainer}>
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.inputText}
//               onChangeText={value => handleChange('topText', value)}
//               value={meme.topText}
//               placeholder="Enter top text"
//             />
//             <TextInput
//               style={styles.inputText}
//               onChangeText={value => handleChange('bottomText', value)}
//               value={meme.bottomText}
//               placeholder="Enter bottom text"
//             />
//           </View>
//           <TouchableOpacity style={styles.button}>
//             <Text style={styles.buttonText}>Get a meme</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={handleImagePick}>
//             <Text style={styles.buttonText}>Get a new random meme</Text>
//           </TouchableOpacity>
//         </View>
//         {imgState && (
//           <ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 0.9}}>
//             <View style={styles.imageContainer}>
//               <Image
//                 source={imgState}
//                 style={{
//                   width: dimensions.width || windowWidth,
//                   height: dimensions.height || 300,
//                   alignSelf: 'center',
//                 }}
//               />
//               <Draggable x={75} y={100}>
//                 <Text style={styles.memeTextTop}>{meme.topText}</Text>
//               </Draggable>
//               <Draggable x={75} y={200}>
//                 <Text style={styles.memeText}>{meme.bottomText}</Text>
//               </Draggable>
//             </View>
//           </ViewShot>
//         )}
//         {imgState && (
//           <TouchableOpacity style={styles.button} onPress={handleDownload}>
//             <Text style={styles.buttonText}>Download Image</Text>
//           </TouchableOpacity>
//         )}
//       </SafeAreaView>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   formContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     margin: 20,
//     padding: 20,
//     borderRadius: 15,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 1,
//     shadowOffset: {width: 3, height: 3},
//   },
//   inputContainer: {
//     marginBottom: 20,
//     width: '100%',
//   },
//   inputText: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//     fontSize: 16,
//     paddingVertical: 10,
//     marginBottom: 10,
//     color: 'black',
//   },
//   button: {
//     backgroundColor: 'green',
//     padding: 12,
//     borderRadius: 10,
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   imageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   memeImage: {
//     width: 300,
//     height: 300,
//     resizeMode: 'contain',
//     borderRadius: 10,
//     borderWidth: 3,
//     borderColor: '#333',
//     shadowColor: '#000',
//     shadowOpacity: 0.4,
//     shadowOffset: {width: 0, height: 4},
//     marginBottom: 20,
//   },
//   memeTextTop: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'crimson',
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: {width: -1, height: 1},
//     textShadowRadius: 10,
//   },
//   memeText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'crimson',
//     textAlign: 'center',
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: {width: -1, height: 1},
//     textShadowRadius: 10,
//   },
// });

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import Draggable from 'react-native-draggable';
// import ImagePicker from 'react-native-image-crop-picker';
// import {useTheme} from '@react-navigation/native';
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// const windowWidth1 = Dimensions.get('screen').width;
// const windowHeight1 = Dimensions.get('screen').height;
// export default function Form() {
//   const {colors} = useTheme();
//   const [image, setImage] = useState(null);
//   const [allMemeData, setMemeAllImages] = useState([]);
//   const [dimensions, setDimensions] = React.useState({width: 0, height: 0});
//   const [imgState, setImageState] = useState(null);
//   const [meme, setMeme] = useState({
//     topText: '',
//     bottomText: '',
//     randomImage: '',
//   });
//   // const getImageSize = url => {
//   //   try {
//   //     Image.getSize(url, (width, height) => {
//   //       const aspectRatio = width / height;
//   //       const imageHeight = windowWidth1 / aspectRatio;
//   //       setDimensions({width: windowWidth1, height: imageHeight});
//   //       console.log(
//   //         'Image dimensions:',
//   //         width,
//   //         height,
//   //         url,
//   //         windowWidth1,
//   //         imageHeight,
//   //       );
//   //     });
//   //   } catch (error) {
//   //     console.error('Error getting image size:', error);
//   //   }
//   // };
//   const getImageSize = source => {
//     try {
//       Image.getSize(source.uri, (width, height) => {
//         const aspectRatio = width / height;
//         const imageHeight = windowWidth1 / aspectRatio;
//         setDimensions({width: windowWidth1, height: imageHeight});
//         console.log(
//           'Image dimensions:',
//           width,
//           height,
//           source.uri,
//           windowWidth1,
//           imageHeight,
//         );
//       });
//     } catch (error) {
//       console.error('Error getting image size:', error);
//     }
//   };

//   useEffect(() => {
//     // getImageSize(profile);
//     console.log('Updated dimensions:', dimensions.width, dimensions.height);
//   }, [dimensions]);

//   const handleImagePick = () => {
//     ImagePicker.openPicker({
//       cropping: true,
//       cropperActiveWidgetColor: '#4286BC',
//       cropperToolbarColor: colors.color_TabBarColor,
//       cropperToolbarWidgetColor: colors.color_CropTxtWidget,
//     })
//       .then(image => {
//         const source = {uri: image.path};
//         setImageState(source);
//         getImageSize(source);
//       })
//       .catch(error => {
//         if (error.message !== 'User cancelled image selection') {
//           console.error('ImagePicker Error: ', error.message);
//         }
//       });
//   };

//   // const handleRandomImage = () => {
//   //   if (allMemeData.length > 0) {
//   //     const randomMeme =
//   //       allMemeData[Math.floor(Math.random() * allMemeData.length)];
//   //     setImageState({uri: randomMeme.url});
//   //   }
//   // };

//   const handleChange = (name, value) => {
//     setMeme({
//       ...meme,
//       [name]: value,
//     });
//   };

//   return (
//     <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.formContainer}>
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.inputText}
//               onChangeText={value => handleChange('topText', value)}
//               value={meme.topText}
//               placeholder="Enter top text"
//             />
//             <TextInput
//               style={styles.inputText}
//               onChangeText={value => handleChange('bottomText', value)}
//               value={meme.bottomText}
//               placeholder="Enter bottom text"
//             />
//           </View>
//           <TouchableOpacity style={styles.button}>
//             <Text style={styles.buttonText}>Get a meme</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={handleImagePick}>
//             <Text style={styles.buttonText}>Get a new random meme</Text>
//           </TouchableOpacity>
//         </View>
//         {imgState && (
//           <View style={styles.imageContainer}>
//             <Image
//               source={imgState}
//               style={{
//                 width: dimensions.width || windowWidth,
//                 height: dimensions.height || 300,
//                 alignSelf: 'center',
//               }}
//             />
//             <Draggable x={75} y={100}>
//               <Text style={styles.memeTextTop}>{meme.topText}</Text>
//             </Draggable>
//             <Draggable x={75} y={200}>
//               <Text style={styles.memeText}>{meme.bottomText}</Text>
//             </Draggable>
//           </View>
//         )}
//       </SafeAreaView>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   formContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     margin: 20,
//     padding: 20,
//     borderRadius: 15,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 1,
//     shadowOffset: {width: 3, height: 3},
//   },
//   inputContainer: {
//     marginBottom: 20,
//     width: '100%',
//   },
//   inputText: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//     fontSize: 16,
//     paddingVertical: 10,
//     marginBottom: 10,
//     color: 'black',
//   },
//   button: {
//     backgroundColor: 'green',
//     padding: 12,
//     borderRadius: 10,
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   imageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   memeImage: {
//     width: 300,
//     height: 300,
//     resizeMode: 'contain',
//     borderRadius: 10,
//     borderWidth: 3,
//     borderColor: '#333',
//     shadowColor: '#000',
//     shadowOpacity: 0.4,
//     shadowOffset: {width: 0, height: 4},
//     marginBottom: 20,
//   },
//   memeTextTop: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'crimson',
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: {width: -1, height: 1},
//     textShadowRadius: 10,
//   },
//   memeText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'crimson',
//     textAlign: 'center',
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: {width: -1, height: 1},
//     textShadowRadius: 10,
//   },
// });

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
// } from 'react-native';
// import Draggable from 'react-native-draggable';
// import {launchImageLibrary} from 'react-native-image-picker';

// export default function Form() {
//   const [image, setImage] = useState(null);
//   const [allMemeData, setMemeAllImages] = useState([]);
//   const [imgState, setImageState] = useState(null);
//   const [meme, setMeme] = useState({
//     topText: '',
//     bottomText: '',
//     randomImage: '',
//   });
//   const handleImagePick = () => {
//     const options = {
//       mediaType: 'photo',
//       maxWidth: 300,
//       maxHeight: 300,
//       quality: 1,
//     };

//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         console.log('ImagePicker Error: ', response.errorMessage);
//       } else if (response.assets && response.assets.length > 0) {
//         const source = {uri: response.assets[0].uri};
//         setImageState(source);
//       }
//     });
//   };

//   const handleRandomImage = () => {
//     if (allMemeData.length > 0) {
//       const randomMeme =
//         allMemeData[Math.floor(Math.random() * allMemeData.length)];
//       setImageState({uri: randomMeme.url});
//     }
//   };

//   const handleChange = (name, value) => {
//     setMeme({
//       ...meme,
//       [name]: value,
//     });
//   };

//   return (
//     <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.formContainer}>
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.inputText}
//               onChangeText={value => handleChange('topText', value)}
//               value={meme.topText}
//               placeholder="Enter top text"
//             />
//             <TextInput
//               style={styles.inputText}
//               onChangeText={value => handleChange('bottomText', value)}
//               value={meme.bottomText}
//               placeholder="Enter bottom text"
//             />
//           </View>
//           <TouchableOpacity style={styles.button} onPress={handleRandomImage}>
//             <Text style={styles.buttonText}>Get a meme</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={handleImagePick}>
//             <Text style={styles.buttonText}>Get a new random meme</Text>
//           </TouchableOpacity>
//         </View>
//         {imgState && (
//           <View style={styles.imageContainer}>
//             <Image source={imgState} style={styles.memeImage} />
//             <Draggable x={75} y={100}>
//               <Text style={styles.memeTextTop}>{meme.topText}</Text>
//             </Draggable>
//             <Draggable x={75} y={200}>
//               <Text style={styles.memeText}>{meme.bottomText}</Text>
//             </Draggable>
//           </View>
//         )}
//       </SafeAreaView>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   formContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     margin: 20,
//     padding: 20,
//     borderRadius: 15,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 1,
//     shadowOffset: {width: 3, height: 3},
//   },
//   inputContainer: {
//     marginBottom: 20,
//     width: '100%',
//   },
//   inputText: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//     fontSize: 16,
//     paddingVertical: 10,
//     marginBottom: 10,
//     color: 'black',
//   },
//   button: {
//     backgroundColor: 'green',
//     padding: 12,
//     borderRadius: 10,
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   imageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   memeImage: {
//     width: 300,
//     height: 300,
//     resizeMode: 'contain',
//     borderRadius: 10,
//     borderWidth: 3,
//     borderColor: '#333',
//     shadowColor: '#000',
//     shadowOpacity: 0.4,
//     shadowOffset: {width: 0, height: 4},
//     marginBottom: 20,
//   },
//   memeTextTop: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'crimson',
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: {width: -1, height: 1},
//     textShadowRadius: 10,
//   },
//   memeText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'crimson',
//     textAlign: 'center',
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: {width: -1, height: 1},
//     textShadowRadius: 10,
//   },
// });

// import React, {useState, useRef, useEffect} from 'react';
// import {View, Button, Image, TextInput, StyleSheet, Text} from 'react-native';
// import {launchImageLibrary} from 'react-native-image-picker';
// import {Canvas} from 'react-native-canvas'; // Import Canvas component from react-native-canvas

// const CreateMeme = () => {
//   const [imageUri, setImageUri] = useState(null);
//   const [topText, setTopText] = useState('');
//   const [bottomText, setBottomText] = useState('');
//   const canvasRef = useRef(null);

//   const pickImage = () => {
//     launchImageLibrary({mediaType: 'photo'}, response => {
//       if (response.assets) {
//         setImageUri(response.assets[0].uri);
//       }
//     });
//   };

//   useEffect(() => {
//     if (canvasRef.current && imageUri) {
//       const ctx = canvasRef.current.getContext('2d');
//       const img = new Image();
//       img.src = imageUri;
//       img.onload = () => {
//         ctx.drawImage(
//           img,
//           0,
//           0,
//           canvasRef.current.width,
//           canvasRef.current.height,
//         );
//         ctx.font = '30px Arial';
//         ctx.fillStyle = 'white';
//         ctx.strokeStyle = 'black';
//         ctx.lineWidth = 2;
//         ctx.textAlign = 'center';

//         ctx.strokeText(topText, canvasRef.current.width / 2, 40);
//         ctx.fillText(topText, canvasRef.current.width / 2, 40);
//         ctx.strokeText(
//           bottomText,
//           canvasRef.current.width / 2,
//           canvasRef.current.height - 20,
//         );
//         ctx.fillText(
//           bottomText,
//           canvasRef.current.width / 2,
//           canvasRef.current.height - 20,
//         );
//       };
//     }
//   }, [imageUri, topText, bottomText]);

//   return (
//     <View style={styles.container}>
//       <Button title="Pick an image from gallery" onPress={pickImage} />
//       {imageUri && (
//         <>
//           <Image source={{uri: imageUri}} style={styles.image} />
//           <TextInput
//             style={styles.textInput}
//             placeholder="Top Text"
//             value={topText}
//             onChangeText={setTopText}
//           />
//           <TextInput
//             style={styles.textInput}
//             placeholder="Bottom Text"
//             value={bottomText}
//             onChangeText={setBottomText}
//           />
//           <Canvas ref={canvasRef} style={styles.canvas} />
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: 300,
//     height: 300,
//     marginVertical: 10,
//   },
//   textInput: {
//     width: '80%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     padding: 5,
//     marginVertical: 5,
//   },
//   canvas: {
//     width: 300,
//     height: 300,
//     marginTop: 10,
//   },
// });

// export default CreateMeme;

// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   TextInput,
// } from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import React, {useState, useCallback} from 'react';
// import ImagePicker from 'react-native-image-crop-picker';
// import BackArrow from '../assets/svg/BackArrow';
// import FontFamily from '../common/components/FontFamily';
// import PlusIcon from '../assets/svg/PlusIcon';
// import {Canvas, Image as CanvasImage, useCanvas} from 'react-native-canvas';
// import Draggable from 'react-native-draggable';

// const CreateMeme = ({navigation}) => {
//   const {colors} = useTheme();
//   const [profile, setProfile] = useState(null);
//   const [dimensions, setDimensions] = useState({width: 0, height: 0});
//   const windowWidth1 = Dimensions.get('window').width;
//   const [imageUri, setImageUri] = useState(null);
//   const [text, setText] = useState('');
//   const canvasRef = React.useRef(null);
//   const [position, setPosition] = useState({x: 100, y: 100});
//   const handleCanvas = canvas => {
//     if (canvas) {
//       const ctx = canvas.getContext('2d');
//       const image = new CanvasImage(canvas);
//       image.src = profile;

//       image.addEventListener('load', () => {
//         canvas.width = image.width;
//         canvas.height = image.height;
//         ctx.drawImage(image, 0, 0, image.width, image.height);
//         ctx.font = '20px Arial';
//         ctx.fillText(text, 50, 50); // You can customize the position and style of the text
//       });
//     }
//   };

//   React.useEffect(() => {
//     if (canvasRef.current && profile) {
//       handleCanvas(canvasRef.current);
//     }
//   }, [profile, text]);

//   const handleImagePicker = useCallback(() => {
//     ImagePicker.openPicker({
//       cropping: true,
//       cropperActiveWidgetColor: '#4286BC',
//       text: true,
//       cropperToolbarColor: colors.color_TabBarColor,
//       cropperToolbarWidgetColor: colors.color_CropTxtWidget,
//     })
//       .then(async image => {
//         const imageUri = image.path;
//         setProfile(imageUri);
//         getImageSize(imageUri);
//       })
//       .catch(error => {
//         console.log('Error picking image: ', error);
//       });
//   }, [colors]);

//   const getImageSize = url => {
//     try {
//       Image.getSize(url, (width, height) => {
//         const aspectRatio = width / height;
//         const imageHeight = windowWidth1 / aspectRatio;
//         setDimensions({width: windowWidth1, height: imageHeight});
//         console.log(
//           'Image dimensions:',
//           width,
//           height,
//           url,
//           windowWidth1,
//           imageHeight,
//         );
//       });
//     } catch (error) {
//       console.error('Error getting image size:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View
//         style={[styles.header, {backgroundColor: colors.color_TabBarColor}]}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.navigate('CreatePost')}>
//           <BackArrow color={colors.arrow} />
//         </TouchableOpacity>
//         <Text style={[styles.headerText, {color: colors.color_TextNormal}]}>
//           Create Meme
//         </Text>
//       </View>

//       {!profile && (
//         <TouchableOpacity onPress={handleImagePicker}>
//           <View
//             style={[
//               styles.uploadContainer,
//               {
//                 backgroundColor: colors.color_CardBgColor,
//                 borderColor: colors.color_BorderColor,
//               },
//             ]}>
//             <PlusIcon color={colors.color_CardIcon} />
//             <Text
//               style={[styles.uploadText, {color: colors.color_CardTxtColor}]}>
//               Click here to upload
//             </Text>
//           </View>
//         </TouchableOpacity>
//       )}
//       {/* {profile && <Canvas ref={canvasRef} style={styles.canvas} />} */}
//       {profile && (
//         <View>
//           <Image
//             source={{uri: profile}}
//             style={[
//               styles.image,
//               {width: dimensions.width, height: dimensions.height},
//             ]}
//           />
//           <Draggable
//             x={position.x}
//             y={position.y}
//             minX={0}
//             minY={0}
//             maxX={windowWidth1 - 200}
//             maxY={dimensions.height + 200}
//             onDragRelease={(event, gestureState, bounds) => {
//               setPosition({x: bounds.left, y: bounds.top});
//             }}>
//             <TextInput
//               style={[
//                 styles.textInput,
//                 {
//                   backgroundColor: colors.color_CardBgColor,
//                   color: colors.color_TextNormal,
//                 },
//               ]}
//               placeholder="Enter meme text"
//               placeholderTextColor={colors.color_BorderColor}
//               value={text}
//               onChangeText={setText}
//             />
//           </Draggable>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     height: 56,
//     alignItems: 'center',
//   },
//   backButton: {
//     flex: 0.5,
//     paddingLeft: 10,
//   },
//   headerText: {
//     fontFamily: FontFamily.semibold,
//     fontSize: 20,
//   },
//   uploadContainer: {
//     width: '80%',
//     height: 200,
//     alignSelf: 'center',
//     alignItems: 'center',
//     borderRadius: 15,
//     borderWidth: 2,
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   uploadText: {
//     marginTop: 20,
//     fontSize: 20,
//     fontFamily: FontFamily.semibold,
//     textAlignVertical: 'center',
//   },
//   image: {
//     borderRadius: 15,
//   },
//   textInput: {
//     position: 'absolute',
//     width: 200,
//     height: 50,
//     padding: 10,
//     fontSize: 18,
//     borderWidth: 1,
//     borderRadius: 8,
//   },
// });

// export default CreateMeme;
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   TextInput,
// } from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import React, {useState, useCallback} from 'react';
// import ImagePicker from 'react-native-image-crop-picker';
// import BackArrow from '../assets/svg/BackArrow';
// import FontFamily from '../common/components/FontFamily';
// import PlusIcon from '../assets/svg/PlusIcon';
// import Draggable from 'react-native-draggable';

// const CreateMeme = ({navigation}) => {
//   const {colors} = useTheme();
//   const [profile, setProfile] = useState(null);
//   const [dimensions, setDimensions] = useState({width: 0, height: 0});
//   const windowWidth1 = Dimensions.get('window').width;
//   const [text, setText] = useState('');
//   const [position, setPosition] = useState({ x: 100, y: 100 });

//   const handleImagePicker = useCallback(() => {
//     ImagePicker.openPicker({
//       cropping: true,
//       cropperActiveWidgetColor: '#4286BC',
//       text: true,
//       cropperToolbarColor: colors.color_TabBarColor,
//       cropperToolbarWidgetColor: colors.color_CropTxtWidget,
//     })
//       .then(async image => {
//         const imageUri = image.path;
//         setProfile(imageUri);
//         getImageSize(imageUri);
//       })
//       .catch(error => {
//         console.log('Error picking image: ', error);
//       });
//   }, [colors]);

//   const getImageSize = url => {
//     try {
//       Image.getSize(url, (width, height) => {
//         const aspectRatio = width / height;
//         const imageHeight = windowWidth1 / aspectRatio;
//         setDimensions({width: windowWidth1, height: imageHeight});
//         console.log(
//           'Image dimensions:',
//           width,
//           height,
//           url,
//           windowWidth1,
//           imageHeight,
//         );
//       });
//     } catch (error) {
//       console.error('Error getting image size:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View
//         style={[styles.header, {backgroundColor: colors.color_TabBarColor}]}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.navigate('CreatePost')}>
//           <BackArrow color={colors.arrow} />
//         </TouchableOpacity>
//         <Text style={[styles.headerText, {color: colors.color_TextNormal}]}>
//           Create Meme
//         </Text>
//       </View>

//       {!profile && (
//         <TouchableOpacity onPress={handleImagePicker}>
//           <View
//             style={[
//               styles.uploadContainer,
//               {
//                 backgroundColor: colors.color_CardBgColor,
//                 borderColor: colors.color_BorderColor,
//               },
//             ]}>
//             <PlusIcon color={colors.color_CardIcon} />
//             <Text
//               style={[styles.uploadText, {color: colors.color_CardTxtColor}]}>
//               Click here to upload
//             </Text>
//           </View>
//         </TouchableOpacity>
//       )}

//       {profile && (
//         <View>
//           <Image
//             source={{uri: profile}}
//             style={[
//               styles.image,
//               {width: dimensions.width, height: dimensions.height},
//             ]}
//           />
//           <Draggable
//             x={position.x}
//             y={position.y}
//             minX={0}
//             minY={0}
//             maxX={windowWidth1 - 200}
//             maxY={dimensions.height + 200}
//             onDragRelease={(event, gestureState, bounds) => {
//               setPosition({ x: bounds.left, y: bounds.top });
//             }}
//           >
//             <TextInput
//               style={[
//                 styles.textInput,
//                 {backgroundColor: colors.color_CardBgColor, color: colors.color_TextNormal},
//               ]}
//               placeholder="Enter meme text"
//               placeholderTextColor={colors.color_BorderColor}
//               value={text}
//               onChangeText={setText}
//             />
//           </Draggable>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     height: 56,
//     alignItems: 'center',
//   },
//   backButton: {
//     flex: 0.5,
//     paddingLeft: 10,
//   },
//   headerText: {
//     fontFamily: FontFamily.semibold,
//     fontSize: 20,
//   },
//   uploadContainer: {
//     width: '80%',
//     height: 200,
//     alignSelf: 'center',
//     alignItems: 'center',
//     borderRadius: 15,
//     borderWidth: 2,
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   uploadText: {
//     marginTop: 20,
//     fontSize: 20,
//     fontFamily: FontFamily.semibold,
//     textAlignVertical: 'center',
//   },
//   image: {
//     borderRadius: 15,
//   },
//   textInput: {
//     position: 'absolute',
//     width: 200,
//     height: 50,
//     padding: 10,
//     fontSize: 18,
//     borderWidth: 1,
//     borderRadius: 8,
//   },
// });

// export default CreateMeme;

// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Dimensions,
// } from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import React, {useState, useCallback} from 'react';
// import ImagePicker from 'react-native-image-crop-picker';
// import BackArrow from '../assets/svg/BackArrow';
// import FontFamily from '../common/components/FontFamily';
// import PlusIcon from '../assets/svg/PlusIcon';

// const CreateMeme = ({navigation}) => {
//   const {colors} = useTheme();
//   const [profile, setProfile] = useState(null);
//   const [dimensions, setDimensions] = useState({width: 0, height: 0});
//   const windowWidth1 = Dimensions.get('window').width;

//   const handleImagePicker = useCallback(() => {
//     ImagePicker.openPicker({
//       cropping: true,
//       cropperActiveWidgetColor: '#4286BC',
//       cropperToolbarColor: colors.color_TabBarColor,
//       cropperToolbarWidgetColor: colors.color_CropTxtWidget,
//     })
//       .then(async image => {
//         const imageUri = image.path;
//         setProfile(imageUri);
//         getImageSize(imageUri);
//       })
//       .catch(error => {
//         console.log('Error picking image: ', error);
//       });
//   }, [colors]);

//   const getImageSize = url => {
//     try {
//       Image.getSize(url, (width, height) => {
//         const aspectRatio = width / height;
//         const imageHeight = windowWidth1 / aspectRatio;
//         setDimensions({width: windowWidth1, height: imageHeight});
//         console.log(
//           'Image dimensions:',
//           width,
//           height,
//           url,
//           windowWidth1,
//           imageHeight,
//         );
//       });
//     } catch (error) {
//       console.error('Error getting image size:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View
//         style={[styles.header, {backgroundColor: colors.color_TabBarColor}]}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.navigate('CreatePost')}>
//           <BackArrow color={colors.arrow} />
//         </TouchableOpacity>
//         <Text style={[styles.headerText, {color: colors.color_TextNormal}]}>
//           Create Meme
//         </Text>
//       </View>

//       {!profile && (
//         <TouchableOpacity onPress={handleImagePicker}>
//           <View
//             style={[
//               styles.uploadContainer,
//               {
//                 backgroundColor: colors.color_CardBgColor,
//                 borderColor: colors.color_BorderColor,
//               },
//             ]}>
//             <PlusIcon color={colors.color_CardIcon} />
//             <Text
//               style={[styles.uploadText, {color: colors.color_CardTxtColor}]}>
//               Click here to upload
//             </Text>
//           </View>
//         </TouchableOpacity>
//       )}

//       {profile && (
//         <Image
//           source={{uri: profile}}
//           style={[
//             styles.image,
//             {width: dimensions.width, height: dimensions.height},
//           ]}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     height: 56,
//     alignItems: 'center',
//   },
//   backButton: {
//     flex: 0.5,
//     paddingLeft: 10,
//   },
//   headerText: {
//     fontFamily: FontFamily.semibold,
//     fontSize: 20,
//   },
//   uploadContainer: {
//     width: '80%',
//     height: 200,
//     alignSelf: 'center',
//     alignItems: 'center',
//     borderRadius: 15,
//     borderWidth: 2,
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   uploadText: {
//     marginTop: 20,
//     fontSize: 20,
//     fontFamily: FontFamily.semibold,
//     textAlignVertical: 'center',
//   },
//   image: {
//     borderRadius: 15,
//   },
// });

// export default CreateMeme;

// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Dimensions,
// } from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import React, {useState, useCallback} from 'react';
// import ImagePicker from 'react-native-image-crop-picker';
// import BackArrow from '../assets/svg/BackArrow';
// import FontFamily from '../common/components/FontFamily';
// import PlusIcon from '../assets/svg/PlusIcon';

// const CreateMeme = ({navigation}) => {
//   const {colors} = useTheme();
//   const [profile, setProfile] = useState(null);

//   const handleImagePicker = useCallback(() => {
//     ImagePicker.openPicker({
//       cropping: true,
//       cropperActiveWidgetColor: '#4286BC',
//       cropperToolbarColor: colors.color_TabBarColor,
//       cropperToolbarWidgetColor: colors.color_CropTxtWidget,
//     })
//       .then(async image => {
//         const imageUri = image.path;
//         setProfile(imageUri);
//       })
//       .catch(error => {
//         console.log('Error picking image: ', error);
//       });
//   }, [colors]);

//   return (
//     <View style={styles.container}>
//       <View style={[styles.header, {backgroundColor: colors.color_TabBarColor}]}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.navigate('CreatePost')}>
//           <BackArrow color={colors.arrow} />
//         </TouchableOpacity>
//         <Text style={[styles.headerText, {color: colors.color_TextNormal}]}>
//           Create Meme
//         </Text>
//       </View>

//       {!profile && (
//         <TouchableOpacity onPress={handleImagePicker}>
//           <View
//             style={[
//               styles.uploadContainer,
//               {
//                 backgroundColor: colors.color_CardBgColor,
//                 borderColor: colors.color_BorderColor,
//               },
//             ]}>
//             <PlusIcon color={colors.color_CardIcon} />
//             <Text
//               style={[styles.uploadText, {color: colors.color_CardTxtColor}]}>
//               Click here to upload
//             </Text>
//           </View>
//         </TouchableOpacity>
//       )}

//       {profile && (
//         <Image source={{uri: profile}} style={styles.image} />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     height: 56,
//     alignItems: 'center',
//   },
//   backButton: {
//     flex: 0.5,
//     paddingLeft: 10,
//   },
//   headerText: {
//     fontFamily: FontFamily.semibold,
//     fontSize: 20,
//   },
//   uploadContainer: {
//     width: '80%',
//     height: 200,
//     alignSelf: 'center',
//     alignItems: 'center',
//     borderRadius: 15,
//     borderWidth: 2,
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   uploadText: {
//     marginTop: 20,
//     fontSize: 20,
//     fontFamily: FontFamily.semibold,
//     textAlignVertical: 'center',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 15,
//   },
// });

// export default CreateMeme;

// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Dimensions,
// } from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import React, {useState, useCallback} from 'react';
// import ImagePicker from 'react-native-image-crop-picker';
// import BackArrow from '../assets/svg/BackArrow';
// import FontFamily from '../common/components/FontFamily';
// import PlusIcon from '../assets/svg/PlusIcon';

// // const windowWidth = Dimensions.get('window').width;
// // const windowHeight = Dimensions.get('window').height;
// // const windowWidth1 = Dimensions.get('screen').width;
// // const windowHeight1 = Dimensions.get('screen').height;
// // const desiredWidth = 0.2 * windowWidth;
// // const desiredHeight = 0.2 * windowHeight;

// const CreateMeme = ({navigation}) => {
//   const {colors} = useTheme();
//   const [profile, setProfile] = useState(null);
//   const [visible, setVisible] = React.useState(false);
//   const [selectedpost, setSelectedpost] = React.useState({});
//   const [dimensions, setDimensions] = React.useState({width: 0, height: 0});

//   // const getImageSize = url => {
//   //   try {
//   //     Image.getSize(url, (width, height) => {
//   //       const aspectRatio = width / height;
//   //       const imageHeight = windowWidth1 / aspectRatio;
//   //       setDimensions({width: windowWidth1, height: imageHeight});
//   //       console.log(
//   //         'Image dimensions:',
//   //         width,
//   //         height,
//   //         url,
//   //         windowWidth1,
//   //         imageHeight,
//   //       );
//   //     });
//   //   } catch (error) {
//   //     console.error('Error getting image size:', error);
//   //   }
//   // };
//   // React.useEffect(() => {
//   //   // getImageSize(profile);
//   //   console.log('Updated dimensions:', dimensions.width, dimensions.height);
//   // }, [dimensions]);
//   const handleImagePicker = useCallback(() => {
//     ImagePicker.openPicker({
//       cropping: true,
//       cropperActiveWidgetColor: '#4286BC',
//       cropperToolbarColor: colors.color_TabBarColor,
//       cropperToolbarWidgetColor: colors.color_CropTxtWidget,
//     })
//       .then(async image => {
//         const imageUri = image.path;

//         setProfile(imageUri);
//         // getImageSize(imageUri);
//         // setSelectedpost({
//         //   uri: imageUri,
//         //   type: image.mime,
//         //   fileName: 'abxcgg',
//         // });
//         // setVisible(false);
//       })
//       .catch(error => {
//         console.log('Error picking image: ', error);
//       });
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View
//         style={[styles.header, {backgroundColor: colors.color_TabBarColor}]}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.navigate('CreatePost')}>
//           <BackArrow color={colors.arrow} />
//         </TouchableOpacity>
//         <Text style={[styles.headerText, {color: colors.color_TextNormal}]}>
//           Create Meme
//         </Text>
//       </View>

//       <TouchableOpacity onPress={handleImagePicker}>
//         <View
//           style={[
//             styles.uploadContainer,
//             {
//               backgroundColor: colors.color_CardBgColor,
//               borderColor: colors.color_BorderColor,
//             },
//           ]}>
//           <>
//             <PlusIcon color={colors.color_CardIcon} />
//             <Text
//               style={[styles.uploadText, {color: colors.color_CardTxtColor}]}>
//               Click here to upload
//             </Text>
//           </>
//         </View>
//       </TouchableOpacity>
//       <Image source={profile ? {uri: profile} : null} style={styles.image} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     height: 56,
//     alignItems: 'center',
//   },
//   backButton: {
//     flex: 0.5,
//     paddingLeft: 10,
//   },
//   headerText: {
//     fontFamily: FontFamily.semibold,
//     fontSize: 20,
//   },
//   uploadContainer: {
//     width: '80%',
//     height: 200,
//     alignSelf: 'center',
//     alignItems: 'center',
//     borderRadius: 15,
//     borderWidth: 2,
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   uploadText: {
//     marginTop: 20,
//     fontSize: 20,
//     fontFamily: FontFamily.semibold,
//     textAlignVertical: 'center',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 15,
//   },
// });

// export default CreateMeme;

// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Alert,
//   Dimensions,
//   Image,
// } from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import React, {useCallback, useEffect, useState} from 'react';
// import RNFS from 'react-native-fs';
// import ImagePicker from 'react-native-image-crop-picker';
// import BackArrow from '../assets/svg/BackArrow';
// import FontFamily from '../common/components/FontFamily';
// import PlusIcon from '../assets/svg/PlusIcon';

// const windowWidth = Dimensions.get('window').width;
// const windowWidth1 = Dimensions.get('screen').width;

// const CreateMeme = ({navigation}) => {
//   const {colors} = useTheme();
//   const [dimensions, setDimensions] = useState({width: 0, height: 0});
//   const [profile, setProfile] = useState(null);
//   return (
//     <View style={styles.container}>
//       <View
//         style={[styles.header, {backgroundColor: colors.color_TabBarColor}]}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.navigate('CreatePost')}>
//           <BackArrow color={colors.arrow} />
//         </TouchableOpacity>
//         <Text style={[styles.headerText, {color: colors.color_TextNormal}]}>
//           Create Meme
//         </Text>
//       </View>
//       <TouchableOpacity>
//         <View
//           style={[
//             styles.uploadContainer,
//             {
//               backgroundColor: colors.color_CardBgColor,
//               borderColor: colors.color_BorderColor,
//             },
//           ]}>
//           <PlusIcon color={colors.color_CardIcon} />
//           <Text style={[styles.uploadText, {color: colors.color_CardTxtColor}]}>
//             Click here to upload
//           </Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     height: 56,
//     alignItems: 'center',
//   },
//   backButton: {
//     flex: 0.5,
//     paddingLeft: 10,
//   },
//   headerText: {
//     fontFamily: FontFamily.semibold,
//     fontSize: 20,
//   },
//   uploadContainer: {
//     width: '80%',
//     height: 200,
//     alignSelf: 'center',
//     alignItems: 'center',
//     borderRadius: 15,
//     borderWidth: 2,
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   uploadText: {
//     marginTop: 20,
//     fontSize: 20,
//     fontFamily: FontFamily.semibold,
//     textAlignVertical: 'center',
//   },
// });

// export default CreateMeme;

// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Alert,
//   Dimensions,
//   Image,
// } from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import React, {useCallback, useEffect} from 'react';
// import RNFS from 'react-native-fs';
// import ImagePicker from 'react-native-image-crop-picker';
// import BackArrow from '../assets/svg/BackArrow';
// import FontFamily from '../common/components/FontFamily';
// import PlusIcon from '../assets/svg/PlusIcon';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// const windowWidth1 = Dimensions.get('screen').width;
// const windowHeight1 = Dimensions.get('screen').height;

// const CreateMeme = ({navigation}) => {
//   const {colors} = useTheme();
//   const [dimensions, setDimensions] = React.useState({width: 0, height: 0});
//   const [selectedPost, setSelectedPost] = React.useState({});
//   const [profile, setProfile] = React.useState(null);

//   const getImageSize = url => {
//     Image.getSize(
//       url,
//       (width, height) => {
//         const aspectRatio = width / height;
//         const imageHeight = windowWidth1 / aspectRatio;
//         setDimensions({width: windowWidth1, height: imageHeight});
//         console.log(
//           'Image dimensions:',
//           width,
//           height,
//           url,
//           windowWidth1,
//           imageHeight,
//         );
//       },
//       error => {
//         console.error('Error getting image size:', error);
//       },
//     );
//   };

//   useEffect(() => {
//     console.log('Updated dimensions:', dimensions.width, dimensions.height);
//   }, [dimensions]);

//   const imagePick = useCallback(() => {
//     ImagePicker.openPicker({
//       cropping: true,
//       cropperActiveWidgetColor: '#4286BC',
//       cropperToolbarColor: colors.color_TabBarColor,
//       cropperToolbarWidgetColor: colors.color_CropTxtWidget,
//     })
//       .then(async image => {
//         if (!image) {
//           console.log('User cancelled image picker');
//           return;
//         }

//         const imageUri = image.path;
//         try {
//           const fileStat = await RNFS.stat(imageUri);
//           const imageSize = fileStat.size;

//           if (imageSize > 1000000000) {
//             // 100MB limit
//             Alert.alert(
//               'Image size exceeds the limit (100MB). Please choose a smaller image.',
//             );
//             return;
//           }

//           getImageSize(imageUri);
//           setProfile(imageUri);
//           console.log('Selected image:', imageUri, image);
//           setSelectedPost({
//             uri: imageUri,
//             type: image.mime,
//             fileName: 'selected_image',
//           });
//         } catch (error) {
//           console.log('Error while validating image size:', error);
//         }
//       })
//       .catch(error => {
//         console.log('Image picker error:', error);
//         Alert.alert('Error', 'Failed to pick image. Please try again.');
//       });
//   }, []);

//   return (
//     <View>
//       <View
//         style={{
//           flexDirection: 'row',
//           height: 56,
//           backgroundColor: colors.color_TabBarColor,
//         }}>
//         <TouchableOpacity
//           style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
//           onPress={() => navigation.navigate('CreatePost')}>
//           <BackArrow color={colors.arrow} />
//         </TouchableOpacity>
//         <Text
//           style={{
//             color: colors.color_TextNormal,
//             fontFamily: FontFamily.semibold,
//             alignSelf: 'center',
//             fontSize: 20,
//           }}>
//           Create Meme
//         </Text>
//       </View>
//       <TouchableOpacity onPress={imagePick}>
//         <View
//           style={{
//             width: '80%',
//             height: 200,
//             alignSelf: 'center',
//             alignItems: 'center',
//             borderRadius: 15,
//             backgroundColor: colors.color_CardBgColor,
//             borderWidth: 2,
//             borderColor: colors.color_BorderColor,
//             justifyContent: 'center',
//           }}>
//           <PlusIcon color={colors.color_CardIcon} />
//           <Text
//             style={{
//               marginTop: 20,
//               fontSize: 20,
//               fontFamily: FontFamily.semibold,
//               textAlignVertical: 'center',
//               color: colors.color_CardTxtColor,
//             }}>
//             Click here to upload
//           </Text>
//         </View>
//       </TouchableOpacity>
//       {profile ? (
//         <Image
//           style={{
//             width: dimensions.width || windowWidth,
//             height: dimensions.height || 300,
//             alignSelf: 'center',
//           }}
//           source={{uri: profile}}
//           resizeMode="contain"
//         />
//       ) : null}
//     </View>
//   );
// };

// export default CreateMeme;

// const styles = StyleSheet.create({});

// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Alert,
//   Dimensions,
//   Image,
// } from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import React, {useCallback, useEffect} from 'react';
// import RNFS from 'react-native-fs';
// import ImagePicker from 'react-native-image-crop-picker';
// import BackArrow from '../assets/svg/BackArrow';
// import FontFamily from '../common/components/FontFamily';
// import PlusIcon from '../assets/svg/PlusIcon';
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// const windowWidth1 = Dimensions.get('screen').width;
// const windowHeight1 = Dimensions.get('screen').height;
// const desiredWidth = 0.2 * windowWidth;
// const desiredHeight = 0.2 * windowHeight;
// const CreateMeme = ({navigation}) => {
//   const {colors} = useTheme();
//   const [dimensions, setDimensions] = React.useState({width: 0, height: 0});
//   const [selectedpost, setSelectedpost] = React.useState({});
//   const [profile, setProfile] = React.useState(null);
//   const getImageSize = url => {
//     try {
//       Image.getSize(url, (width, height) => {
//         const aspectRatio = width / height;
//         const imageHeight = windowWidth1 / aspectRatio;
//         setDimensions({width: windowWidth1, height: imageHeight});
//         console.log(
//           'Image dimensions:',
//           width,
//           height,
//           url,
//           windowWidth1,
//           imageHeight,
//         );
//       });
//     } catch (error) {
//       console.error('Error getting image size:', error);
//     }
//   };
//   useEffect(() => {
//     // getImageSize(profile);
//     console.log('Updated dimensions:', dimensions.width, dimensions.height);
//   }, [dimensions]);
//   const imagePick = useCallback(() => {
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
//           // setVisible(false);
//         } catch (error) {
//           console.log('Error while validating image size:', error);
//         }
//       })
//       .catch(error => {
//         console.log('Image Picker error:', error);
//         // Handle error gracefully, such as displaying an error message to the user
//       });
//   }, []);

//   return (
//     <View>
//       <View
//         style={{
//           flexDirection: 'row',
//           height: 56,
//           backgroundColor: colors.color_TabBarColor,
//         }}>
//         <TouchableOpacity
//           style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
//           onPress={() => navigation.navigate('CreatePost')}>
//           <BackArrow color={colors.arrow} />
//         </TouchableOpacity>
//         <Text
//           style={{
//             color: colors.color_TextNormal,
//             fontFamily: FontFamily.semibold,
//             alignSelf: 'center',
//             fontSize: 20,
//           }}>
//           Create Meme
//         </Text>
//       </View>
//       <TouchableOpacity onPress={imagePick}>
//         <View
//           style={{
//             width: '80%',
//             height: 200,
//             alignSelf: 'center',
//             alignItems: 'center',
//             borderRadius: 15,
//             backgroundColor: colors.color_CardBgColor,
//             borderWidth: 2,
//             borderColor: colors.color_BorderColor,
//             justifyContent: 'center',
//           }}>
//           <PlusIcon color={colors.color_CardIcon} />
//           <Text
//             style={{
//               marginTop: 20,
//               fontSize: Size.title,
//               fontFamily: FontFamily.semibold,
//               textAlignVertical: 'center',
//               color: colors.color_CardTxtColor,
//             }}>
//             Click here to upload
//           </Text>
//         </View>
//       </TouchableOpacity>
//       <Image
//         style={{
//           width: dimensions.width || windowWidth,
//           height: dimensions.height || 300,
//           alignSelf: 'center',
//         }}
//         source={profile ? {uri: profile} : null}
//       />
//     </View>
//   );
// };

// export default CreateMeme;

// const styles = StyleSheet.create({});

// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Alert,
//   Dimensions,
//   Image,
// } from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import React, {useCallback, useEffect} from 'react';
// import RNFS from 'react-native-fs';
// import ImagePicker from 'react-native-image-crop-picker';
// import BackArrow from '../assets/svg/BackArrow';
// import FontFamily from '../common/components/FontFamily';
// import PlusIcon from '../assets/svg/PlusIcon';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// const windowWidth1 = Dimensions.get('screen').width;
// const windowHeight1 = Dimensions.get('screen').height;

// const CreateMeme = ({navigation}) => {
//   const {colors} = useTheme();
//   const [dimensions, setDimensions] = React.useState({width: 0, height: 0});
//   const [selectedPost, setSelectedPost] = React.useState(null);

//   const getImageSize = url => {
//     try {
//       Image.getSize(url, (width, height) => {
//         const aspectRatio = width / height;
//         const imageHeight = windowWidth1 / aspectRatio;
//         setDimensions({width: windowWidth1, height: imageHeight});
//         console.log(
//           'Image dimensions:',
//           width,
//           height,
//           url,
//           windowWidth1,
//           imageHeight,
//         );
//       });
//     } catch (error) {
//       console.error('Error getting image size:', error);
//     }
//   };

//   useEffect(() => {
//     console.log('Updated dimensions:', dimensions.width, dimensions.height);
//   }, [dimensions]);

//   const imagePick = useCallback(() => {
//     ImagePicker.openPicker({
//       cropping: true,
//       cropperActiveWidgetColor: '#4286BC',
//       cropperToolbarColor: colors.color_TabBarColor,
//       cropperToolbarWidgetColor: colors.color_CropTxtWidget,
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
//           setSelectedPost({
//             uri: imageUri,
//             type: image.mime,
//             fileName: 'selected_image',
//           });
//           console.log('Selected image:', imageUri, image);
//         } catch (error) {
//           console.log('Error while validating image size:', error);
//         }
//       })
//       .catch(error => {
//         console.log('Image Picker error:', error);
//       });
//   }, []);

//   return (
//     <View>
//       <View
//         style={{
//           flexDirection: 'row',
//           height: 56,
//           backgroundColor: colors.color_TabBarColor,
//         }}>
//         <TouchableOpacity
//           style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
//           onPress={() => navigation.navigate('CreatePost')}>
//           <BackArrow color={colors.arrow} />
//         </TouchableOpacity>
//         <Text
//           style={{
//             color: colors.color_TextNormal,
//             fontFamily: FontFamily.semibold,
//             alignSelf: 'center',
//             fontSize: 20,
//           }}>
//           Create Meme
//         </Text>
//       </View>
//       <TouchableOpacity onPress={imagePick}>
//         <View
//           style={{
//             width: '80%',
//             height: 200,
//             alignSelf: 'center',
//             alignItems: 'center',
//             borderRadius: 15,
//             backgroundColor: colors.color_CardBgColor,
//             borderWidth: 2,
//             borderColor: colors.color_BorderColor,
//             justifyContent: 'center',
//           }}>
//           {selectedPost ? (
//             <Image
//               source={{uri: selectedPost.uri}}
//               style={{
//                 width: dimensions.width || windowWidth,
//                 height: dimensions.height || 300,
//                 alignSelf: 'center',
//               }}
//             />
//           ) : (
//             <>
//               <PlusIcon color={colors.color_CardIcon} />
//               <Text
//                 style={{
//                   marginTop: 20,
//                   fontSize: 18, // Adjusted size
//                   fontFamily: FontFamily.semibold,
//                   textAlignVertical: 'center',
//                   color: colors.color_CardTxtColor,
//                 }}>
//                 Click here to upload
//               </Text>
//             </>
//           )}
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default CreateMeme;

// const styles = StyleSheet.create({});
