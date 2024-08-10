import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import {Avatar, Button, Card} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import FontFamily from '../common/components/FontFamily';
import LinearGradient from 'react-native-linear-gradient';
import React, {useState} from 'react';
import Post from '../HomePage/Post';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import BackArrow from '../assets/svg/BackArrow';
const avtarImage = require('../assets/User.png');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const desiredWidth = 0.2 * windowWidth;
const desiredHeight = 0.2 * windowHeight;

const UserPost = ({route}) => {
  const {dark, toggleTheme} = useStore();
  const {colors} = useTheme();
  const {posts} = route.params;
  const [isPlaying, setIsPlaying] = React.useState({});
  const [imageHeart, setImageHeart] = useState(false);
  const [videoHeart, setVideoHeart] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(1); // Initial page number
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const togglePlayPause = postId => {
    setIsPlaying(prevIsPlaying => ({
      ...prevIsPlaying,
      [postId]: !prevIsPlaying[postId],
    }));
  };
  const [videoDimensions, setVideoDimensions] = useState({
    width: windowWidth * 0.95,
    height: 300,
  });
  const onEndReached = () => {
    if (hasMore && !loading) {
      // setLoading(true);
      // posts(page + 1);
      setPage(page + 1);
    }
  };
  const toggleModal = post => {
    setSelectedPost(post);
    setModalVisible(!isModalVisible);
  };
  const handleVideoLoad = (event, postId) => {
    const {naturalSize} = event;
    setVideoDimensions(prevDimensions => ({
      ...prevDimensions,
      [postId]: {
        width: windowWidth * 0.95,
        height: (windowWidth * 0.95 * naturalSize.height) / naturalSize.width,
      },
    }));
  }; // ... (unchanged code)
  const LeftContent = ({profile, mobileNo}) => (
    <View>
      <TouchableOpacity>
        <Avatar.Image
          size={50}
          style={{right: 10}}
          source={{uri: `https://www.adoro.social/UserProfilePic/${profile}`}}
        />
      </TouchableOpacity>
    </View>
  );
  const flatListRef = React.useRef(null);
  const navigation = useNavigation();

  React.useEffect(() => {
    if (route.params.indexToScroll !== null && flatListRef.current) {
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: route.params.indexToScroll,
      });
    }
  }, [route.params.indexToScroll]);

  const getItemLayout = (data, index) => ({
    length: 50,
    offset: 450 * index,
    index,
  });

  return (
    <>
      <View style={{backgroundColor: colors.color_PageColor}}>
        <FlatList
          ref={flatListRef}
          data={posts.slice().reverse()}
          keyExtractor={post => post.Id.toString()}
          renderItem={({item, index}) => (
            <Post
              navigation={navigation}
              post={item}
              index={index}
              Screen={'User Profile'}
            />
          )}
          ListEmptyComponent={<Text />}
          refreshing={loading}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1} 
          ListFooterComponent={() =>
            loading && (
              <View style={{padding: 10}}>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            )
          }
          getItemLayout={getItemLayout}
        />
      </View>
    </>
  );
};

export default UserPost;

const styles = StyleSheet.create({
  Title: {
    color: '#07142E',
    fontSize: 20,
    fontFamily: FontFamily.bold,
    textTransform: 'capitalize',
    wordWrap: 'break-word',
  },
  cardBox: {
    margin: 1,
    backgroundColor: 'white',
  },
  know: {
    marginTop: 60,
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 15,
    width: '140%',
    alignSelf: 'center',
    marginRight: 110,
  },
});
