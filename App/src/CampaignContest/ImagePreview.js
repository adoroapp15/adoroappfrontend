//  import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import {Button} from 'react-native-paper';
// import axios from 'axios';
// import Video from 'react-native-video';
// import {config} from '../config';
// import {resumeDownload} from 'react-native-fs';
// import FontFamily from '../common/components/FontFamily';
// import {useTheme} from '@react-navigation/native';
// import useStore from '../store';
// const ImagePreview = ({navigation, route}) => {
//   const {imageUri, mediaType, campaign_name, userName} = route.params;
//   const {dark, toggleTheme} = useStore();
//   const {colors} = useTheme();

//   const handleSubmit = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('media', {
//         uri: imageUri,
//         type: mediaType === 'video' ? 'video/mp4' : 'image/jpeg',
//         name: mediaType === 'video' ? 'video.mp4' : 'image.jpg',
//       });
//       formData.append('campaign_name', campaign_name);
//       formData.append('userName', userName);
//       console.log('ppp', formData);
//       const response = await axios.post(
//         `${config.production}/app/user/applycampaign`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         },
//       );
//       if (response.status == 200) {
//         // navigation.navigate('SubmissionSuccess');
//         Alert.alert('Submitted Successfully');
//       } else {
//         console.log('Facing error');
//       }
//     } catch (error) {
//       console.error('Error submitting media:', error);
//       // Handle error
//     }
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: colors.color_PageColor,
//       }}>
//       {mediaType === 'video' ? (
//         <Video
//           source={{uri: imageUri}}
//           style={styles.video}
//           resizeMode="contain"
//           controls
//         />
//       ) : (
//         <Image source={{uri: imageUri}} style={styles.image} />
//       )}
//       <Button
//         mode="contained"
//         onPress={handleSubmit}
//         style={styles.submitButton}>
//         Submit
//       </Button>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: '100%',
//     height: '60%',
//     // flex:1 ,
//     resizeMode: 'contain',
//     marginBottom: 20,
//   },
//   video: {
//     width: 200,
//     height: 200,
//     marginBottom: 20,
//   },
//   submitButton: {
//     marginTop: 20,
//     borderRadius: 10,
//     backgroundColor: '#3797E3',
//     fontFamily: FontFamily.semibold,
//   },
// });

// export default ImagePreview;

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import {Button} from 'react-native-paper';
// import axios from 'axios';
// import Video from 'react-native-video';
// import {config} from '../config';
// import {resumeDownload} from 'react-native-fs';
// import FontFamily from '../common/components/FontFamily';
// import {useTheme} from '@react-navigation/native';
// import useStore from '../store';

// const ImagePreview = ({navigation, route}) => {
//   const {imageUri, mediaType, campaign_name, userName} = route.params;
//   const {dark, toggleTheme} = useStore();
//   const {colors} = useTheme();
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('media', {
//         uri: imageUri,
//         type: mediaType === 'video' ? 'video/mp4' : 'image/jpeg',
//         name: mediaType === 'video' ? 'video.mp4' : 'image.jpg',
//       });
//       formData.append('campaign_name', campaign_name);
//       formData.append('userName', userName);

//       const response = await axios.post(
//         `${config.production}/app/user/applycampaign`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         },
//       );
//       if (response.status == 200) {
//         setSubmitted(true);
//         Alert.alert('Submitted Successfully');
//         setTimeout(() => {
//           navigation.navigate('Campaign');
//         }, 2000); // Navigate to HomePage after 2 seconds
//       } else {
//         console.log('Facing error');
//       }
//     } catch (error) {
//       console.error('Error submitting media:', error);
//       // Handle error
//     }
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: colors.color_PageColor,
//       }}>
//       {mediaType === 'video' ? (
//         <Video
//           source={{uri: imageUri}}
//           style={styles.video}
//           resizeMode="contain"
//           controls
//         />
//       ) : (
//         <Image source={{uri: imageUri}} style={styles.image} />
//       )}
//       <Button
//         mode="contained"
//         onPress={handleSubmit}
//         style={styles.submitButton}>
//         Submit
//       </Button>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: '100%',
//     height: '60%',
//     resizeMode: 'contain',
//     marginBottom: 20,
//   },
//   video: {
//     width: 200,
//     height: 200,
//     marginBottom: 20,
//   },
//   submitButton: {
//     marginTop: 20,
//     borderRadius: 10,
//     backgroundColor: '#3797E3',
//     fontFamily: FontFamily.semibold,
//   },
// });

// export default ImagePreview;

import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
import axios from 'axios';
import Video from 'react-native-video';
import {config} from '../config';
import {resumeDownload} from 'react-native-fs';
import FontFamily from '../common/components/FontFamily';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import BackArrow from '../assets/svg/BackArrow';

const ImagePreview = ({navigation, route}) => {
  const {imageUri, mediaType, campaign_name, userName} = route.params;
  const {dark, toggleTheme} = useStore();
  const {colors} = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [buttonColor, setButtonColor] = useState('#3797E3');
  console.log('oooa', route.params);
  console.log('oosss', userName);
  console.log('oooss', campaign_name);

  const handleSubmit = async () => {
    try {
      // Disable the button
      setSubmitted(true);
      // Change button color
      setButtonColor('#AAAAAA');

      const formData = new FormData();
      formData.append('media', {
        uri: imageUri,
        type: mediaType === 'video' ? 'video/mp4' : 'image/jpeg',
        name: mediaType === 'video' ? 'video.mp4' : 'image.jpg',
      });
      formData.append('campaign_name', campaign_name);
      formData.append('userName', userName);

      const response = await axios.post(
        `${config.production}/app/user/applycampaign`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.status == 200) {
        Alert.alert('Submitted Successfully');
        setTimeout(() => {
          navigation.navigate('Campaign');
        }, 2000); // Navigate to HomePage after 2 seconds
      } else {
        console.log('Facing error');
      }
    } catch (error) {
      console.error('Error submitting media:', error);
      // Handle error
    }
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.color_TabBarColor,
          zIndex: 1,
          height: 56,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => navigation.navigate('Campaign')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: 20,
          }}>
          Campaign
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.color_PageColor,
        }}>
        {mediaType === 'video' ? (
          <Video
            source={{uri: imageUri}}
            style={styles.video}
            resizeMode="contain"
            controls
          />
        ) : (
          <Image source={{uri: imageUri}} style={styles.image} />
        )}
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={[styles.submitButton, {backgroundColor: buttonColor}]}
          disabled={submitted}>
          Submit
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
  video: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 10,
    fontFamily: FontFamily.semibold,
  },
});

export default ImagePreview;
