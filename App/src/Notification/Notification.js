// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Alert,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import LinearGradient from 'react-native-linear-gradient';
// import FontFamily from '../common/components/FontFamily';
// import {useTheme} from '@react-navigation/native';
// import useStore from '../store';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {config} from '../config';
// import axios from 'axios';
// import BackArrow from '../assets/svg/BackArrow';
// import Size from '../common/components/Size';
// const Notification = ({navigation}) => {
//   const {dark, toggleTheme} = useStore();
//   const {colors} = useTheme();
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const getNotification = async () => {
//       try {
//         const userString = await AsyncStorage.getItem('user');
//         if (userString) {
//           console.log('user string isss', userString);
//           const parsedUser = JSON.parse(userString);
//           const res = await axios.get(
//             `${config.production}/app/user/getnotification`,
//             {
//               params: {Id: parsedUser.Id},
//             },
//           );

//           console.log('response is ', res);
//           setData(res.data.notification);
//         }
//       } catch (err) {
//         console.log('Error in fetching ', err);
//       }
//     };

//     getNotification();
//   }, []);
//   const [hasNewNotifications, setHasNewNotifications] = useState(false);

//   useEffect(() => {
//     // Check if there are new notifications
//     if (data.length > 0) {
//       setHasNewNotifications(true);
//       // Pass the information about new notifications to the HomePage
//       navigation.setParams({hasNewNotifications: true});
//     } else {
//       setHasNewNotifications(false);
//       // Pass the information about no new notifications to the HomePage
//       navigation.setParams({hasNewNotifications: false});
//     }
//   }, [data, navigation]);

//   console.log('aaaaasasasas', data);
//   return (
//     // <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
//     //   <View style={{alignItems: 'center'}}>
//     //     <Text style={{alignSelf: 'center'}}>No notification available</Text>
//     //   </View>
//     // </ScrollView>
//     <>
//       <View
//         style={{
//           flexDirection: 'row',
//           height: 56,
//           backgroundColor: colors.color_TabBarColor,
//         }}>
//         <TouchableOpacity
//           style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
//           onPress={() =>
//             navigation.navigate('HomePage', {hasNewNotifications})
//           }>
//           <BackArrow color={colors.arrow} />
//         </TouchableOpacity>
//         <Text
//           style={{
//             color: colors.color_TextNormal,
//             fontFamily: FontFamily.semibold,
//             alignSelf: 'center',
//             fontSize: Size.tabtext,
//           }}>
//           Notification
//         </Text>
//       </View>
//       <View style={{backgroundColor: colors.color_PageColor, height: '100%'}}>
//         {data.length === 0 ? (
//           <View style={{flexDirection:'column'}}>
//             <Text
//               style={{
//                 flex: 1,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 color: colors.color_TextNormal,
//                 fontSize: 14,
//                 fontFamily: FontFamily.semibold,
//                 lineHeight: 24,
//                 wordWrap: 'break-word',
//                 marginLeft: 10,
//               }}>
//               You've caught up with everything
//             </Text>
//             <Text
//               style={{
//                 flex: 1,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 color: colors.color_TextNormal,
//                 fontSize: 14,
//                 fontFamily: FontFamily.semibold,
//                 lineHeight: 24,
//                 wordWrap: 'break-word',
//                 marginLeft: 10,
//               }}>
//               This is where you'll see notifications about your Play store
//               account
//             </Text>
//           </View>
//         ) : (
//           <>
//             {/* <Text
//               style={{
//                 color: colors.color_TextNormal,
//                 fontSize: 14,
//                 fontFamily: FontFamily.semibold,
//                 lineHeight: 24,
//                 wordWrap: 'break-word',
//                 marginLeft: 10,
//               }}>
//               See all requests ({data.length})
//             </Text> */}
//             <Text
//               style={{
//                 // Suggested for you
//                 color: colors.color_TextNormal,
//                 fontSize: Size.title,
//                 fontFamily: FontFamily.bold,
//                 // fontWeight: '600',
//                 lineHeight: 24,
//                 wordWrap: 'break-word',
//                 marginLeft: 10,
//               }}>
//               Suggested for you
//             </Text>
//             {data.map((item, index) => (
//               <>
//                 <View key={index} style={{flexDirection: 'row', margin: 10}}>
//                   <Text
//                     style={{
//                       flex: 1,
//                       fontSize: 14,
//                       color: colors.color_TextNormal,
//                       fontFamily: FontFamily.semibold,
//                     }}>
//                     {item.msg}
//                   </Text>
//                   <Image
//                     style={{
//                       justifyContent: 'flex-end',
//                       marginRight: 10,
//                       alignSelf: 'center',
//                     }}
//                     source={require('../assets/Rectangle.png')}
//                   />
//                 </View>
//               </>
//             ))}
//           </>
//         )}
//       </View>
//     </>
//   );
// };

// export default Notification;

// const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import FontFamily from '../common/components/FontFamily';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from '../config';
import axios from 'axios';
import BackArrow from '../assets/svg/BackArrow';
import Size from '../common/components/Size';
const Notification = ({navigation}) => {
  const {dark, toggleTheme} = useStore();
  const {colors} = useTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getNotification = async () => {
      try {
        const userString = await AsyncStorage.getItem('user');
        const otherString = await AsyncStorage.getItem('token');

        if (userString && otherString) {
          console.log('user string isss', userString);
          const parsedUser = JSON.parse(userString, otherString);
          const res = await axios.get(
            `${config.production}/app/user/getnotification`,
            {
              params: {Id: parsedUser.Id},
            },
          );

          console.log('response is ', res);
          setData(res.data.notification);
        }
      } catch (err) {
        console.log('Error in fetching ', err);
      }
    };

    getNotification();
  }, []);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  useEffect(() => {
    // Check if there are new notifications
    if (data.length > 0) {
      setHasNewNotifications(true);
      // Pass the information about new notifications to the HomePage
      navigation.setParams({hasNewNotifications: true});
    } else {
      setHasNewNotifications(false);
      // Pass the information about no new notifications to the HomePage
      navigation.setParams({hasNewNotifications: false});
    }
  }, [data, navigation]);

  return (
    // <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
    //   <View style={{alignItems: 'center'}}>
    //     <Text style={{alignSelf: 'center'}}>No notification available</Text>
    //   </View>
    // </ScrollView>
    <>
      <View
        style={{
          flexDirection: 'row',
          height: 56,
          backgroundColor: colors.color_TabBarColor,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() =>
            navigation.navigate('HomePage', {hasNewNotifications})
          }>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: Size.tabtext,
          }}>
          Notification
        </Text>
      </View>
      <View style={{backgroundColor: colors.color_PageColor, height: '100%'}}>
        {data.length === 0 ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                color: colors.color_TextNormal,
                fontSize: Size.title,
                fontFamily: FontFamily.semibold,
                lineHeight: 24,
                wordWrap: 'break-word',
              }}>
              No notifications available
            </Text>
          </View>
        ) : (
          <>
            {/* <Text
              style={{
                color: colors.color_TextNormal,
                fontSize: 14,
                fontFamily: FontFamily.semibold,
                lineHeight: 24,
                wordWrap: 'break-word',
                marginLeft: 10,
              }}>
              See all requests ({data.length})
            </Text> */}
            {data.map((item, index) => (
              <View key={index} style={{flexDirection: 'row', margin: 10}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.color_TextNormal,
                    fontFamily: FontFamily.semibold,
                  }}>
                  {item.msg}
                </Text>
                <Image
                  source={
                    item.Dp
                      ? {
                          uri: `https://www.adoro.social/UserProfilePic/${item.Dp}`,
                        }
                      : require('../assets/Profile.png')
                  }
                  resizeMode="contain"
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 999,
                    borderWidth: 2,
                    // marginTop: -50,
                    marginLeft: 50,
                  }}
                />
              </View>
            ))}
          </>
        )}
      </View>
    </>
  );
};

export default Notification;

const styles = StyleSheet.create({});
