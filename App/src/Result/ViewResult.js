// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   BackHandler,
// } from 'react-native';
// import React from 'react';
// import FontFamily from '../common/components/FontFamily';
// import BackArrow from '../assets/svg/BackArrow';
// import {useTheme} from '@react-navigation/native';
// import useStore from '../store';
// import Size from '../common/components/Size';
// const ViewResult = ({navigation}) => {
//   const {colors} = useTheme();
//   const {dark, toggleTheme} = useStore();
//   return (
//     <View style={{backgroundColor:colors.color_PageColor,height:'100%'}}>
//       <View style={{flexDirection: 'row',backgroundColor:colors.color_TabBarColor,height:56}}>
//         <TouchableOpacity
//           style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
//           onPress={() => navigation.push('Result')}>
//           <BackArrow color={colors.arrow}/>
//         </TouchableOpacity>
//         <Text
//           style={{
//             color: colors.color_TextNormal,
//             fontFamily: FontFamily.semibold,
//             alignSelf: 'center',
//             fontSize: Size.tabtext,
//           }}>
//           View Result
//         </Text>
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           marginTop: 10,
//           paddingLeft: 15,
//           paddingRight: 15,
//           paddingTop: 8,
//           width: '95%',
//           alignSelf: 'center',
//           paddingBottom: 8,
//           backgroundColor: colors.color_CardColorResult,
//           borderRadius: 10,
//           gap: 15,
//         }}>
//         <Text style={{alignSelf: 'center', fontFamily: FontFamily.semibold,color:colors.color_TextNormal}}>
//           1.
//         </Text>
//         <Text
//           style={{
//             flex: 1,
//             alignSelf: 'center',
//             color:colors.color_TextNormal,
//             fontSize: Size.title,
//             fontFamily: FontFamily.semibold,
//             // fontWeight: '600',
//           }}>
//           Username
//         </Text>
//         <Text
//           style={{
//             alignSelf: 'center',
//             justifyContent: 'flex-end',
//             color: '#3AB74E',
//             fontSize: Size.title,
//             // fontWeight: '600',
//             fontFamily: FontFamily.semibold,
//           }}>
//           Rs 500
//         </Text>
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           marginTop: 10,
//           paddingLeft: 15,
//           paddingRight: 15,
//           paddingTop: 8,
//           width: '95%',
//           alignSelf: 'center',
//           paddingBottom: 8,
//           backgroundColor: colors.color_CardColorResult,
//           borderRadius: 10,
//           gap: 15,
//         }}>
//         <Text style={{alignSelf: 'center', fontFamily: FontFamily.semibold,color:colors.color_TextNormal}}>
//           1.
//         </Text>
//         <Text
//           style={{
//             flex: 1,
//             alignSelf: 'center',
//             color:colors.color_TextNormal,
//             fontSize: Size.title,
//             fontFamily: FontFamily.semibold,
//             // fontWeight: '600',
//           }}>
//           Username
//         </Text>
//         <Text
//           style={{
//             alignSelf: 'center',
//             justifyContent: 'flex-end',
//             color: '#3AB74E',
//             fontSize: Size.title,
//             // fontWeight: '600',
//             fontFamily: FontFamily.semibold,
//           }}>
//           Rs 500
//         </Text>
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           marginTop: 10,
//           paddingLeft: 15,
//           paddingRight: 15,
//           paddingTop: 8,
//           width: '95%',
//           alignSelf: 'center',
//           paddingBottom: 8,
//           backgroundColor: colors.color_CardColorResult,
//           borderRadius: 10,
//           gap: 15,
//         }}>
//         <Text style={{alignSelf: 'center', fontFamily: FontFamily.semibold,color:colors.color_TextNormal}}>
//           1.
//         </Text>
//         <Text
//           style={{
//             flex: 1,
//             alignSelf: 'center',
//             color:colors.color_TextNormal,
//             fontSize: Size.title,
//             fontFamily: FontFamily.semibold,
//             // fontWeight: '600',
//           }}>
//           Username
//         </Text>
//         <Text
//           style={{
//             alignSelf: 'center',
//             justifyContent: 'flex-end',
//             color: '#3AB74E',
//             fontSize: Size.title,
//             // fontWeight: '600',
//             fontFamily: FontFamily.semibold,
//           }}>
//           Rs 500
//         </Text>
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           marginTop: 10,
//           paddingLeft: 15,
//           paddingRight: 15,
//           paddingTop: 8,
//           width: '95%',
//           alignSelf: 'center',
//           paddingBottom: 8,
//           backgroundColor: colors.color_CardColorResult,
//           borderRadius: 10,
//           gap: 15,
//         }}>
//         <Text style={{alignSelf: 'center', fontFamily: FontFamily.semibold,color:colors.color_TextNormal}}>
//           1.
//         </Text>
//         <Text
//           style={{
//             flex: 1,
//             alignSelf: 'center',
//             color:colors.color_TextNormal,
//             fontSize: Size.title,
//             fontFamily: FontFamily.semibold,
//             // fontWeight: '600',
//           }}>
//           Username
//         </Text>
//         <Text
//           style={{
//             alignSelf: 'center',
//             justifyContent: 'flex-end',
//             color: '#3AB74E',
//             fontSize: Size.title,
//             // fontWeight: '600',
//             fontFamily: FontFamily.semibold,
//           }}>
//           Rs 500
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default ViewResult;

// const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React from 'react';
import FontFamily from '../common/components/FontFamily';
import BackArrow from '../assets/svg/BackArrow';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
const ViewResult = ({navigation, route}) => {
  const {result} = route.params;
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.color_TabBarColor,
          height: 56,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => navigation.push('Result')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: Size.tabtext,
          }}>
          View Result
        </Text>
      </View>
      <View style={{backgroundColor: colors.color_PageColor, height: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 8,
            width: '95%',
            alignSelf: 'center',
            paddingBottom: 8,
            backgroundColor: colors.color_CardColorResult,
            borderRadius: 10,
            gap: 15,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontFamily: FontFamily.semibold,
              color: colors.color_TextNormal,
            }}>
            1.
          </Text>
          <Text
            style={{
              flex: 1,
              alignSelf: 'center',
              color: colors.color_TextNormal,
              fontSize: 16,
              fontFamily: FontFamily.semibold,
              fontWeight: '600',
            }}>
            {result.userName}
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              justifyContent: 'flex-end',
              color: '#3AB74E',
              fontSize: 16,
              fontWeight: '600',
              fontFamily: FontFamily.semibold,
            }}>
            Rs 500
          </Text>
        </View>
      </View>
    </>
  );
};

export default ViewResult;

const styles = StyleSheet.create({});
