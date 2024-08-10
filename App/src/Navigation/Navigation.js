import * as React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import TopTabNavigation from '../TabNavigator/TopTabNavigation';
import AdoroLogo from '../assets/svg/AdoroLogo';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
function Navigation() {
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();

  return (
    <View style={{backgroundColor:colors.color_PageColor,height:'100%'}}>
      <View style={styles.image}>
        <AdoroLogo />
      </View>
      <TopTabNavigation />
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    margin: 30,
    alignItems: 'center',
  },
});

export default Navigation;
