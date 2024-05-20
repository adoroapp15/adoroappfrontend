import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import FontFamily from '../common/components/FontFamily';
import BrowseTemplateIcon from '../assets/svg/BrowseTemplateIcon';
import TrendingIcon from '../assets/svg/TrendingIcon';
import UploadIcon from '../assets/svg/UploadIcon';
import MyTemplateIcon from '../assets/svg/MyTemplateIcon';
import UploadTemplate from './UploadTemplate';
import UploadTemplateIcon from '../assets/svg/UploadTemplateIcon';
import BackArrow from '../assets/svg/BackArrow';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';

const MemeTemplate = ({navigation}) => {
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();
  return (
    <View style={{backgroundColor: colors.color_PageColor , height: '100%'}}>
      <View style={{flexDirection: 'row', backgroundColor:colors.color_TabBarColor,height:56}}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10,alignSelf:'center'}}
          onPress={() => navigation.navigate('HomePage')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: 16,
          }}>
          Template
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'column',
          alignSelf: 'center',
          gap: 50,
          top: 150,
        }}>
        <View style={{flexDirection: 'row', gap: 50}}>
          <View style={{flexDirection: 'column', gap: 10}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Browse Template')}>
              <LinearGradient
                colors={[
                  'rgba(0,255,255,0.8)',
                  'rgba(255,192,203,1)',
                  'rgba(255,255,0,1)',
                ]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <BrowseTemplateIcon  />
              </LinearGradient>
            </TouchableOpacity>
            <Text style={{color: colors.color_TextNormal, fontFamily: FontFamily.semibold}}>
              Browse Template
            </Text>
          </View>
          <View style={{flexDirection: 'column', gap: 10}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Trending Template')}>
              <LinearGradient
                colors={[
                  'rgba(0,255,255,0.8)',
                  'rgba(255,192,203,1)',
                  'rgba(255,255,0,1)',
                ]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TrendingIcon />
              </LinearGradient>
            </TouchableOpacity>
            <Text style={{color: colors.color_TextNormal, fontFamily: FontFamily.semibold}}>
              Trending Template
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', gap: 50}}>
          <View style={{flexDirection: 'column', gap: 10}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Upload Template')}>
              <LinearGradient
                colors={[
                  'rgba(0,255,255,0.8)',
                  'rgba(255,192,203,1)',
                  'rgba(255,255,0,1)',
                ]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <UploadTemplateIcon />
              </LinearGradient>
            </TouchableOpacity>
            <Text style={{color: colors.color_TextNormal, fontFamily: FontFamily.semibold}}>
              Upload Template
            </Text>
          </View>
          <View style={{flexDirection: 'column', gap: 10}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('My Template')}>
              <LinearGradient
                colors={[
                  'rgba(0,255,255,0.8)',
                  'rgba(255,192,203,1)',
                  'rgba(255,255,0,1)',
                ]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MyTemplateIcon />
              </LinearGradient>
            </TouchableOpacity>
            <Text
              style={{
                color: colors.color_TextNormal,
                fontFamily: FontFamily.semibold,
                alignSelf: 'center',
              }}>
              My Template
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MemeTemplate;

const styles = StyleSheet.create({
  backgroundImage: {
    // flex: 1,
    width: 120,
    height: 120,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    alignSelf: 'center',
  },
  foregroundImage: {
    alignSelf: 'center',
    // top: 30,
    width: 60, // Adjust the width as needed
    height: 60, // Adjust the height as needed
    resizeMode: 'contain', // or 'cover' or 'stretch'
  },
});
