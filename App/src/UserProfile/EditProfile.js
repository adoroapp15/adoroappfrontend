import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {config} from '../config';
import DropDownPicker from 'react-native-dropdown-picker';
import MaleIcon from '../assets/svg/MaleIcon';
import MaleIconFill from '../assets/svg/MaleIconFill';
import WomenIcon from '../assets/svg/WomenIcon';
import PencilIcon from '../assets/svg/PencilIcon';
import FontFamily from '../common/components/FontFamily';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import Size from '../common/components/Size';
import BackArrow from '../assets/svg/BackArrow';
import PencilIcon1 from '../assets/svg/PencilIcon1';
const EditProfile = ({route, navigation}) => {
  const user = route.params;
  const {dark, toggleTheme} = useStore();
  const {colors} = useTheme();

  const mobileNo = route.params.mobileNo;
  const [profile, setProfile] = useState(null);
  const [selectedGender, setSelectedGender] = useState('');
  const [updatedUser, setUpdatedUser] = useState({
    fullName: '',
    userName: '',
    Email: '',
    bankName: '',
    benificiaryName: '',
    accountNo: '',
    ifscCode: '',
    mobileNo: '',
  });

  const genderOptions = [
    {
      label: 'Male',
      value: 'Male',
      icon: () => <MaleIcon color={colors.color_TextNormal} />,
    },
    {
      label: 'Female',
      value: 'Female',
      icon: () => <WomenIcon color={colors.color_TextNormal} />,
    },
  ];

  const [showGenderModal, setShowGenderModal] = useState(false);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await axios.get(
          `${config.production}/app/user/userdetails`,
          {
            params: {mobileNo},
          },
        );

        if (response.data.status === 200) {
          setProfile(response.data.data.ProfileDp);
          setUpdatedUser({
            fullName: response.data.data.fullName,
            userName: response.data.data.userName,
            Email: response.data.data.Email,
            bankName: response.data.data.bankName,
            benificiaryName: response.data.data.benificiaryName,
            accountNo: response.data.data.accountNo,
            ifscCode: response.data.data.ifscCode,
            mobileNo: response.data.data.mobileNo,
          });
        } else {
          setProfile(null);
          setUpdatedUser({});
        }
      } catch (error) {
        console.log('Error fetching profile picture:', error);
      }
    };
    fetchProfilePicture();
  }, []);

  const handleGenderSelect = value => {
    setSelectedGender(value);
    setShowGenderModal(false);
  };

  const imagePick = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
      });

      await uploadImage(image.path);
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };

  const uploadImage = async imagePath => {
    try {
      const formData = new FormData();

      formData.append('image', {
        uri: imagePath,
        type: 'image/jpeg', // Modify based on the image type
        name: 'profile.jpg',
      });
      formData.append('mobileNo', mobileNo);

      const response = await axios.post(
        `${config.production}/app/user/uploaddp`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data.status === 200) {
        setProfile(response.data.file);
      } else {
        Alert.alert(response.data.msg);
      }
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${config.production}/app/user/updatedetails`,
        updatedUser,
      );
      if (response.data.status == 200) {
        Alert.alert('Updated Succesfully');
      } else {
        Alert.alert(response.data.msg);
      }
    } catch (err) {
      console.log('Facing some error while updating', err);
    }
  };
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          height: 56,
          backgroundColor: colors.color_TabBarColor,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => navigation.navigate('User profile')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: Size.tabtext,
          }}>
          Edit Profile
        </Text>
      </View>
      <ScrollView style={{backgroundColor: colors.color_PageColor}}>
        <View
          style={{
            backgroundColor: colors.color_PageColor,
            flex: 1,
            height: '100%',
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
              height: 140,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 10,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={imagePick}>
                <Image
                  style={{
                    margin: 15,
                    width: 110,
                    height: 110,
                    borderRadius: 55,
                  }}
                  source={
                    profile
                      ? {
                          uri: `https://www.adoro.social/UserProfilePic/${profile}`,
                        }
                      : require('../assets/profileImage.png')
                  }
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 17,
                    left: 90,
                    zIndex: 9999,
                    placeholder: user,
                  }}>
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 20,
                      backgroundColor: '#2F65B9',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <PencilIcon />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '40%',
                  marginRight: 10,
                  padding: 10,
                  alignItems: 'center',
                  borderRadius: 50,
                  alignSelf: 'center',
                  backgroundColor: '#3797E3',
                }}
                onPress={handleUpdate}>
                <Text
                  style={{
                    color: 'white',
                    // fontWeight: 'bold',
                    fontFamily: FontFamily.semibold,
                    alignItems: 'center',
                  }}>
                  Update Profile
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <View style={{margin: 12, backgroundColor: colors.color_PageColor}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                style={{
                  flex: 1,
                  color: colors.color_TextNormal,
                  fontSize: 14,
                  lineHeight: 20.8,
                  borderWidth: 1,
                  borderColor: colors.color_InputTxtBorder,
                  fontFamily: FontFamily.semibold,
                  margin: 5,
                  paddingRight: 10,
                  paddingLeft: 10,
                  borderRadius: 10,
                }}
                onChangeText={value =>
                  setUpdatedUser({...updatedUser, fullName: value})
                }
                value={updatedUser.fullName}
                placeholder={
                  updatedUser.fullName ? updatedUser.fullName : 'Full Name'
                }
                keyboardType="ascii-capable"
                placeholderTextColor={colors.color_PlaceHolderColor}
              />
              <TouchableOpacity onPress={() => {}}>
                <PencilIcon1 color={colors.arrow} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{
                color: colors.color_TextNormal,
                fontSize: 14,
                lineHeight: 20.8,
                borderWidth: 1,
                borderColor: colors.color_InputTxtBorder,
                fontFamily: FontFamily.semibold,
                margin: 5,
                textAlignVertical: 'center',
                paddingRight: 10,
                paddingLeft: 10,
                // height: 40,
                borderRadius: 10,
              }}
              onPress={() => setShowGenderModal(true)}>
              <Text
                style={{
                  // top: 5,
                  height: 50,
                  textAlignVertical: 'center',
                  color: selectedGender
                    ? colors.color_TextNormal
                    : colors.color_PlaceHolderColor,
                  fontSize: 14,
                  fontFamily: FontFamily.semibold,
                }}>
                {selectedGender || 'Select Gender'}
              </Text>
            </TouchableOpacity>
            <Modal
              style={{backgroundColor: colors.color_CardBgColor}}
              animationType="slide"
              transparent={true}
              visible={showGenderModal}
              onRequestClose={() => setShowGenderModal(false)}>
              <View style={styles.centeredView}>
                <View
                  style={[
                    styles.modalView,
                    {backgroundColor: colors.color_genderCardBg},
                  ]}>
                  {genderOptions.map(option => (
                    <TouchableOpacity
                      // style={{backgroundColor:'red'}}
                      key={option.value}
                      onPress={() => handleGenderSelect(option.value)}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 10,
                          paddingVertical: 10,
                          paddingHorizontal: 20,
                        }}>
                        <View
                          style={{
                            height: 30,
                            width: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          {option.icon()}
                        </View>
                        <Text
                          style={
                            (styles.modalText, {color: colors.color_TextNormal})
                          }>
                          {option.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Modal>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                style={{
                  flex: 1,
                  color: colors.color_TextNormal,
                  fontSize: 14,
                  lineHeight: 20.8,
                  borderWidth: 1,
                  borderColor: colors.color_InputTxtBorder,
                  fontFamily: FontFamily.semibold,
                  margin: 5,
                  textAlignVertical: 'center',
                  paddingRight: 10,
                  paddingLeft: 10,
                  // height: 40,
                  borderRadius: 10,
                }}
                onChangeText={value =>
                  setUpdatedUser({...updatedUser, Email: value})
                }
                value={updatedUser.Email}
                placeholder={updatedUser.Email ? updatedUser.Email : 'Email Id'}
                keyboardType="email-address"
                placeholderTextColor={colors.color_PlaceHolderColor}
              />
              <TouchableOpacity onPress={() => {}}>
                <PencilIcon1 color={colors.arrow} />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                style={{
                  flex: 1,
                  color: colors.color_TextNormal,
                  fontSize: 14,
                  lineHeight: 20.8,
                  borderWidth: 1,
                  borderColor: colors.color_InputTxtBorder,
                  fontFamily: FontFamily.semibold,
                  margin: 5,
                  textAlignVertical: 'center',
                  paddingRight: 10,
                  paddingLeft: 10,
                  // height: 40,
                  borderRadius: 10,
                }}
                onChangeText={value =>
                  setUpdatedUser({...updatedUser, bankName: value})
                }
                value={updatedUser.bankName}
                placeholder={
                  updatedUser.bankName ? updatedUser.bankName : 'Bank Name'
                }
                placeholderTextColor={colors.color_PlaceHolderColor}
              />
              <TouchableOpacity onPress={() => {}}>
                <PencilIcon1 color={colors.arrow} />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                style={{
                  flex: 1,
                  color: colors.color_TextNormal,
                  fontSize: 14,
                  lineHeight: 20.8,
                  borderWidth: 1,
                  borderColor: colors.color_InputTxtBorder,
                  fontFamily: FontFamily.semibold,
                  margin: 5,
                  textAlignVertical: 'center',
                  paddingRight: 10,
                  paddingLeft: 10,
                  // height: 40,
                  borderRadius: 10,
                }}
                onChangeText={value =>
                  setUpdatedUser({...updatedUser, benificiaryName: value})
                }
                value={updatedUser.benificiaryName}
                placeholderTextColor={colors.color_PlaceHolderColor}
                placeholder={
                  updatedUser.benificiaryName
                    ? updatedUser.benificiaryName
                    : 'Beneficiary Name'
                }
                secureTextEntry={true}
              />
              <TouchableOpacity onPress={() => {}}>
                <PencilIcon1 color={colors.arrow} />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', alignItems:'center'}}>
            <TextInput
              style={{
                flex: 1,
                color: colors.color_TextNormal,
                fontSize: 14,
                lineHeight: 20.8,
                borderWidth: 1,
                borderColor: colors.color_InputTxtBorder,
                fontFamily: FontFamily.semibold,
                margin: 5,
                textAlignVertical: 'center',
                paddingRight: 10,
                paddingLeft: 10,
                borderRadius: 10,
              }}
              onChangeText={value =>
                setUpdatedUser({...updatedUser, accountNo: value})
              }
              value={updatedUser.accountNo}
              placeholderTextColor={colors.color_PlaceHolderColor}
              placeholder={
                updatedUser.accountNo ? updatedUser.accountNo : 'Account Number'
              }
              keyboardType="numeric"
              secureTextEntry={true}
            />
            <TouchableOpacity onPress={() => {}}>
                <PencilIcon1 color={colors.arrow} />
              </TouchableOpacity>
            </View>
<View style={{flexDirection:'row', alignItems:'center'}}>
            <TextInput
              style={{
                flex: 1,
                color: colors.color_TextNormal,
                fontSize: 14,
                lineHeight: 20.8,
                borderWidth: 1,
                borderColor: colors.color_InputTxtBorder,
                fontFamily: FontFamily.semibold,
                margin: 5,
                textAlignVertical: 'center',
                paddingRight: 10,
                paddingLeft: 10,
                // height: 40,
                borderRadius: 10,
              }}
              onChangeText={value =>
                setUpdatedUser({...updatedUser, ifscCode: value})
              }
              value={updatedUser.ifscCode}
              placeholderTextColor={colors.color_PlaceHolderColor}
              placeholder={
                updatedUser.ifscCode ? updatedUser.ifscCode : 'IFSC Code'
              }
              secureTextEntry={true}
            />
            <TouchableOpacity onPress={() => {}}>
                <PencilIcon1 color={colors.arrow} />
              </TouchableOpacity>
              </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  input: {
    color: '#07142E',
    fontSize: Size.inputText,
    lineHeight: 20.8,
    borderWidth: 1,
    // borderColor: colors.color_InputTxtBorder,
    fontFamily: FontFamily.semibold,
    margin: 5,
    textAlignVertical: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    // height: 40,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    // backgroundColor: 'green',
    borderRadius: 10,
    padding: 20,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: 'center',
    fontFamily: FontFamily.semibold,
    fontSize: Size.title,
  },
});
