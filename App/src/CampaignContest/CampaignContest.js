// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Dimensions,
//   FlatList,
//   ActivityIndicator,
//   BackHandler,
//   Alert,
//   Clipboard,
//   ScrollView,
// } from 'react-native';
// import AdoroLogos from '../assets/svg/AdoroLogos';
// import Notifications from '../assets/svg/Notifications';
// import FontFamily from '../common/components/FontFamily';
// import HamBurger from '../assets/svg/HamBurger';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import Campaign from './Campaign';
// import Contest from './Contest';
// import {useFocusEffect} from '@react-navigation/native';
// import {useTheme} from '@react-navigation/native';
// import useStore from '../store';
// const Tab = createMaterialTopTabNavigator();

// const CampaignContest = ({navigation, route}) => {
//   const {dark, toggleTheme} = useStore();
//   const {colors} = useTheme();

//   useFocusEffect(
//     React.useCallback(() => {
//       navigation.setParams({tabBarDefault: 'Campaign'});
//     }, []),
//   );
//   const handleDrawerIconPress = () => {
//     navigation.toggleDrawer(); // Drawer Navigator ko toggle karega
//   };
//   const {hasNewNotifications} = route.params || {};

//   return (
//     <>
//       <View
//         style={{
//           flexDirection: 'row',
//           backgroundColor: colors.color_TabBarColor,
//           height: 56,
//         }}>
//         <TouchableOpacity
//           style={{left: 10, alignSelf: 'center'}}
//           onPress={handleDrawerIconPress}>
//           <HamBurger color={colors.arrow} />
//         </TouchableOpacity>
//         <View style={{flex: 1, left: 20, alignSelf: 'center'}}>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.navigate('Home', {
//                 screen: 'HomePage',
//                 params: {scrollToTop: true},
//               });
//             }}>
//             <AdoroLogos />
//           </TouchableOpacity>
//         </View>
//         <View style={{flexDirection: 'row', gap: 10}}>
//           <>
//             <TouchableOpacity
//               style={{marginRight: 12, alignSelf: 'center'}}
//               onPress={() => navigation.navigate('Notification')}>
//               <Notifications color={colors.arrow} />
//             </TouchableOpacity>
//             {hasNewNotifications && (
//               <View
//                 style={{
//                   position: 'absolute',
//                   backgroundColor: 'red',
//                   width: 10,
//                   height: 10,
//                   borderRadius: 5,
//                   top: -5,
//                   right: -5,
//                 }}
//               />
//             )}
//           </>
//         </View>
//       </View>
//       <Tab.Navigator
//         initialRouteName="Campaign"
//         screenOptions={{
//           tabBarStyle: {
//             backgroundColor: colors.color_TabBarColor,
//           },
//           tabBarActiveTintColor: '#2F65B9',
//           tabBarInactiveTintColor: '#6F7F92',
//           tabBarLabelStyle: {
//             fontFamily: FontFamily.semibold,
//           },
//         }}>
//         <Tab.Screen name="Campaign" component={Campaign} />
//         <Tab.Screen name="Contest" component={Contest} />
//       </Tab.Navigator>
//     </>
//   );
// };
// export default CampaignContest;

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import AdoroLogos from '../assets/svg/AdoroLogos';
import Notifications from '../assets/svg/Notifications';
import FontFamily from '../common/components/FontFamily';
import HamBurger from '../assets/svg/HamBurger';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Campaign from './Campaign';
import Contest from './Contest';
import {useFocusEffect} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

import useStore from '../store';
const Tab = createMaterialTopTabNavigator();

const CampaignContest = ({route}) => {
  const navigation = useNavigation();
  const {dark, toggleTheme} = useStore();
  const {colors} = useTheme();

  useFocusEffect(
    React.useCallback(() => {
      navigation.setParams({tabBarDefault: 'Campaign'});
    }, []),
  );

  const handleDrawerIconPress = () => {
    navigation.toggleDrawer();
  };

  const {hasNewNotifications} = route.params || {};

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.color_TabBarColor,
          height: 56,
        }}>
        <TouchableOpacity
          style={{left: 10, alignSelf: 'center'}}
          onPress={handleDrawerIconPress}>
          <HamBurger color={colors.arrow} />
        </TouchableOpacity>
        <View style={{flex: 1, left: 20, alignSelf: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home', {
                screen: 'HomePage',
                params: {scrollToTop: true},
              });
            }}>
            <AdoroLogos />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', gap: 10}}>
          <TouchableOpacity
            style={{marginRight: 12, alignSelf: 'center'}}
            onPress={() => navigation.navigate('Notification')}>
            <Notifications color={colors.arrow} />
          </TouchableOpacity>
          {hasNewNotifications && (
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'red',
                width: 10,
                height: 10,
                borderRadius: 5,
                top: -5,
                right: -5,
              }}
            />
          )}
        </View>
      </View>
      {/* Swiper Component */}
      <View style={{height: 200}}>
        <Swiper
          // autoplay
          showsPagination
          dotStyle={{backgroundColor: 'gray'}}
          activeDotStyle={{backgroundColor: 'blue'}}
          style={{marginBottom: 10}}>
          <View style={styles.slide}>
            <Text style={styles.text}>Slide 1</Text>
          </View>
          <View style={styles.slide}>
            <Text style={styles.text}>Slide 2</Text>
          </View>
          <View style={styles.slide}>
            <Text style={styles.text}>Slide 3</Text>
          </View>
        </Swiper>
      </View>
      {/* Tab Navigator */}
      <Tab.Navigator
        initialRouteName="Campaign"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.color_TabBarColor,
          },
          tabBarActiveTintColor: '#2F65B9',
          tabBarInactiveTintColor: '#6F7F92',
          tabBarLabelStyle: {
            fontFamily: FontFamily.semibold,
          },
        }}>
        <Tab.Screen name="Campaign" component={Campaign} />
        <Tab.Screen name="Contest" component={Contest} />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CampaignContest;
