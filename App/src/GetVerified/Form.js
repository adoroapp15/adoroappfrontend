// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Alert,
//   ScrollView,
// } from 'react-native';
// import React, {useState} from 'react';
// import FontFamily from '../common/components/FontFamily';
// import BackArrow from '../assets/svg/BackArrow';
// import {useTheme} from '@react-navigation/native';
// import useStore from '../store';
// import Size from '../common/components/Size';
// import LinearGradient from 'react-native-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const Form = ({navigation}) => {
//   const {colors} = useTheme();
//   const {dark, toggleTheme, token} = useStore(); // Assuming token is stored in the store

//   const [formData, setFormData] = useState({
//     name: '',
//     socialLink: '',
//     uniqueService: '',
//     charges: '',
//     lang: '',
//     nationality: '',
//   });

//   // Function to extract username from token (dummy function here)
//   const extractUsernameFromToken = async () => {
//     try {
//       const userString = await AsyncStorage.getItem('user');
//       if (userString) {
//         const parsedUser = JSON.parse(userString);
//         console.log('parsed user', parsedUser);
//         return parsedUser.userName || null; // Safely accessing `userName` in case the object is malformed
//       }
//       return null; // Return null if no user data is found
//     } catch (error) {
//       console.error('Error extracting username from token:', error);
//       return null; // Return null in case of an error
//     }
//   };
//   //   const userName = extractUsernameFromToken();

//   const handleInputChange = (field, value) => {
//     setFormData({...formData, [field]: value});
//   };

//   const handleNext = async () => {
//     const userString = await AsyncStorage.getItem('user');
//     const parsedUser = JSON.parse(userString);
//     console.log('parsed user', parsedUser);
//     const userName = parsedUser.userName;
//     // Safely accessing `userName` in case the object is malformed

//     console.log(userName, 'uuuuuuuuuuu');
//     const {name, socialLink, uniqueService, charges, lang, nationality} =
//       formData;
//     if (
//       !name ||
//       !socialLink ||
//       !uniqueService ||
//       !charges ||
//       !lang ||
//       !nationality
//     ) {
//       Alert.alert('Validation Error', 'All fields are required!');
//       return;
//     }
//     navigation.navigate('Verification', {formData, userName});
//   };

//   return (
//     <View style={{flex: 1, backgroundColor: colors.background}}>
//       <View
//         style={{
//           flexDirection: 'row',
//           height: 56,
//           backgroundColor: colors.color_TabBarColor,
//         }}>
//         <TouchableOpacity
//           style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
//           onPress={() => navigation.navigate('Get Verified')}>
//           <BackArrow color={colors.arrow} />
//         </TouchableOpacity>
//         <Text
//           style={{
//             color: colors.color_TextNormal,
//             fontFamily: FontFamily.semibold,
//             alignSelf: 'center',
//             fontSize: Size.tabtext,
//           }}>
//           Enter Your Details
//         </Text>
//       </View>
//       <ScrollView>
//         <View style={{padding: 20}}>
//           <Text
//             style={{
//               color: colors.color_TextNormal,
//               fontFamily: FontFamily.semibold,
//               fontSize: Size.title,
//               textAlign: 'center',
//               marginVertical: 20,
//               marginBottom: 10,
//             }}>
//             Fill in your details to apply for Verification :
//           </Text>
//           <Text style={styles.label}>Name</Text>
//           <TextInput
//             style={[styles.input, {borderColor: colors.color_TextNormal}]}
//             placeholder="Enter your name"
//             placeholderTextColor={colors.placeholder}
//             value={formData.name}
//             onChangeText={text => handleInputChange('name', text)}
//           />
//           <Text style={styles.label}>Social Link</Text>
//           <TextInput
//             style={[styles.input, {borderColor: colors.color_TextNormal}]}
//             placeholder="Enter your social link"
//             placeholderTextColor={colors.placeholder}
//             value={formData.socialLink}
//             onChangeText={text => handleInputChange('socialLink', text)}
//           />
//           <Text style={styles.label}>Unique service to brand</Text>
//           <TextInput
//             style={[styles.input, {borderColor: colors.color_TextNormal}]}
//             placeholder="Enter your unique service"
//             placeholderTextColor={colors.placeholder}
//             value={formData.uniqueService}
//             onChangeText={text => handleInputChange('uniqueService', text)}
//           />
//           <Text style={styles.label}> Service Charges</Text>
//           <TextInput
//             style={[styles.input, {borderColor: colors.color_TextNormal}]}
//             placeholder="Enter charges"
//             placeholderTextColor={colors.placeholder}
//             value={formData.charges}
//             onChangeText={text => handleInputChange('charges', text)}
//             keyboardType="numeric"
//           />
//           <Text style={styles.label}>Language you speak</Text>
//           <TextInput
//             style={[styles.input, {borderColor: colors.color_TextNormal}]}
//             placeholder="Enter language you speak"
//             placeholderTextColor={colors.placeholder}
//             value={formData.uniqueService}
//             onChangeText={text => handleInputChange('lang', text)}
//           />
//           <Text style={styles.label}>Nationality</Text>
//           <TextInput
//             style={[styles.input, {borderColor: colors.color_TextNormal}]}
//             placeholder="Enter your nationality"
//             placeholderTextColor={colors.placeholder}
//             value={formData.uniqueService}
//             onChangeText={text => handleInputChange('nationality', text)}
//           />
//           <TouchableOpacity onPress={handleNext}>
//             <LinearGradient
//               colors={[
//                 'rgba(0,255,255,0.4)',
//                 'rgba(255,192,203,1)',
//                 'rgba(255,255,0,0.5)',
//               ]}
//               start={{x: 0, y: 0}}
//               end={{x: 1, y: 1}}
//               style={styles.button}>
//               <Text style={styles.buttonText}>Next</Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default Form;

