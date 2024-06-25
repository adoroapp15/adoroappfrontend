import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import FontFamily from '../common/components/FontFamily';
import BackArrow from '../assets/svg/BackArrow';
import {useTheme, useFocusEffect} from '@react-navigation/native';
import useStore from '../store';
import Size from '../common/components/Size';

const HowUse = ({navigation}) => {
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Setting');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation]),
  );
  return (
    <View style={{height: '100%', backgroundColor: colors.color_PageColor}}>
      <View
        style={{
          flexDirection: 'row',
          height: 56,
          backgroundColor: colors.color_TabBarColor,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => navigation.navigate('Setting')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: Size.tabtext,
          }}>
          How to Use
        </Text>
      </View>
      <View
        style={{
          margin: 10,
          backgroundColor: colors.color_CardColorResult,
          borderRadius: 10,
          padding: 10,
        }}>
        <View style={{borderRadius: 10, overflow: 'hidden'}}>
          <YoutubePlayer height={180} play={false} videoId={'TqZ6xbBChRY'} />
        </View>
      </View>
    </View>
  );
};

export default HowUse;

const styles = StyleSheet.create({});
