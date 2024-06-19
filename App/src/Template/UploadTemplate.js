// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   Modal,
//   FlatList,
//   ScrollView,
//   Alert,
//   Dimensions,
// } from 'react-native';
// import React, {useCallback} from 'react';
// import RNFS from 'react-native-fs';
// import ImagePicker from 'react-native-image-crop-picker';
// import {useFocusEffect} from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import {config} from '../config';
// import PlusIcon from '../assets/svg/PlusIcon';
// import FontFamily from '../common/components/FontFamily';
// import BackArrow from '../assets/svg/BackArrow';
// import {useTheme} from '@react-navigation/native';
// import useStore from '../store';
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// const windowWidth1 = Dimensions.get('screen').width;
// const windowHeight1 = Dimensions.get('screen').height;
// const UploadTemplate = ({navigation}) => {
//   const {colors} = useTheme();
//   const {dark, toggleTheme} = useStore();

//   const [profile, setProfile] = React.useState(null);
//   const [selectedpost, setSelectedpost] = React.useState({});
//   const [category, setCategory] = React.useState(null);
//   const [showDropdown, setShowDropdown] = React.useState(false);
//   const [dimensions, setDimensions] = React.useState({width: 0, height: 0});
//   const [caption, setCaption] = React.useState('');
//   useFocusEffect(
//     React.useCallback(() => {
//       // Clear image selection and other data when component gains focus
//       setProfile(null);
//       setCategory(null);
//       setCaption('');
//       setSelectedpost({});
//       setShowDropdown(false);
//     }, []),
//   );

//   const handleuploadtemplate = async () => {
//     const userString = await AsyncStorage.getItem('user');
//     const otherString = await AsyncStorage.getItem('token');

//     const parsedUser = JSON.parse(userString, otherString);
//     console.log('imageee isss', profile, profile.uri, profile.type);
//     const formdata = new FormData();
//     formdata.append('file', {
//       uri: selectedpost.uri,
//       type: selectedpost.type,
//       name: selectedpost.fileName,
//     });
//     formdata.append('caption', caption);
//     formdata.append('category', category);
//     formdata.append('userName', parsedUser.userName);
//     console.log(
//       'form  dataaaaaaa is',
//       formdata,
//       `${config.production}/app/user/uploadtemplate`,
//     );
//     const res = await axios.post(
//       `${config.production}/app/user/uploadtemplate`,
//       formdata,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       },
//     );
//     console.log(res, 'ressws iss');
//     if (res.status === 200) {
//       console.log('Uploaded Successfully');
//       Alert.alert('Uploaded Successfully')
//     } else {
//       console.log('Faing Error While Uploading the Templates');
//       Alert.alert('Faing Error While Uploading the Templates');

//     }
//   };
//   const getImageSize = url => {
//     try {
//       Image.getSize(url, (width, height) => {
//         const aspectRatio = width / height;
//         const imageHeight = windowWidth1 / aspectRatio;
//         setDimensions({width: windowWidth1, height: imageHeight});
//         console.log(
//           'Image dimensions:',
//           width,
//           height,
//           url,
//           windowWidth1,
//           imageHeight,
//         );
//       });
//     } catch (error) {
//       console.error('Error getting image size:', error);
//     }
//   };
//   React.useEffect(() => {
//     // getImageSize(profile);
//     console.log('Updated dimensions:', dimensions.width, dimensions.height);
//   }, [dimensions]);

//   const imagePick = useCallback(() => {
//     ImagePicker.openPicker({
//       // width: 400,
//       // height: 500,
//       cropping: true,
//       cropperActiveWidgetColor: '#4286BC',
//       cropperToolbarColor: colors.color_TabBarColor,
//       cropperToolbarWidgetColor: colors.color_CropTxtWidget,
//       // freeStyleCropEnabled: true,
//       //showCropGuidelines:true,
//     })
//       // .then((async image )
//       //   {

//       //   console.log('imGeeeeee uriiiiiiiiiiii')

//       //   if (!image) {
//       //     console.log('User Cancelled Image picker');
//       //     return;
//       //   }
//       //   if (image==null ){
//       //     console.log('image uri is nulll');
//       //   }
//       //   else{
//       //     console.log('imGeeeeee uriiiiiiiiiiii');
//       //   }

//       //   const imageUri = image.path;

