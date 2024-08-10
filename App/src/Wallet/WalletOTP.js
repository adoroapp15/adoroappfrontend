import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import {config} from '../config';
import axios from 'axios';
const WalletOTP = ({navigation, route}) => {
  const [user, setUser] = useState({});
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();
  const [inputOTP, setInputOTP] = useState('');
  const {withdrawAmount, otp} = route.params;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        const other = await AsyncStorage.getItem('token');

        const parsedUser = JSON.parse(user, other);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleVerify = async () => {
    if (inputOTP == otp) {

      if (
        user.bankName !== '' &&
        user.ifscCode !== '' &&
        user.accountNo !== '' &&
        user.benificiaryName !== ''
      ) {
        const res = await axios.post(
          `${config.production}/app/user/walletmail`,
          {
            userName: user.userName,
            fullName: user.fullName,
            withdrawAmount,
            bankName: user.bankName,
            ifscCode: user.ifscCode,
            accountNo: user.accountNo,
            benificiaryName: user.benificiaryName,
          },
        );
      } else {
        Alert.alert('Please Fill Bank Details first');
      }

    } else {
      Alert.alert('Invalid OTP', 'Please enter the correct OTP.');
    }
  };
  return (
    <View style={{height: '100%', backgroundColor: colors.color_PageColor}}>
      <Text
        style={{
          color: colors.color_TextNormal,
          // fontWeight: '300',
          fontSize: 20,
          alignSelf: 'center',
          fontFamily: FontFamily.bold,
          top: 70,
        }}>
        {user ? user.fullName : ''}
      </Text>

      <Text
        style={{
          color: colors.color_TextNormal,
          fontSize: 20,
          alignSelf: 'center',
          fontFamily: FontFamily.semibold,
          top: 100,
        }}>
        Enter the OTP
      </Text>
      <TextInput
        style={{
          height: 100,
          width: 300,
          alignSelf: 'center',
          top: 120,
          color: colors.color_TextNormal,
          textAlign: 'center',
          fontSize: 20,
          borderWidth: 1,
          borderRadius: 27,
          paddingRight: 10,
          fontWeight: '800',
          lineHeight: 20.8,
          borderColor: colors.color_BorderColor,
          backgroundColor: colors.color_CardBgColor,
        }}
        value={inputOTP}
        onChangeText={setInputOTP}
        placeholder="******"
        keyboardType="numeric"
        placeholderTextColor={colors.color_TextNormal}
      />

      <TouchableOpacity
        style={{margin: 140, marginTop: 150}}
        onPress={handleVerify}
      >
        <LinearGradient
          colors={[
            'rgba(0,255,255,0.4)',
            'rgba(255,192,203,1)',
            'rgba(255,255,0,0.5)',
          ]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 10,
            paddingBottom: 10,
            justifyContent: 'center',
            borderRadius: 15,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Verify
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: -200,
        }}>
        <LinearGradient
          colors={[
            'rgba(0,255,255,0.8)',
            'rgba(255,192,203,1)',
            'rgba(255,255,0,1)',
          ]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            width: 400,
            height: 400,
            borderRadius: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: FontFamily.semibold,
              fontSize: 35,
              alignSelf: 'center',
              bottom: 70,
            }}>
            adoro
          </Text>
        </LinearGradient>
      </View>
    </View>
  );
};

export default WalletOTP;

const styles = StyleSheet.create({
  input: {
    height: 120,
    width: 300,
    alignSelf: 'center',
    top: 120,
    color: 'black',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#F1F1F1',
    backgroundColor: 'white',
    borderRadius: 27,
    fontWeight: '800',
    lineHeight: 20.8,
    paddingLeft: 10,
  },
  overlappingImage: {
    position: 'absolute',
    bottom: 100,
    left: 110,
    resizeMode: 'cover',
  },
});
