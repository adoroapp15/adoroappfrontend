// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React from 'react';
// import BackArrow from '../assets/svg/BackArrow';
// import {useTheme} from '@react-navigation/native';
// import useStore from '../store';
// import Size from '../common/components/Size';
// import LinearGradient from 'react-native-linear-gradient';

// const Thanks = ({navigation}) => {
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
//           onPress={() => navigation.navigate('Verification')}>
//           <BackArrow color={colors.arrow} />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.centerContent}>
//         <Text
//           style={{
//             color: colors.color_TextNormal,
//             fontFamily: FontFamily.semibold,
//             fontSize: Size.share,
//           }}>
//           Thank you
//         </Text>
//         <Text
//           style={{
//             color: colors.color_TextNormal,
//             fontFamily: FontFamily.semibold,
//             fontSize: Size.tabtext,
//             textAlign: 'center',
//             marginVertical: 20,
//           }}>
//           Get your Adoro account verified instantly—just tap the button below!
//         </Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//           <LinearGradient
//             colors={[
//               'rgba(0,255,255,0.4)',
//               'rgba(255,192,203,1)',
//               'rgba(255,255,0,0.5)',
//             ]}
//             start={{x: 0, y: 0}}
//             end={{x: 1, y: 1}}
//             style={styles.button}>
//             <Text style={styles.buttonText}>Home</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Thanks;

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



import {StyleSheet, Text, TouchableOpacity, View, Linking} from 'react-native';
import React from 'react';
import BackArrow from '../assets/svg/BackArrow';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import Size from '../common/components/Size';
import LinearGradient from 'react-native-linear-gradient';

const Thanks = ({navigation}) => {
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();
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
          onPress={() => navigation.navigate('Verification')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
      </View>

      <View style={styles.centerContent}>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            fontSize: Size.share,
          }}>
          Thank you
        </Text>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            fontSize: Size.tabtext,
            textAlign: 'center',
            marginVertical: 20,
          }}>
          Send your verification code on our Instagram channel{' '}
          <Text
            style={{color: 'blue'}}
            onPress={() => {
              Linking.openURL('https://www.instagram.com/adorocreators/');
            }}>
            https://www.instagram.com/adorocreators/
          </Text>
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <LinearGradient
            colors={[
              'rgba(0,255,255,0.4)',
              'rgba(255,192,203,1)',
              'rgba(255,255,0,0.5)',
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.button}>
            <Text style={styles.buttonText}>Home</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Thanks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
