// import {
//   StyleSheet,
//   Image,
//   Text,
//   View,
//   TouchableOpacity,
//   Platform,
//   Alert,
// } from 'react-native';
// import React from 'react';
// import Video from 'react-native-video';
// import LinearGradient from 'react-native-linear-gradient';
// import {CameraRoll} from '@react-native-camera-roll/camera-roll';
// import Share from 'react-native-share';
// import RNFS from 'react-native-fs';
// import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
// import {useTheme} from '@react-navigation/native';
// import BackArrow from '../assets/svg/BackArrow';
// import FontFamily from '../common/components/FontFamily';
// const DownloadFileName = 'your_image.png';

// const TrendingTemplates = ({navigation, route}) => {
//   const {colors} = useTheme();
//   const {selectedItem} = route.params;
//   const checkAndRequestPermission = async () => {
//     try {
//       const permission =
//         Platform.OS === 'android'
//           ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
//           : PERMISSIONS.IOS.PHOTO_LIBRARY;
//       const result = await check(permission);

//       if (result === RESULTS.GRANTED) {
//         return true;
//       } else {
//         const requestResult = await request(permission);

//         if (requestResult === RESULTS.GRANTED) {
//           return true;
//         } else {
//           console.log('Permission request denied:', requestResult);
//           return false;
//         }
//       }
//     } catch (error) {
//       console.error('Error checking/requesting permission:', error);
//       return false;
//     }
//   };

//   const handleDownload = React.useCallback(async imageUri => {
//     try {
//       const hasPermission = await checkAndRequestPermission();

//       if (!hasPermission) {
//         Alert.alert(
//           'Permission Denied',
//           'Unable to download without storage permission.',
//         );
//         return;
//       }

//       const response = await RNFS.downloadFile({
//         fromUrl: imageUri,
//         toFile: `${RNFS.CachesDirectoryPath}/${DownloadFileName}`,
//       });

//       response.promise
//         .then(async result => {
//           const savedUri = await CameraRoll.saveToCameraRoll(
//             `file://${RNFS.CachesDirectoryPath}/${DownloadFileName}`,
//             'photo',
//           );

//           if (savedUri) {
//             Alert.alert('Downloaded', `Image saved to gallery: ${savedUri}`);
//           } else {
//             Alert.alert('Error', 'Failed to save image to gallery.');
//           }
//           console.log('Download successful:', result);
//         })
//         .catch(error => {
//           console.error('Error downloading file:', error);
//         });
//     } catch (error) {
//       console.error('Error downloading image:', error);
//       Alert.alert('Error', 'Failed to download the image.');
//     }
//   }, []);

//   const shareOnWhatsApp = React.useCallback(async imageUrl => {
//     try {
//       const response = await fetch(imageUrl);
//       const blob = await response.blob();

//       const shareOptions = {
//         url: Platform.OS === 'android' ? imageUrl : blob.uri,
//         type: response.headers.get('Content-Type'),
//         social: Share.Social.WHATSAPP,
//       };

//       await Share.open(shareOptions);
//     } catch (error) {
//       console.log('Error sharing on WhatsApp:', error);
//     }
//   }, []);

//   return (
//     <>
//       <View
//         style={{
//           flexDirection: 'row',
//           height: 56,
//           backgroundColor: colors.color_TabBarColor,
//         }}>
//         <TouchableOpacity
//           style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
//           onPress={() => navigation.push('Trending Template')}>
//           <BackArrow color={colors.arrow} />
//         </TouchableOpacity>
//         <Text
//           style={{
//             color: colors.color_TextNormal,
//             fontFamily: FontFamily.semibold,
//             alignSelf: 'center',
//             fontSize: 20,
//           }}>
//           Trending Template
//         </Text>
//       </View>
//       <View style={{justifyContent: 'center', alignItems: 'center'}}>
//         {/* Render the selected item in bigger form */}
//         {selectedItem && selectedItem.type === 'image' && (
//           <>
//             <Image
//               source={{
//                 uri: `https://www.adoro.social/TrendingTemplate/${selectedItem.fileName}`,
//               }}
//               style={{width: '80%', height: '80%', resizeMode: 'contain'}}
//             />
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignSelf: 'center',
//                 gap: 20,
//                 marginTop: 20,
//                 marginBottom: 20,
//               }}>
//               <TouchableOpacity
//                 onPress={() =>
//                   shareOnWhatsApp(
//                     `https://www.adoro.social/TrendingTemplate/${selectedItem.fileName}`,
//                   )
//                 }>
//                 <LinearGradient
//                   colors={[
//                     'rgba(0,255,255,0.4)',
//                     'rgba(255,192,203,1)',
//                     'rgba(255,255,0,0.5)',
//                   ]}
//                   start={{x: 0, y: 0}}
//                   end={{x: 1, y: 1}}
//                   style={{
//                     paddingLeft: 15,
//                     paddingRight: 15,
//                     paddingBottom: 6,
//                     paddingTop: 6,
//                     justifyContent: 'center',
//                     borderRadius: 15,
//                   }}>
//                   <Text
//                     style={{
//                       color: 'white',

