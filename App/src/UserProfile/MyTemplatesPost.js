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
const windowWidth1 = Dimensions.get('screen').width;
const windowHeight1 = Dimensions.get('screen').height;
const DownloadFileName = 'your_image.png';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import BackArrow from '../assets/svg/BackArrow';
import MyTemplates from './MyTemplates';

const MyTemplatesPost = ({navigation, route}) => {
  const {dark, toggleTheme} = useStore();
  const {colors} = useTheme();
  const {data} = route.params;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(selectedData); // Added this line
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
  const [imageSizes, setImageSizes] = useState({});
  const flatListRef = React.useRef(null);
  const getItemLayout = (data, index) => ({
    length: 50,
    offset: 350 * index,
    index,
  });
  return (
    <>
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.color_TabBarColor,
        height: 56,
      }}>
      <TouchableOpacity
        style={{ flex: 0.5, paddingLeft: 10, alignSelf: 'center' }}
        onPress={() => navigation.navigate('User profile')}>
        <BackArrow color={colors.arrow} />
      </TouchableOpacity>
      <Text
        style={{
          color: colors.color_TextNormal,
          fontFamily: FontFamily.semibold,
          alignSelf: 'center',
          fontSize: 20,
        }}>
        My Templates
      </Text>
    </View>
    <View style={{ backgroundColor: colors.color_PageColor }}>
        <FlatList
          ref={flatListRef}
          data={data}
          keyExtractor={(item, index) => item && item.id ? item.id.toString() : index.toString()}
          // renderItem={renderItem}
          renderItem={({ item, index }) => (
            <MyTemplates  item={item}/>
          )}
          numColumns={1}
          ListEmptyComponent={<Text>pppp</Text>}
          refreshing={loading}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
        //   ListFooterComponent={() => loading && (
        //     <View style={{ padding: 10 }}>
        //       <ActivityIndicator size="small" color="#0000ff" />
        //     </View>
        //   )}
          getItemLayout={getItemLayout} />
      </View></>
    
  );
};

export default MyTemplatesPost;

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    backgroundColor:'red'
  },
});
