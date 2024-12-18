// // import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
// // import React from 'react'
// // import BackArrow from '../assets/svg/BackArrow';
// // import {useTheme} from '@react-navigation/native';
// // // import FontFamily from './src/common/components/FontFamily';
// // import LinearGradient from 'react-native-linear-gradient';

// // const MakeInvoice = ({navigation}) => {
// //   const {colors} = useTheme();

// //   return (
// //     <View>
// //       <View
// //         style={{
// //           flexDirection: 'row',
// //           backgroundColor: colors.color_TabBarColor,
// //           zIndex: 1,
// //           height: 56,
// //         }}>
// //         <TouchableOpacity
// //           style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
// //           onPress={() => navigation.navigate('Upload Invoice')}>
// //           <BackArrow color={colors.arrow} />
// //         </TouchableOpacity>
// //         <Text
// //           style={{
// //             color: colors.color_TextNormal,
// //             fontFamily: FontFamily.semibold,
// //             alignSelf: 'center',
// //             fontSize: 20,
// //           }}>
// //           Make Invoice
// //         </Text>
// //       </View>
// //     </View>
// //   )
// // }

// // export default MakeInvoice

// // const styles = StyleSheet.create({})

// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   TextInput,
//   Image,
// } from 'react-native';
// import React, {useState} from 'react';
// import BackArrow from '../assets/svg/BackArrow';
// import CheckBox from '@react-native-community/checkbox';
// import {useTheme} from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient';

// const MakeInvoice = ({navigation}) => {
//   const {colors} = useTheme();
//   const [description, setDescription] = useState('');
//   const [isChecked, setIsChecked] = useState(false);

//   return (
//     <View>
//       {/* Header Section */}
//       <View
//         style={{
//           flexDirection: 'row',
//           backgroundColor: colors.color_TabBarColor,
//           zIndex: 1,
//           height: 56,
//           alignItems: 'center',
//         }}>
//         <TouchableOpacity
//           style={{flex: 0.5, paddingLeft: 10}}
//           onPress={() => navigation.navigate('Upload Invoice')}>
//           <BackArrow color={colors.arrow} />
//         </TouchableOpacity>
//         <Text
//           style={{
//             color: colors.color_TextNormal,
//             fontFamily: 'FontFamily.semibold',
//             fontSize: 20,
//           }}>
//           Make Invoice
//         </Text>
//       </View>

//       {/* Description Input Section */}
//       <View style={styles.container}>
//         <Text style={styles.label}>Description :</Text>
//         <TextInput
//           style={styles.textInput}
//           placeholder="Write description"
//           placeholderTextColor={colors.color_TextHint}
//           value={description}
//           onChangeText={setDescription}
//         />
//       </View>

//       {/* Checkbox Section */}
//       <View style={styles.checkboxContainer}>
//         <CheckBox
//           value={isChecked}
//           onValueChange={setIsChecked}
//           tintColors={{
//             true: colors.color_Checkbox,
//             false: colors.color_TextHint,
//           }}
//         />
//         <Text style={styles.checkboxText}>
//           I have filled bank details correctly in the profile section
//         </Text>
//       </View>
//       <View style={styles.checkboxContainer1}>
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
//               width: 150, // Increase the width
//               height: 40, // Increase the height
//             }}>
//             <Text
//               style={{
//                 color: 'white',
//                 fontWeight: '600',
//                 textAlign: 'center',
//                 fontSize: 16,
//               }}>
//               Preview
//             </Text>
//           </LinearGradient>
//         </TouchableOpacity>
//         <Image
//           style={{height: 35, width: 35}}
//           source={require('../assets/down.png')}
//         />
//       </View>
//       <TouchableOpacity
//         style={{alignSelf: 'center', justifyContent: 'flex-end'}}
//         onPress={() => navigation.navigate('Confirmation')}>
//         <LinearGradient
//           colors={[
//             'rgba(0,255,255,0.4)',
//             'rgba(255,192,203,1)',
//             'rgba(255,255,0,0.5)',
//           ]}
//           start={{x: 0, y: 0}}
//           end={{x: 1, y: 1}}
//           style={{
//             padding: 8,
//             justifyContent: 'center',
//             borderRadius: 10,
//             marginTop: 50,
//             width: 200, // Increase the width
//             height: 40, // Increase the height
//           }}>
//           <Text
//             style={{
//               color: 'white',
//               fontWeight: '600',
//               textAlign: 'center',
//               fontSize: 16,
//             }}>
//             Confirm Upload
//           </Text>
//         </LinearGradient>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default MakeInvoice;

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   label: {
//     fontSize: 16,
//     fontFamily: 'FontFamily.regular',
//     color: 'black', // Adjust based on theme
//     marginBottom: 8,
//   },
//   textInput: {
//     height: 70,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     color: 'black', // Adjust based on theme
//   },
//   checkboxContainer1: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     marginTop: 35,
//     gap: 10,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     marginTop: 16,
//   },
//   checkboxText: {
//     marginLeft: 8,
//     fontSize: 14,
//     color: 'black', // Adjust based on theme
//     fontFamily: 'FontFamily.regular',
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import BackArrow from '../assets/svg/BackArrow';
import CheckBox from '@react-native-community/checkbox';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {config} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MakeInvoice = ({navigation}) => {
  const {colors} = useTheme();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amt, setAmt] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleMakeInvoice = async () => {
    const userString = await AsyncStorage.getItem('user');
    const parsedUser = JSON.parse(userString);
    const userName = parsedUser.userName;
    // Select a file using DocumentPicker
    if (!name || !description || !amt) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isChecked) {
      Alert.alert('Error', 'Please confirm the bank details checkbox');
      return;
    }
    console.log('apiis ', `${config.production}/app/user/makeinvoice`);

    try {
      console.log('xsssss', userName);
      const response = await axios.post(
        `${config.production}/app/user/makeinvoice`,
        {
          name,
          description,
          amt,
          userName,
        },
      );
      console.log('yyyyy', response.data, response);
      if (response.status === 200 || response.status === 201) {
        Alert.alert('Success', 'Invoice created successfully');
        navigation.navigate('Confirmation', {
          fileUrl: response.data.downloadUrl,
        });
      } else {
        Alert.alert(
          'Error',
          response.data.message || 'Failed to create invoice',
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View>
      {/* Header Section */}
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.color_TabBarColor,
          zIndex: 1,
          height: 56,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10}}
          onPress={() => navigation.navigate('Upload Invoice')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: 'FontFamily.semibold',
            fontSize: 20,
          }}>
          Make Invoice
        </Text>
      </View>

      {/* Input Fields */}
      <View style={styles.container}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter name"
          placeholderTextColor={colors.color_TextHint}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Write description"
          placeholderTextColor={colors.color_TextHint}
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter amount"
          placeholderTextColor={colors.color_TextHint}
          value={amt}
          onChangeText={setAmt}
          keyboardType="numeric"
        />
      </View>

      {/* Checkbox Section */}
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isChecked}
          onValueChange={setIsChecked}
          tintColors={{
            true: colors.color_Checkbox,
            false: colors.color_TextHint,
          }}
        />
        <Text style={styles.checkboxText}>
          I have filled bank details correctly in the profile section
        </Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={{alignSelf: 'center', justifyContent: 'flex-end'}}
        onPress={handleMakeInvoice}>
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
            marginTop: 50,
            width: 200,
            height: 40,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Confirm Upload
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default MakeInvoice;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontFamily: 'FontFamily.regular',
    color: 'black',
    marginBottom: 8,
  },
  textInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'black',
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 14,
    color: 'black',
    fontFamily: 'FontFamily.regular',
  },
});
