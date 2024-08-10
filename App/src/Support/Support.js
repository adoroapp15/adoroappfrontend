import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {config} from '../config';
import axios from 'axios';
import FontFamily from '../common/components/FontFamily';
import BackArrow from '../assets/svg/BackArrow';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import Size from '../common/components/Size';
const Support = ({navigation}) => {
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({});
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userString = await AsyncStorage.getItem('user');
        const otherString = await AsyncStorage.getItem('token');


        if (userString && otherString) {
          const parsedUser = JSON.parse(userString, otherString);

          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async () => {
    const requestBody = {
      fullName,
      email,
      message,
    };

    try {
      const response = await axios.post(
        `${config.production}/app/user/contact`,
        requestBody,
      );

      if (response.status === 200) {
        Alert.alert('Submission successful');
        setFullName('');
        setEmail('');
        setMessage('');
      } else {
        Alert.alert('Submission failed');
      }
    } catch (error) {
      console.error('Error during submission:', error);
      Alert.alert('Submission failed');
    }
  };

  return (
    <ScrollView>
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
          Support
        </Text>
      </View>

      <Image source={require('../assets/bg.png')} style={styles.image} />

      <View style={{position: 'absolute', marginTop: '20%'}}>
        <Text style={styles.overlayText}>Hi, {user ? user.fullName : ''}</Text>
        <Text style={styles.overlayText1}>
          Please fill this form, our team will reach out to you soon
        </Text>
        <View style={styles.formBox}>
          <TextInput
            style={styles.fullName}
            placeholder="Full name"
            value={fullName}
            onChangeText={text => setFullName(text)}
            placeholderTextColor="#6F7F92"
          />
          <TextInput
            style={styles.emailBox}
            placeholder="E-mail"
            value={email}
            onChangeText={text => setEmail(text)}
            placeholderTextColor="#6F7F92"
          />
          <TextInput
            style={styles.msgBox}
            multiline={true}
            placeholder="Your message"
            value={message}
            onChangeText={text => setMessage(text)}
            placeholderTextColor="#6F7F92"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <LinearGradient
          colors={[
            'rgba(0,255,255,0.4)',
            'rgba(255,192,203,1)',
            'rgba(255,255,0,0.5)',
          ]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{padding: 15, borderRadius: 15}}>
          <Text
            style={{color: 'white', fontWeight: 'bold', alignSelf: 'center'}}>
            Submit
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    position: 'relative',
    width: '100%',
    flex: 3,
  },
  image: {
    // width: '100%',
    // resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    margin: 20,
    flexDirection: 'column',
  },
  overlayText: {
    color: 'white',
    fontSize: Size.welcomeText,
    fontFamily: FontFamily.bold,
    // fontWeight: 'bold',
    marginLeft: 20,
  },
  overlayText1: {
    color: 'white',
    fontSize: Size.share,
    fontFamily: FontFamily.semibold,
    // fontWeight: 'bold',
    marginLeft: 20,
  },
  formContainer: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 5,
    shadowRadius: 2,
    padding: 10,
    flex: 3,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  input: {
    color: 'black',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#F1F1F1',
    fontFamily: FontFamily.semibold,
    lineHeight: 20.8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  input1: {
    marginTop: 10,
    color: 'black',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    fontFamily: FontFamily.semibold,
    lineHeight: 20.8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  messageBox: {
    flex: 1,
    textAlignVertical: 'top',
    marginTop: 10,
    color: 'black',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    fontFamily: FontFamily.semibold,
    lineHeight: 20.8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  submitButton: {
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  submitGradient: {
    padding: 15,
    borderRadius: 15,
  },
  submitText: {
    color: 'white',
    // fontWeight: 'bold',
    fontSize: Size.tabtext,
    alignSelf: 'center',
  },
  submit: {marginTop: '70%', marginHorizontal: '5%'},
  msgBox: {
    height:270,
    fontSize: Size.inputText,
    // marginBottom:"10%",
    textAlignVertical: 'top',
    marginTop: 10,
    color: 'black',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    fontFamily: FontFamily.semibold,
    lineHeight: 20.8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },

  emailBox: {
    marginTop: 10,
    fontSize: Size.inputText,
    color: 'black',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    fontFamily: FontFamily.semibold,
    lineHeight: 20.8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  fullName: {
    fontSize: Size.inputText,
    borderWidth: 1,
    borderColor: '#F1F1F1',
    color: 'black',
    fontFamily: FontFamily.semibold,
    lineHeight: 20.8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },

  formBox: {
    flex: 1,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 5,
    shadowRadius: 2,
    padding: 10,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 20,
    width:"90%",
    marginTop:"7%",
    alignSelf:"center",
    // marginLeft:"2.5%",
    // paddingBottom:"5%"
  },
});

export default Support;
