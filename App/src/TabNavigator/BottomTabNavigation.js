import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import CampaignContest from '../CampaignContest/CampaignContest';
import CreatePost from '../CreatePost/CreatePost';
import imagePath from '../assets/imagePath';
import UserProfile from '../UserProfile/UserProfile';
import HomePageDrawer from '../HomePage/HomePageDrawer';
import HomePage from '../HomePage/HomePage';
import CampaignContests from '../assets/svg/CampaignContest';
import CampaignContest1 from '../assets/svg/CampaignContest1';
import Home1 from '../assets/svg/Home1';
import Search from '../Search/Search';
import Seacrh from '../assets/svg/Search';
import Home from '../assets/svg/Home';
import CreatePosts from '../assets/svg/CreatePosts';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import CreatePost1 from '../assets/svg/CreatePost1';
import Svg from 'react-native-svg';
import UserProfile1 from '../assets/svg/UserProfile1';
import UserProfiles from '../assets/svg/UserProfiles';
import BackArrow from '../assets/svg/BackArrow';
const Tab = createBottomTabNavigator();

const BottomTabNavigation = ({navigation}) => {
  const {dark, toggleTheme} = useStore();
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.color_PostBgColor,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'white',
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Home"
        component={HomePageDrawer}
        initialParams={{openDrawer: false}}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TouchableOpacity
              onPress={() => {
                // Trigger the scroll to the top of the FlatList in the HomePage component
                navigation.navigate('Home', {
                  screen: 'HomePage',
                  params: {scrollToTop: true},
                });
              }}>
              {focused ? (
                <Home1 color={colors.arrow} />
              ) : (
                <Home color={colors.arrow} />
              )}
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        initialParams={{openDrawer: false}}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <View>
                <Seacrh color={colors.arrow} />
              </View>
            ) : (
              <View>
                <Seacrh color={colors.arrow} />
              </View>
            ),
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <CreatePost1 color={colors.arrow} />
            ) : (
              <CreatePosts color={colors.arrow} />
            ),
        }}
      />
      <Tab.Screen
        name="Campaign"
        component={CampaignContest}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <CampaignContest1 color={colors.arrow} />
            ) : (
              <CampaignContests color={colors.arrow} />
            ),
        }}
      />
      <Tab.Screen
        name="User profile"
        component={UserProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TouchableOpacity
              onPress={() => {
                // Trigger the scroll to the top of the FlatList in the HomePage component
                navigation.navigate('User profile', {
                  screen: 'User profile',
                  params: {scrollToTop: true},
                });
              }}>
              {focused ? (
                <UserProfile1 color={colors.arrow} />
              ) : (
                <UserProfiles color={colors.arrow} />
              )}
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({});
