// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React from 'react';
// import FontFamily from '../common/components/FontFamily';
// import BackArrow from '../assets/svg/BackArrow';
// import {useTheme} from '@react-navigation/native';
// import useStore from '../store';
// import Size from '../common/components/Size';
// import LinearGradient from 'react-native-linear-gradient';
// import OTPInputView from '@twotalltotems/react-native-otp-input';

// const VerificationCode = ({navigation}) => {
//   const {colors} = useTheme();
//   const {dark, toggleTheme} = useStore();

//   return (
//     <View style={styles.container}>
//       <View
//         style={{
//           flexDirection: 'row',
//           height: 56,
//           backgroundColor: colors.color_TabBarColor,
//         }}>
//         <TouchableOpacity
//           style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
//           onPress={() => navigation.navigate('Form')}>
//           <BackArrow color={colors.arrow} />
//         </TouchableOpacity>
//         <Text
//           style={{
//             color: colors.color_TextNormal,
//             fontFamily: FontFamily.semibold,
//             alignSelf: 'center',
//             fontSize: Size.tabtext,
//           }}>
//           Get Verified
//         </Text>
//       </View>

//       <View style={styles.centerContent}>
//         <Text
//           style={{
//             color: colors.color_TextNormal,
//             fontFamily: FontFamily.semibold,
//             fontSize: Size.share,
//           }}>
//           Verification Code
//         </Text>
//         <OTPInputView
//           style={styles.otpInput}
//           pinCount={4} // Number of digits in OTP
//           autoFocusOnLoad
//           codeInputFieldStyle={styles.otpInputField}
//           codeInputHighlightStyle={styles.otpInputHighlight}
//           onCodeFilled={code => {
//             console.log(`Code entered: ${code}`);
//           }}
//         />

//         <TouchableOpacity onPress={() => navigation.navigate('Thanks')}>
//           <LinearGradient
//             colors={[
//               'rgba(0,255,255,0.4)',
//               'rgba(255,192,203,1)',
//               'rgba(255,255,0,0.5)',
//             ]}
//             start={{x: 0, y: 0}}
//             end={{x: 1, y: 1}}
//             style={styles.button}>
//             <Text style={styles.buttonText}>Get Verified</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default VerificationCode;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   centerContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   otpInput: {
//     width: '80%',
//     height: 50,
//     marginVertical: 20,
//   },
//   otpInputField: {
//     width: 40,
//     height: 45,
//     borderWidth: 1,
//     borderColor: '#000',
//     color: '#000',
//     fontSize: 18,
//     textAlign: 'center',
//     borderRadius: 5,
//     backgroundColor: '#f9f9f9',
//   },
//   otpInputHighlight: {
//     borderColor: '#03DAC6',
//   },
//   button: {
//     padding: 8,
//     justifyContent: 'center',
//     borderRadius: 10,
//     width: 300,
//     height: 40,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '600',
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });

// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React, {useState, useEffect} from 'react';
// import FontFamily from '../common/components/FontFamily';
// import BackArrow from '../assets/svg/BackArrow';
// import {useTheme} from '@react-navigation/native';
// import useStore from '../store';
// import Size from '../common/components/Size';
// import LinearGradient from 'react-native-linear-gradient';

// const VerificationCode = ({navigation}) => {
//   const {colors} = useTheme();
//   const {dark, toggleTheme} = useStore();
//   const [verificationCode, setVerificationCode] = useState('');

//   useEffect(() => {
//     // Generate a random 4-digit code when the component mounts
//     const generateCode = () => {
//       const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
//       setVerificationCode(randomCode);
//     };

//     generateCode();
//   }, []);

//   const handleVerification = () => {
//     console.log(`Code verified: ${verificationCode}`);
//     navigation.navigate('Thanks');
//   };

