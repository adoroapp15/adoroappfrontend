import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  useEffect(() => {
    SplashScreen.hide();
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');

      if (value === '' || value === null || user === '' || user === null) {
        navigation.navigate('Navigation');
      } else {
        navigation.navigate('BottomTabScreen');
      }
    } catch (error) {
      console.error('Error checking token:', error);
    }
  };
};

export default Splash;

const styles = StyleSheet.create({});
