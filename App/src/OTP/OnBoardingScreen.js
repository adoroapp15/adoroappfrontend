import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Onboarding, {Dot} from 'react-native-onboarding-swiper'; // Import Dot component
import Screen1 from '../assets/svg/Screen1';
import Video from 'react-native-video';
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
      DotComponent={CustomDot}
      pages={[
        {
          backgroundColor: 'white',
          // image: <Screen1 />,
          title: 'Welcome to adoro',
          image: (
            <Video
              source={require('../assets/video.mp4')} // Path to your video file
              style={{width: '100%', height: '85%'}} // Set the size of the video
              resizeMode="cover"
              repeat={true} // Loop the video
              // muted={true} // Mute video sound
            />
          ),
          // title: 'Get Better Together',
          subtitle: 'Where memes meet magic',
          titleStyles: {
            fontFamily: FontFamily.bold,
            color: 'black',
            fontSize: 22,
            bottom: 120,
          },
          subTitleStyles: {
            color: 'black',
            fontSize: 16,
            fontFamily: FontFamily.semibold,
            bottom: 120,
          },
        },
        {
          backgroundColor: '#ffc0cb',
          image: <Screen2 />,
          title: '💼 Turn Memes into Money!',
          subtitle:
            'Brands are on the lookout for YOUR creative memes!💡 \n  \n With Adoro’s Campaign Section, you can submit memes to match brand requests. If they love it, YOU GET PAID! 💰 \n  \nJoin contests, win cash, and get featured on the app! 🏆',
          titleStyles: {
            color: 'black',
            fontSize: 20,
            fontFamily: FontFamily.bold,
          },
          subTitleStyles: {
            color: 'black',
            fontSize: 16,
            fontFamily: FontFamily.semibold,
          },
        },
        {
          backgroundColor: '#f4f4ac',
          image: <Screen3 />,
          title: '🌟 Join the Meme Community!',
          subtitle:
            ' Want to level up? \n \n Connect with a community of meme creators, learn tips, tricks, and master the art of viral content. 🤝💬 \n Adoro isn’t just an app, it’s your meme playground where learning meets laughter!',
          titleStyles: {
            color: 'black',
            fontSize: 17,
            fontFamily: FontFamily.bold,
          },
          subTitleStyles: {
            color: 'black',
            fontSize: 16,
            fontFamily: FontFamily.semibold,
          },
        },
      ]}
      onDone={onFinish}
      onSkip={onSkip}
      showSkip={true}
      bottomBarHighlight={false}
      skipLabel={
        <Text style={{color: 'black', fontFamily: FontFamily.semibold}}>
          Skip
        </Text>
      }
      NextButtonComponent={NextButton}
    />
  );
};

const NextButton = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontFamily: FontFamily.semibold, color: 'black'}}>Next</Text>
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