// const styles = StyleSheet.create({
//   label: {
//     fontFamily: FontFamily.semibold,
//     fontSize: 16,
//     marginBottom: 8,
//     color: '#000', // Default, can be overridden by theme
//   },
//   button: {
//     padding: 8,
//     justifyContent: 'center',
//     borderRadius: 10,
//     alignSelf: 'center',
//     width: 300,
//     height: 40,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '600',
//     textAlign: 'center',
//     fontSize: 16,
//   },
//   input: {
//     height: 40,
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     fontSize: 16,
//   },
// });

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import FontFamily from '../common/components/FontFamily';
import BackArrow from '../assets/svg/BackArrow';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import Size from '../common/components/Size';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Form = ({navigation}) => {
  const {colors} = useTheme();
  const {dark, toggleTheme, token} = useStore(); // Assuming token is stored in the store

  const [formData, setFormData] = useState({
    name: '',
    socialLink: '',
    uniqueService: '',
    charges: '',
    lang: '',
    nationality: '',
  });

  // Function to validate if a string is a valid URL
  const isValidURL = url => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // Protocol (http or https)
        '((([a-zA-Z0-9$_.+!*(),;?&=-]|%[0-9a-fA-F]{2})+)(:[0-9]+)?@)?' + // Optional username:password@ (basic auth)
        '((([a-zA-Z0-9.-]+)\\.[a-zA-Z]{2,})|' + // Domain name
        '(d{1,3}\\.d{1,3}\\.d{1,3}\\.d{1,3})|' + // OR IPv4 address
        '([a-fA-F0-9:]+::?[a-fA-F0-9]+))' + // OR IPv6 address
        '(\\:\\d+)?' + // Optional port
        '(\\/[a-zA-Z0-9$_.+!*(),;?&=-]*)*' + // Path
        '(\\?[a-zA-Z0-9$_.+!*(),;?&=-]*)?' + // Query string
        '(\\#[a-zA-Z0-9$_.+!*(),;?&=-]*)?$',
    );
    return urlPattern.test(url);
  };

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  const handleNext = async () => {
    const {name, socialLink, uniqueService, charges, lang, nationality} =
      formData;

    if (
      !name ||
      !socialLink ||
      !uniqueService ||
      !charges ||
      !lang ||
      !nationality
    ) {
      Alert.alert('Validation Error', 'All fields are required!');
      return;
    }

    if (!isValidURL(socialLink)) {
      Alert.alert('Validation Error', 'Please enter a valid social link!');
      return;
    }

    try {
      const userString = await AsyncStorage.getItem('user');
      const parsedUser = userString ? JSON.parse(userString) : {};
      const userName = parsedUser.userName || '';

      navigation.navigate('Verification', {formData, userName});
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <View
        style={{
          flexDirection: 'row',
          height: 56,
          backgroundColor: colors.color_TabBarColor,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => navigation.navigate('Get Verified')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: Size.tabtext,
          }}>
          Enter Your Details
        </Text>
      </View>
      <ScrollView>
        <View style={{padding: 20}}>
          <Text
            style={{
              color: colors.color_TextNormal,
              fontFamily: FontFamily.semibold,
              fontSize: Size.title,
              textAlign: 'center',
              marginVertical: 20,
              marginBottom: 10,
            }}>
            Fill in your details to apply for Verification :
          </Text>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, {borderColor: colors.color_TextNormal}]}
            placeholder="Enter your name"
            placeholderTextColor={colors.placeholder}
            value={formData.name}
            onChangeText={text => handleInputChange('name', text)}
          />
          <Text style={styles.label}>Social Link</Text>
          <TextInput
            style={[styles.input, {borderColor: colors.color_TextNormal}]}
            placeholder="Enter your social link"
            placeholderTextColor={colors.placeholder}
            value={formData.socialLink}
            onChangeText={text => handleInputChange('socialLink', text)}
          />
          <Text style={styles.label}>Unique service to brand</Text>
          <TextInput
            style={[styles.input, {borderColor: colors.color_TextNormal}]}
            placeholder="Enter your unique service"
            placeholderTextColor={colors.placeholder}
            value={formData.uniqueService}
            onChangeText={text => handleInputChange('uniqueService', text)}
          />
          <Text style={styles.label}>Service Charges</Text>
          <TextInput
            style={[styles.input, {borderColor: colors.color_TextNormal}]}
            placeholder="Enter charges"
            placeholderTextColor={colors.placeholder}
            value={formData.charges}
            onChangeText={text => handleInputChange('charges', text)}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Language you speak</Text>
          <TextInput
            style={[styles.input, {borderColor: colors.color_TextNormal}]}
            placeholder="Enter language you speak"
            placeholderTextColor={colors.placeholder}
            value={formData.lang}
            onChangeText={text => handleInputChange('lang', text)}
          />
          <Text style={styles.label}>Nationality</Text>
          <TextInput
            style={[styles.input, {borderColor: colors.color_TextNormal}]}
            placeholder="Enter your nationality"
            placeholderTextColor={colors.placeholder}
            value={formData.nationality}
            onChangeText={text => handleInputChange('nationality', text)}
          />
          <TouchableOpacity onPress={handleNext}>
            <LinearGradient
              colors={[
                'rgba(0,255,255,0.4)',
                'rgba(255,192,203,1)',
                'rgba(255,255,0,0.5)',
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  label: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    marginBottom: 8,
    color: '#000', // Default, can be overridden by theme
  },
  button: {
    padding: 8,
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    width: 300,
    height: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
});