//   return (
//     <View style={styles.container}>
//       <View
//         style={{
//           flexDirection: 'row',
//           height: 56,
//           backgroundColor: colors.color_TabBarColor,
//         }}>
//         <TouchableOpacity
//           style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
//           onPress={() => navigation.navigate('Form')}>
//           <BackArrow color={colors.arrow} />
//         </TouchableOpacity>
//         <Text
//           style={{
//             color: colors.color_TextNormal,
//             fontFamily: FontFamily.semibold,
//             alignSelf: 'center',
//             fontSize: Size.tabtext,
//           }}>
//           Get Verified
//         </Text>
//       </View>

//       <View style={styles.centerContent}>
//         <Text
//           style={{
//             color: colors.color_TextNormal,
//             fontFamily: FontFamily.semibold,
//             fontSize: Size.share,
//           }}>
//           Your Verification Code
//         </Text>
//         <Text style={styles.codeText}>{verificationCode}</Text>

//         <TouchableOpacity onPress={handleVerification}>
//           <LinearGradient
//             colors={[
//               'rgba(0,255,255,0.4)',
//               'rgba(255,192,203,1)',
//               'rgba(255,255,0,0.5)',
//             ]}
//             start={{x: 0, y: 0}}
//             end={{x: 1, y: 1}}
//             style={styles.button}>
//             <Text style={styles.buttonText}>Get Verified</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default VerificationCode;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   centerContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   codeText: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#000',
//     marginVertical: 20,
//   },
//   button: {
//     padding: 8,
//     justifyContent: 'center',
//     borderRadius: 10,
//     width: 300,
//     height: 40,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '600',
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });

// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Clipboard,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import FontFamily from '../common/components/FontFamily';
// import BackArrow from '../assets/svg/BackArrow';
// import {useTheme} from '@react-navigation/native';
// import useStore from '../store';
// import Size from '../common/components/Size';
// import LinearGradient from 'react-native-linear-gradient';
// // import Clipboard from '@react-native-clipboard/clipboard'; // Import Clipboard
// import CopyLink from '../assets/svg/CopyLink';

// const VerificationCode = ({navigation}) => {
//   const {colors} = useTheme();
//   const {dark, toggleTheme} = useStore();
//   const [verificationCode, setVerificationCode] = useState('');
//   const [copied, setCopied] = useState(false); // To show copy confirmation

//   useEffect(() => {
//     // Generate a random 4-digit code when the component mounts
//     const generateCode = () => {
//       const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
//       setVerificationCode(randomCode);
//     };

//     generateCode();
//   }, []);

//   const handleVerification = () => {
//     console.log(`Code verified: ${verificationCode}`);
//     navigation.navigate('Thanks');
//   };

//   const copyToClipboard = () => {
//     Clipboard.setString(verificationCode);
//     setCopied(true); // Set copied state
//     setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
//   };

//   return (
//     <View style={styles.container}>
//       <View
//         style={{
//           flexDirection: 'row',
//           height: 56,
//           backgroundColor: colors.color_TabBarColor,
//         }}>
//         <TouchableOpacity
//           style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
//           onPress={() => navigation.navigate('Form')}>
//           <BackArrow color={colors.arrow} />
//         </TouchableOpacity>
//         <Text
//           style={{
//             color: colors.color_TextNormal,
//             fontFamily: FontFamily.semibold,
//             alignSelf: 'center',
//             fontSize: Size.tabtext,
//           }}>
//           Get Verified
//         </Text>
//       </View>

//       <View style={styles.centerContent}>
//         <Text
//           style={{
//             color: colors.color_TextNormal,
//             fontFamily: FontFamily.semibold,
//             fontSize: Size.share,
//           }}>
//           Your Verification Code
//         </Text>
//         <View style={styles.codeContainer}>
//           <Text style={styles.codeText}>{verificationCode}</Text>
//           <TouchableOpacity onPress={copyToClipboard}>
//             <CopyLink color={colors.arrow} />
//           </TouchableOpacity>
//         </View>
//         {copied && <Text style={styles.copiedText}>Copied to Clipboard!</Text>}

