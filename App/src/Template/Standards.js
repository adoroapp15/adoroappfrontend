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
import StandardPost from './StandardPost';
const windowWidth1 = Dimensions.get('screen').width;
const windowHeight1 = Dimensions.get('screen').height;
const DownloadFileName = 'your_image.png';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import BackArrow from '../assets/svg/BackArrow';

const Standards = ({navigation, route}) => {
  const {dark, toggleTheme} = useStore();
  const {colors} = useTheme();
  const {selectedData, allData} = route.params;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(selectedData); // Added this line
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [sortedData, setSortedData] = useState([]);
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
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
  const [imageSizes, setImageSizes] = useState({});
  const flatListRef = React.useRef(null);

  React.useEffect(() => {
    // Access the params passed during navigation
    // const indexToScroll = navigation.getParam('indexToScroll', 0);
    // Scroll the FlatList to the desired index
    if (route?.params?.indexToScroll !== null && flatListRef?.current) {
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: route?.params?.indexToScroll,
      });
    }
  }, [route?.params?.indexToScroll]);

  const getItemLayout = (data, index) => ({
    length: 50,
    offset: 350 * index,
    index,
  });

  return (
    <><View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.color_TabBarColor,
        height: 56,
      }}>
      <TouchableOpacity
        style={{ flex: 0.5, paddingLeft: 10, alignSelf: 'center' }}
        onPress={() => navigation.push('Browse Template')}>
        <BackArrow color={colors.arrow} />
      </TouchableOpacity>
      <Text
        style={{
          color: colors.color_TextNormal,
          fontFamily: FontFamily.semibold,
          alignSelf: 'center',
          fontSize: 20,
        }}>
        Standard
      </Text>
    </View><View style={{ backgroundColor: colors.color_PageColor }}>
        <FlatList
          ref={flatListRef}
          data={allData}
          keyExtractor={(item, index) => item && item.id ? item.id.toString() : index.toString()}
          // renderItem={renderItem}
          renderItem={({ item, index }) => (
            <StandardPost navigation={navigation} item={item} index={index} />
          )}
          numColumns={1}
          ListEmptyComponent={<Text />}
          refreshing={loading}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => loading && (
            <View style={{ padding: 10 }}>
              <ActivityIndicator size="small" color="#0000ff" />
            </View>
          )}
          getItemLayout={getItemLayout} />
      </View></>
    
  );
};

export default Standards;

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    backgroundColor:'red'
  },
});
