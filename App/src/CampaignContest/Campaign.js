// import React, {useEffect, useState, useCallback} from 'react';
// import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
// import {Avatar, Card} from 'react-native-paper';
// import LinearGradient from 'react-native-linear-gradient';
// import axios from 'axios';
// import {config} from '../config';
// import moment from 'moment';
// import * as ImagePicker from 'react-native-image-picker';
// import {useTheme} from '@react-navigation/native';
// import useStore from '../store';
// import FontFamily from '../common/components/FontFamily';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Campaign = ({navigation}) => {
//   const [profile, setProfile] = React.useState({});
//   const {dark, toggleTheme} = useStore();

//   const [selectedcampaign, setSelectedcampaign] = useState({});

//   const imagePick = useCallback(
//     (campaign_name, userName) => {
//       const options = {
//         selectionLimit: 1,
//         mediaType: 'image',
//         videoQuality: 'low',
//       };
//       ImagePicker.launchImageLibrary(options, response => {
//         if (response.didCancel) {
//           console.log('User Cancelled Image picker');
//         } else if (response.error) {
//           console.log('Image Picker error:', response.eror);
//         } else {
//           let imageUri = response.uri || response.assets?.[0]?.uri;
//           navigation.navigate('Image Preview', {
//             imageUri,
//             mediaType: 'image',
//             campaign_name,
//             userName,
//           });
//         }
//       });
//     },
//     [navigation],
//   );
//   const [campaignData, setCampaignData] = useState([]);
//   const LeftContent = ({campaign}) => (
//     <Avatar.Image
//       style={{marginLeft: -10}}
//       size={50}
//       source={{
//         uri: `https://marqueberry.com/marqueberrylogofiles/${campaign.Logo}`,
//       }}
//     />
//   );

//   const calculateTimeLeft = (releaseDate, timeLimit) => {
//     const releaseMoment = moment(releaseDate, 'YYYY-MM-DD');
//     const currentDate = moment();
//     const totalDays = timeLimit || 0;
//     const daysLeft = totalDays - releaseMoment.diff(currentDate, 'days');
//     const hoursLeft = releaseMoment.diff(currentDate, 'hours') % 24;
//     return `${daysLeft} days ${hoursLeft} hrs`;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `${config.production}/app/user/campaigndetails`,
//         );
//         const data = response.data.campaigndetails;

//         setCampaignData(data);

//         const userString = await AsyncStorage.getItem('user');
//         const otherString = await AsyncStorage.getItem('token');

//         if (userString && otherString) {
//           const parsedUser = JSON.parse(userString, otherString);
//           setProfile(parsedUser);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   console.log('campaign data is s', campaignData);

//   const {colors} = useTheme();
//   return (
//     <ScrollView style={{backgroundColor: colors.color_PageColor}}>
//       {campaignData.map((campaign, index) => (
//         <Card
//           elevation={0}
//           key={index}
//           style={{
//             margin: 10,
//             backgroundColor: colors.color_CampaignBgColor,
//             padding: 10,
//           }}>
//           <Card.Title
//             title={campaign.brand_name}
//             titleStyle={{
//               fontFamily: FontFamily.bold,
//               color: colors.color_TextNormal,
//             }}
//             subtitle={calculateTimeLeft(campaign.date, campaign.time_limit)}
//             left={props => <LeftContent {...props} campaign={campaign} />}
//           />
//           <Card.Content>
//             <Text
//               variant="titleLarge"
//               style={{
//                 color: colors.color_TextNormal,
//                 fontFamily: FontFamily.semibold,
//               }}>
//               {campaign.brand_guidlines}
//             </Text>
//           </Card.Content>
//           <Card.Actions>
//             <View style={{flexDirection: 'column', width: '100%'}}>
//               <TouchableOpacity
//                 style={{}}
//                 onPress={() => {
//                   setSelectedcampaign(campaign);
//                   imagePick(campaign.campaign_name, profile.userName);
//                 }}>
//                 <LinearGradient
//                   colors={[
//                     'rgba(0,255,255,0.4)',
//                     'rgba(255,192,203,1)',
//                     'rgba(255,255,0,0.5)',
//                   ]}
//                   start={{x: 0, y: 0}}
//                   end={{x: 1, y: 1}}
//                   style={{
//                     // bottom: 25,
//                     padding: 15,
//                     justifyContent: 'center',
//                     borderRadius: 15,
//                   }}>
//                   <Text
//                     style={{
//                       color: 'white',
//                       fontFamily: FontFamily.semibold,
//                       textAlign: 'center',
//                     }}>
//                     Apply Now
//                   </Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={{
//                   marginTop: 10,
//                   backgroundColor: colors.color_CardBtn,
//                   padding: 15,
//                   borderRadius: 15,
//                   width: '100%',
//                   alignSelf: 'center',
//                 }}
//                 onPress={() => navigation.navigate('Details', {campaign})}>
//                 <Text
//                   style={{
//                     color: colors.color_TextNormal,
//                     fontFamily: FontFamily.semibold,
//                     textAlign: 'center',
//                   }}>
//                   Know More
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </Card.Actions>
//         </Card>
//       ))}
//     </ScrollView>
//   );
// };

