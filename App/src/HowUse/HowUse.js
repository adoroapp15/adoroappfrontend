// import React, {useState} from 'react';
// import {
//   Text,
//   TouchableOpacity,
//   View,
//   Modal,
//   StyleSheet,
//   Switch,
// } from 'react-native';
// import FontFamily from '../common/components/FontFamily';
// import BackArrow from '../assets/svg/BackArrow';
// import {useTheme} from '@react-navigation/native';
// import useStore from '../store';
// import {ScrollView} from 'react-native-gesture-handler';
// import Size from '../common/components/Size';

// const HowUse = ({navigation}) => {
//   const [showModal, setShowModal] = useState(false);
//   // const gradientColors = dark
//   //   ? ['rgba(0,255,255,0.4)', 'rgba(255,192,203,1)', 'rgba(255,255,0,0.5)']
//   //   : ['#333', '#555'];

//   const {dark, toggleTheme} = useStore();
//   const {colors} = useTheme();
//   return (
//     <View style={{backgroundColor: colors.color_PageColor, height: '100%'}}>
//       <View
//         style={{
//           flexDirection: 'row',
//           backgroundColor: colors.color_TabBarColor,
//           height: 56,
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
//           How To Use
//         </Text>
//       </View>
//       <ScrollView>
//         <View style={{padding: 20}}>
//           <Text
//             style={{
//               color: colors.color_TextNormal,
//               fontFamily: FontFamily.semibold,
//               fontSize: Size.useText,
//             }}>
//             1. Get Better Together
//           </Text>
//           <Text
//             style={{
//               marginTop: 10,
//               color: colors.color_TextNormal,
//               fontFamily: FontFamily.medium,
//               fontSize: Size.tabtext,
//             }}>
//             Aiming to build a community that empowers creator and their
//             creativity, beyond all boundaries
//           </Text>
//           <View
//             style={{
//               height: '0.5%',
//               width: '90%',
//               alignSelf: 'center',
//               backgroundColor: 'gray',
//               marginTop: 20,
//             }}
//           />

//           <Text
//             style={{
//               color: colors.color_TextNormal,
//               fontFamily: FontFamily.semibold,
//               fontSize: Size.useText,
//               marginTop: 20,
//             }}>
//             2. We Bring creation, creator era 2.0
//           </Text>
//           <Text
//             style={{
//               marginTop: 10,
//               color: colors.color_TextNormal,
//               fontFamily: FontFamily.medium,
//               fontSize: Size.tabtext,
//             }}>
//             With Adoro, you can monetize your creations, connect with fellow
//             creators, and achieve sustainable growth. Its a community where your
//             creativity is adored and supported
//           </Text>
//           <View
//             style={{
//               height: '0.5%',
//               width: '90%',
//               alignSelf: 'center',
//               backgroundColor: 'gray',
//               marginTop: 20,
//             }}
//           />
//           <Text
//             style={{
//               color: colors.color_TextNormal,
//               fontFamily: FontFamily.semibold,
//               fontSize: Size.useText,
//               marginTop: 20,
//             }}>
//             3. Empowering Creators, Igniting Culture
//           </Text>
//           <Text
//             style={{
//               marginTop: 10,
//               color: colors.color_TextNormal,
//               fontFamily: FontFamily.medium,
//               fontSize: Size.tabtext,
//             }}>
//             -super easy content creation tool {'\n'}-largest template library{' '}
//             {'\n'}-og content marketplace {'\n'}-campaign section to monetize
//             content {'\n'}-royalty earning model {'\n'}-wallet for easy
//             withdrawal of money
//           </Text>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalView: {
//     backgroundColor: 'white',
//     // height: 200,
//     borderRadius: 20,
//     padding: 20,
//     gap: 20,
//     elevation: 5,
//   },
//   modalText: {
//     alignSelf: 'center',
//     fontFamily: FontFamily.semibold,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     // justifyContent: 'space-around',
//     alignSelf: 'center',
//     width: '100%',
//     gap: 50,
//   },
//   button: {
//     borderRadius: 10,
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingTop: 8,
//     paddingBottom: 8,
//     elevation: 2,
//     backgroundColor: '#2196F3',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontFamily: FontFamily.semibold,
//   },
//   gradientContainer: {
//     borderRadius: 20,
//     padding: 5,
//   },
// });

// export default HowUse;

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import FontFamily from '../common/components/FontFamily';
import BackArrow from '../assets/svg/BackArrow';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import Size from '../common/components/Size';

const HowUse = ({navigation}) => {
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();
  return (
    <View style={{height: '100%', backgroundColor: colors.color_PageColor}}>
      <View
        style={{
          flexDirection: 'row',
          height: 56,
          backgroundColor: colors.color_TabBarColor,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => navigation.navigate('Setting')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: Size.tabtext,
          }}>
          How to Use
        </Text>
      </View>
      <View
        style={{
          margin: 10,
          backgroundColor: colors.color_CardColorResult,
          borderRadius: 10,
          padding: 10,
        }}>
        <View style={{borderRadius: 10, overflow: 'hidden'}}>
          <YoutubePlayer height={180} play={false} videoId={'TqZ6xbBChRY'} />
        </View>
      </View>
    </View>
  );
};

export default HowUse;

const styles = StyleSheet.create({});
