// import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
// import React, {useState} from 'react';
// import {Switch} from 'react-native-switch';
// import LinearGradient from 'react-native-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Setting = ({navigation}) => {
//   const [value, setValue] = useState(true);
//   const [values, setValues] = useState(true);
//   const handleLogout = async () => {
//     try {
//       console.log('Done Navigating');
//       await AsyncStorage.removeItem('token');
//       console.log('Done 1');
//       await AsyncStorage.removeItem('user');
//       console.log('Done 2');
//       Alert.alert('Logout successful');
//       navigation.navigate('Navigation')
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   const gradientColor = value
//     ? ['rgba(0,255,255,0.4)', 'rgba(255,192,203,1)', 'rgba(255,255,0,0.5)']
//     : ['#333', '#555'];
//   const gradientColors = values
//     ? ['rgba(0,255,255,0.4)', 'rgba(255,192,203,1)', 'rgba(255,255,0,0.5)']
//     : ['#333', '#555'];
//   return (
//     <View>
//       {/* <View style={{flexDirection: 'row', gap: 170, margin: 40}}>
//         <Text
//           style={{
//             color: '#07142E',
//             fontSize: 14,
//             fontWeight: '600',
//             lineHeight: 24,
//             wordWrap: 'break-word',
//           }}>
//           Notifications
//         </Text>
//         <LinearGradient
//           colors={gradientColor}
//           style={styles.gradientContainer}
//           start={{x: 0, y: 0}}
//           end={{x: 1, y: 0}}
//           // style={{padding: 15, alignItems: 'center', borderRadius: 5}}
//         >
//           <Switch
//             trackColor={{false: 'transparent', true: 'transparent'}}
//             ios_backgroundColor="transparent"
//             thumbColor={value ? '#fff' : '#fff'}
//             value={value}
//             circleSize={15}
//             barHeight={10}
//             backgroundActive="transparent"
//             backgroundInactive="transparent"
//             renderActiveText={false}
//             renderInActiveText={false}
//             onValueChange={() => setValue(!value)}
//             switchWidthMultiplier={2.5}
//           />
//         </LinearGradient>
//       </View>
//       <View style={{flexDirection: 'row', gap: 180, marginLeft: 40}}>
//         <Text
//           style={{
//             color: '#07142E',
//             fontSize: 14,
//             fontWeight: '600',
//             lineHeight: 24,
//             wordWrap: 'break-word',
//           }}>
//           App Theme
//         </Text>
//         <LinearGradient
//           colors={gradientColors}
//           style={styles.gradientContainer}
//           start={{x: 0, y: 0}}
//           end={{x: 1, y: 0}}
//           // style={{padding: 15, alignItems: 'center', borderRadius: 5}}
//         >
//           <Switch
//             trackColor={{false: 'transparent', true: 'transparent'}}
//             ios_backgroundColor="transparent"
//             thumbColor={values ? '#fff' : '#fff'}
//             value={values}
//             circleSize={15}
//             barHeight={10}
//             backgroundActive="transparent"
//             backgroundInactive="transparent"
//             renderActiveText={false}
//             renderInActiveText={false}
//             onValueChange={() => setValues(!values)}
//             switchWidthMultiplier={2.5}
//           />
//         </LinearGradient>
//       </View> */}
//       <View style={{marginLeft: 40, margin: 40}}>
//         <TouchableOpacity onPress={handleLogout}>
//           <Text
//             style={{
//               color: '#07142E',
//               fontSize: 14,
//               fontWeight: '600',
//               lineHeight: 24,
//               wordWrap: 'break-word',
//             }}>
//             Logout
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Setting;

// const styles = StyleSheet.create({
//   gradientContainer: {
//     borderRadius: 20,
//     padding: 5,
//   },
// });

