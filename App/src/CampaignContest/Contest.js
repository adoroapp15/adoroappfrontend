// import React, {useEffect, useState, useCallback} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import {Avatar, Card} from 'react-native-paper';
// import LinearGradient from 'react-native-linear-gradient';
// import axios from 'axios';
// import {config} from '../config';
// import moment from 'moment';
// import * as ImagePicker from 'react-native-image-picker';
// import {useTheme} from '@react-navigation/native';
// import useStore from '../store';
// import FontFamily from '../common/components/FontFamily';
// const avtarImage = require('../assets/User.png');
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Contest = ({navigation}) => {
//   const [profile, setProfile] = React.useState({});
//   const {dark, toggleTheme} = useStore();

//   const [selectedcampaign, setSelectedcampaign] = useState({});

//   const imagePick = (contestName, userName) => {
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
//         navigation.navigate('Contest Preview', {
//           imageUri,
//           mediaType: 'image',
//           contestName,
//           userName,
//         });
//       }
//     });
//   };
//   const [campaignData, setCampaignData] = useState([]);
//   const LeftContent = ({campaign}) => (
//     <Avatar.Image
//       style={{marginLeft: -10}}
//       size={50}
//       source={{
//         uri: `https://adoro-data-storage.s3.ap-south-1.amazonaws.com/Contest/${campaign.fileName}`,
//       }}
//     />
//   );

//   const calculateTimeLeft = (releaseDate, timeLimit) => {
//     const releaseMoment = moment(releaseDate, 'YYYY-MM-DD');
//     const currentDate = moment();
//     const totalDays = timeLimit || 0; // Use timeLimit if available, otherwise default to 0
//     const daysLeft = totalDays - releaseMoment.diff(currentDate, 'days');
//     const hoursLeft = releaseMoment.diff(currentDate, 'hours') % 24;
//     return `${daysLeft} days ${hoursLeft} hrs`;
//   };

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         `${config.production}/app/user/getallcontest`,
//   //       );
//   //       const data = response.data.contest;
//   //       setCampaignData(data);

//   //       const userString = await AsyncStorage.getItem('user');
//   //       const otherString = await AsyncStorage.getItem('token');

//   //       if (userString && otherString) {
//   //         const parsedUser = JSON.parse(userString, otherString);
//   //         setProfile(parsedUser);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching data:', error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `${config.production}/app/user/getallcontest`,
//         );

//         // Ensure data structure is correct
//         const data = response.data.contest || []; // Safeguard in case contest is undefined or not an array
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
//   const truncateText = (text, limit) => {
//     const words = text.split(' ');
//     if (words.length > limit) {
//       return words.slice(0, limit).join(' ') + '...';
//     }
//     return text;
//   };

//   const {colors} = useTheme();
//   return (
//     // <ScrollView style={{backgroundColor: colors.color_PageColor}}>
//     //   {campaignData.map((campaign, index) => (
//     //     <Card
//     //       elevation={0}
//     //       key={index}
//     //       style={{
//     //         margin: 10,
//     //         backgroundColor: colors.color_CampaignBgColor,
//     //         padding: 10,
//     //       }}>
//     //       <Card.Title
//     //         title={campaign.contestName}
//     //         titleStyle={{
//     //           fontFamily: FontFamily.bold,
//     //           color: colors.color_TextNormal,
//     //         }}
//     //         subtitle={<Text>Live</Text>}
//     //         left={props => <LeftContent {...props} campaign={campaign} />}
//     //       />
//     //       <Card.Content>
//     //         <Text
//     //           variant="titleLarge"
//     //           style={{
//     //             color: colors.color_TextNormal,
//     //             fontFamily: FontFamily.semibold,
//     //           }}>
//     //           {truncateText(campaign.Description, 10)}
//     //         </Text>
//     //       </Card.Content>
//     //       {/* Other card content goes here */}
//     //       <Card.Actions>
//     //         {/* Apply Now button */}
//     //         <View style={{flexDirection: 'column', width: '100%'}}>
//     //           <TouchableOpacity
//     //             style={{}}
//     //             onPress={() => {
//     //               setSelectedcampaign(campaign);
//     //               imagePick(campaign.contestName, profile.userName);
//     //             }}>
//     //             <LinearGradient
//     //               colors={[
//     //                 'rgba(0,255,255,0.4)',
//     //                 'rgba(255,192,203,1)',
//     //                 'rgba(255,255,0,0.5)',
//     //               ]}
//     //               start={{x: 0, y: 0}}
//     //               end={{x: 1, y: 1}}
//     //               style={{
//     //                 // bottom: 25,
//     //                 padding: 15,
//     //                 justifyContent: 'center',
//     //                 borderRadius: 15,
//     //               }}>
//     //               <Text
//     //                 style={{
//     //                   color: 'white',
//     //                   fontFamily: FontFamily.semibold,
//     //                   textAlign: 'center',
//     //                 }}>
//     //                 Apply Now
//     //               </Text>
//     //             </LinearGradient>
//     //           </TouchableOpacity>
//     //           <TouchableOpacity
//     //             style={{
//     //               marginTop: 10,
//     //               backgroundColor: colors.color_CardBtn,
//     //               padding: 15,
//     //               borderRadius: 15,
//     //               width: '100%',
//     //               alignSelf: 'center',
//     //             }}
//     //             onPress={() =>
//     //               navigation.navigate('ContestKnowMore', {campaign})
//     //             }>
//     //             <Text
//     //               style={{
//     //                 color: colors.color_TextNormal,
//     //                 fontFamily: FontFamily.semibold,
//     //                 textAlign: 'center',
//     //               }}>
//     //               Know More
//     //             </Text>
//     //           </TouchableOpacity>
//     //         </View>
//     //       </Card.Actions>
//     //     </Card>
//     //   ))}
//     // </ScrollView>
//     <ScrollView style={{flexGrow: 1, backgroundColor: colors.color_PageColor}}>
//       {Array.isArray(campaignData) && campaignData.length > 0 ? (
//         campaignData.map((campaign, index) => (
//           <Card
//             elevation={0}
//             key={index}
//             style={{
//               margin: 10,
//               backgroundColor: colors.color_CampaignBgColor,
//               padding: 10,
//             }}>
//             <Card.Title
//               title={campaign.contestName}
//               titleStyle={{
//                 fontFamily: FontFamily.bold,
//                 color: colors.color_TextNormal,
//               }}
//               subtitle={<Text>Live</Text>}
//               left={props => <LeftContent {...props} campaign={campaign} />}
//             />
//             <Card.Content>
//               <Text
//                 variant="titleLarge"
//                 style={{
//                   color: colors.color_TextNormal,
//                   fontFamily: FontFamily.semibold,
//                 }}>
//                 {truncateText(campaign.Description, 10)}
//               </Text>
//             </Card.Content>
//             {/* Other card content goes here */}
//             <Card.Actions>
//               {/* Apply Now button */}
//               <View style={{flexDirection: 'column', width: '100%'}}>
//                 <TouchableOpacity
//                   style={{}}
//                   onPress={() => {
//                     setSelectedcampaign(campaign);
//                     imagePick(campaign.contestName, profile.userName);
//                   }}>
//                   <LinearGradient
//                     colors={[
//                       'rgba(0,255,255,0.4)',
//                       'rgba(255,192,203,1)',
//                       'rgba(255,255,0,0.5)',
//                     ]}
//                     start={{x: 0, y: 0}}
//                     end={{x: 1, y: 1}}
//                     style={{
//                       // bottom: 25,
//                       padding: 15,
//                       justifyContent: 'center',
//                       borderRadius: 15,
//                     }}>
//                     <Text
//                       style={{
//                         color: 'white',
//                         fontFamily: FontFamily.semibold,
//                         textAlign: 'center',
//                       }}>
//                       Apply Now
//                     </Text>
//                   </LinearGradient>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={{
//                     marginTop: 10,
//                     backgroundColor: colors.color_CardBtn,
//                     padding: 15,
//                     borderRadius: 15,
//                     width: '100%',
//                     alignSelf: 'center',
//                   }}
//                   onPress={() =>
//                     navigation.navigate('ContestKnowMore', {campaign})
//                   }>
//                   <Text
//                     style={{
//                       color: colors.color_TextNormal,
//                       fontFamily: FontFamily.semibold,
//                       textAlign: 'center',
//                     }}>
//                     Know More
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </Card.Actions>
//           </Card>
//         ))
//       ) : (
//         <Text
//           style={{
//             flex: 1,
//             fontSize: 16,
//             fontFamily: FontFamily.semibold,
//             color: colors.color_TextNormal,
//             textAlignVertical: 'center',
//             alignSelf: 'center',
//           }}>
//           No contest available
//         </Text>
//       )}
//     </ScrollView>
//   );
// };

// export default Contest;

// const styles = StyleSheet.create({
//   Title: {
//     fontWeight: 'bold',
//   },
//   cardBox: {
//     margin: 10,
//     backgroundColor: '#fff',
//     padding: 10,
//   },
//   know: {
//     marginTop: 10,
//     backgroundColor: '#F8F9FA',
//     padding: 15,
//     borderRadius: 15,
//     width: '100%',
//     alignSelf: 'center',
//   },
// });

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Card} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {config} from '../config';
import moment from 'moment';
import * as ImagePicker from 'react-native-image-picker';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import FontFamily from '../common/components/FontFamily';
const avtarImage = require('../assets/User.png');
import AsyncStorage from '@react-native-async-storage/async-storage';

