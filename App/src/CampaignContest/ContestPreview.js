import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
import axios from 'axios';
import Video from 'react-native-video';
import {config} from '../config';
import {resumeDownload} from 'react-native-fs';
import FontFamily from '../common/components/FontFamily';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import BackArrow from '../assets/svg/BackArrow';

const ContestPreview = ({navigation, route}) => {
  const {imageUri, mediaType, contestName, mobileNo, userName} = route.params;
  const {dark, toggleTheme} = useStore();
  const {colors} = useTheme();

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        type: mediaType === 'video' ? 'video/mp4' : 'image/jpeg',
        name: mediaType === 'video' ? 'video.mp4' : 'image.jpg',
      });
      formData.append('contestName', contestName);
      formData.append('userName', userName);
      formData.append('mobileNo', mobileNo);
      const response = await axios.post(
        `${config.production}/app/user/applycontest`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.status == 200) {
        Alert.alert('Submitted Successfully');
        setSubmitted(true);
        setTimeout(() => {
          navigation.navigate('Campaign');
        }, 2000);
      } else {
        console.log('Facing error');
      }
    } catch (error) {
      console.error('Error submitting media:', error);
    }
  };
  return (
    <>
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
          Contest
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.color_PageColor,
        }}>
        {mediaType === 'video' ? (
          <Video
            source={{uri: imageUri}}
            style={styles.video}
            resizeMode="contain"
            controls
          />
        ) : (
          <Image source={{uri: imageUri}} style={styles.image} />
        )}
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={[
            styles.submitButton,
            {backgroundColor: submitted ? '#ccc' : '#3797E3'},
          ]}
          disabled={submitted}>
          {submitted ? 'Submitted' : 'Submit'}
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
  video: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 10,
    fontFamily: FontFamily.semibold,
  },
});

export default ContestPreview;