import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  Switch,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontFamily from '../common/components/FontFamily';
import BackArrow from '../assets/svg/BackArrow';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import Size from '../common/components/Size';
import axios from 'axios';
import {config} from '../config';
const Setting = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  const pkg = require('../../package.json');

  const appVersion = pkg.version;

  // const gradientColors = dark
  //   ? ['rgba(0,255,255,0.4)', 'rgba(255,192,203,1)', 'rgba(255,255,0,0.5)']
  //   : ['#333', '#555'];

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setShowModal(false);
      navigation.navigate('Navigation');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  const [user, setUser] = useState({});
  React.useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const userString = await AsyncStorage.getItem('user');
        const otherString = await AsyncStorage.getItem('token');

        if (userString && otherString) {
          const parsedUser = JSON.parse(userString, otherString);

          const response = await axios.get(
            `${config.production}/app/user/userdetails`,
            {
              params: {mobileNo: parsedUser.mobileNo},
            },
          );

          if (response.data.status === 200) {
            setUser(response.data.data);
          } else {
            console.log('Profile Pic not Found');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchProfilePicture();
  }, []);
  const handleDelete = () => {};
  const {dark, toggleTheme} = useStore();
  const {colors} = useTheme();
  console.log('ppp', appVersion);
  return (
    <View style={[styles.container, {backgroundColor: colors.color_PageColor}]}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.color_TabBarColor,
          height: 56,
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
          Settings
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Modal
          // animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}>
          <View style={styles.centeredView}>
            <View
              style={{
                backgroundColor: colors.color_CardBgColor,
                // height: 200,
                margin: 20,
                borderRadius: 20,
                padding: 30,
                gap: 20,
                elevation: 5,
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontFamily: FontFamily.semibold,
                  fontSize: 16,
                  textAlign: 'center',
                  color: colors.color_CardTxtColor,
                }}>
                Do you really want to logout?
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setShowModal(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          // animationType="slide"
          transparent={true}
          visible={showModal1}
          onRequestClose={() => setShowModal1(false)}>
          <View style={styles.centeredView}>
            <View
              style={{
                backgroundColor: colors.color_CardBgColor,
                // height: 200,
                margin: 20,
                borderRadius: 20,
                padding: 30,
                gap: 20,
                elevation: 5,
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontFamily: FontFamily.semibold,
                  fontSize: 16,
                  textAlign: 'center',
                  color: colors.color_CardTxtColor,
                }}>
                Do you really want to delete your profile?
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setShowModal(false)}>
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View
          style={{
            // marginLeft: 40,
            margin: 20,
            gap: 20,
            flexDirection: 'column',
            flex: 1,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                color: colors.color_settingText,
                fontSize: 14,
                fontWeight: '600',
                lineHeight: 24,
                wordWrap: 'break-word',
              }}>
              Notification
            </Text>
            {/* <LinearGradient
              colors={gradientColors}
              style={styles.gradientContainer}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              // style={{padding: 15, alignItems: 'center', borderRadius: 5}}
            > */}
            {/* <Switch
              trackColor={{false: '#6C757D', true: '#FF9869'}}
              thumbColor={dark ? '#F37135' : '#FFFFFF'}
              circleSize={15}
              barHeight={10}
              // renderActiveText={false}
              // renderInActiveText={false}
              value={dark}
              onValueChange={toggleTheme}
              switchWidthMultiplier={2.5}
            /> */}

            <Switch
              style={{justifyContent: 'flex-end'}}
              trackColor={{false: '#6C757D', true: '#FF9869'}}
              thumbColor={dark ? '#F37135' : '#FFFFFF'}
              // value={dark}
              // onValueChange={toggleTheme}
            />

            {/* </LinearGradient> */}
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                flex: 1,
                color: colors.color_settingText,
                fontSize: 14,
                fontWeight: '600',
                justifyContent: 'flex-start',
                lineHeight: 24,
                wordWrap: 'break-word',
              }}>
              Dark Mode
            </Text>
            {/* <LinearGradient
              colors={gradientColors}
              style={styles.gradientContainer}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              // style={{padding: 15, alignItems: 'center', borderRadius: 5}}
            > */}
            {/* <Switch
              trackColor={{false: '#6C757D', true: '#FF9869'}}
              thumbColor={dark ? '#F37135' : '#FFFFFF'}
              circleSize={15}
              barHeight={10}
              // renderActiveText={false}
              // renderInActiveText={false}
              value={dark}
              onValueChange={toggleTheme}
              switchWidthMultiplier={2.5}
            /> */}

            <Switch
              style={{justifyContent: 'flex-end'}}
              trackColor={{false: '#6C757D', true: '#FF9869'}}
              thumbColor={dark ? '#F37135' : '#FFFFFF'}
              value={dark}
              onValueChange={toggleTheme}
            />

            {/* </LinearGradient> */}
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Edit profile', user)}>
            <Text
              style={{
                color: colors.color_settingText,
                fontSize: 14,
                fontWeight: '600',
                lineHeight: 24,
                wordWrap: 'break-word',
              }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('How Use')}>
            <Text
              style={{
                color: colors.color_settingText,
                fontSize: 14,
                fontWeight: '600',
                lineHeight: 24,
                wordWrap: 'break-word',
              }}>
              How To Use
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('How Use')}>
            <Text
              style={{
                color: colors.color_settingText,
                fontSize: 14,
                fontWeight: '600',
                lineHeight: 24,
                wordWrap: 'break-word',
              }}>
              How To Earn
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowModal1(true)}>
            <Text
              style={{
                color: colors.color_settingText,
                fontSize: 14,
                fontWeight: '600',
                lineHeight: 24,
                wordWrap: 'break-word',
              }}>
              Delete Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Text
              style={{
                color: colors.color_settingText,
                fontSize: 14,
                fontWeight: '600',
                lineHeight: 24,
                wordWrap: 'break-word',
              }}>
              Logout
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: Size.paragraph,
              fontFamily: FontFamily.medium,
              color: colors.color_TextNormal,
              alignSelf: 'center',
              position: 'absolute',
              bottom: 0,
              // justifyContent: 'flex-end',
            }}>
            Version {appVersion}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    // height: 200,
    margin: 20,
    borderRadius: 20,
    padding: 30,
    gap: 20,
    elevation: 5,
  },
  modalText: {
    alignSelf: 'center',
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignSelf: 'center',
    width: '100%',
    gap: 20,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: FontFamily.semibold,
  },
  gradientContainer: {
    borderRadius: 20,
    padding: 5,
  },
});

export default Setting;
