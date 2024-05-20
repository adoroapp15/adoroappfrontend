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

    return () => clearTimeout(timeoutId); // Clear the timeout if component unmounts
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
        source={require('../assets/success lottie.json')} // Provide the path to your JSON animation file
        autoPlay
        loop={false} // Play only once
      />
      {/* <LinearGradient
        colors={[
          'rgba(0,255,255,0.4)',
          'rgba(255,192,203,1)',
          'rgba(255,255,0,0.5)',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.button}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>DONE</Text>
      </LinearGradient> */}
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

// import React, {useEffect} from 'react';
// import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

// const OTPSubmit = ({navigation, route}) => {
//   const routeParams = route.params;
//   let destinationScreen;

//   if (routeParams === 'validateuser') {
//     destinationScreen = 'BottomTabScreen';
//   } else {
//     destinationScreen = 'InterestScreen';
//   }

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       navigation.navigate(destinationScreen);
//     }, 2000); // Adjusted the delay to 2000 milliseconds

//     return () => clearTimeout(timeoutId);
//   }, [navigation, destinationScreen]);

//   return (
//     <View style={styles.container}>
//       <Image style={styles.tickImage} source={require('../assets/Tick.png')} />
//       <View style={styles.button1}>
//         <TouchableOpacity
//           onPress={() => navigation.navigate(destinationScreen)}>
//           <LinearGradient
//             colors={[
//               'rgba(0,255,255,0.4)',
//               'rgba(255,192,203,1)',
//               'rgba(255,255,0,0.5)',
//             ]}
//             start={{x: 0, y: 0}}
//             end={{x: 1, y: 1}}
//             style={{padding: 15, alignItems: 'center', borderRadius: 5}}>
//             <Text style={{color: 'white', fontWeight: 'bold'}}>DONE</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     borderRadius: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   tickImage: {
//     margin: 20,
//     alignSelf: 'center',
//     justifyContent: 'center',
//   },
//   submitImage: {
//     alignSelf: 'center',
//     justifyContent: 'center',
//     gap: 5,
//   },
//   button1: {
//     borderRadius: 10,
//     height: '35%',
//     width: '95%',
//     marginTop: 15,
//     paddingLeft: 10,
//     paddingRight: 10,
//   },
// });

// export default OTPSubmit;
