// import React, {useEffect} from 'react';
// import {View, Text, Image, Alert} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import NetInfo from '@react-native-community/netinfo';
// import RNRestart from 'react-native-restart';
// import OTP from './src/OTP/OTP';
// import Navigation from './src/Navigation/Navigation';
// import Interest from './src/Interest/Interest';
// import OTPSubmit from './src/OTP/OTPSubmit';
// import BottomTabNavigation from './src/TabNavigator/BottomTabNavigation';
// import FontFamily from './src/common/components/FontFamily';
// import Apply from './src/CampaignContest/Apply';
// import EditProfile from './src/UserProfile/EditProfile';
// import CampaignKnowMore from './src/CampaignContest/CampaignKnowMore';
// import ContestKnowMore from './src/CampaignContest/ContestKnowMore';
// import ApplyContest from './src/CampaignContest/ApplyContest';
// import Splash from './Splash';
// import WalletWithdraw from './src/Wallet/WalletWithdraw';
// import WalletOTP from './src/Wallet/WalletOTP';
// import ViewResult from './src/Result/ViewResult';
// import Message from './src/HomePage/Message';
// import Template from './src/Template/Template';
// import UploadTemplate from './src/Template/UploadTemplate';
// import TrendingTemplate from './src/Template/TrendingTemplate';
// import MyTemplate from './src/Template/MyTemplate';
// import UserTabNavigation from './src/UserProfile/UserTabNavigation';
// import Send from './src/HomePage/Send';
// import Comment from './src/HomePage/Comment';
// import Chat from './src/HomePage/Chat';
// import Standards from './src/Template/Standards';
// import Licenseds from './src/Template/Licenseds';
// import Username from './src/HomePage/Username';
// import HomePage from './src/HomePage/HomePage';
// import TagFriend from './src/CreatePost/TagFriend';
// import Profile from './src/HomePage/Profile';
// import UserProfile from './src/UserProfile/UserProfile';
// import UserPost from './src/UserProfile/UserPost';
// import ImagePreview from './src/CampaignContest/ImagePreview';
// import Notification from './src/Notification/Notification';
// import Result from './src/Result/Result';
// import OnBoardingScreen from './src/OTP/OnBoardingScreen';
// import MemeTemplate from './src/Template/MemeTemplate';
// import Wallet from './src/Wallet/Wallet';
// import {LightTheme, DarkTheme} from './src/common/components/Themes';
// import {useTheme} from '@react-navigation/native';
// import useStore from './src/store';
// import CampaignContest from './src/CampaignContest/CampaignContest';
// import HowUse from './src/HowUse/HowUse';
// import {flingGestureHandlerProps} from 'react-native-gesture-handler/lib/typescript/handlers/FlingGestureHandler';
// import ContestPreview from './src/CampaignContest/ContestPreview';
// import TrendingTemplates from './src/Template/TrendingTemplates';
// import Setting from './src/Setting/Setting';
// import MyTemplates from './src/UserProfile/MyTemplates';
// import MyTemplatesPost from './src/UserProfile/MyTemplatesPost';
// import CreateMeme from './src/CreatePost/CreateMeme';
// import messaging from '@react-native-firebase/messaging';
// import NextScreen from './src/CreatePost/NextScreen';

// const Stack = createStackNavigator();
// const App = () => {
//   async function requestUserPermission() {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//       console.log('Authorization status:', authStatus);
//     }
//   }
//   const getToken = async () => {
//     const token = await messaging().getToken();
//     console.log('sss', token);
//   };
//   useEffect(() => {
//     requestUserPermission();
//     getToken();
//   }, []);
//   const unsubscribe = NetInfo.addEventListener(state => {
//     if (state.isConnected === false) {
//       Alert.alert('No Internet!', 'Please reconnect!', [
//         {
//           text: 'Reload App',
//           onPress: () => RNRestart.restart(),
//         },
//       ]);
//     } else if (state.isConnected === true) {
//       console.log('Connected');
//     }
//   });
//   useEffect(() => {
//     unsubscribe();
//   });
//   const {colors} = useTheme();
//   const {dark: isDark} = useStore();
//   return (
//     <NavigationContainer theme={isDark ? DarkTheme : LightTheme}>
//       <Stack.Navigator
//         initialRouteName="Splash"
//         screenOptions={{headerShown: false}}>
//         <Stack.Screen name="Splash" component={Splash} />
//         <Stack.Screen name="Navigation" component={Navigation} />
//         <Stack.Screen name="OTPScreen" component={OTP} />
//         <Stack.Screen name="OTPSubmitScreen" component={OTPSubmit} />
//         <Stack.Screen name="InterestScreen" component={Interest} />
//         <Stack.Screen name="BottomTabScreen" component={BottomTabNavigation} />
//         {/* <Stack.Screen name="Campaign" component={CampaignContest} /> */}

