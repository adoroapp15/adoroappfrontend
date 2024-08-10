import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
const OTPSubmit = ({navigation, route}) => {
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();

  const routeParams = route.params;
  const destinationScreen =
    routeParams === 'validateuser' ? 'BottomTabScreen' : 'OnBoardingScreen';

  useEffect(() => {
    const delay = 2000; // 2 seconds
    const timeoutId = setTimeout(() => {
      navigation.navigate(destinationScreen);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [navigation, destinationScreen]);

  return (
    <View style={{
      flex: 1,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:colors.color_PageColor
    }}>
      <LottieView
        style={{height: 200, width: 200}}
        source={require('../assets/success lottie.json')}
        autoPlay
        loop={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickImage: {
    margin: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
    width: '85%',
  },
});

export default OTPSubmit;