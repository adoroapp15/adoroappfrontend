// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import React, { useEffect } from 'react';
// import LinearGradient from 'react-native-linear-gradient';
// import FontFamily from '../common/components/FontFamily';
// import BackArrow from '../assets/svg/BackArrow';
// import {useTheme} from '@react-navigation/native';
// import useStore from '../store';
// import Size from '../common/components/Size';
// const Result = ({navigation}) => {
//   const {colors} = useTheme();
//   const {dark, toggleTheme} = useStore();
//   return (
//     <View style={{flex: 1,backgroundColor:colors.color_PageColor}}>
//       <View style={{flexDirection: 'row',height:56,backgroundColor:colors.color_TabBarColor}}>
//         <TouchableOpacity
//           style={{flex: 0.5, paddingLeft: 10,alignSelf:'center'}}
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
//           Result
//         </Text>
//       </View>
//       <View
//         style={{
//           // height: 65,
//           width: '95%',
//           paddingLeft: 15,
//           paddingRight: 15,
//           paddingTop: 15,
//           paddingBottom: 15,
//           alignSelf: 'center',
//           flexDirection: 'row',
//           backgroundColor: colors.color_CardColorResult,
//           marginTop: 10,
//           borderRadius: 20,
//         }}>
//         <Image
//           style={{alignSelf: 'center'}}
//           source={require('../assets/User.png')}
//         />
//         <View
//           style={{
//             flexDirection: 'column',
//             alignSelf: 'center',
//             flex: 1,
//             marginLeft: 10,
//           }}>
//           <Text
//             style={{
//               color: colors.color_TextNormal,
//               fontSize: Size.title,
//               // fontWeight: '600',

//               fontFamily: FontFamily.semibold,
//             }}>
//             Brand Name
//           </Text>
//           <Text
//             style={{
//               color: colors.color_CardTxtColor,
//               fontSize: Size.subtitle,
//               // fontWeight: '500',
//               fontFamily: FontFamily.semibold,
//             }}>
//             Campaign Name
//           </Text>
//         </View>
//         <TouchableOpacity
//           // style={{margin: 140, marginTop: 150}}
//           style={{alignSelf: 'center', justifyContent: 'flex-end'}}
//           onPress={() => navigation.navigate('ViewResult')}>
//           <LinearGradient
//             colors={[
//               'rgba(0,255,255,0.4)',
//               'rgba(255,192,203,1)',
//               'rgba(255,255,0,0.5)',
//             ]}
//             start={{x: 0, y: 0}}
//             end={{x: 1, y: 1}}
//             style={{
//               // bottom: 25,
//               padding: 8,
//               justifyContent: 'center',
//               borderRadius: 10,
//             }}>
//             <Text
//               style={{
//                 color: 'white',
//                 fontWeight: '600',
//                 textAlign: 'center',
//                 fontSize: Size.title,

//               }}>
//               View result
//             </Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//       <View
//         style={{
//           // height: 65,
//           width: '95%',
//           paddingLeft: 15,
//           paddingRight: 15,
//           paddingTop: 15,
//           paddingBottom: 15,
//           alignSelf: 'center',
//           flexDirection: 'row',
//           backgroundColor: colors.color_CardColorResult,
//           marginTop: 10,
//           borderRadius: 20,
//         }}>
//         <Image
//           style={{alignSelf: 'center'}}
//           source={require('../assets/User.png')}
//         />
//         <View
//           style={{
//             flexDirection: 'column',
//             alignSelf: 'center',
//             flex: 1,
//             marginLeft: 10,
//           }}>
//           <Text
//             style={{
//               color: colors.color_TextNormal,
//               fontSize: Size.title,
//               // fontWeight: '600',

