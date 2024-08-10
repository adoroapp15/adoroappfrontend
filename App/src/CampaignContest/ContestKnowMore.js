import {Image, StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import BackArrow from '../assets/svg/BackArrow';
import FontFamily from '../common/components/FontFamily';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Size from '../common/components/Size';
import moment from 'moment';

const ContestKnowMore = ({navigation, route}) => {
  const [profile, setProfile] = React.useState({});
  const {colors} = useTheme();

  const imagePick = (contestName, userName) => {
    const options = {
      selectionLimit: 1,
      mediaType: 'image',
      videoQuality: 'low',
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User Cancelled Image picker');
      } else if (response.error) {
        console.log('Image Picker error:', response.eror);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setProfile(imageUri);
        navigation.navigate('Contest Preview', {
          imageUri,
          mediaType: 'image',
          contestName,
          userName,
        });
      }
    });
  };

  useEffect(() => {
    const fetchprofile = async () => {
      try {
        const userString = await AsyncStorage.getItem('user');
        const otherString = await AsyncStorage.getItem('token');

        if (userString && otherString) {
          const parsedUser = JSON.parse(userString, otherString);
          setProfile(parsedUser);
        }
      } catch (err) {
        console.log('error is ', err);
      }
    };

    fetchprofile();
  }, []);
  const {campaign} = route.params;
  const calculateTimeLeft = (releaseDate, timeLimit) => {
    const releaseMoment = moment(releaseDate, 'YYYY-MM-DD');
    const currentDate = moment();
    const totalDays = timeLimit || 0; // Use timeLimit if available, otherwise default to 0
    const daysLeft = totalDays - releaseMoment.diff(currentDate, 'days');
    const hoursLeft = releaseMoment.diff(currentDate, 'hours') % 24;
    return `${daysLeft} days ${hoursLeft} hrs`;
  };
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.color_TabBarColor,
          zIndex: 1,
          height: 56,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => navigation.navigate('Campaign')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: 20,
          }}>
          Details
        </Text>
      </View>
      <View style={{backgroundColor: colors.color_PageColor, height: '100%'}}>
        <View
          style={{
            margin: 10,
            marginTop: 20,
            backgroundColor: colors.color_CampaignBgColor,
            borderRadius: 10,
            elevation: 0,
            padding: 15,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{height: 50, width: 50, borderRadius: 99}}
              source={{
                uri: `https://www.adoro.social/Contest/${campaign.fileName}`,
              }}
            />
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  margin: 8,
                  color: colors.color_TextNormal,
                  fontFamily: FontFamily.bold,
                  fontSize: Size.title,
                }}>
                {campaign.contestName}
              </Text>
              <Text
                style={{
                  marginLeft: 8,
                  color: colors.color_TextNormal,
                  fontSize: Size.title,
                  fontFamily: FontFamily.semibold,
                }}>
                Live
              </Text>
            </View>
          </View>
          <Text
            style={{
              margin: 10,
              color: colors.color_TextNormal,
              fontFamily: FontFamily.semibold,
              fontSize: 14,
            }}>
            {campaign.Description}
          </Text>
          <TouchableOpacity
            style={{
              margin: 10,
            }}
            onPress={() => imagePick(campaign.contestName, profile.userName)}>
            <LinearGradient
              colors={[
                'rgba(0,255,255,0.4)',
                'rgba(255,192,203,1)',
                'rgba(255,255,0,0.5)',
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={{
                padding: 15,
                justifyContent: 'center',
                borderRadius: 15,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: FontFamily.semibold,
                  textAlign: 'center',
                }}>
                Apply Now
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ContestKnowMore;

const styles = StyleSheet.create({});
