// import {Image, StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
// import React, {useCallback, useEffect} from 'react';
// import * as ImagePicker from 'react-native-image-picker';
// import LinearGradient from 'react-native-linear-gradient';
// import FontFamily from '../common/components/FontFamily';
// import {useTheme} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import BackArrow from '../assets/svg/BackArrow';

// const CampaignKnowMore = ({navigation, route}) => {
//   const [profile, setProfile] = React.useState({});
//   const {colors} = useTheme();
//   useEffect(() => {
//     const fetchprofile = async () => {
//       try {
//         const userString = await AsyncStorage.getItem('user');
//         const otherString = await AsyncStorage.getItem('token');

//         if (userString && otherString) {
//           const parsedUser = JSON.parse(userString, otherString);
//           setProfile(parsedUser);
//         }
//       } catch (err) {
//         console.log('error is ', err);
//       }
//     };

//     fetchprofile();
//   }, []);

//   const imagePick = useCallback((campaign_name, userName) => {
//     const options = {
//       selectionLimit: 1,
//       mediaType: 'image',
//       videoQuality: 'low',
//     };
//     ImagePicker.launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User Cancelled Image picker');
//       } else if (response.error) {
//         console.log('Image Picker error:', response.eror);
//       } else {
//         let imageUri = response.uri || response.assets?.[0]?.uri;
//         navigation.navigate('Image Preview', {
//           imageUri,
//           mediaType: 'image',
//           campaign_name,
//           userName,
//         });
//       }
//     });
//   }, []);
//   const {campaign} = route.params;
//   return (
//     <ScrollView>
//       <View
//         style={{
//           flexDirection: 'row',
//           backgroundColor: colors.color_TabBarColor,
//           zIndex: 1,
//           height: 56,
//         }}>
//         <TouchableOpacity
//           style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
//           onPress={() => navigation.navigate('Campaign')}>
//           <BackArrow color={colors.arrow} />
//         </TouchableOpacity>
//         <Text
//           style={{
//             color: colors.color_TextNormal,
//             fontFamily: FontFamily.semibold,
//             alignSelf: 'center',
//             fontSize: 20,
//           }}>
//           Details
//         </Text>
//       </View>
//       <View style={{backgroundColor: colors.color_PageColor, height: '100%'}}>
//         <View
//           style={{
//             margin: 10,
//             marginTop: 20,
//             backgroundColor: colors.color_CampaignBgColor,
//             borderRadius: 10,
//             elevation: 0,
//             padding: 10,
//           }}>
//           <View style={{flexDirection: 'row'}}>
//             <Image
//               style={{height: 50, width: 50, borderRadius: 99}}
//               // size={50}
//               source={{
//                 uri: `https://marqueberry.com/marqueberrylogofiles/${campaign.Logo}`,
//               }}
//             />
//             <View style={{flexDirection: 'column'}}>
//               <Text
//                 style={{
//                   margin: 8,
//                   color: colors.color_TextNormal,
//                   fontSize: 16,
//                   fontFamily: FontFamily.bold,
//                 }}>
//                 {campaign.brand_name}
//               </Text>
//               <Text
//                 style={{
//                   marginLeft: 8,
//                   color: colors.color_TextNormal,
//                   fontSize: 14,
//                   fontFamily: FontFamily.semibold,
//                 }}>
//                 Live
//               </Text>
//             </View>
//           </View>
//           <Text
//             style={{
//               margin: 10,
//               color: colors.color_TextNormal,
//               fontSize: 14,
//               fontFamily: FontFamily.semibold,
//             }}>
//             {campaign.brand_guidlines}
//           </Text>
//           <TouchableOpacity
//             style={{
//               margin: 10,
//             }}
//             onPress={() => imagePick(campaign.contestName, profile.userName)}>
//             <LinearGradient
//               colors={[
//                 'rgba(0,255,255,0.4)',
//                 'rgba(255,192,203,1)',
//                 'rgba(255,255,0,0.5)',
//               ]}
//               start={{x: 0, y: 0}}
//               end={{x: 1, y: 1}}
//               style={{
//                 padding: 15,
//                 justifyContent: 'center',
//                 borderRadius: 15,
//               }}>
//               <Text
//                 style={{
//                   color: 'white',
//                   fontFamily: FontFamily.semibold,
//                   textAlign: 'center',
//                 }}>
//                 Apply Now
//               </Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default CampaignKnowMore;

// const styles = StyleSheet.create({});

import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import FontFamily from '../common/components/FontFamily';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackArrow from '../assets/svg/BackArrow';
import {Button} from 'react-native-paper';

const CampaignKnowMore = ({navigation, route}) => {
  const [profile, setProfile] = useState({});
  const {colors} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userString = await AsyncStorage.getItem('user');
        const otherString = await AsyncStorage.getItem('token');

        if (userString && otherString) {
          const parsedUser = JSON.parse(userString, otherString);
          setProfile(parsedUser);
        }
      } catch (err) {
        console.log('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);

  const imagePick = useCallback(
    (campaign_name, userName, mobileNo) => {
      const options = {
        selectionLimit: 1,
        mediaType: 'image',
        videoQuality: 'low',
      };
      ImagePicker.launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('Image picker error:', response.error);
        } else {
          let imageUri = response.uri || response.assets?.[0]?.uri;
          console.log('PPPPP')
          navigation.navigate('Image Preview', {
            imageUri,
            mediaType: 'image',
            campaign_name,
            mobileNo,
            userName,
            mediaOption: 'image',
          });
        }
      });
    },
    [navigation],
  );

  const handleApplyNow = campaign => {
    setSelectedCampaign(campaign);
    setModalVisible(true);
  };

  const handleUploadImage = () => {
    setModalVisible(false);
    imagePick(selectedCampaign.campaign_name, profile.userName, profile.mobileNo);
    console.log('ssss', selectedCampaign.campaign_name, profile.userName);
  };

  const handleUploadLink = () => {
    setModalVisible(false);
    navigation.navigate('Image Preview', {
      imageUri: '',
      mediaType: 'link',
      campaign_name: selectedCampaign.campaign_name,
      userName: profile.userName,
      mediaOption: 'link',
    });
  };

  const {campaign} = route.params;

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
            padding: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{height: 50, width: 50, borderRadius: 99}}
              source={{
                uri: `https://marqueberry.com/marqueberrylogofiles/${campaign.Logo}`,
              }}
            />
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  margin: 8,
                  color: colors.color_TextNormal,
                  fontSize: 16,
                  fontFamily: FontFamily.bold,
                }}>
                {campaign.brand_name}
              </Text>
              <Text
                style={{
                  marginLeft: 8,
                  color: colors.color_TextNormal,
                  fontSize: 14,
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
              fontSize: 14,
              fontFamily: FontFamily.semibold,
            }}>
            {campaign.brand_guidlines}
          </Text>
          <TouchableOpacity
            style={{margin: 10}}
            onPress={() => handleApplyNow(campaign)}>
            <LinearGradient
              colors={[
                'rgba(0,255,255,0.4)',
                'rgba(255,192,203,1)',
                'rgba(255,255,0,0.5)',
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={{padding: 15, justifyContent: 'center', borderRadius: 15}}>
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

      {/* Modal for Image/Link Upload */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Choose an option</Text>
            <Button onPress={() => handleUploadImage()}>Upload Image</Button>
            <Button onPress={() => handleUploadLink()}>Upload Link</Button>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default CampaignKnowMore;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