//       //   if (imageUri==null){
//       //     console.log('image uri is nulll')
//       //   }
//       //   else{
//       //     console.log('imGeeeeee uriiiiiiiiiiii',imageUri)
//       //   }
//       //   try {
//       //     const imageSize = await RNFS.stat(imageUri).then(
//       //       fileStat => fileStat.size,
//       //     );

//       //     if (imageSize > 10000000) {
//       //       Alert.alert(
//       //         'Image size exceeds the limit (10MB). Please choose a smaller image.',
//       //       );
//       //       return;
//       //     }

//       //     setProfile(imageUri);
//       //     getImageSize(imageUri);

//       //     console.log('profileeeeeeeeee imggggg',imageUri,image)
//       //     setSelectedpost({
//       //       uri: imageUri,
//       //       type: image.mime,
//       //       fileName: 'abxcgg',
//       //     });
//       //     setVisible(false);
//       //   } catch (error) {
//       //     console.log('Error while validating image size:', error);
//       //     // Handle error gracefully, such as displaying an error message to the user
//       //   }
//       // })
//       .then(async image => {
//         if (!image) {
//           console.log('User Cancelled Image picker');
//           return;
//         }

//         const imageUri = image.path;
//         try {
//           const imageSize = await RNFS.stat(imageUri).then(
//             fileStat => fileStat.size,
//           );

//           if (imageSize > 10000000) {
//             Alert.alert(
//               'Image size exceeds the limit (10MB). Please choose a smaller image.',
//             );
//             return;
//           }
//           getImageSize(imageUri);
//           setProfile(imageUri);
//           console.log('profileeeeeeeeee imggggg', imageUri, image);
//           setSelectedpost({
//             uri: imageUri,
//             type: image.mime,
//             fileName: 'abxcgg',
//           });
//           // setVisible(false);
//         } catch (error) {
//           console.log('Error while validating image size:', error);
//         }
//       })
//       .catch(error => {
//         console.log('Image Picker error:', error);
//         // Handle error gracefully, such as displaying an error message to the user
//       });
//   }, []);

//   const categories = [
//     {id: 1, name: 'Standard'},
//     {id: 2, name: 'Licensed'},
//   ];

//   const handleCategorySelect = item => {
//     setCategory(item.name);
//     setShowDropdown(false);
//   };

//   console.log('freeeeeeeeeee', profile);

//   return (
//     <View style={{backgroundColor: colors.color_PageColor, height: '100%'}}>
//       <View
//         style={{
//           flexDirection: 'row',
//           backgroundColor: colors.color_TabBarColor,
//           height: 56,
//         }}>
//         <TouchableOpacity
//           style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
//           onPress={() => navigation.push('Template')}>
//           <BackArrow color={colors.arrow} />
//         </TouchableOpacity>
//         <Text
//           style={{
//             color: colors.color_TextNormal,
//             fontFamily: FontFamily.semibold,
//             alignSelf: 'center',
//             fontSize: 20,
//           }}>
//           Upload Template
//         </Text>
//       </View>
//       <ScrollView contentContainerStyle={{flexGrow: 1}}>
//         {profile && (
//                     <Image
//                       style={{
//                         width: dimensions.width || windowWidth,
//                         height: dimensions.height || 300,
//                         alignSelf: 'center',
//                       }}
//                       source={profile ? {uri: profile} : null}
//                     />
//                   )}

//           {!profile && (
//             <TouchableOpacity onPress={imagePick}>
//               {/* <View
//               style={{
//                 width: '80%',
//                 marginTop: 20,
//                 height: 200,
//                 alignSelf: 'center',
//                 alignItems: 'center',
//                 borderRadius: 15,
//                 backgroundColor: '#F0F0F0',
//                 borderWidth: 2,
//                 borderColor: '#818181',
//                 justifyContent: 'center',
//               }}>
//               <PlusIcon />
//               <Text
//                 style={{
//                   fontFamily: FontFamily.semibold,
//                   marginTop: 10,
//                   textAlignVertical: 'center',
//                   color: '#818181',
//                 }}>
//                 Click here to upload
//               </Text>
//             </View> */}
//               <View
//                 style={{
//                   width: '80%',
//                   height: 200,
//                   marginTop: 20,
//                   alignSelf: 'center',
//                   alignItems: 'center',
//                   borderRadius: 15,
//                   backgroundColor: colors.color_CardBgColor,
//                   borderWidth: 2,
//                   borderColor: colors.color_BorderColor,
//                   justifyContent: 'center',
//                 }}>
//                 <PlusIcon color={colors.color_CardIcon} />
//                 <Text
//                   style={{
//                     marginTop: 20,
//                     fontFamily: FontFamily.semibold,
//                     textAlignVertical: 'center',
//                     color: colors.color_CardTxtColor,
//                   }}>
//                   Click here to upload
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           )}
//           <TextInput
//             style={{
//               color: colors.color_TextNormal,
//               fontSize: 16,
//               //border: '1px',
//               // borderColor: '#F1F1F1',
//               marginTop: 20,
//               marginLeft: 20,
//               marginRight: 20,
//               marginBottom: 5,