//         <Stack.Screen
//           options={{headerShown: false, headerTitleAlign: 'center'}}
//           name="Edit profile"
//           component={EditProfile}
//         />
//         <Stack.Screen name="ApplyNow" component={Apply} />
//         <Stack.Screen name="ApplyNowContest" component={ApplyContest} />
//         <Stack.Screen name="UserProfile" component={UserProfile} />
//         <Stack.Screen
//           options={{
//             headerShown: false,
//             headerTitleAlign: 'center',
//             headerTitleStyle: {
//               color: colors.details, // Specify the color you want
//             },
//           }}
//           name="CampaignKnowMore"
//           component={CampaignKnowMore}
//         />
//         <Stack.Screen
//           options={{headerShown: true, headerTitleAlign: 'center'}}
//           name="All Post"
//           component={UserPost}
//         />
//         <Stack.Screen
//           options={{headerShown: false, headerTitleAlign: 'center'}}
//           name="Profile"
//           component={Profile}
//         />

//         <Stack.Screen
//           options={{headerShown: false, headerTitleAlign: 'center'}}
//           name="Contest Preview"
//           component={ContestPreview}
//         />
//         <Stack.Screen
//           options={{
//             headerShown: false,
//             headerTitleAlign: 'center',
//             headerTitleStyle: {
//               color: colors.details, // Specify the color you want
//             },
//           }}
//           name="ContestKnowMore"
//           component={ContestKnowMore}
//         />
//         <Stack.Screen
//           options={{headerShown: false, headerTitleAlign: 'center'}}
//           name="Wallet Withdraw"
//           component={WalletWithdraw}
//         />
//         <Stack.Screen name="WalletOTPScreen" component={WalletOTP} />
//         <Stack.Screen
//           // options={{headerShown: true, headerTitleAlign: 'center'}}
//           name="ViewResult"
//           component={ViewResult}
//         />
//         <Stack.Screen
//           options={{
//             headerShown: false,
//             headerTitleAlign: 'center',
//             headerTitleStyle: {
//               fontFamily: FontFamily.semibold,
//             },
//           }}
//           name="Browse Template"
//           component={Template}
//         />
//         <Stack.Screen
//           options={{
//             headerShown: false,
//             headerTitleAlign: 'center',
//             headerTitleStyle: {
//               fontFamily: FontFamily.semibold,
//             },
//           }}
//           name="Setting"
//           component={Setting}
//         />
//         <Stack.Screen
//           options={{headerShown: false, headerTitleAlign: 'center'}}
//           name="Upload Template"
//           component={UploadTemplate}
//         />
//         <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
//         <Stack.Screen
//           options={{headerShown: false, headerTitleAlign: 'center'}}
//           name="Trending Template"
//           component={TrendingTemplate}
//         />
//         <Stack.Screen
//           options={{headerShown: false, headerTitleAlign: 'center'}}
//           name="Trending Templates"
//           component={TrendingTemplates}
//         />
//         <Stack.Screen
//           options={{headerShown: false, headerTitleAlign: 'center'}}
//           name="My Template"
//           component={MyTemplate}
//         />
//         <Stack.Screen
//           options={{headerShown: true, headerTitleAlign: 'center'}}
//           name="Username"
//           component={Username}
//         />
//         <Stack.Screen
//           options={{headerShown: false, headerTitleAlign: 'center'}}
//           name="Standards"
//           component={Standards}
//         />
//         <Stack.Screen
//           options={{headerShown: false, headerTitleAlign: 'center'}}
//           name="Licenseds"
//           component={Licenseds}
//         />
//         <Stack.Screen
//           options={{headerShown: true, headerTitleAlign: 'center'}}
//           name="Send"
//           component={Send}
//         />
//         <Stack.Screen
//           options={{headerShown: true, headerTitleAlign: 'center'}}
//           name="Tag Friends"
//           component={TagFriend}
//         />
//         <Stack.Screen
//           options={{headerShown: false, headerTitleAlign: 'center'}}
//           name="Comments"
//           component={Comment}
//         />
//         <Stack.Screen
//           options={{headerShown: true, headerTitleAlign: 'center'}}
//           name="Message"
//           component={Message}
//         />
//         <Stack.Screen
//           options={{
//             headerShown: true,
//             headerTitle: props => (
//               <View style={{flexDirection: 'row', gap: 15, right: 15}}>
//                 <Image
//                   style={{height: 35, width: 35}}
//                   source={require('./src/assets/User.png')}
//                 />

