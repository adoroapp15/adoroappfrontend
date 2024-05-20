import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Standard from './Standard';
import Licensed from './Licensed';
import FontFamily from '../common/components/FontFamily';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';

const Tab = createMaterialTopTabNavigator();

const TemplateNavigator = () => {
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();

  return (
    <Tab.Navigator
      style={{top: 5}}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.color_TabBarColor,
          height: 50,
        },
        tabBarActiveTintColor: colors.color_TextNormal,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontFamily: FontFamily.semibold,
        },
      }}>
      <Tab.Screen name="Standard" component={Standard} />
      <Tab.Screen name="Licensed" component={Licensed} />
    </Tab.Navigator>
  );
};
export default TemplateNavigator;