//               // bottom: 20,
//               fontWeight: '800',
//               lineHeight: 20.8,
//               paddingLeft: 10,
//             }}
//             onChangeText={text => setCaption(text)}
//             placeholder="Write a writtiest caption"
//             placeholderTextColor={colors.color_PlaceHolderColor}

//             // underlineColorAndroid="black"
//           />
//           <View
//             style={{
//               width: '90%',
//               height: 1.5,
//               alignSelf: 'center',
//               backgroundColor: colors.color_PlaceHolderColor,
//               marginBottom: 20,
//             }}
//           />
//           <View style={{gap:5, marginBottom:20}}>
//             <TouchableOpacity
//               onPress={() => setShowDropdown(true)}
//               style={{alignSelf: 'center', width: '85%'}}>
//               <LinearGradient
//                 colors={[
//                   'rgba(0,255,255,0.4)',
//                   'rgba(255,192,203,1)',
//                   'rgba(255,255,0,0.5)',
//                 ]}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 1}}
//                 style={{padding: 15, alignItems: 'center', borderRadius: 15}}>
//                 <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
//                   {category ? category : 'Choose Category'}
//                 </Text>
//               </LinearGradient>
//             </TouchableOpacity>

//             <Modal
//               visible={showDropdown}
//               transparent={true}
//               onRequestClose={() => setShowDropdown(false)}>
//               <View style={styles.modalContainer}>
//                 <View
//                   style={{
//                     backgroundColor: colors.color_CardBgColor,
//                     padding: 20,
//                     borderRadius: 10,
//                     width: '80%',
//                     maxHeight: '70%',
//                   }}>
//                   <FlatList
//                     data={categories}
//                     renderItem={({item}) => (
//                       <TouchableOpacity
//                         style={styles.dropdownItem}
//                         onPress={() => handleCategorySelect(item)}>
//                         <LinearGradient
//                           colors={[
//                             'rgba(0,255,255,0.4)',
//                             'rgba(255,192,203,1)',
//                             'rgba(255,255,0,0.5)',
//                           ]}
//                           start={{x: 0, y: 0}}
//                           end={{x: 1, y: 1}}
//                           style={{
//                             padding: 15,
//                             alignItems: 'center',
//                             borderRadius: 15,
//                           }}>
//                           <Text
//                             style={{
//                               color: 'white',
//                               fontFamily: FontFamily.semibold,

//                               fontSize: 16,
//                             }}>
//                             {item.name}
//                           </Text>
//                         </LinearGradient>
//                       </TouchableOpacity>
//                     )}
//                     keyExtractor={item => item.id.toString()}
//                   />
//                 </View>
//               </View>
//             </Modal>
//             <TouchableOpacity
//             style={{alignSelf: 'center', width: '85%'}}
//             onPress={handleuploadtemplate}>
//             <LinearGradient
//               colors={[
//                 'rgba(0,255,255,0.4)',
//                 'rgba(255,192,203,1)',
//                 'rgba(255,255,0,0.5)',
//               ]}
//               start={{x: 0, y: 0}}
//               end={{x: 1, y: 1}}
//               style={{padding: 15, alignItems: 'center', borderRadius: 15}}>
//               <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
//                 Upload Meme Template
//               </Text>
//             </LinearGradient>
//           </TouchableOpacity>
//           </View>
          
//       </ScrollView>
//     </View>
//   );
// };

// export default UploadTemplate;

// const styles = StyleSheet.create({
//   input: {
//     color: 'black',
//     fontSize: 16,
//     border: '1px',
//     borderColor: '#F1F1F1',
//     marginTop: 20,
//     marginLeft: 20,
//     marginRight: 20,
//     marginBottom: 5,

