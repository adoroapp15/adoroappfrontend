import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, ScrollView } from 'react-native';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontFamily from '../common/components/FontFamily';
import { config } from '../config';
import { useTheme } from '@react-navigation/native';
import Size from '../common/components/Size';
 
const Signup = ({ navigation }) => {
  const { colors } = useTheme();
  const [number, onChangeNumber] = useState('');
  const [instaUsername, setInstaUsername] = useState('');
  const [referral, setReferral] = useState('');
  const [fullName, onChangeFullName] = useState('');
  const [userName, onChangeUserName] = useState('');
  const [numberError, setNumberError] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [instaUsernameError, setInstaUsernameError] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
 
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
     
      resetErrors();
    });
 
 
    return unsubscribe;
  }, [navigation]);
 
  const resetErrors = () => {
    setNumberError(false);
    setFullNameError(false);
    setUserNameError(false);
    setInstaUsernameError(false);
  };
 
  const handleUsernameChange = (text) => {
    const formattedText = text.replace(/\s/g, '');
    onChangeUserName(formattedText.slice(0, 30).toLowerCase());  
  };
 
  const handleFullNameChange = (text) => {
    onChangeFullName(text.slice(0, 30));
  };
 
  const handleNumberChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, '');  
    onChangeNumber(formattedText.slice(0, 10));
  };
 
  const handleInstaUsernameChange = (text) => {
    setInstaUsername(text.slice(0, 30));  
  };
 
  const handleOTP = async () => {
    try {
      if (!number) {
        setNumberError(true);
      } else {
        setNumberError(false);
      }
 
      if (!fullName) {
        setFullNameError(true);
      } else {
        setFullNameError(false);
      }
 
      if (!userName) {
        setUserNameError(true);
      } else {
        setUserNameError(false);
      }
 
      if (!instaUsername) {
        setInstaUsernameError(true);
      } else {
        setInstaUsernameError(false);
      }
 
      if (!number || !fullName || !userName || !instaUsername) {
        return false;
      }
 
      setButtonDisabled(true);
 
      const response = await axios.post(
        `${config.production}/app/user/generateotp`,
        {
          mobileNo: number,
          userName: userName,
          referral,
          fullName,
          instaUsername,
        }
      );
 
      if (response.data.status === 200) {
         setModalVisible(true);
        setTimeout(() => {
           setModalVisible(false);
          navigation.navigate('OTPScreen', {
            mobileNo: number,
            userName: userName,
            fullName: fullName,
            referral,
            instaUsername,
          });
        }, 2000);
      } else {
        Alert.alert(response.data.msg);
      }
 
      setButtonDisabled(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server.');
      setButtonDisabled(false);
    }
  };
 
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.color_PageColor }]}
    >
      <View>
        <Text style={[styles.text, { color: colors.color_Logintext }]}>
          Welcome Creator
        </Text>
        <Text style={[styles.text2, { color: colors.color_Logintext1 }]}>
          Join the world of creators
        </Text>
 
        <TextInput
          style={[
            styles.input,
            {
              color: colors.color_TextNormal,
              borderColor: colors.color_InputTxtBorder,
              fontFamily: FontFamily.medium,
            },
          ]}
          onChangeText={handleFullNameChange}
          value={fullName}
          placeholder="Full Name"
          placeholderTextColor={colors.color_PlaceHolderColor}
        />
        {fullNameError && (
          <Text style={styles.errorText}>Please enter Full Name*</Text>
        )}
 
        <TextInput
          style={[
            styles.input,
            {
              color: colors.color_TextNormal,
              borderColor: colors.color_InputTxtBorder,
              fontFamily: FontFamily.medium,
            },
          ]}
          onChangeText={handleUsernameChange}
          value={userName}
          placeholderTextColor={colors.color_PlaceHolderColor}
          placeholder="User Name"
        />
        {userNameError && (
          <Text style={styles.errorText}>Please enter User Name*</Text>
        )}
 
        <TextInput
          style={[
            styles.input,
            {
              color: colors.color_TextNormal,
              borderColor: colors.color_InputTxtBorder,
              fontFamily: FontFamily.medium,
            },
          ]}
          onChangeText={handleNumberChange}
          value={number}
          placeholder="Enter Your Number"
          keyboardType="numeric"
          placeholderTextColor={colors.color_PlaceHolderColor}
        />
        {numberError && (
          <Text style={styles.errorText}>Please enter valid Number*</Text>
        )}
 
        <TextInput
          style={[
            styles.input,
            {
              color: colors.color_TextNormal,
              borderColor: colors.color_InputTxtBorder,
              fontFamily: FontFamily.medium,
            },
          ]}
          onChangeText={handleInstaUsernameChange}
          value={instaUsername}
          placeholder="Instagram Username"
          placeholderTextColor={colors.color_PlaceHolderColor}
        />
        {instaUsernameError && (
          <Text style={styles.errorText}>Please enter Instagram Username*</Text>
        )}
 
        <TextInput
          style={[
            styles.input,
            {
              color: colors.color_TextNormal,
              borderColor: colors.color_InputTxtBorder,
              fontFamily: FontFamily.medium,
            },
          ]}
          onChangeText={setReferral}
          value={referral}
          placeholder="Provide your referral code"
          keyboardType="numeric"
          placeholderTextColor={colors.color_PlaceHolderColor}
        />
 
         <View style={styles.button}>
        <TouchableOpacity
          style={{borderRadius: 15}}
          disabled={isButtonDisabled}
          onPress={handleOTP}>
          <LinearGradient
            colors={
              isButtonDisabled
                ? ['#f0f0f0', '#e0e0e0']
                : [
                    'rgba(0,255,255,0.4)',
                    'rgba(255,192,203,1)',
                    'rgba(255,255,0,0.5)',
                  ]
            }
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{padding: 15, alignItems: 'center', borderRadius: 10}}>
            <Text
              style={{
                color: 'white',
                fontFamily: FontFamily.bold,
                fontSize: Size.title,
              }}>
              GET OTP
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      </View>
      <Modal
         animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={{
              backgroundColor: colors.color_CardBgColor,
               height: 200,
              margin: 20,
              borderRadius: 20,
              padding: 30,
              gap: 20,
              elevation: 5,
            }}
          >
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: FontFamily.semibold,
                fontSize: 16,
                textAlign: 'center',
                color: colors.color_CardTxtColor,
              }}
            >
              Success! Your OTP is sent.
            </Text>
 
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    top: 60,
  },
  text: {
    fontSize: Size.welcomeText,
    fontFamily: FontFamily.bold,
    lineHeight: 31.2,
    paddingLeft: 20,
    paddingRight: 10,
    marginTop: 30,
  },
  text2: {
    fontSize: Size.title,
    fontFamily: FontFamily.semibold,
    textTransform: 'capitalize',
    lineHeight: 18,
    paddingLeft: 20,
    marginTop: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    borderRadius: 15,
    height: '35%',
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  errorText: {
    color: 'red',
    paddingLeft: 20,
    marginTop: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
 
export default Signup;
 