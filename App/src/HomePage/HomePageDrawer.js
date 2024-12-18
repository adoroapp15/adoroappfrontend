import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DrawerItemList, createDrawerNavigator} from '@react-navigation/drawer';
import Notification from '../Notification/Notification';
import Result from '../Result/Result';
import NoteFromAdoro from '../NoteFromAdoro/NoteFromAdoro';
import Wallet from '../Wallet/Wallet';
import ReferEarn from '../ReferEarn/ReferEarn';
import Support from '../Support/Support';
import Setting from '../Setting/Setting';
import HomePage from './HomePage';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import MemeTemplate from '../Template/MemeTemplate';
import {useNavigation} from '@react-navigation/native';
import {config} from '../config';
import {useFocusEffect} from '@react-navigation/native';
import AdoroLogos from '../assets/svg/AdoroLogos';
import Message from '../assets/svg/Message';
import Notifications from '../assets/svg/Notifications';
import HamBurger from '../assets/svg/HamBurger';
import ResultIcon from '../assets/svg/ResultIcon';
import NoteFromAdoroIcon from '../assets/svg/NoteFromAdoro';
import WalletIcon from '../assets/svg/WalletIcon';
import TemplateICon from '../assets/svg/TemplateIcon';
import ReferAndEarnIcon from '../assets/svg/ReferAndEarnIcon';
import SupportIcon from '../assets/svg/SupportIcon';
import SettingIcon from '../assets/svg/SettingIcon';
import {useTheme} from '@react-navigation/native';
import FontFamily from '../common/components/FontFamily';
import CreateMeme from '../CreatePost/CreateMeme';
import PlusIcon from '../assets/svg/PlusIcon';
import GetVerified from '../GetVerified/GetVerified';

const Drawer = createDrawerNavigator();
const CustomDrawerIcon = () => {
  const navigation = useNavigation();

  const handleDrawerIconPress = () => {
    navigation.toggleDrawer();
  };

  return (
    <TouchableOpacity onPress={handleDrawerIconPress} style={{left: 10}}>
      <HamBurger />
    </TouchableOpacity>
  );
};