//                 <Text
//                   style={{
//                     color: '#07142E',
//                     fontSize: 16,
//                     // fontWeight: '600',
//                     fontFamily: FontFamily.bold,
//                     top: 5,
//                   }}>
//                   Janie De mario
//                 </Text>
//               </View>
//             ),
//           }}
//           name="Chat"
//           component={Chat}
//         />
//         <Stack.Screen
//           options={{headerShown: false, headerTitleAlign: 'center'}}
//           name="Followers/Following"
//           component={UserTabNavigation}
//         />
//         <Stack.Screen
//           options={{
//             headerShown: false,
//             headerTitleAlign: 'center',
//             headerTitleStyle: {
//               color: colors.color_TextNormal,
//             },
//           }}
//           name="Notification"
//           component={Notification}
//         />
//         <Stack.Screen
//           options={{headerShown: false, headerTitleAlign: 'center'}}
//           name="Image Preview"
//           component={ImagePreview}
//         />
//         <Stack.Screen
//           options={{headerShown: false}}
//           name="Template"
//           component={MemeTemplate}
//         />
//         <Stack.Screen
//           options={{headerShown: false}}
//           name="Wallet"
//           component={Wallet}
//         />
//         <Stack.Screen
//           options={{headerShown: false}}
//           name="Result"
//           component={Result}
//         />
//         <Stack.Screen
//           options={{headerShown: false}}
//           name="How Use"
//           component={HowUse}
//         />
//         <Stack.Screen
//           options={{headerShown: false, headerTitleAlign: 'center'}}
//           name="MyTemplates"
//           component={MyTemplates}
//         />
//         <Stack.Screen
//           options={{headerShown: false, headerTitleAlign: 'center'}}
//           name="MyTemplatesPost"
//           component={MyTemplatesPost}
//         />
//         <Stack.Screen
//           options={{headerShown: false, headerTitleAlign: 'center'}}
//           name="CreateMeme"
//           component={CreateMeme}
//         />
//         <Stack.Screen
//           options={{headerShown: false, headerTitleAlign: 'center'}}
//           name="NextScreen"
//           component={NextScreen}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