//               fontFamily: FontFamily.semibold,
//             }}>
//             Brand Name
//           </Text>
//           <Text
//             style={{
//               color: colors.color_CardTxtColor,
//               fontSize: Size.subtitle,
//               // fontWeight: '500',
//               fontFamily: FontFamily.semibold,
//             }}>
//             Campaign Name
//           </Text>
//         </View>
//         <TouchableOpacity
//           // style={{margin: 140, marginTop: 150}}
//           style={{alignSelf: 'center', justifyContent: 'flex-end'}}
//           onPress={() => navigation.navigate('ViewResult')}>
//           <LinearGradient
//             colors={[
//               'rgba(0,255,255,0.4)',
//               'rgba(255,192,203,1)',
//               'rgba(255,255,0,0.5)',
//             ]}
//             start={{x: 0, y: 0}}
//             end={{x: 1, y: 1}}
//             style={{
//               // bottom: 25,
//               padding: 8,
//               justifyContent: 'center',
//               borderRadius: 10,
//             }}>
//             <Text
//               style={{
//                 color: 'white',
//                 fontWeight: '600',
//                 textAlign: 'center',
//                 fontSize: 16,
//               }}>
//               View result
//             </Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//       <View
//         style={{
//           // height: 65,
//           width: '95%',
//           paddingLeft: 15,
//           paddingRight: 15,
//           paddingTop: 15,
//           paddingBottom: 15,
//           alignSelf: 'center',
//           flexDirection: 'row',
//           backgroundColor: colors.color_CardColorResult,
//           marginTop: 10,
//           borderRadius: 20,
//         }}>
//         <Image
//           style={{alignSelf: 'center'}}
//           source={require('../assets/User.png')}
//         />
//         <View
//           style={{
//             flexDirection: 'column',
//             alignSelf: 'center',
//             flex: 1,
//             marginLeft: 10,
//           }}>
//           <Text
//             style={{
//               color: colors.color_TextNormal,
//               fontSize: Size.title,
//               // fontWeight: '600',

//               fontFamily: FontFamily.semibold,
//             }}>
//             Brand Name
//           </Text>
//           <Text
//             style={{
//               color: colors.color_CardTxtColor,
//               fontSize: Size.subtitle,
//               // fontWeight: '500',
//               fontFamily: FontFamily.semibold,
//             }}>
//             Campaign Name
//           </Text>
//         </View>
//         <TouchableOpacity
//           // style={{margin: 140, marginTop: 150}}
//           style={{alignSelf: 'center', justifyContent: 'flex-end'}}
//           onPress={() => navigation.navigate('ViewResult')}>
//           <LinearGradient
//             colors={[
//               'rgba(0,255,255,0.4)',
//               'rgba(255,192,203,1)',
//               'rgba(255,255,0,0.5)',
//             ]}
//             start={{x: 0, y: 0}}
//             end={{x: 1, y: 1}}
//             style={{
//               // bottom: 25,
//               padding: 8,
//               justifyContent: 'center',
//               borderRadius: 10,
//             }}>
//             <Text
//               style={{
//                 color: 'white',
//                 fontWeight: '600',
//                 textAlign: 'center',
//                 fontSize: 16,
//               }}>
//               View result
//             </Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Result;

// const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import FontFamily from '../common/components/FontFamily';
import BackArrow from '../assets/svg/BackArrow';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import axios from 'axios';
import {config} from '../config';
const Result = ({navigation}) => {
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();
  const [result, setResult] = useState([]);
  const getresult = async () => {
    const res = await axios.get(`${config.production}/app/user/getresult`);
    console.log('result response is ', res);
    setResult(res.data.result);
  };

  useEffect(() => {
    getresult();
  }, []);

  return (
    <>
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
            fontSize: 20,
          }}>
          Result
        </Text>
      </View>
      <View style={{flex: 1, backgroundColor: colors.color_PageColor}}>
        {result.map((result, index) => (
          <View
            key={index}
            style={{
              width: '95%',
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 15,
              paddingBottom: 15,
              alignSelf: 'center',
              flexDirection: 'row',
              backgroundColor: colors.color_CardColorResult,
              marginTop: index !== 0 ? 10 : 0, // Add marginTop only for elements after the first one
              borderRadius: 20,
            }}>
            <Image
              style={{alignSelf: 'center'}}
              source={require('../assets/User.png')}
            />
            <View
              style={{
                flexDirection: 'column',
                alignSelf: 'center',
                flex: 1,
                marginLeft: 10,
              }}>
              <Text
                style={{
                  color: colors.color_TextNormal,
                  fontSize: 16,
                  fontFamily: FontFamily.semibold,
                }}>
                {result.campaign_name}
              </Text>
              <Text
                style={{
                  color: colors.color_CardTxtColor,
                  fontSize: 14,
                  fontFamily: FontFamily.semibold,
                }}>
                {result.campaign_name}
              </Text>
            </View>
            <TouchableOpacity
              style={{alignSelf: 'center', justifyContent: 'flex-end'}}
              onPress={() => navigation.navigate('ViewResult', {result})}>
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
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '600',
                    textAlign: 'center',
                    fontSize: 16,
                  }}>
                  View result
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </>
  );
};

export default Result;

const styles = StyleSheet.create({});
