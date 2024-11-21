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
import FontFamily from '../common/components/FontFamily';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const windowWidth1 = Dimensions.get('screen').width;
const windowHeight1 = Dimensions.get('screen').height;
const DownloadFileName = 'your_image.png';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';

const StandardPost = ({navigation, item, index}) => {
  const [selectedItem, setSelectedItem] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const {dark, toggleTheme} = useStore();
  const {colors} = useTheme();

  const [loading, setLoading] = useState(false);

  const [dimensions, setDimensions] = useState({width: 0, height: 0});
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
  useEffect(() => {
    getImageSize(`https://adoro-data-storage.s3.ap-south-1.amazonaws.com/Template/Image/${item.fileName}`);
  }, [dimensions]);
  const onEndReached = () => {
    if (hasMore && !loading) {
      setLoading(true);
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
        })
        .catch(error => {
          console.error('Error downloading file:', error);
        });
    } catch (error) {
      console.error('Error downloading image:', error);
      Alert.alert('Error', 'Failed to download the image.');
    }
  }, []);

  const shareOnWhatsApp = useCallback(async imageUrl => {
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
      <TouchableOpacity
        key={index}
        style={{
          marginTop: 10,
          backgroundColor: colors.color_PostBgColor,
        }}
        onPress={() => {
          setSelectedItem(item);
          //   flatListRef.current.scrollToIndex({
          //     index: allData.findIndex(img => img.id === item.id),
          //     animated: true,
          //   });
        }}>
        <View style={{}}>
          <Text
            style={{
              textAlign: 'center',

              marginTop: 10,
              fontSize: 16,
              fontFamily: FontFamily.semibold,
              color: colors.color_TextNormal,
            }}>
            {item.name}
          </Text>
          <Image
            style={[
              styles.image,
              {
                width: dimensions.width || windowWidth1,
                height: dimensions.height || 300,
              },
            ]}
            source={{
              uri: `https://adoro-data-storage.s3.ap-south-1.amazonaws.com/Template/Image/${item.fileName}`,
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
                  `https://adoro-data-storage.s3.ap-south-1.amazonaws.com/Template/Image/${item.fileName}`,
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
                  `https://adoro-data-storage.s3.ap-south-1.amazonaws.com/Template/Image/${item.fileName}`,
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
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default StandardPost;

const styles = StyleSheet.create({
  image: {
    // resizeMode: 'contain',
    backgroundColor: 'gray',
    marginTop: 10,
  },
});
