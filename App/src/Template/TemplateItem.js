// import React from 'react';
// import {Image, View, Video} from 'react-native';

// const TemplateItem = ({item}) => {
//   return (
//     <View style={{justifyContent: 'center', alignItems: 'center'}}>
//       {item.type === 'image' && (
//         <Image
//           source={{
//             uri: `https://www.adoro.social/TrendingTemplate/${item.fileName}`,
//           }}
//           style={{width: '80%', height: '80%', resizeMode: 'contain'}}
//         />
//       )}
//       {item.type === 'video' && (
//         <Video
//           source={{
//             uri: `https://www.adoro.social/TrendingTemplate/${item.fileName}`,
//           }}
//           style={{width: '80%', aspectRatio: 16 / 9}}
//           resizeMode="contain"
//           controls={true}
//         />
//       )}
//     </View>
//   );
// };

// export default TemplateItem;

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
        console.log('Image dimensions:', width, height, url);
      });
    } catch (error) {
      console.error('Error getting image size:', error);
    }
  };
  React.useEffect(() => {
    getImageSize(`https://www.adoro.social/Template/Image/${item.fileName}`);
    console.log('Updated dimensions:', dimensions.width, dimensions.height);
  }, [dimensions]);
  console.log(
    'ssssuusshmmaaa',
    `https://www.adoro.social/TrendingTemplate/${item.fileName}`,
  );
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

      if (hasPermission && !hasPermission) {
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
          console.log('Download successful:', result);
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
                uri: `https://www.adoro.social/TrendingTemplate/${item.fileName}`,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                gap: 20,
                marginTop: 20,
                marginBottom: 20,
              }}>
              <TouchableOpacity
                onPress={() =>
                  shareOnWhatsApp(
                    `https://www.adoro.social/TrendingTemplate/${item.fileName}`,
                  )
                }>
                <LinearGradient
                  colors={[
                    'rgba(0,255,255,0.4)',
                    'rgba(255,192,203,1)',
                    'rgba(255,255,0,0.5)',
                  ]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={{
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingBottom: 6,
                    paddingTop: 6,
                    justifyContent: 'center',
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      color: 'white',

                      fontFamily: FontFamily.semibold,
                      textAlign: 'center',
                      fontSize: 20,
                    }}>
                    Share
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleDownload(
                    `https://www.adoro.social/TrendingTemplate/${item.fileName}`,
                  )
                }>
                <LinearGradient
                  colors={[
                    'rgba(0,255,255,0.4)',
                    'rgba(255,192,203,1)',
                    'rgba(255,255,0,0.5)',
                  ]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={{
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingBottom: 6,
                    paddingTop: 6,
                    justifyContent: 'center',
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: FontFamily.semibold,
                      textAlign: 'center',
                      fontSize: 20,
                    }}>
                    Download
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </>
        )}
        {item.type === 'video' && (
          //   <Video
          //     source={{
          //       uri: `https://www.adoro.social/TrendingTemplate/${item.fileName}`,
          //     }}
          //     style={{width: '80%', aspectRatio: 16 / 9}}
          //     resizeMode="contain"
          //     controls={true}
          //   />
          <>
            <Video
              key={index}
              source={{
                uri: `https://www.adoro.social/TrendingTemplate/${item.fileName}`,
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
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                gap: 20,
                marginTop: 20,
                marginBottom: 20,
              }}>
              <TouchableOpacity
                onPress={() =>
                  shareOnWhatsApp(
                    `https://www.adoro.social/TrendingTemplate/${item.fileName}`,
                  )
                }>
                <LinearGradient
                  colors={[
                    'rgba(0,255,255,0.4)',
                    'rgba(255,192,203,1)',
                    'rgba(255,255,0,0.5)',
                  ]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={{
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingBottom: 6,
                    paddingTop: 6,
                    justifyContent: 'center',
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      color: 'white',

                      fontFamily: FontFamily.semibold,
                      textAlign: 'center',
                      fontSize: 20,
                    }}>
                    Share
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleDownload(
                    `https://www.adoro.social/TrendingTemplate/${item.fileName}`,
                  )
                }>
                <LinearGradient
                  colors={[
                    'rgba(0,255,255,0.4)',
                    'rgba(255,192,203,1)',
                    'rgba(255,255,0,0.5)',
                  ]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={{
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingBottom: 6,
                    paddingTop: 6,
                    justifyContent: 'center',
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: FontFamily.semibold,
                      textAlign: 'center',
                      fontSize: 20,
                    }}>
                    Download
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </>
          
        )}
      </View>
    </View>
  );
};

export default TemplateItem;

const styles = StyleSheet.create({
  image: {
    // resizeMode: 'contain',
    backgroundColor: 'gray',
    marginTop: 10,
  },
});
