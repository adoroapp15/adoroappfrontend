import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontFamily from '../common/components/FontFamily';
import axios from 'axios';
import {config} from '../config';
import {useTheme} from '@react-navigation/native';
import Size from '../common/components/Size';

const Following = props => {
  console.log('following', props.following);
  const [following, setFollowing] = useState([]);
  const {colors} = useTheme();
  useEffect(() => {
    getFollowing();
  }, []);

  const getFollowing = async () => {
    const arr = props.following.map(item => {
      return item.Follow_id;
    });
 
    const res = await axios.get(`${config.production}/app/user/userfollowing`, {
      params: {arr, Id: props.user},
    });
 
    if (res.data.status === 200) {
      setFollowing(res.data.data);
    }
    console.log('response isss', res);
  };
  return (
    <View style={{backgroundColor: colors.color_PageColor, height:'100%'}}>
      {following.map((followerData, index) => (
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
            <Text
              style={{
                color: colors.color_TextNormal,
                fontSize: Size.tabtext,
                // fontWeight: '600',
                fontFamily: FontFamily.semibold,
              }}>
              {followerData.fullName}
            </Text>
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

export default Following;

const styles = StyleSheet.create({});
