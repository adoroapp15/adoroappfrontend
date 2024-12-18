// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React from 'react';
// import BackArrow from '../assets/svg/BackArrow';
// import {useTheme} from '@react-navigation/native';
// // import FontFamily from './src/common/components/FontFamily';
// import LinearGradient from 'react-native-linear-gradient';

// const UploadInvoice = ({navigation}) => {
//   const {colors} = useTheme();

//   return (
//     <View>
//       <View
//         style={{
//           flexDirection: 'row',
//           backgroundColor: colors.color_TabBarColor,
//           zIndex: 1,
//           height: 56,
//         }}>
//         <TouchableOpacity
//           style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
//           onPress={() => navigation.navigate('WalletOTPScreen')}>
//           <BackArrow color={colors.arrow} />
//         </TouchableOpacity>
//         <Text
//           style={{
//             color: colors.color_TextNormal,
//             fontFamily: FontFamily.semibold,
//             alignSelf: 'center',
//             fontSize: 20,
//           }}>
//           Upload Invoice
//         </Text>
//       </View>

//       <View
//         style={{
//           gap: 150,
//           marginTop: 100,
//         }}>
//         <TouchableOpacity
//           style={{alignSelf: 'center', justifyContent: 'flex-end'}}
//           // onPress={() =>}
//         >
//           <LinearGradient
//             colors={[
//               'rgba(0,255,255,0.4)',
//               'rgba(255,192,203,1)',
//               'rgba(255,255,0,0.5)',
//             ]}
//             start={{x: 0, y: 0}}
//             end={{x: 1, y: 1}}
//             style={{
//               padding: 8,
//               justifyContent: 'center',
//               borderRadius: 10,
//               width: 200, // Increase the width
//               height: 70, // Increase the height
//             }}>
//             <Text
//               style={{
//                 color: 'white',
//                 fontWeight: '600',
//                 textAlign: 'center',
//                 fontSize: 20
//               }}>
//               Upload Invoice
//             </Text>
//           </LinearGradient>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{alignSelf: 'center', justifyContent: 'flex-end'}}
//           onPress={() => navigation.navigate('Make Invoice')}>
//           <LinearGradient
//             colors={[
//               'rgba(0,255,255,0.4)',
//               'rgba(255,192,203,1)',
//               'rgba(255,255,0,0.5)',
//             ]}
//             start={{x: 0, y: 0}}
//             end={{x: 1, y: 1}}
//             style={{
//               padding: 8,
//               justifyContent: 'center',
//               borderRadius: 10,
//               width: 200, // Increase the width
//               height: 70, // Increase the height
//             }}>
//             <Text
//               style={{
//                 color: 'white',
//                 fontWeight: '600',
//                 textAlign: 'center',
//                 fontSize: 20,
//               }}>
//               Make invoice
//             </Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default UploadInvoice;

// const styles = StyleSheet.create({});

import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import React from 'react';
import BackArrow from '../assets/svg/BackArrow';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import DocumentPicker from 'react-native-document-picker';
// import {Alert} from 'react-native';
import {config} from '../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UploadInvoice = ({navigation}) => {
  const {colors} = useTheme();

  // const handleUploadInvoice = async () => {
  //   try {
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.pdf], // Only allow PDFs
  //     });
  //     console.log('Selected file:', res);
  //     const result= await axios.post(`${config.production}/app/user/uploadinvoice`)
  //     Alert.alert('File Selected', `You selected: ${res[0]?.name}`);
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       console.log('User cancelled the picker');
  //     } else {
  //       console.error('Unknown error:', err);
  //     }
  //   }
  // };

  const handleUploadInvoice = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      const parsedUser = JSON.parse(userString);
      // Select a file using DocumentPicker
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // Only allow PDFs
      });

      console.log('Selected file:', parsedUser, res);

      // Prepare form data for the file upload
      const formData = new FormData();
      formData.append('file', {
        uri: res[0].uri, // URI of the selected file
        name: res[0].name, // File name
        type: res[0].type, // MIME type
      });
      formData.append('name', parsedUser.userName);

      // Upload the file using axios
      const response = await axios.post(
        `${config.production}/app/user/uploadinvoice`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the header for file upload
          },
        },
      );

      console.log('respone', response);
      console.log('sssss', response.data);
      if (response.status === 200) {
        Alert.alert('Success', 'Invoice uploaded successfully!');
        navigation.navigate('Confirmation', {fileUrl: response.data.fileUrl});
      } else {
        Alert.alert('Error', 'Failed to upload invoice. Please try again.');
      }
    } catch (err) {
      // Handle errors
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error('Unknown error:', err);
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.color_TabBarColor,
          zIndex: 1,
          height: 56,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => navigation.navigate('WalletOTPScreen')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: 20,
          }}>
          Upload Invoice
        </Text>
      </View>

      <View
        style={{
          gap: 150,
          marginTop: 100,
        }}>
        <TouchableOpacity
          style={{alignSelf: 'center', justifyContent: 'flex-end'}}
          onPress={handleUploadInvoice}>
          <LinearGradient
            colors={[
              'rgba(0,255,255,0.4)',
              'rgba(255,192,203,1)',
              'rgba(255,255,0,0.5)',
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{
              padding: 8,
              justifyContent: 'center',
              borderRadius: 10,
              width: 200,
              height: 70,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                textAlign: 'center',
                fontSize: 20,
              }}>
              Upload Invoice
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignSelf: 'center', justifyContent: 'flex-end'}}
          onPress={() => navigation.navigate('Make Invoice')}>
          <LinearGradient
            colors={[
              'rgba(0,255,255,0.4)',
              'rgba(255,192,203,1)',
              'rgba(255,255,0,0.5)',
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{
              padding: 8,
              justifyContent: 'center',
              borderRadius: 10,
              width: 200,
              height: 70,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                textAlign: 'center',
                fontSize: 20,
              }}>
              Make Invoice
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadInvoice;

const styles = StyleSheet.create({});
