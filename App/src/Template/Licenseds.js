import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
  PermissionsAndroid,
  Modal,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import RazorpayCheckout from 'react-native-razorpay';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import FontFamily from '../common/components/FontFamily';
import BackArrow from '../assets/svg/BackArrow';

const windowWidth1 = Dimensions.get('screen').width;
const windowHeight1 = Dimensions.get('screen').height;
const Data = {
  1: require('../assets/Savage.png'),
  2: require('../assets/Relatable.png'),
  3: require('../assets/Dank.png'),
  4: require('../assets/Shitpost.png'),
  5: require('../assets/Movies.png'),
  6: require('../assets/Wholesome.png'),
  7: require('../assets/Anime.png'),
  8: require('../assets/Desi.png'),
  9: require('../assets/Webseries.png'),
};

const Licenseds = ({route, navigation}) => {
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();

  const {imageId} = route.params;
  const [selectedItem, setSelectedItem] = React.useState('');
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  let razorpayKeyId = 'rzp_live_qTUOVmZMoxYeMC';
  let razorpayKeySecret = 'mxjPnHF0YptMXOFrgMSZ5mzS';

  const amount = 1;
  const currency = 'INR';

  const handlePayment = () => {
    var options = {
      description: 'Buy BMW CAR',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: currency,
      key: razorpayKeyId,
      amount: amount * 100,
      name: 'Licensed Template order',
      order_id: '',
      prefill: {
        email: 'xyz@gmail.com',
        contact: '9999999999',
        name: 'User 1',
      },
      theme: {color: '#F37254'},
    };

    RazorpayCheckout.open(options)
      .then(data => {
        alert(`Success: ${data.razorpay_payment_id}`);
        downloadImage();
      })
      .catch(error => {
        console.log(error);
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  React.useEffect(() => {
    if (Data.hasOwnProperty(imageId)) {
      setSelectedItem(Data[imageId]);
    } else {
      console.error(`Invalid imageId: ${imageId}`);
    }
  }, [imageId]);

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadImage();
        } else {
          alert('Storage Permission not granted');
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const downloadImage = () => {
    let date = new Date();
    let image_URL = selectedItem;
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        alert('Image Downloaded Success');
      });
  };

  const getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const shareOnFacebook = async () => {
    try {
      const resolvedSource = resolveAssetSource(selectedItem);

      const shareOptions = {
        url:
          Platform.OS === 'android'
            ? resolvedSource.uri
            : `data:image/png;base64,${resolvedSource.base64}`, // Use the correct URL or data URI
        social: Share.Social.WHATSAPP,
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error sharing on facebook:', error);
    }
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.color_TabBarColor,
          height: 56,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
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
          Licensed
        </Text>
      </View>
      <View
        style={{
          backgroundColor: colors.color_PageColor,
          height: '100%',
          width: '100%',
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{height: windowWidth1 - 50, width: windowWidth1 - 50}}
            source={Data[imageId]}
          />
          <Image
            style={{position: 'absolute', resizeMode: 'cover',transform: [{ rotate: '45deg' }], opacity: 0.6}}
            source={require('../assets/Adoro.png')}
          />
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              gap: 20,
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                // Open the modal for payment
                setModalVisible(true);
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
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                  justifyContent: 'center',
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '600',
                    textAlign: 'center',
                    fontFamily: FontFamily.semibold,
                    fontSize: 20,
                  }}>
                  Download
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={[styles.modalText, {color: 'black'}]}>
                You need to pay for downloading this template.
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handlePayment}
                  style={[styles.button, {backgroundColor: 'green'}]}>
                  <Text style={styles.buttonText}>Pay</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false); // Close the modal on cancel
                  }}
                  style={[styles.button, {backgroundColor: 'red'}]}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default Licenseds;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
