import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  Switch,
  BackHandler
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme, useFocusEffect} from '@react-navigation/native';
import useStore from '../store';
import Size from '../common/components/Size';
import FontFamily from '../common/components/FontFamily';
import BackArrow from '../assets/svg/BackArrow';
import {config} from '../config';

const Setting = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(true); // Set default to true
  const [user, setUser] = useState({});
  
  const pkg = require('../../package.json');
  const appVersion = pkg.version;
  const {dark, toggleTheme} = useStore();
  const {colors} = useTheme();
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('HomePage');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation])
  );
  useEffect(() => {
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

  const handleDelete = () => {};

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
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}>
          <View style={styles.centeredView}>
            <View
              style={{
                backgroundColor: colors.color_CardBgColor,
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
          transparent={true}
          visible={showModal1}
          onRequestClose={() => setShowModal1(false)}>
          <View style={styles.centeredView}>
            <View
              style={{
                backgroundColor: colors.color_CardBgColor,
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
        <View style={{margin: 20, gap: 20, flexDirection: 'column', flex: 1}}>
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
            <Switch
              style={{justifyContent: 'flex-end'}}
              trackColor={{false: '#6C757D', true: '#FF9869'}}
              thumbColor={notificationEnabled ? '#F37135' : '#FFFFFF'}
              value={notificationEnabled}
              onValueChange={() => setNotificationEnabled(!notificationEnabled)}
            />
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
            <Switch
              style={{justifyContent: 'flex-end'}}
              trackColor={{false: '#6C757D', true: '#FF9869'}}
              thumbColor={dark ? '#F37135' : '#FFFFFF'}
              value={dark}
              onValueChange={toggleTheme}
            />
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
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Setting;
