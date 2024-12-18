// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React from 'react';
// import FontFamily from '../common/components/FontFamily';
// import BackArrow from '../assets/svg/BackArrow';
// import {useTheme} from '@react-navigation/native';
// import useStore from '../store';
// import Size from '../common/components/Size';
// import LinearGradient from 'react-native-linear-gradient';

// const GetVerified = ({navigation}) => {
//   const {colors} = useTheme();
//   const {dark, toggleTheme} = useStore();
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
//           onPress={() => navigation.navigate('HomePage')}>
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
//       <Text
//         style={{
//           color: colors.color_TextNormal,
//           fontFamily: FontFamily.semibold,
//           alignSelf: 'center',
//           fontSize: Size.share,
//         }}>
//         Get Pro
//       </Text>
//       <Text
//         style={{
//           color: colors.color_TextNormal,
//           fontFamily: FontFamily.semibold,
//           alignSelf: 'center',
//           fontSize: Size.tabtext,
//         }}>
//         Get your Adoro account verified instantly—just tap the button below!
//       </Text>
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
//             width: 300, // Increase the width
//             height: 40, // Increase the height
//           }}>
//           <Text
//             style={{
//               color: 'white',
//               fontWeight: '600',
//               textAlign: 'center',
//               fontSize: 16,
//             }}>
//             Get Verified
//           </Text>
//         </LinearGradient>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default GetVerified;

// const styles = StyleSheet.create({});

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontFamily from '../common/components/FontFamily';
import BackArrow from '../assets/svg/BackArrow';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import Size from '../common/components/Size';
import LinearGradient from 'react-native-linear-gradient';

const GetVerified = ({navigation}) => {
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
          onPress={() => navigation.navigate('HomePage')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: Size.tabtext,
          }}>
          Get Verified
        </Text>
      </View>

      <View>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            fontSize: Size.share,
            alignSelf: 'center',
          }}>
          Benefits of Getting Verifed
        </Text>
        {/* <LinearGradient
          colors={[
            'rgba(0,255,255,0.8)',
            'rgba(255,192,203,1)',
            'rgba(255,255,0,1)',
          ]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            width: 300, // Ensure width and height are equal for a circular shape
            height: 300,
            borderRadius: 150, // Half of the width/height
            // marginTop: -50, // Adjust as needed
            alignSelf: 'center',
          }}
        />
        <Image
          source={require('../assets/verified.png')}
          style={{height: 24, width: 24, color: colors.arrow}}
        /> */}
        <View
          style={{
            position: 'relative',
            width: 300,
            height: 300,
            alignSelf: 'center',
          }}>
          {/* Gradient Circle */}
          <LinearGradient
            colors={[
              'rgba(0,255,255,0.6)',
              'rgba(255,192,203,0.8)',
              'rgba(255,255,0,0.8)',
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{
              width: 300,
              height: 300,
              borderRadius: 150,
            }}
          />

          {/* Overlapping Image */}
          <Image
            source={require('../assets/verified.png')}
            style={{
              position: 'absolute',
              top: '40%', // Center vertically
              left: '10%', // Center horizontally
              transform: [{translateX: -12}, {translateY: -12}], // Adjust for image size (half width and height)
              height: 150,
              width: 150,
            }}
          />
        </View>
        <View style={{alignSelf: 'center'}}>
          <Text
            style={{
              color: colors.color_TextNormal,
              fontFamily: FontFamily.semibold,
              fontSize: Size.subtitle,
              textAlign: 'center',
              marginVertical: 20,
              marginBottom: 10,
            }}>
            Stand Out as a Verified Creator
          </Text>
          <Text
            style={{
              color: colors.color_TextNormal,
              fontFamily: FontFamily.semibold,
              fontSize: Size.subtitle,
              textAlign: 'center',
              // marginVertical: 20,
            }}>
            1 Build truest with brands and creators with a verified badge.
          </Text>
          <Text
            style={{
              color: colors.color_TextNormal,
              fontFamily: FontFamily.semibold,
              fontSize: Size.subtitle,
              textAlign: 'center',
              // marginVertical: 20,
            }}>
            2 Get exclusiove access to premium campaigns and brand partnership.
          </Text>
          <Text
            style={{
              color: colors.color_TextNormal,
              fontFamily: FontFamily.semibold,
              fontSize: Size.subtitle,
              textAlign: 'center',
              // marginVertical: 20,
            }}>
            3 BE featured higher in search results to boost visibility.
          </Text>
          <Text
            style={{
              color: colors.color_TextNormal,
              fontFamily: FontFamily.semibold,
              fontSize: Size.subtitle,
              textAlign: 'center',
              marginVertical: 20,
            }}>
            4 Unlock unique opportunities to grow your creator journey!
          </Text>
        </View>
        <TouchableOpacity
          style={{alignSelf: 'center'}}
          onPress={() => navigation.navigate('Form')}>
          <LinearGradient
            colors={[
              'rgba(0,255,255,0.4)',
              'rgba(255,192,203,1)',
              'rgba(255,255,0,0.5)',
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.button}>
            <Text style={styles.buttonText}>
              Ready to unlock your badge? Let's start
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetVerified;

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