const Contest = ({navigation}) => {
  const [profile, setProfile] = useState({});
  const {dark, toggleTheme} = useStore();
  const [selectedcampaign, setSelectedcampaign] = useState({});
  const [campaignData, setCampaignData] = useState([]);
  const {colors} = useTheme();

  const imagePick = (contestName, userName, mobileNo) => {
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
        navigation.navigate('Contest Preview', {
          imageUri,
          mediaType: 'image',
          contestName,
          mobileNo,
          userName,
          mediaOption: 'image',
        });
      }
    });
  };

  const LeftContent = ({campaign}) => (
    <Avatar.Image
      style={{marginLeft: -10}}
      size={50}
      source={{
        uri: `https://adoro-data-storage.s3.ap-south-1.amazonaws.com/Contest/${campaign.fileName}`,
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
          `${config.production}/app/user/getallcontest`,
        );
        const data = response.data.contest || [];
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

  const truncateText = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer(colors)}>
      {Array.isArray(campaignData) && campaignData.length > 0 ? (
        campaignData.map((campaign, index) => (
          <Card elevation={0} key={index} style={styles.cardContainer(colors)}>
            <Card.Title
              title={campaign.contestName}
              titleStyle={styles.cardTitle(colors)}
              subtitle={<Text>Live</Text>}
              left={props => <LeftContent {...props} campaign={campaign} />}
            />
            <Card.Content>
              <Text style={styles.cardContentText(colors)}>
                {truncateText(campaign.Description, 10)}
              </Text>
            </Card.Content>
            <Card.Actions>
              <View style={styles.cardActionsContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedcampaign(campaign);
                    imagePick(campaign.contestName, profile.userName, profile.mobileNo);
                  }}>
                  <LinearGradient
                    colors={[
                      'rgba(0,255,255,0.4)',
                      'rgba(255,192,203,1)',
                      'rgba(255,255,0,0.5)',
                    ]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.gradientButton}>
                    <Text style={styles.gradientButtonText}>Apply Now</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.knowMoreButton(colors)}
                  onPress={() =>
                    navigation.navigate('ContestKnowMore', {campaign})
                  }>
                  <Text style={styles.knowMoreButtonText(colors)}>
                    Know More
                  </Text>
                </TouchableOpacity>
              </View>
            </Card.Actions>
          </Card>
        ))
      ) : (
        <View style={styles.noContestContainer}>
          <Text style={styles.noContestText(colors)}>No contest available</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Contest;

const styles = StyleSheet.create({
  scrollViewContainer: colors => ({
    flexGrow: 1,
    backgroundColor: colors.color_PageColor,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  cardContainer: colors => ({
    margin: 10,
    backgroundColor: colors.color_CampaignBgColor,
    padding: 10,
    width: '90%',
  }),
  cardTitle: colors => ({
    fontFamily: FontFamily.bold,
    color: colors.color_TextNormal,
  }),
  cardContentText: colors => ({
    color: colors.color_TextNormal,
    fontFamily: FontFamily.semibold,
  }),
  cardActionsContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  gradientButton: {
    padding: 15,
    justifyContent: 'center',
    borderRadius: 15,
  },
  gradientButtonText: {
    color: 'white',
    fontFamily: FontFamily.semibold,
    textAlign: 'center',
  },
  knowMoreButton: colors => ({
    marginTop: 10,
    backgroundColor: colors.color_CardBtn,
    padding: 15,
    borderRadius: 15,
    width: '100%',
    alignSelf: 'center',
  }),
  knowMoreButtonText: colors => ({
    color: colors.color_TextNormal,
    fontFamily: FontFamily.semibold,
    textAlign: 'center',
  }),
  noContestContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  noContestText: colors => ({
    fontSize: 16,
    fontFamily: FontFamily.semibold,
    color: colors.color_TextNormal,
  }),
});
