import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowWidth1 = Dimensions.get('screen').width;
import axios from 'axios';

import {config} from '../config';
const MyTemplates = ({item}) => {
  //   const {item} = route.params;
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
  const deletetemplate = async Id => {
    const response = await axios.delete(
      `${config.production}/app/user/deletetemplate`,
      {
        params: {Id},
      },
    );

    if (response.status == 200) {
      Alert.alert('Deleted Successfully');
    } else {
      Alert.alert('Facing Problem while Deleting');
    }
  };
  React.useEffect(() => {
    getImageSize(`https://adoro-data-storage.s3.ap-south-1.amazonaws.com/UserTemplate/${item.fileName}`);
  }, [dimensions]);
  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <Image
          source={{
            uri: `https://adoro-data-storage.s3.ap-south-1.amazonaws.com/UserTemplate/${item.fileName}`,
          }}
          style={{
            width: dimensions.width || windowWidth,
            height: dimensions.height || 300,
            alignSelf: 'center',
            marginTop: 20,
          }}
        />
        <TouchableOpacity
          style={{width: '50%', alignSelf: 'center', marginTop: 20}}
          onPress={() => deletetemplate(item.Id)}>
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
              Delete
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MyTemplates;

const styles = StyleSheet.create({});
