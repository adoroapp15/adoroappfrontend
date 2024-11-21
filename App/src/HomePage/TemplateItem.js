import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import React from 'react';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import Share from 'react-native-share';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import LinearGradient from 'react-native-linear-gradient';
import FontFamily from '../common/components/FontFamily';
const DownloadFileName = 'your_image.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowWidth1 = Dimensions.get('screen').width;
const windowHeight1 = Dimensions.get('screen').height;
const desiredWidth = 0.2 * windowWidth;
const desiredHeight = 0.2 * windowHeight;

const TemplateItem = ({item, index}) => {
  const [isPlaying, setIsPlaying] = React.useState({});
  const togglePlayPause = postId => {
    setIsPlaying(prevIsPlaying => ({
      ...prevIsPlaying,
      [postId]: !prevIsPlaying[postId],
    }));
  };
  const [dimensions, setDimensions] = React.useState({width: 0, height: 0});
  const getImageSize = url => {
    try {
      Image.getSize(url, (width, height) => {
        const aspectRatio = width / height;
        const imageHeight = windowWidth1 / aspectRatio;
        setDimensions({width: windowWidth1, height: imageHeight});
      });
    } catch (error) {
      console.error('Error getting image size:', error);
    }
  };
  React.useEffect(() => {
    getImageSize(
      `https://adoro-data-storage.s3.ap-south-1.amazonaws.com/Template/Image/${item.fileName}`,
    );
  }, [dimensions]);
  const checkAndRequestPermission = async () => {
    try {
      const permission =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
          : PERMISSIONS.IOS.PHOTO_LIBRARY;
      const result = await check(permission);

      if (result === RESULTS.GRANTED) {
        return true;
      } else {
        const requestResult = await request(permission);

        if (requestResult === RESULTS.GRANTED) {
          return true;
        } else {
          console.log('Permission request denied:', requestResult);
          return false;
        }
      }
    } catch (error) {
      console.error('Error checking/requesting permission:', error);
      return false;
    }
  };

  const handleDownload = React.useCallback(async imageUri => {
    try {
      const hasPermission = await checkAndRequestPermission();

      if (!hasPermission) {
        Alert.alert(
          'Permission Denied',
          'Unable to download without storage permission.',
        );
        return;
      }

      const response = await RNFS.downloadFile({
        fromUrl: imageUri,
        toFile: `${RNFS.CachesDirectoryPath}/${DownloadFileName}`,
      });

      response.promise
        .then(async result => {
          const savedUri = await CameraRoll.saveToCameraRoll(
            `file://${RNFS.CachesDirectoryPath}/${DownloadFileName}`,
            'photo',
          );

          if (savedUri) {
            Alert.alert('Downloaded', `Image saved to gallery: ${savedUri}`);
          } else {
            Alert.alert('Error', 'Failed to save image to gallery.');
          }
        })
        .catch(error => {
          console.error('Error downloading file:', error);
        });
    } catch (error) {
      console.error('Error downloading image:', error);
      Alert.alert('Error', 'Failed to download the image.');
    }
  }, []);

  const shareOnWhatsApp = React.useCallback(async imageUrl => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const shareOptions = {
        url: Platform.OS === 'android' ? imageUrl : blob.uri,
        type: response.headers.get('Content-Type'),
        social: Share.Social.WHATSAPP,
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error sharing on WhatsApp:', error);
    }
  }, []);
  return (
    <View>
      <View style={{}}>
        {item && item.fileName && item.type === 'image' && (
          <>
            <Image
              style={[
                styles.image,
                {
                  // width: imageSizes[index]?.width,
                  // height: imageSizes[index]?.height,
                  width: dimensions.width || windowWidth1,
                  height: dimensions.height || 300,
                },
              ]}
              source={{
                uri: `https://adoro-data-storage.s3.ap-south-1.amazonaws.com/TrendingTemplate/${item.fileName}`,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                gap: 20,
                marginTop: 20,
                marginBottom: 20,
              }}></View>
          </>
        )}
        {item.type === 'video' && (
          <>
            <Video
              key={index}
              source={{
                uri: `https://adoro-data-storage.s3.ap-south-1.amazonaws.com/TrendingTemplate/${item.fileName}`,
              }}
              style={[
                styles.image,
                {
                  // width: imageSizes[index]?.width,
                  // height: imageSizes[index]?.height,
                  width: dimensions.width || windowWidth1,
                  height: dimensions.height || 300,
                },
              ]}
              resizeMode="cover"
              paused={!isPlaying[item.Id]}
            />
            <TouchableOpacity
              style={{
                width: desiredWidth,
                height: desiredHeight,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginLeft: -35,
                marginTop: -45,
              }}
              onPress={() => togglePlayPause(item.Id)}>
              {isPlaying[item.Id] ? (
                <Image
                  source={require('../assets/pause.png')}
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: '#fff',
                    borderRadius: 25,
                  }}
                />
              ) : (
                <Image
                  source={require('../assets/play.png')}
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: '#fff',
                    borderRadius: 25,
                  }}
                />
              )}
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default TemplateItem;

const styles = StyleSheet.create({
  image: {
    backgroundColor: 'gray',
    marginTop: 10,
  },
});
