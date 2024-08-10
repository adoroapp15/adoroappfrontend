import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {config} from '../config';
import FontFamily from '../common/components/FontFamily';
import BackArrow from '../assets/svg/BackArrow';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
const Wallet = ({navigation}) => {
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();
  const [user, setUser] = useState({});
  const [amt, setAmt] = useState(0);
  const [profile, setProfile] = useState(null);

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const userdetail = await AsyncStorage.getItem('user');
  //       const other = await AsyncStorage.getItem('token');

  //       const users = JSON.parse(userdetail, other);
  //       //setUser(users);
  //       const response = await axios.get(
  //         `${config.production}/app/user/userdetails`,
  //         {
  //           params: {mobileNo: users.mobileNo},
  //         },
  //       );

  //       if (response.data.status === 200) {
  //         setProfile(response.data.data.ProfileDp);
  //         setUser(response.data.data)

  //         const walletres = await await axios.get(
  //           `${config.production}/app/user/getbalance`,
  //           {
  //             params: {userId: users.Id},
  //           },
  //         );
  //         if (walletres.status == 200) {
  //           setAmt(walletres.data.balance);
  //         }
  //       } else {
  //         setProfile(null);
  //       }
  //     } catch (error) {
  //       console.error('Error reading user from AsyncStorage:', error);
  //     }
  //   };
  //   getUser();
  // }, []);
  useEffect(() => {
    const getUser = async () => {
      try {
        const userdetail = await AsyncStorage.getItem('user');
        const token = await AsyncStorage.getItem('token');
  
        console.log('User Detail:', userdetail);
        console.log('Token:', token);
  
        if (userdetail) {
          const user = JSON.parse(userdetail);
  
          console.log('Parsed User:', user);
  
          const response = await axios.get(
            `${config.production}/app/user/userdetails`,
            {
              params: {mobileNo: user.mobileNo},
            },
          );
  
          if (response.data.status === 200) {
            setProfile(response.data.data.ProfileDp);
            setUser(response.data.data);
  
            const walletres = await axios.get(
              `${config.production}/app/user/getbalance`,
              {
                params: {userId: userdetail.Id},
              },
            );
  console.log(walletres.data.balance, 'sssssjjj');
            if (walletres.status === 200) {
              setAmt(walletres.data.balance);
            }
          } else {
            setProfile(null);
          }
        } else {
          console.error('User details not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error reading user from AsyncStorage:', error);
      }
    };
    getUser();
  }, []);
  
  return (
    <View style={{backgroundColor: colors.color_PageColor, height: '100%'}}>
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
          Wallet
        </Text>
      </View>
  
      <Text
        style={{
          color: colors.color_TextNormal,
          fontSize: 20,
          alignSelf: 'center',
          top: 70,
          fontFamily: FontFamily.semibold,
        }}>
        {user && user.fullName ? user.fullName : ''}
      </Text>
  
      <View style={styles.container}>
        <Image
          source={require('../assets/wallet2.png')}
          style={styles.image2}
        />
        <Image
          source={
            profile
              ? {uri: `https://www.adoro.social/UserProfilePic/${profile}`}
              : require('../assets/Profile.png')
          }
          style={styles.image1}
        />
      </View>
  
      <View>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontSize: 20,
            alignSelf: 'center',
            fontFamily: FontFamily.semibold,
            top: 280,
          }}>
          You have earned
        </Text>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontSize: 64,
            alignSelf: 'center',
            fontFamily: FontFamily.semibold,
            top: 260,
          }}>
          {`${amt}C`}
        </Text>
        <TouchableOpacity
          style={{margin: 90, marginTop: 250}}
          onPress={() => {
            if (amt === 0) {
              Alert.alert('No Money to withdraw');
            } else {
              navigation.navigate('Wallet Withdraw', {amt});
            }
          }}>
          <LinearGradient
            colors={[
              'rgba(0,255,255,0.4)',
              'rgba(255,192,203,1)',
              'rgba(255,255,0,0.5)',
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 15,
              paddingRight: 15,
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: '600',
                textAlign: 'center',
                fontSize: 20,
              }}>
              Withdraw Money
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontSize: 14,
            alignSelf: 'center',
            fontWeight: '400',
            fontFamily: FontFamily.semibold,
            bottom: 60,
          }}>
          Withdraw Minimum limit Rs. 100
        </Text>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontSize: 14,
            alignSelf: 'center',
            bottom: 55,
            fontFamily: FontFamily.semibold,
          }}>
          1 Cash Coin = 1 Rs
        </Text>
      </View>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image1: {
    position: 'absolute',
    borderRadius: 99,
    top: 130,
    left: 130,
    width: 110,
    height: 110,
    resizeMode: 'cover',
  },
  image2: {
    position: 'absolute',
    top: 120,
    left: 120,
    width: 130,
    height: 130,
    resizeMode: 'cover',
  },
});
