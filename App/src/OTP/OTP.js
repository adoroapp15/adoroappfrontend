import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import FontFamily from '../common/components/FontFamily';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Modal from 'react-native-modal';
import {useTheme} from '@react-navigation/native';
import {config} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
const OTP = ({route, navigation}) => {
  const [timer, setTimer] = useState(60);
  const [timerActive, setTimerActive] = useState(true);
  const {mobileNo, userName, fullName, referral, instaUsername} = route.params;
  const [action, setAction] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [otp, setOtp] = useState('');
 
  useEffect(() => {
    let interval;
 
    const startTimer = () => {
      interval = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown === 0) {
            clearInterval(interval);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    };
 
    if (timerActive) {
      startTimer();
    }
    return () => clearInterval(interval);
  }, [timerActive]);
 
  const storeToken = async (token, user) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error storing token:', error);
    }
  };
 
  const restartTimer = useCallback(() => {
    setOtp('');
    setCountdown(60);
    setTimerActive(true);
  }, []);
 
  const handleOTPChange = otpValue => {
    setOtp(otpValue);
  };
  const [successImageVisible, setSuccessImageVisible] = React.useState(false);
 
  const showSuccessImage = () => {
    setSuccessImageVisible(true);
    setTimeout(() => {
      setSuccessImageVisible(false);
    }, 2000);
  };
 
  const handleDone = async () => {
    let currentAction = '';
    if (userName === '' || fullName === '') {
      currentAction = 'validateuser';
    } else {
      currentAction = 'validatephone';
    }
    try {
      const response = await axios.post(
        `${config.production}/app/user/${currentAction}`,
        {
          mobileNo,
          otp,
          userName,
          fullName,
          referral,
          instaUsername
        },
      );
      if (response.data.status == 200) {
        const token = response.data.token;
        const user = response.data.data;
        storeToken(token, user);
        navigation.navigate('OTPSubmitScreen', currentAction);
      } else {
        Alert.alert(response.data.msg);
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };
 
  const handleResend = async () => {
    let currentAction = '';
 
    if (userName === '' || fullName === '') {
      currentAction = 'login';
    } else {
      currentAction = 'generateotp';
    }
 
    try {
      const response = await axios.post(
        `${config.production}/app/user/${currentAction}`,
        {
          mobileNo,
          otp,
          userName,
          fullName,
          referral,
          instaUsername
        },
      );
 
      if (response.data.status) {
        showSuccessImage();
        setTimeout(() => {
          restartTimer();
        }, 2000);
      } else {
        Alert.alert(response.data.msg);
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };
  const {colors} = useTheme();
 
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.color_PageColor,
      }}>
      <Text style={[styles.text1, {color: colors.color_otptext}]}>
        OTP Verification
      </Text>
      <Text style={styles.text2}>
        We have sent a 4 digit code to your mobile no.
      </Text>
      <OTPInputView
        style={{
          width: '80%',
          height: 200,
          color: colors.color_TextNormal,
        }}
        pinCount={4}
        autoFocusOnLoad
        code={otp}
        codeInputFieldStyle={{
          color: colors.color_TextNormal,
          borderColor: colors.color_OtpBorder,
          backgroundColor: colors.color_OtpBg,
          borderRadius: 8,
          borderWidth: 1,
        }}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeChanged={handleOTPChange}
        selectionColor={colors.color_TextNormal}
        editable={true}
      />
      <Text
        style={{
          marginTop: -50,
          fontSize: 15,
          color: '#1CC625',
          fontFamily: FontFamily.semibold,
        }}>
        {countdown > 0 ? `${countdown}s` : 'Time Expired'}
      </Text>
 
      <View style={styles.container1}>
        <Modal isVisible={successImageVisible}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
                height: 200,
                width: 200,
              }}>
              <Image
                source={require('../assets/Tick.png')}
                style={{
                  width: 125,
                  height: 125,
                  alignSelf: 'center',
                  top: 20,
                  borderRadius: 99,
                }}
              />
            </View>
          </View>
        </Modal>
 
        <View style={styles.text}>
          <Text
            style={{
              color: colors.color_otptext,
              fontFamily: FontFamily.semibold,
            }}>
            Don't Recieve The OTP?
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleResend}>
          <Text style={styles.buttonText}>RESEND OTP</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button1}>
        <TouchableOpacity onPress={handleDone}>
          <LinearGradient
            colors={[
              'rgba(0,255,255,0.4)',
              'rgba(255,192,203,1)',
              'rgba(255,255,0,0.5)',
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{padding: 15, alignItems: 'center', borderRadius: 10}}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>DONE</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  text1: {
    fontSize: 20,
    fontFamily: FontFamily.bold,
    lineHeight: 26,
    wordWrap: 'break-word',
    alignSelf: 'center',
    marginTop: 30,
  },
  text2: {
    color: '#6F7F92',
    fontSize: 14,
    fontFamily: FontFamily.bold,
    lineHeight: 20,
    wordWrap: 'break-word',
    alignSelf: 'center',
    marginTop: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  underlineStyleBase: {
    color: '#000',
    borderColor: '#F1F1F1',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: '#3797E3',
    borderRadius: 8,
    borderWidth: 1,
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginRight: 2,
    fontSize: 6,
  },
  button: {
    padding: 6,
  },
  button1: {
    borderRadius: 10,
    height: '35%',
    width: '95%',
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonText: {
    color: '#3797E3',
    fontSize: 16,
    fontFamily: FontFamily.semibold,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  otpInput: {
    width: '80%',
    height: 200,
    color: '#000',
  },
});
export default OTP;
 