//     // bottom: 20,
//     fontWeight: '800',
//     lineHeight: 20.8,
//     paddingLeft: 10,
//   },
//   selectedImage: {
//     height: '64%',
//     width: '70%',
//     top: 40,
//     alignSelf: 'center',
//     marginBottom: 60,
//   },
//   imagePickerContainer: {
//     marginBottom: 20,
//   },
//   imagePicker: {
//     height: '64%',
//     width: '70%',
//     top: 40,
//     alignSelf: 'center',
//   },
//   dropdownButton: {
//     alignSelf: 'center',
//     borderWidth: 1,
//     borderColor: '#F1F1F1',
//     padding: 15,
//     marginTop: 10,
//     borderRadius: 15,
//   },
//   dropdownButtonText: {
//     color: 'black',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     width: '80%',
//     maxHeight: '70%',
//   },
//   dropdownItem: {
//     padding: 10,
//     // borderBottomWidth: 1,
//     // borderBottomColor: '#ccc',
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-crop-picker';
import {useFocusEffect} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {config} from '../config';
import PlusIcon from '../assets/svg/PlusIcon';
import FontFamily from '../common/components/FontFamily';
import BackArrow from '../assets/svg/BackArrow';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import CheckBox from '@react-native-community/checkbox';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowWidth1 = Dimensions.get('screen').width;
const windowHeight1 = Dimensions.get('screen').height;

