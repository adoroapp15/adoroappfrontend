import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import FontFamily from '../common/components/FontFamily';
import BackArrow from '../assets/svg/BackArrow';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import Size from '../common/components/Size';

const NoteFromAdoro = ({navigation}) => {
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();
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
          onPress={() => navigation.navigate('HomePage')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: Size.tabtext,
          }}>
          Note from adoro
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
          <YoutubePlayer height={180} play={false} videoId={'5cIS1_TVC-E'} />
        </View>
        <Text
          style={{
            alignSelf: 'center',
            marginTop: 10,
            color: colors.color_TextNormal,
            fontFamily: FontFamily.medium,
            fontSize: Size.subtitle,
          }}>
          Adoro is here with its community based creator platform that allows
          creators to learn, network and establish connection with the global
          market. Creators can monetise on their talent and earn online. We aim
          to create a community that is sustainable and extends beyond.
        </Text>
      </View>
    </View>
  );
};

export default NoteFromAdoro;

const styles = StyleSheet.create({});
