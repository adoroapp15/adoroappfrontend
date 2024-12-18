// import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React from 'react';
// import LinearGradient from 'react-native-linear-gradient';
// import {useTheme} from '@react-navigation/native';

// const Confirmation = ({navigation, route}) => {
//   const {colors} = useTheme();
//   const {fileurl} = route.params;

//   return (
//     <View style={styles.container}>
//       <Text
//         style={{
//           color: colors.color_TextNormal,
//           fontSize: 24,
//           fontWeight: 'bold',
//           marginBottom: 10,
//         }}>
//         Thanks
//       </Text>
//       <Text
//         style={{
//           color: colors.color_TextNormal,
//           fontSize: 18,
//           textAlign: 'center',
//         }}>
//         Kindly note that the payment for your invoice is scheduled to be cleared
//         within the next 30 days.
//       </Text>
//       <TouchableOpacity
//         style={{alignSelf: 'center', justifyContent: 'flex-end'}}
//         onPress={() => navigation.navigate('Home')}>
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
//             Home
//           </Text>
//         </LinearGradient>
//       </TouchableOpacity>
//       <TouchableOpacity>

//         <Image
//           style={{height: 35, width: 35}}
//           source={require('../assets/down.png')}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Confirmation;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center', // Vertically center
//     alignItems: 'center', // Horizontally center
//     padding: 20,
//   },
//   thanksText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10, // Add some space between the two texts
//   },
//   waitText: {
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@react-navigation/native';

const Confirmation = ({navigation, route}) => {
  const {colors} = useTheme();
  const {fileUrl} = route.params;

  const handleFileDownload = () => {
    if (fileUrl) {
      Linking.openURL(fileUrl).catch(err =>
        console.error("Couldn't open file URL:", err),
      );
    } else {
      console.warn('File URL is not available.');
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: colors.color_TextNormal,
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 10,
        }}>
        Thanks
      </Text>
      <Text
        style={{
          color: colors.color_TextNormal,
          fontSize: 18,
          textAlign: 'center',
        }}>
        Kindly note that the payment for your invoice is scheduled to be cleared
        within 30-45 days.
      </Text>
      <TouchableOpacity
        style={{alignSelf: 'center', justifyContent: 'flex-end'}}
        onPress={() => navigation.navigate('Home')}>
        <LinearGradient
          colors={[
            'rgba(0,255,255,0.4)',
            'rgba(255,192,203,1)',
            'rgba(255,255,0,0.5)',
          ]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.homeButton}>
          <Text style={styles.homeButtonText}>Home</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFileDownload}>
        <Image
          style={{height: 35, width: 35, marginTop: 20}}
          source={require('../assets/down.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  homeButton: {
    padding: 8,
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 50,
    width: 200,
    height: 40,
  },
  homeButtonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});