//                       fontFamily: FontFamily.semibold,
//                       textAlign: 'center',
//                       fontSize: 20,
//                     }}>
//                     Share
//                   </Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() =>
//                   handleDownload(
//                     `https://www.adoro.social/Template/Image/${selectedItem.fileName}`,
//                   )
//                 }>
//                 <LinearGradient
//                   colors={[
//                     'rgba(0,255,255,0.4)',
//                     'rgba(255,192,203,1)',
//                     'rgba(255,255,0,0.5)',
//                   ]}
//                   start={{x: 0, y: 0}}
//                   end={{x: 1, y: 1}}
//                   style={{
//                     paddingLeft: 15,
//                     paddingRight: 15,
//                     paddingBottom: 6,
//                     paddingTop: 6,
//                     justifyContent: 'center',
//                     borderRadius: 15,
//                   }}>
//                   <Text
//                     style={{
//                       color: 'white',
//                       fontFamily: FontFamily.semibold,
//                       textAlign: 'center',
//                       fontSize: 20,
//                     }}>
//                     Download
//                   </Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>
//           </>
//         )}
//         {selectedItem && selectedItem.type === 'video' && (
//           <>
//             <Video
//               source={{
//                 uri: `https://www.adoro.social/TrendingTemplate/${selectedItem.fileName}`,
//               }}
//               style={{width: '80%', aspectRatio: 16 / 9}}
//               resizeMode="contain"
//               controls={true}
//             />
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignSelf: 'center',
//                 gap: 20,
//                 marginTop: 20,
//                 marginBottom: 20,
//               }}>
//               <TouchableOpacity
//                 onPress={() =>
//                   shareOnWhatsApp(
//                     `https://www.adoro.social/Template/Image/${item.fileName}`,
//                   )
//                 }>
//                 <LinearGradient
//                   colors={[
//                     'rgba(0,255,255,0.4)',
//                     'rgba(255,192,203,1)',
//                     'rgba(255,255,0,0.5)',
//                   ]}
//                   start={{x: 0, y: 0}}
//                   end={{x: 1, y: 1}}
//                   style={{
//                     paddingLeft: 15,
//                     paddingRight: 15,
//                     paddingBottom: 6,
//                     paddingTop: 6,
//                     justifyContent: 'center',
//                     borderRadius: 15,
//                   }}>
//                   <Text
//                     style={{
//                       color: 'white',

//                       fontFamily: FontFamily.semibold,
//                       textAlign: 'center',
//                       fontSize: 20,
//                     }}>
//                     Share
//                   </Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() =>
//                   handleDownload(
//                     `https://www.adoro.social/Template/Image/${item.fileName}`,
//                   )
//                 }>
//                 <LinearGradient
//                   colors={[
//                     'rgba(0,255,255,0.4)',
//                     'rgba(255,192,203,1)',
//                     'rgba(255,255,0,0.5)',
//                   ]}
//                   start={{x: 0, y: 0}}
//                   end={{x: 1, y: 1}}
//                   style={{
//                     paddingLeft: 15,
//                     paddingRight: 15,
//                     paddingBottom: 6,
//                     paddingTop: 6,
//                     justifyContent: 'center',
//                     borderRadius: 15,
//                   }}>
//                   <Text
//                     style={{
//                       color: 'white',
//                       fontFamily: FontFamily.semibold,
//                       textAlign: 'center',
//                       fontSize: 20,
//                     }}>
//                     Download
//                   </Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>
//           </>
//         )}
//       </View>
//     </>
//   );
// };

// export default TrendingTemplates;

// const styles = StyleSheet.create({});

import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import BackArrow from '../assets/svg/BackArrow';
import FontFamily from '../common/components/FontFamily';
import TemplateItem from './TemplateItem'; // Import the newly created component

const TrendingTemplates = ({navigation, route}) => {
  const {colors} = useTheme();
  const {selectedItem, data} = route.params;

  // Dummy data array containing image and video informatio

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          height: 56,
          backgroundColor: colors.color_TabBarColor,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => navigation.push('Trending Template')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: 20,
          }}>
          Trending Template
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => <TemplateItem item={item} />} // Render each item using TemplateItem component
        keyExtractor={(item, index) => index.toString()} // Use index as key for simplicity
      />
    </>
  );
};

export default TrendingTemplates;