// export default Campaign;

import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {Avatar, Card} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {config} from '../config';
import moment from 'moment';
import * as ImagePicker from 'react-native-image-picker';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import FontFamily from '../common/components/FontFamily';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Campaign = ({navigation}) => {
  const [profile, setProfile] = React.useState({});
  const {dark, toggleTheme} = useStore();

  const [selectedcampaign, setSelectedcampaign] = useState({});

  const imagePick = useCallback(
    (campaign_name, userName) => {
      const options = {
        selectionLimit: 1,
        mediaType: 'image',
        videoQuality: 'low',
      };
      ImagePicker.launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User Cancelled Image picker');
        } else if (response.error) {
          console.log('Image Picker error:', response.error);
        } else {
          let imageUri = response.uri || response.assets?.[0]?.uri;
          navigation.navigate('Image Preview', {
            imageUri,
            mediaType: 'image',
            campaign_name,
            userName,
          });
        }
      });
    },
    [navigation],
  );
  const [campaignData, setCampaignData] = useState([]);
  const LeftContent = ({campaign}) => (
    <Avatar.Image
      style={{marginLeft: -10}}
      size={50}
      source={{
        uri: `https://marqueberry.com/marqueberrylogofiles/${campaign.Logo}`,
      }}
    />
  );

  const calculateTimeLeft = (releaseDate, timeLimit) => {
    const releaseMoment = moment(releaseDate, 'YYYY-MM-DD');
    const currentDate = moment();
    const totalDays = timeLimit || 0;
    const daysLeft = totalDays - releaseMoment.diff(currentDate, 'days');
    const hoursLeft = releaseMoment.diff(currentDate, 'hours') % 24;
    return `${daysLeft} days ${hoursLeft} hrs`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${config.production}/app/user/campaigndetails`,
        );
        const data = response.data.campaigndetails;

        setCampaignData(data);

        const userString = await AsyncStorage.getItem('user');
        const otherString = await AsyncStorage.getItem('token');

        if (userString && otherString) {
          const parsedUser = JSON.parse(userString, otherString);
          setProfile(parsedUser);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log('campaign data is s', campaignData);

  const truncateText = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  const {colors} = useTheme();
  return (
    <ScrollView style={{backgroundColor: colors.color_PageColor}}>
      {campaignData.map((campaign, index) => (
        <Card
          elevation={0}
          key={index}
          style={{
            margin: 10,
            backgroundColor: colors.color_CampaignBgColor,
            padding: 10,
          }}>
          <Card.Title
            title={campaign.brand_name}
            titleStyle={{
              fontFamily: FontFamily.bold,
              color: colors.color_TextNormal,
            }}
            subtitle={<Text>Live</Text>}
            left={props => <LeftContent {...props} campaign={campaign} />}
          />
          <Card.Content>
            <Text
              variant="titleLarge"
              style={{
                color: colors.color_TextNormal,
                fontFamily: FontFamily.semibold,
              }}>
              {truncateText(campaign.brand_guidlines, 10)}
            </Text>
          </Card.Content>
          <Card.Actions>
            <View style={{flexDirection: 'column', width: '100%'}}>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  setSelectedcampaign(campaign);
                  imagePick(campaign.campaign_name, profile.userName);
                }}>
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
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: colors.color_CardBtn,
                  padding: 15,
                  borderRadius: 15,
                  width: '100%',
                  alignSelf: 'center',
                }}
                onPress={() =>
                  navigation.navigate('CampaignKnowMore', {campaign})
                }>
                <Text
                  style={{
                    color: colors.color_TextNormal,
                    fontFamily: FontFamily.semibold,
                    textAlign: 'center',
                  }}>
                  Know More
                </Text>
              </TouchableOpacity>
            </View>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
};

export default Campaign;