//         <TouchableOpacity onPress={handleVerification}>
//           <LinearGradient
//             colors={[
//               'rgba(0,255,255,0.4)',
//               'rgba(255,192,203,1)',
//               'rgba(255,255,0,0.5)',
//             ]}
//             start={{x: 0, y: 0}}
//             end={{x: 1, y: 1}}
//             style={styles.button}>
//             <Text style={styles.buttonText}>Get Verified</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default VerificationCode;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   centerContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   codeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   codeText: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#000',
//     marginRight: 10,
//   },
//   copiedText: {
//     color: 'green',
//     fontSize: 14,
//     marginTop: 5,
//   },
//   button: {
//     padding: 8,
//     justifyContent: 'center',
//     borderRadius: 10,
//     width: 300,
//     height: 40,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '600',
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontFamily from '../common/components/FontFamily';
import BackArrow from '../assets/svg/BackArrow';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import Size from '../common/components/Size';
import LinearGradient from 'react-native-linear-gradient';
import CopyLink from '../assets/svg/CopyLink';
import axios from 'axios'; // Import axios for API calls
import {config} from '../config';

const VerificationCode = ({navigation, route}) => {
  const {colors} = useTheme();
  const {dark} = useStore();
  const [verificationCode, setVerificationCode] = useState('');
  const [copied, setCopied] = useState(false);

  const {formData, userName} = route.params; // Retrieve variables from the Form page

  useEffect(() => {
    // Generate a random 4-digit code when the component mounts
    const generateCode = () => {
      const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
      setVerificationCode(randomCode);
    };

    generateCode();
  }, []);

  const handleVerification = async () => {
    try {
      const payload = {
        ...formData,
        otp: verificationCode,
        userName,
      };

      // Replace with your API endpoint

      const apiUrl = `${config.production}/app/user/getverified`;

      console.log(apiUrl, payload);
      const response = await axios.post(apiUrl, payload);

      if (response.status === 200) {
        Alert.alert('Success', 'Verification successful!');
        navigation.navigate('Thanks');
      } else {
        Alert.alert('Error', 'Verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during verification:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(verificationCode);
    setCopied(true); // Set copied state
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          height: 56,
          backgroundColor: colors.color_TabBarColor,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => navigation.navigate('Form')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: Size.tabtext,
          }}>
          Verify Your Account
        </Text>
      </View>

      <View style={styles.centerContent}>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            fontSize: Size.welcomeText,
          }}>
          Final Step to Get Verified!
        </Text>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            fontSize: Size.share,
            marginTop: 30
          }}>
          Your Verification Code
        </Text>
        <View style={styles.codeContainer}>
          <Text style={styles.codeText}>{verificationCode}</Text>
          <TouchableOpacity onPress={copyToClipboard}>
            <CopyLink color={colors.arrow} />
          </TouchableOpacity>
        </View>
        {copied && <Text style={styles.copiedText}>Copied to Clipboard!</Text>}
        <View
  style={{
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop:10
  }}
>
  <Text
    style={{
      color: colors.color_TextNormal,
      fontFamily: FontFamily.semibold,
      fontSize: Size.title,
      textAlign: 'center',
    }}
  >
    Sent this OTP to our official Instagram{'\n'}(@AdoroCreators)
    or X Handle{'\n'}(@AdoroOfficial)
  </Text>
</View>
<View
  style={{
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  }}
>
  <Text
    style={{
      color: colors.color_TextNormal,
      fontFamily: FontFamily.semibold,
      fontSize: Size.title,
      textAlign: 'center',
    }}
  >
    Once verified, your badge will appear on your{'\n'}profile and on the Adoro website for premium{'\n'}gigs. �
  </Text>
</View>

        <TouchableOpacity style={{marginTop:50}} onPress={() => navigation.navigate('Home')}>
          <LinearGradient
            colors={[
              'rgba(0,255,255,0.4)',
              'rgba(255,192,203,1)',
              'rgba(255,255,0,0.5)',
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.button}>
            <Text style={styles.buttonText}>Get Verified</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerificationCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centerContent: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  codeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10,
  },
  copiedText: {
    color: 'green',
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    padding: 8,
    justifyContent: 'center',
    borderRadius: 10,
    width: 300,
    height: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});
