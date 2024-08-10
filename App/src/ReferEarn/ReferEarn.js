import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Clipboard,
  Linking,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import FontFamily from '../common/components/FontFamily';
import CopyLink from '../assets/svg/CopyLink';
import CopyTextIcon from '../assets/svg/CopyTextIcon';
import BackArrow from '../assets/svg/BackArrow';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import Size from '../common/components/Size';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReferEarn = ({navigation, route}) => {
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();
  const {userName} = route.params;
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const parsedUser = JSON.parse(userString);
        setUser(parsedUser);
      }
    };
    getUser();
  }, []);

  const generateReferralLink = () => {
    return `https://play.google.com/store/apps/details?id=com.adoro.creators&hl=en-IN&ref=${user.userName}`;
  };
  const referralLink = generateReferralLink();

  const handleCopyToClipboard = () => {
    Clipboard.setString(referralLink);
    Alert.alert('Clipboard copied');
  };
  const handleCopyUsernameToClipboard = () => {
    Clipboard.setString(user.userName);
    Alert.alert('Clipboard copied');
  };
  const shareOnWhatsApp = async () => {
    try {
      const shareOptions = {
        url: referralLink,
        social: Share.Social.WHATSAPP,
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error sharing on WhatsApp:', error);
    }
  };

  return (
    <View style={{backgroundColor: colors.color_PageColor, height: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.color_TabBarColor,
          zIndex: 1,
          height: 56,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => navigation.navigate('HomePage')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: Size.tabtext,
          }}>
          Refer & Earn
        </Text>
      </View>
      <View>
        <View style={styles.container}>
          <LinearGradient
            colors={[
              'rgba(0,255,255,0.8)',
              'rgba(255,192,203,1)',
              'rgba(255,255,0,1)',
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{
              width: '130%',
              height: 390,
              borderRadius: 195,
              marginTop: -100,
              alignSelf: 'center',
            }}
          />
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Refer & Earn</Text>
            <View style={styles.card}>
              <Text style={styles.cardText}>
                Copy the link below & share it with your friends
              </Text>
              <View style={styles.linkContainer}>
                <CopyLink color={'black'} />
                <Text style={styles.linkText}>{referralLink}</Text>
                <TouchableOpacity onPress={handleCopyToClipboard}>
                  <CopyTextIcon color={'black'} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  backgroundColor: '#f0f0f0',
                  borderRadius: 10,
                  height: 30,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: colors.color_TextNormal,
                    flex: 1,
                    textAlignVertical: 'center',
                    marginLeft: 10,
                  }}>
                  Referral Code: {user.userName}
                </Text>
                <TouchableOpacity
                  style={{
                    justifyContent: 'flex-end',
                    marginRight: 10,
                    bottom: 2,
                  }}
                  onPress={handleCopyUsernameToClipboard}>
                  <CopyTextIcon color={'black'} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={shareOnWhatsApp}>
                <LinearGradient
                  colors={[
                    'rgba(0,255,255,0.4)',
                    'rgba(255,192,203,1)',
                    'rgba(255,255,0,0.5)',
                  ]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.shareButton}>
                  <Text style={styles.shareButtonText}>Share</Text>
                </LinearGradient>
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: FontFamily.medium,
                  color: colors.color_TextNormal,
                  fontSize: Size.title,
                  marginTop: 20,
                }}>
                When your friends download the app with the referral code
                provided above, both of you will get credit in your wallet worth
                Rs.5
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReferEarn;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    margin: 20,
    flexDirection: 'column',
    height: '100%',
  },
  overlayText: {
    color: 'white',
    fontSize: Size.welcomeText,
    fontFamily: FontFamily.bold,
    zIndex: 1,
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 20,
  },
  card: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    alignSelf: 'center',
    justifyContent: 'center',
    shadowOpacity: 5,
    shadowRadius: 2,
    height: 250,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 40,
    padding: 20,
  },
  cardText: {
    fontSize: Size.title,
    textAlign: 'center',
    color: 'black',
    fontFamily: FontFamily.semibold,
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    borderRadius: 90,
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  linkText: {
    marginRight: 5,
    color: 'black',
    fontFamily: FontFamily.medium,
    fontSize: 11,
    flex: 1,
  },
  actionButtons: {
    margin: 20,
  },
  shareButton: {
    padding: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  shareButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoText: {
    textAlign: 'center',
    fontFamily: FontFamily.medium,
    fontSize: Size.title,
    marginTop: 20,
  },
});
