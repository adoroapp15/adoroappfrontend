import React, {useCallback, useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import BackArrow from '../assets/svg/BackArrow';
import {useTheme} from '@react-navigation/native';
import FontFamily from '../common/components/FontFamily';

const windowWidth1 = Dimensions.get('screen').width;
const windowHeight1 = Dimensions.get('screen').height;
const DownloadFileName = 'your_image.png';

const BrowseTemplate = ({navigation, item, index}) => {
  const {colors} = useTheme();
  const [selectedItem, setSelectedItem] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(false);

  const [dimensions, setDimensions] = useState({width: 0, height: 0});
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
    // return new Promise((resolve, reject) => {
    //   Image.getSize(
    //     url,
    //     (width, height) => {
    //       const aspectRatio = width / height;
    //       const imageHeight = windowWidth1 / aspectRatio;
    //       setDimensions({width: windowWidth1, height: imageHeight});
    //       console.log('Image dimensions:', width, height, url);
    //       resolve({width: windowWidth1, height: imageHeight});
    //     },
    //     error => {
    //       console.error('Error getting image size:', error);
    //       reject(error);
    //     },
    //   );
    // });
  };
  useEffect(() => {
    getImageSize(`https://www.adoro.social/Template/Image/${item.fileName}`);
    console.log('Updated dimensions:', dimensions.width, dimensions.height);
  }, [dimensions]);
  const onEndReached = () => {
    if (hasMore && !loading) {
      setLoading(true);
      //fetchUserData(page + 1);
      setPage(page + 1);
    }
  };
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

  const handleDownload = useCallback(async imageUri => {
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

  const shareOnWhatsApp = useCallback(async source => {
    try {
      const resolvedSource = resolveAssetSource(source);
      const shareOptions = {
        url:
          Platform.OS === 'android'
            ? source
            : `data:image/png;base64,${source.base64}`,
        social: Share.Social.WHATSAPP,
        // message: 'Optional message', // You can add an optional message
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error sharing on WhatsApp:', error);
    }
  }, []);
  return (
    <>
      <View>
        <TouchableOpacity
          onPress={() => {
            setSelectedItem(item);
            //   flatListRef.current.scrollToIndex({
            //     index: allData.findIndex(img => img.id === item.id),
            //     animated: true,
            //   });
          }}>
          <View>
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
                uri: `https://www.adoro.social/Template/Image/${item.fileName}`,
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                bottom: 20,
                marginTop: 1,
                fontSize: 16,
              }}>
              {item.name}
            </Text>
            <View style={{flexDirection: 'row', alignSelf: 'center', gap: 20}}>
              <TouchableOpacity
                onPress={() =>
                  shareOnWhatsApp(
                    `https://www.adoro.social/Template/Image/${item.fileName}`,
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
                    padding: 5,
                    justifyContent: 'center',
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '600',
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
                    `https://www.adoro.social/Template/Image/${item.fileName}`,
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
                    padding: 5,
                    justifyContent: 'center',
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '600',
                      textAlign: 'center',
                      fontSize: 20,
                    }}>
                    Download
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default BrowseTemplate;

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    backgroundColor: 'red',
  },
});
