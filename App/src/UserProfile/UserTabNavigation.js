// import React from 'react';
// import {View, Image} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import Login from '../Login/Login';
// import Signup from '../Signup/Signup';
// import Followers from './Followers';
// import Following from './Following';

// const Tab = createMaterialTopTabNavigator();

// const TopTabNavigation = () => {
//   return (
//     <Tab.Navigator
//       style={{margin: 10, borderRadius: 15}}
//       screenOptions={{
//         tabBarStyle: {
//           backgroundColor: 'white',
//           height: 55,
//         },
//         headerShown: true,
//       }}>
//       <Tab.Screen
//         options={{headerShown: true}}
//         name="Following"
//         component={Following}
//       />
//       <Tab.Screen
//         options={{headerShown: true}}
//         name="Followers"
//         component={Followers}
//       />
//     </Tab.Navigator>
//   );
// };
// export default TopTabNavigation;

import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Following from './Following';
import Followers from './Followers';
import {useTheme} from '@react-navigation/native';
import FontFamily from '../common/components/FontFamily';
import BackArrow from '../assets/svg/BackArrow';
const Tab = createMaterialTopTabNavigator();

const TopTabNavigation = ({route, navigation}) => {
  const {follower, following, user} = route.params;
  const {colors} = useTheme();
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.color_TabBarColor,
          zIndex: 1,
          height: 56,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => navigation.navigate('User profile')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: Size.tabtext,
          }}>
          Followers/Following
        </Text>
      </View>
      <View style={{height: '100%'}}>
        <Tab.Navigator
          style={{height: '100%'}}
          screenOptions={{
            tabBarStyle: {
              backgroundColor: colors.color_TabBarColor,
              height: 56,
            },
            tabBarActiveTintColor: colors.color_TabActiveTxt, // Set the color for the active tab
            tabBarInactiveTintColor: '#6F7F92',
            tabBarLabelStyle: {
              fontFamily: FontFamily.semibold,
              alignItems: 'center',
              justifyContent: 'center',
            },
            headerShown: true,
          }}>
          <Tab.Screen
            name="Following"
            options={{headerShown: true}}
            initialParams={{following: following, user: user}}>
            {() => <Following following={following} user={user} />}
          </Tab.Screen>

          <Tab.Screen
            name="Followers"
            options={{headerShown: true}}
            initialParams={{follower: follower, user: user}}>
            {() => <Followers follower={follower} user={user} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    </>
  );
};

export default TopTabNavigation;
