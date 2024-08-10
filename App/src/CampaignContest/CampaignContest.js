import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Campaign from './Campaign';
import Contest from './Contest';
import FontFamily from '../common/components/FontFamily';
import {useFocusEffect} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
const Tab = createMaterialTopTabNavigator();
 
const CampaignContest = ({navigation}) => {
  const {dark, toggleTheme} = useStore();
  const {colors} = useTheme();
 
  useFocusEffect(
    React.useCallback(() => {
      navigation.setParams({tabBarDefault: 'Campaign'});
    }, []),
  );
 
  return (
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
  );
};
export default CampaignContest;
 