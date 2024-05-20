import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Onboarding, {Dot} from 'react-native-onboarding-swiper'; // Import Dot component
import Screen1 from '../assets/svg/Screen1';
import Screen2 from '../assets/svg/Screen2';
import Screen3 from '../assets/svg/Screen3';
import FontFamily from '../common/components/FontFamily';

const OnBoardingScreen = ({navigation}) => {
  const onFinish = () => {
    navigation.navigate('InterestScreen');
  };

  const onSkip = () => {
    navigation.navigate('InterestScreen');
  };

  return (
    <Onboarding
      DotComponent={CustomDot} // Use CustomDot component for swiper dots
      pages={[
        {
          backgroundColor: '#3efdf4',
          image: <Screen1 />,
          title: 'Get Better Together',
          subtitle:
            'Aiming to build a community that empowers creator and their creativity, beyond all boundaries',
          titleStyles: {
            fontFamily: FontFamily.bold,
            color: 'gray',
            fontSize: 22,
            // fontWeight: 'bold',
          },
          subTitleStyles: {
            color: 'gray',
            fontSize: 16,
            fontFamily: FontFamily.semibold,
          },
        },
        {
          backgroundColor: '#ffc0cb',
          image: <Screen2 />,
          title: 'We Bring creation, creator era 2.0',
          subtitle:
            'With Adoro, you can monetize your creations, connect with fellow creators, and achieve sustainable growth. Its a community where your creativity is adored and supported',
          titleStyles: {
            color: 'gray',
            fontSize: 20,
            // fontWeight: 'bold',
            fontFamily: FontFamily.bold,
          },
          subTitleStyles: {
            color: 'gray',
            fontSize: 16,
            fontFamily: FontFamily.semibold,
          },
        },
        {
          backgroundColor: '#f4f4ac',
          image: <Screen3 />,
          title: 'Empowering Creators, Igniting Culture',
          subtitle:
            '-super easy content creation tool \n -largest template library\n -og content marketplace\n -campaign section to monetize content\n-royalty earning model\n-wallet for easy withdrawal of money',
          titleStyles: {
            color: 'gray',
            fontSize: 17,
            // fontWeight: 'bold',
            fontFamily: FontFamily.bold,
          },
          subTitleStyles: {
            color: 'gray',
            fontSize: 16,
            fontFamily: FontFamily.semibold,
          },
        },
      ]}
      onDone={onFinish}
      onSkip={onSkip}
      showSkip={true}
      bottomBarHighlight={false}
      skipLabel="Skip"
      NextButtonComponent={NextButton}
    />
  );
};

const NextButton = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontFamily: FontFamily.semibold}}>Next</Text>
  </TouchableOpacity>
);

const CustomDot = ({selected}) => (
  <View style={{bottom: 50}}>
    <View
      style={{
        width: 5,
        height: 5,
        marginHorizontal: 3,
        backgroundColor: selected ? '#000' : '#888',
        borderRadius: 5,
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default OnBoardingScreen;
