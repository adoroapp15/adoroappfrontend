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
// import LinearGradient from 'react-native-linear-gradient';
// import ImagePicker from 'react-native-image-crop-picker';
// import {useTheme, useFocusEffect} from '@react-navigation/native';
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
//   const [dimensions, setDimensions] = useState({width: 0, height: 0});
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

//   useFocusEffect(
//     React.useCallback(() => {
//       // Clear data when screen goes out of focus
//       return () => {
//         setImageState(null);
//         setMeme({topText: '', bottomText: '', randomImage: ''});
//       };
//     }, []),
//   );

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
//           {/* <TouchableOpacity style={styles.button}>
//             <LinearGradient
//               colors={[
//                 'rgba(0,255,255,0.4)',
//                 'rgba(255,192,203,1)',
//                 'rgba(255,255,0,0.5)',
//               ]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//               style={{ padding: 10, alignItems: 'center', borderRadius: 15 }}>
//               <Text style={styles.buttonText}>Get a meme</Text>
//             </LinearGradient>
//           </TouchableOpacity> */}
//           <TouchableOpacity style={styles.button} onPress={handleImagePick}>
//             <LinearGradient
//               colors={[
//                 'rgba(0,255,255,0.4)',
//                 'rgba(255,192,203,1)',
//                 'rgba(255,255,0,0.5)',
//               ]}
//               start={{x: 0, y: 0}}
//               end={{x: 1, y: 1}}
//               style={{padding: 10, alignItems: 'center', borderRadius: 15}}>
//               <Text style={styles.buttonText}>Get a new random meme</Text>
//             </LinearGradient>
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
//           <TouchableOpacity style={styles.button1} onPress={handleDownload}>
//             <LinearGradient
//               colors={[
//                 'rgba(0,255,255,0.4)',
//                 'rgba(255,192,203,1)',
//                 'rgba(255,255,0,0.5)',
//               ]}
//               start={{x: 0, y: 0}}
//               end={{x: 1, y: 1}}
//               style={{padding: 10, alignItems: 'center', borderRadius: 15}}>
//               <Text style={styles.buttonText1}>Download Image</Text>
//             </LinearGradient>
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
//     // backgroundColor: 'green',
//     padding: 12,
//     borderRadius: 10,
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   button1: {
//     // backgroundColor: 'green',
//     padding: 12,
//     borderRadius: 10,
//     width: '80%',
//     alignSelf: 'center',
//     marginBottom: 10,
//     marginTop: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   buttonText1: {
//     color: 'white',
//     fontSize: 18,
//     alignSelf: 'center',
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

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import BackArrow from '../assets/svg/BackArrow';
import {useTheme} from '@react-navigation/native';
import FontFamily from '../common/components/FontFamily';

const CreateMeme = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.color_TabBarColor,
          zIndex: 1,
          height: 56,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => navigation.navigate('CreatePost')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: 20,
          }}>
          Create Meme
        </Text>
      </View>
      <Text
        style={{
          alignSelf: 'center',
          fontWeight: '700',
          color: 'black',
          marginTop: 20,
          fontSize: 20,
        }}>
        Choose layout
      </Text>
    </ScrollView>
  );
};

export default CreateMeme;

const styles = StyleSheet.create({});
