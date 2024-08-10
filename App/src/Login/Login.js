import React, {useState} from 'react';
import axios from 'axios';
import {config} from '../config';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontFamily from '../common/components/FontFamily';
import {useIsFocused} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import Size from '../common/components/Size';

const Login = ({navigation}) => {
  const {dark, toggleTheme} = useStore();
  const isFocused = useIsFocused();
  const {colors} = useTheme();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [number, onChangeNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const handleGetOTP = async () => {
    try {
      setButtonDisabled(true);

      const response = await axios.post(`${config.production}/app/user/login`, {
        mobileNo: number,
      });

      if (response.data.status == 200) {
        setTimeout(() => {
          navigation.navigate('OTPScreen', {
            mobileNo: number,
            username: '',
            fullName: '',
          });
        }, 2000);
      } else {
        Alert.alert('Error', response.data.msg);
      }
      setButtonDisabled(false);
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'Failed to connect to the server.');
      setButtonDisabled(false);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.color_PageColor}]}>
      <Text style={[styles.text, {color: colors.color_Logintext}]}>
        Welcome Back!
      </Text>
      <Text style={[styles.text2, {color: colors.color_Logintext1}]}>
        You Have Been Missed For Long Time
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
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Enter Your Number"
        keyboardType="numeric"
        placeholderTextColor={colors.color_PlaceHolderColor}
      />
      <View style={styles.button}>
        <TouchableOpacity
          style={{borderRadius: 15}}
          disabled={isButtonDisabled}
          onPress={handleGetOTP}>
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
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
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
                fontSize: Size.tabtext,
                textAlign: 'center',
                color: colors.color_CardTxtColor,
              }}>
              OTP sent successfully!
            </Text>
            <View
              style={{
                borderRadius: 10,
                paddingLeft: 5,
                paddingRight: 5,
                paddingTop: 10,
                paddingBottom: 10,
                elevation: 2,
                backgroundColor: '#2196F3',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 60,
  },
  text: {
    fontSize: Size.welcomeText,
    fontFamily: FontFamily.bold,
    paddingLeft: 20,
    marginTop: 30,
  },
  text2: {
    fontSize: Size.title,
    fontFamily: FontFamily.semibold,
    textTransform: 'capitalize',
    paddingLeft: 20,
    marginTop: 10,
  },
  text3: {
    fontSize: Size.title,
    fontFamily: FontFamily.semibold,
    textTransform: 'capitalize',
    paddingLeft: 20,
    marginTop: 50,
  },
  input: {
    color: '#000',
    fontSize: Size.inputText,
    borderWidth: 1,
    borderColor: '#F1F1F1',
    fontFamily: FontFamily.semibold,
    textAlignVertical: 'center',
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  button: {
    borderRadius: 15,
    height: '35%',
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  textStyle: {
    color: '#fff',
    fontSize: Size.buttonText,
    textAlign: 'center',
    fontFamily: FontFamily.semibold,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: FontFamily.semibold,
  },
});

export default Login;