const HomePageDrawer = () => {
  const navigation = useNavigation();
  const [parsedUser, setParsedUser] = useState({});
  const homePageNavigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const [search, setSearch] = React.useState(false);
  const handleSearchIconPress = () => {
    setSearch(true);
  };
  useFocusEffect(
    React.useCallback(() => {
      navigation.navigate('HomePage');
    }, [navigation]),
  );
  const {colors} = useTheme();

  const handleCloseIconPress = () => {
    setSearch(false);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        const others = await AsyncStorage.getItem('token');

        const users = JSON.parse(user, others);

        setParsedUser(users);

        const response = await axios.get(
          `${config.production}/app/user/userdetails`,
          {
            params: {mobileNo: users.mobileNo},
          },
        );

        if (response.data.status === 200) {
          setProfile(response.data.data.ProfileDp);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error('Error reading user from AsyncStorage:', error);
      }
    };

    getUser();
  }, []);
  const handleHeaderTitlePress = async () => {
    navigation.navigate('HomePage', {refresh: true});
    await new Promise(resolve => setTimeout(resolve, 1000));
  };
  return (
    <Drawer.Navigator
      drawerContent={props => {
        return (
          <SafeAreaView
            style={{backgroundColor: colors.color_PageColor, height: '100%'}}>
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => navigation.navigate('UserProfile')}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 140,
                  width: '100%',
                  alignItems: 'center',
                  borderBottomColor: '#f4f4f4',
                  borderBottomWidth: 1,
                }}>
                <TouchableOpacity
                  style={{marginLeft: 10}}
                  onPress={() => navigation.navigate('UserProfile')}>
                  <Image
                    source={
                      profile
                        ? {
                            uri: `https://adoro-data-storage.s3.ap-south-1.amazonaws.com/UserProfilePic/${profile}`,
                          }
                        : require('../assets/Profile.png')
                    }
                    style={{
                      height: 65,
                      width: 65,
                      borderRadius: 65,
                    }}
                  />
                </TouchableOpacity>
                <View style={{flexDirection: 'column', marginLeft: 15}}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('UserProfile')}>
                    <Text
                      style={{
                        fontSize: 14,
                        marginVertical: 6,
                        fontWeight: '600',
                        color: colors.color_TextNormal,
                        fontFamily: FontFamily.semibold,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                      {parsedUser
                        ? parsedUser.fullName && parsedUser.fullName.length > 20
                          ? parsedUser.fullName.substring(0, 20) + '...'
                          : parsedUser.fullName
                        : ''}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.color_TextNormal,
                      fontFamily: FontFamily.semibold,
                      fontWeight: '400',
                    }}>
                    {parsedUser ? '@' + parsedUser.userName : ''}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          width: 300,
        },
        headerLeft: () => <CustomDrawerIcon />,
        drawerLabelStyle: {
          color: colors.drawerheader, // Set text color to black
        },
      }}
      // initialRouteName="HomePage" // Set the initial route to HomePage
    >
      {
        <Drawer.Screen
          name="HomePage"
          options={{
            headerShown: false,
            drawerItemStyle: {height: 0},
            drawerLabel: 'HomePage',
            title: 'HomePage',
          }}
          component={HomePage}
        />
      }
      <Drawer.Screen
        name="Result"
        options={{
          headerShown: false,
          drawerLabel: 'Result',
          drawerIcon: () => <ResultIcon Color={colors.arrow} />,
        }}
        component={Result}
      />
      <Drawer.Screen
        name="NoteFromAdoro"
        options={{
          headerShown: false,
          drawerLabel: 'Note from adoro',
          drawerIcon: () => <NoteFromAdoroIcon Color={colors.arrow} />,
        }}
        component={NoteFromAdoro}
      />
      {/* <Drawer.Screen
        name="CreateMeme"
        options={{
          headerShown: false,
          drawerLabel: 'Create Meme',
          drawerIcon: () => <PlusIcon color={colors.arrow} />,
        }}
        component={CreateMeme}
      /> */}
      <Drawer.Screen
        name="Wallet"
        options={{
          headerShown: false,
          drawerLabel: 'Wallet',
          drawerIcon: () => <WalletIcon Color={colors.arrow} />,
        }}
        component={Wallet}
      />
      <Drawer.Screen
        name="Template"
        options={{
          headerShown: false,
          drawerLabel: 'Template',
          drawerIcon: () => <TemplateICon Color={colors.arrow} />,
        }}
        component={MemeTemplate}
      />
      <Drawer.Screen
        name="ReferEarn"
        options={{
          headerShown: false,
          drawerLabel: 'Refer & earn',
          drawerIcon: () => <ReferAndEarnIcon Color={colors.arrow} />,
        }}
        initialParams={{userName: parsedUser.userName}}
        component={ReferEarn}
      />
      <Drawer.Screen
        name="Support"
        options={{
          headerShown: false,
          drawerLabel: 'Support',
          drawerIcon: () => <SupportIcon Color={colors.arrow} />,
        }}
        component={Support}
      />
      <Drawer.Screen
        name="Setting"
        options={{
          headerShown: false,
          drawerLabel: 'Settings',
          drawerIcon: () => <SettingIcon Color={colors.arrow} />,
        }}
        component={Setting}
      />
      <Drawer.Screen
        name="GetVerified"
        options={{
          headerShown: false,
          drawerLabel: 'Get Verified',
          drawerIcon: () => <NoteFromAdoroIcon Color={colors.arrow} />,
        }}
        component={GetVerified}
      />
    </Drawer.Navigator>
  );
};

export default HomePageDrawer;

const styles = StyleSheet.create({});