const UploadTemplate = ({navigation}) => {
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();

  const [profile, setProfile] = useState(null);
  const [selectedpost, setSelectedpost] = useState({});
  const [category, setCategory] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  const [caption, setCaption] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  
  useFocusEffect(
    useCallback(() => {
      // Clear image selection and other data when component gains focus
      setProfile(null);
      setCategory(null);
      setCaption('');
      setSelectedpost({});
      setShowDropdown(false);
    }, []),
  );

  const handleuploadtemplate = async () => {
    const userString = await AsyncStorage.getItem('user');
    const otherString = await AsyncStorage.getItem('token');

    const parsedUser = JSON.parse(userString, otherString);
    console.log('imageee isss', profile, profile.uri, profile.type);
    const formdata = new FormData();
    formdata.append('file', {
      uri: selectedpost.uri,
      type: selectedpost.type,
      name: selectedpost.fileName,
    });
    formdata.append('caption', caption);
    formdata.append('category', category);
    formdata.append('userName', parsedUser.userName);
    console.log(
      'form  dataaaaaaa is',
      formdata,
      `${config.production}/app/user/uploadtemplate`,
    );
    const res = await axios.post(
      `${config.production}/app/user/uploadtemplate`,
      formdata,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log(res, 'ressws iss');
    if (res.status === 200) {
      console.log('Uploaded Successfully');
      Alert.alert('Uploaded Successfully')
    } else {
      console.log('Faing Error While Uploading the Templates');
      Alert.alert('Faing Error While Uploading the Templates');

    }
  };
  const getImageSize = url => {
    try {
      Image.getSize(url, (width, height) => {
        const aspectRatio = width / height;
        const imageHeight = windowWidth1 / aspectRatio;
        setDimensions({width: windowWidth1, height: imageHeight});
        console.log(
          'Image dimensions:',
          width,
          height,
          url,
          windowWidth1,
          imageHeight,
        );
      });
    } catch (error) {
      console.error('Error getting image size:', error);
    }
  };
  useEffect(() => {
    // getImageSize(profile);
    console.log('Updated dimensions:', dimensions.width, dimensions.height);
  }, [dimensions]);

  const imagePick = useCallback(() => {
    ImagePicker.openPicker({
      cropping: true,
      cropperActiveWidgetColor: '#4286BC',
      cropperToolbarColor: colors.color_TabBarColor,
      cropperToolbarWidgetColor: colors.color_CropTxtWidget,
    })
      .then(async image => {
        if (!image) {
          console.log('User Cancelled Image picker');
          return;
        }

        const imageUri = image.path;
        try {
          const imageSize = await RNFS.stat(imageUri).then(
            fileStat => fileStat.size,
          );

          if (imageSize > 10000000) {
            Alert.alert(
              'Image size exceeds the limit (10MB). Please choose a smaller image.',
            );
            return;
          }
          getImageSize(imageUri);
          setProfile(imageUri);
          console.log('profileeeeeeeeee imggggg', imageUri, image);
          setSelectedpost({
            uri: imageUri,
            type: image.mime,
            fileName: 'abxcgg',
          });
        } catch (error) {
          console.log('Error while validating image size:', error);
        }
      })
      .catch(error => {
        console.log('Image Picker error:', error);
      });
  }, []);

  const categories = [
    {id: 1, name: 'Standard'},
    {id: 2, name: 'Licensed'},
  ];

  const handleCategorySelect = item => {
    setCategory(item.name);
    setShowDropdown(false);
    if (item.name === 'Licensed') {
      setShowTermsModal(true);
    } else {
      setShowTermsModal(false);
    }
  };

  const handleTermsAndConditions = () => {
    if (!termsAccepted || !privacyAccepted) {
      Alert.alert("Please accept the terms and conditions and privacy policy to continue.");
      return;
    }
    setShowTermsModal(false);
    handleuploadtemplate();
  };

  console.log('freeeeeeeeeee', profile);

  return (
    <View style={{backgroundColor: colors.color_PageColor, height: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.color_TabBarColor,
          height: 56,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => navigation.push('Template')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: 20,
          }}>
          Upload Template
        </Text>
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {profile && (
          <Image
            style={{
              width: dimensions.width || windowWidth,
              height: dimensions.height || 300,
              alignSelf: 'center',
            }}
            source={profile ? {uri: profile} : null}
          />
        )}

        {!profile && (
          <TouchableOpacity onPress={imagePick}>
            <View
              style={{
                width: '80%',
                height: 200,
                marginTop: 20,
                alignSelf: 'center',
                alignItems: 'center',
                borderRadius: 15,
                backgroundColor: colors.color_CardBgColor,
                borderWidth: 2,
                borderColor: colors.color_BorderColor,
                justifyContent: 'center',
              }}>
              <PlusIcon color={colors.color_CardIcon} />
              <Text
                style={{
                  marginTop: 20,
                  fontFamily: FontFamily.semibold,
                  textAlignVertical: 'center',
                  color: colors.color_CardTxtColor,
                }}>
                Click here to upload
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <TextInput
          style={{
            color: colors.color_TextNormal,
            fontSize: 16,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 5,
            fontWeight: '800',
            lineHeight: 20.8,
            paddingLeft: 10,
          }}
          onChangeText={text => setCaption(text)}
          placeholder="Write a witty caption"
          placeholderTextColor={colors.color_PlaceHolderColor}
        />
        <View
          style={{
            width: '90%',
            height: 1.5,
            alignSelf: 'center',
            backgroundColor: colors.color_PlaceHolderColor,
            marginBottom: 20,
          }}
        />
        <View style={{alignSelf: 'center', width: '85%', marginBottom: 20}}>
          <TouchableOpacity
            onPress={() => setShowDropdown(true)}
            style={{marginBottom: 20}}>
            <LinearGradient
              colors={[
                'rgba(0,255,255,0.4)',
                'rgba(255,192,203,1)',
                'rgba(255,255,0,0.5)',
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={{padding: 15, alignItems: 'center', borderRadius: 15}}>
              <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
                {category ? category : 'Choose Category'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <Modal
            visible={showDropdown}
            transparent={true}
            onRequestClose={() => setShowDropdown(false)}>
            <View style={styles.modalContainer}>
              <View
                style={{
                  backgroundColor: colors.color_CardBgColor,
                  padding: 20,
                  borderRadius: 10,
                  width: '80%',
                  maxHeight: '70%',
                }}>
                <FlatList
                  data={categories}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => handleCategorySelect(item)}>
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
                          alignItems: 'center',
                          borderRadius: 15,
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontFamily: FontFamily.semibold,
                            fontSize: 16,
                          }}>
                          {item.name}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.id.toString()}
                />
              </View>
            </View>
          </Modal>
          
          <TouchableOpacity
            style={{alignSelf: 'center', width: '85%'}}
            onPress={() => {
              if (category === 'Licensed') {
                setShowTermsModal(true);
              } else {
                handleuploadtemplate();
              }
            }}>
            <LinearGradient
              colors={[
                'rgba(0,255,255,0.4)',
                'rgba(255,192,203,1)',
                'rgba(255,255,0,0.5)',
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={{padding: 15, alignItems: 'center', borderRadius: 15}}>
              <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
                Upload Meme Template
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Modal
          visible={showTermsModal}
          transparent={true}
          onRequestClose={() => setShowTermsModal(false)}>
          <View style={styles.modalContainer}>
            <View
              style={{
                backgroundColor: colors.color_CardBgColor,
                padding: 20,
                borderRadius: 10,
                width: '90%',
                maxHeight: '70%',
              }}>
              <ScrollView>
                <Text style={{color: colors.color_TextNormal, marginBottom: 20, fontSize: 16}}>
                Intellectual Property Ownership Declaration
                </Text>
                <Text style={{color: colors.color_TextNormal, marginBottom: 20, fontSize: 16}}>
                Effective Date: 1 July 2024 {'\n'}

1. Definitions {'\n'}

For the purposes of this declaration, the following terms shall have the meanings set forth below:{'\n'}
- "Platform" refers to Adoro.{'\n'}
- "User" refers to any individual or entity that registers, accesses, or uses the Platform.{'\n'}
- "Content" refers to any and all images, graphics, photos, or other materials uploaded by the User to the Platform.{'\n'}

2. User's Ownership of Content {'\n'}

The User hereby declares, warrants, and represents that:{'\n'}

1. The User is the sole and exclusive owner of the intellectual property rights in and to the Content, or the User has obtained all necessary rights, licenses, consents, and permissions to use, upload, and distribute the Content on the Platform.{'\n'}

2. The Content does not infringe upon, misappropriate, or violate any intellectual property rights or other proprietary rights of any third party, including but not limited to copyright, trademark, patent, trade secret, privacy rights, or publicity rights.{'\n'}

3. The User retains all rights, title, and interest in and to the Content, including but not limited to copyright and other intellectual property rights.{'\n'}

3. License Grant to Platform {'\n'}

By uploading Content to the Platform, the User grants Adoro a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform the Content in connection with the operation of the Platform and Adoro's business, including without limitation for promoting and redistributing part or all of the Platform (and derivative works thereof) in any media formats and through any media channels.{'\n'}

4. Representations and Warranties {'\n'}

The User represents and warrants that:{'\n'}

1. The User has full authority to enter into this declaration and to grant the rights granted herein.{'\n'}
2. The Content complies with all applicable laws, rules, and regulations.{'\n'}
3. The Content is not subject to any third-party claims, liens, or encumbrances.{'\n'}

5. Indemnification {'\n'}

The User agrees to indemnify, defend, and hold harmless Adoro, its affiliates, officers, directors, employees, agents, and licensors from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from or relating to: {'\n'}

1. The User's breach of any representation, warranty, or obligation under this declaration. {'\n'}
2. The User's violation of any intellectual property rights or other proprietary rights of any third party. {'\n'}
3. The User's use of the Platform in violation of any applicable laws, rules, or regulations. {'\n'}

6. Governing Law {'\n'}

This declaration shall be governed by and construed in accordance with the laws of Gurugram, without regard to its conflict of law principles.{'\n'}

7. Entire Agreement {'\n'}

This declaration constitutes the entire agreement between the User and Adoro regarding the subject matter hereof and supersedes all prior and contemporaneous understandings, agreements, representations, and warranties, whether written or oral, regarding such subject matter. {'\n'}

8. Amendments {'\n'}

Adoro reserves the right to amend this declaration at any time. The User will be notified of any such amendments, and continued use of the Platform after such notification constitutes acceptance of the amended terms.{'\n'}

IN WITNESS WHEREOF, the User has executed this Intellectual Property Ownership Declaration as of the Effective Date.{'\n'}

                </Text>
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    value={termsAccepted}
                    onValueChange={setTermsAccepted}
                    tintColors={{ true: colors.color_TabBarColor, false: colors.color_PlaceHolderColor }}
                  />
                  <Text style={{color: colors.color_TextNormal, fontSize: 16}}>By signing this declaration, the User acknowledges that they have read, understood, and agree to be bound by its terms and conditions.</Text>
                </View>
                <TouchableOpacity
                  disabled={!termsAccepted || !privacyAccepted}
                  onPress={handleTermsAndConditions}
                  style={{
                    alignSelf: 'center',
                    marginTop: 20,
                    opacity: termsAccepted && privacyAccepted ? 1 : 0.5,
                  }}>
                  <LinearGradient
                    colors={[
                      'rgba(0,255,255,0.4)',
                      'rgba(255,192,203,1)',
                      'rgba(255,255,0,0.5)',
                    ]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={{padding: 15, alignItems: 'center', borderRadius: 15}}>
                    <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
                      Submit
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default UploadTemplate;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dropdownItem: {
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
});
