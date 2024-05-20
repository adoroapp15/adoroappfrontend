import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontFamily from '../common/components/FontFamily';
import axios from 'axios';
import {config} from '../config';
import {useTheme} from '@react-navigation/native';
import Size from '../common/components/Size';

const Followers = props => {
  console.log('follower', props.follower);
  const [follower, setFollower] = useState([]);
  const {colors} = useTheme();
  useEffect(() => {
    getfollower();
  }, []);

  const getfollower = async () => {
    console.log('hitt');
    const arr = props.follower.map(item => {
      return item.userName;
    });

    const res = await axios.get(`${config.production}/app/user/userfollower`, {
      params: {arr, Id: props.user},
    });

    if (res.data.status === 200) {
      setFollower(res.data.data);
    }
    // console.log('response isss', res);
  };
  const navigateToProfile = (mobileNo, profile) => {
    // Use navigation prop to navigate to 'Profile' screen
    props.navigation.navigate('Profile', {
      mobileNo,
      profile,
    });
  };

  console.log('follower', follower);
  return (
    <View style={{backgroundColor: colors.color_PageColor, height:'100%'}}>
      {follower.map((followerData, index) => (
        <View
          key={index}
          style={{
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            gap: 10,
            marginTop:10
          }}>
          <Image
            style={{margin: 10, height: 50, width: 50, borderRadius: 99}}
            source={
              followerData.ProfileDp
                ? {
                    uri: `https://www.adoro.social/UserProfilePic/${followerData.ProfileDp}`,
                  }
                : require('../assets/image.png')
            } // Default image from assets folder
          />
          <View style={{flexDirection: 'column', alignSelf:'center'}}>
            <TouchableOpacity
              onPress={() =>
                navigateToProfile(followerData.mobileNo, followerData.ProfileDp)
              }>
              <Text
                style={{
                  color: colors.color_TextNormal,
                  fontSize: Size.tabtext,
                  // fontWeight: '600',
                  fontFamily: FontFamily.semibold,
                }}>
                {followerData.fullName}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: colors.color_TextSub,
                fontSize: Size.title,
                // fontWeight: '500',
                fontFamily: FontFamily.medium,
              }}>
              @{followerData.userName}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Followers;

const styles = StyleSheet.create({});