import React, {useEffect} from 'react';
import {View, Text, Image, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NetInfo from '@react-native-community/netinfo';
import RNRestart from 'react-native-restart';
import OTP from './src/OTP/OTP';
import Navigation from './src/Navigation/Navigation';
import Interest from './src/Interest/Interest';
import OTPSubmit from './src/OTP/OTPSubmit';
import BottomTabNavigation from './src/TabNavigator/BottomTabNavigation';
import FontFamily from './src/common/components/FontFamily';
import Apply from './src/CampaignContest/Apply';
import EditProfile from './src/UserProfile/EditProfile';
import CampaignKnowMore from './src/CampaignContest/CampaignKnowMore';
import ContestKnowMore from './src/CampaignContest/ContestKnowMore';
import ApplyContest from './src/CampaignContest/ApplyContest';
import Splash from './Splash';
import WalletWithdraw from './src/Wallet/WalletWithdraw';
import WalletOTP from './src/Wallet/WalletOTP';
import ViewResult from './src/Result/ViewResult';
import Message from './src/HomePage/Message';
import Template from './src/Template/Template';
import UploadTemplate from './src/Template/UploadTemplate';
import TrendingTemplate from './src/Template/TrendingTemplate';
import MyTemplate from './src/Template/MyTemplate';
import UserTabNavigation from './src/UserProfile/UserTabNavigation';
import Send from './src/HomePage/Send';
import Comment from './src/HomePage/Comment';
import Chat from './src/HomePage/Chat';
import Standards from './src/Template/Standards';
import Licenseds from './src/Template/Licenseds';
import Username from './src/HomePage/Username';
import HomePage from './src/HomePage/HomePage';
import TagFriend from './src/CreatePost/TagFriend';
import Profile from './src/HomePage/Profile';
import UserProfile from './src/UserProfile/UserProfile';
import UserPost from './src/UserProfile/UserPost';
import ImagePreview from './src/CampaignContest/ImagePreview';
import Notification from './src/Notification/Notification';
import Result from './src/Result/Result';
import OnBoardingScreen from './src/OTP/OnBoardingScreen';
import MemeTemplate from './src/Template/MemeTemplate';
import Wallet from './src/Wallet/Wallet';
import {LightTheme, DarkTheme} from './src/common/components/Themes';
import {useTheme} from '@react-navigation/native';
import useStore from './src/store';
import CampaignContest from './src/CampaignContest/CampaignContest';
import HowUse from './src/HowUse/HowUse';
import {flingGestureHandlerProps} from 'react-native-gesture-handler/lib/typescript/handlers/FlingGestureHandler';
import ContestPreview from './src/CampaignContest/ContestPreview';
import TrendingTemplates from './src/Template/TrendingTemplates';
import Setting from './src/Setting/Setting';
import MyTemplates from './src/UserProfile/MyTemplates';
import MyTemplatesPost from './src/UserProfile/MyTemplatesPost';
import CreateMeme from './src/CreatePost/CreateMeme';
import messaging from '@react-native-firebase/messaging';
import NextScreen from './src/CreatePost/NextScreen';

const Stack = createStackNavigator();
const App = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('sss', token);
  };
  useEffect(() => {
    //requestUserPermission();
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then(token => {
          console.log(token);
        });
    } else {
      console.log('Failed token status');
    }
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          console.log('notification:', remoteMessage.notification);
        }
      });

    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log('Notifications caused:', remoteMessage.notification);
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('message:', remoteMessage);
    });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM Message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);
  const unsubscribe = NetInfo.addEventListener(state => {
    if (state.isConnected === false) {
      Alert.alert('No Internet!', 'Please reconnect!', [
        {
          text: 'Reload App',
          onPress: () => RNRestart.restart(),
        },
      ]);
    } else if (state.isConnected === true) {
      console.log('Connected');
    }
  });
  useEffect(() => {
    unsubscribe();
  });
  const {colors} = useTheme();
  const {dark: isDark} = useStore();
  return (
    <NavigationContainer theme={isDark ? DarkTheme : LightTheme}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Navigation" component={Navigation} />
        <Stack.Screen name="OTPScreen" component={OTP} />
        <Stack.Screen name="OTPSubmitScreen" component={OTPSubmit} />
        <Stack.Screen name="InterestScreen" component={Interest} />
        <Stack.Screen name="BottomTabScreen" component={BottomTabNavigation} />
        {/* <Stack.Screen name="Campaign" component={CampaignContest} /> */}

        <Stack.Screen
          options={{headerShown: false, headerTitleAlign: 'center'}}
          name="Edit profile"
          component={EditProfile}
        />
        <Stack.Screen name="ApplyNow" component={Apply} />
        <Stack.Screen name="ApplyNowContest" component={ApplyContest} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: colors.details, // Specify the color you want
            },
          }}
          name="CampaignKnowMore"
          component={CampaignKnowMore}
        />
        <Stack.Screen
          options={{headerShown: true, headerTitleAlign: 'center'}}
          name="All Post"
          component={UserPost}
        />
        <Stack.Screen
          options={{headerShown: false, headerTitleAlign: 'center'}}
          name="Profile"
          component={Profile}
        />

        <Stack.Screen
          options={{headerShown: false, headerTitleAlign: 'center'}}
          name="Contest Preview"
          component={ContestPreview}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: colors.details, // Specify the color you want
            },
          }}
          name="ContestKnowMore"
          component={ContestKnowMore}
        />
        <Stack.Screen
          options={{headerShown: false, headerTitleAlign: 'center'}}
          name="Wallet Withdraw"
          component={WalletWithdraw}
        />
        <Stack.Screen name="WalletOTPScreen" component={WalletOTP} />
        <Stack.Screen
          // options={{headerShown: true, headerTitleAlign: 'center'}}
          name="ViewResult"
          component={ViewResult}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: FontFamily.semibold,
            },
          }}
          name="Browse Template"
          component={Template}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: FontFamily.semibold,
            },
          }}
          name="Setting"
          component={Setting}
        />
        <Stack.Screen
          options={{headerShown: false, headerTitleAlign: 'center'}}
          name="Upload Template"
          component={UploadTemplate}
        />
        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
        <Stack.Screen
          options={{headerShown: false, headerTitleAlign: 'center'}}
          name="Trending Template"
          component={TrendingTemplate}
        />
        <Stack.Screen
          options={{headerShown: false, headerTitleAlign: 'center'}}
          name="Trending Templates"
          component={TrendingTemplates}
        />
        <Stack.Screen
          options={{headerShown: false, headerTitleAlign: 'center'}}
          name="My Template"
          component={MyTemplate}
        />
        <Stack.Screen
          options={{headerShown: true, headerTitleAlign: 'center'}}
          name="Username"
          component={Username}
        />
        <Stack.Screen
          options={{headerShown: false, headerTitleAlign: 'center'}}
          name="Standards"
          component={Standards}
        />
        <Stack.Screen
          options={{headerShown: false, headerTitleAlign: 'center'}}
          name="Licenseds"
          component={Licenseds}
        />
        <Stack.Screen
          options={{headerShown: true, headerTitleAlign: 'center'}}
          name="Send"
          component={Send}
        />
        <Stack.Screen
          options={{headerShown: true, headerTitleAlign: 'center'}}
          name="Tag Friends"
          component={TagFriend}
        />
        <Stack.Screen
          options={{headerShown: false, headerTitleAlign: 'center'}}
          name="Comments"
          component={Comment}
        />
        <Stack.Screen
          options={{headerShown: true, headerTitleAlign: 'center'}}
          name="Message"
          component={Message}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: props => (
              <View style={{flexDirection: 'row', gap: 15, right: 15}}>
                <Image
                  style={{height: 35, width: 35}}
                  source={require('./src/assets/User.png')}
                />

                <Text
                  style={{
                    color: '#07142E',
                    fontSize: 16,
                    // fontWeight: '600',
                    fontFamily: FontFamily.bold,
                    top: 5,
                  }}>
                  Janie De mario
                </Text>
              </View>
            ),
          }}
          name="Chat"
          component={Chat}
        />
        <Stack.Screen
          options={{headerShown: false, headerTitleAlign: 'center'}}
          name="Followers/Following"
          component={UserTabNavigation}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: colors.color_TextNormal,
            },
          }}
          name="Notification"
          component={Notification}
        />
        <Stack.Screen
          options={{headerShown: false, headerTitleAlign: 'center'}}
          name="Image Preview"
          component={ImagePreview}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Template"
          component={MemeTemplate}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Wallet"
          component={Wallet}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Result"
          component={Result}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="How Use"
          component={HowUse}
        />
        <Stack.Screen
          options={{headerShown: false, headerTitleAlign: 'center'}}
          name="MyTemplates"
          component={MyTemplates}
        />
        <Stack.Screen
          options={{headerShown: false, headerTitleAlign: 'center'}}
          name="MyTemplatesPost"
          component={MyTemplatesPost}
        />
        <Stack.Screen
          options={{headerShown: false, headerTitleAlign: 'center'}}
          name="CreateMeme"
          component={CreateMeme}
        />
        <Stack.Screen
          options={{headerShown: false, headerTitleAlign: 'center'}}
          name="NextScreen"
          component={NextScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
