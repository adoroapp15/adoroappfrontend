import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  useWindowDimensions,
  FlatList,
  Alert,
} from 'react-native';
import FontFamily from '../common/components/FontFamily';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {config} from '../config';
import SearchIcon from '../assets/svg/Search';
import CancelIcon from '../assets/svg/CancelIcon';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import Size from '../common/components/Size';

const Search = ({navigation, post}) => {
  const layout = useWindowDimensions();
  const {dark, toggleTheme} = useStore();
  const {colors} = useTheme();

  const [index, setIndex] = useState(0);
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState({});

  const [routes] = React.useState([
    {key: 'first', title: 'Profile'},
    {key: 'second', title: 'Campaign'},
    {key: 'third', title: 'Contest'},
  ]);
  React.useEffect(() => {
    fetchData();
    const unsubscribe = navigation.addListener('focus', () => {
      setIndex(0); // Reset tab index to 0
    });
    return unsubscribe;
  }, [navigation]);
  const fetchData = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      const parsedUser = JSON.parse(user);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const FirstRoute = () => {
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
      setFilteredData(data);
    }, [data]);
    const handlenavigation = async (mobileNo, profile) => {
      console.log('ddd', mobileNo, profile);
      if (user.mobileNo == mobileNo) {
        navigation.navigate('UserProfile');
      } else {
        navigation.navigate('Profile', {
          mobileNo,
          profile,
        });
      }
    };

    useEffect(() => {
      handleFilter(search);
    }, [search]);

    const handleFilter = searchword => {
      const newFilter = data.filter(value => {
        const searchableText = value.userName.toLowerCase();
        return searchableText.includes(searchword.toLowerCase());
      });
      newFilter.sort((a, b) => a.userName.localeCompare(b.userName));
      setFilteredData(newFilter);
    };

    return (
      <View style={{backgroundColor: colors.color_PageColor, height: '100%'}}>
        <View style={styles.searchContainer}>
          <View style={{alignSelf: 'center', marginLeft: 15}}>
            <SearchIcon color={colors.arrow} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Search.."
            value={search}
            onChangeText={text => setSearch(text)}
            placeholderTextColor={colors.color_PlaceHolderColor}
          />
          {search ? (
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setSearch('')}>
              <CancelIcon color={colors.arrow} />
            </TouchableOpacity>
          ) : null}
        </View>
        <FlatList
          data={filteredData}
          keyExtractor={item => item.Id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.listItem}
              // onPress={() => {
              //   navigation.navigate('Profile', {
              //     mobileNo: item.mobileNo,
              //     profile: item.profile,
              //   });
              // }}
              onPress={() => {
                handlenavigation(item.mobileNo, item.profile);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  marginTop: 25,
                  marginLeft: 10,
                }}>
                <Image
                  source={
                    item.ProfileDp
                      ? {
                          uri: `https://adoro-data-storage.s3.ap-south-1.amazonaws.com/UserProfilePic/${item.ProfileDp}`,
                        }
                      : require('../assets/Profile.png')
                  }
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 99,
                    alignSelf: 'center',
                  }}
                />
                <View style={{flexDirection: 'column', alignSelf: 'center'}}>
                  <Text
                    style={{
                      color: colors.color_TextNormal,
                      fontFamily: FontFamily.semibold,
                    }}>
                    {item.fullName}
                  </Text>
                  <Text
                    style={{
                      color: colors.color_TextNormal,
                      fontFamily: FontFamily.medium,
                      fontSize: Size.paragraph,
                    }}>
                    {'@' + item.userName}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };
  const SecondRoute = () => {
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
      // Set initial data
      setFilteredData(campaign);
    }, []);
    useEffect(() => {
      handleFilter(search);
    }, [search]);

    const handleFilter = searchword => {
      const newFilter = campaign.filter(value => {
        // Modify as per your data structure
        const searchableText = value.campaign_name.toLowerCase();
        return searchableText.includes(searchword.toLowerCase());
      });
      // Sort the filtered data alphabetically
      const sortedFilter = newFilter.sort((a, b) =>
        a.campaign_name.localeCompare(b.campaign_name),
      );
      setFilteredData(sortedFilter);
    };
    return (
      <View style={{backgroundColor: colors.color_PageColor, height: '100%'}}>
        <View style={styles.searchContainer}>
          <View style={{alignSelf: 'center', marginLeft: 15}}>
            <SearchIcon color={colors.arrow} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Search.."
            value={search}
            onChangeText={text => {
              setSearch(text);
              handleFilter(text);
            }}
            placeholderTextColor={colors.color_PlaceHolderColor}
          />
          {search ? (
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setSearch('')}>
              <CancelIcon color={colors.arrow} />
            </TouchableOpacity>
          ) : null}
        </View>
        <FlatList
          data={filteredData}
          keyExtractor={item => item.Id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => {
                navigation.navigate('Campaign', {
                  item,
                });
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  marginTop: 25,
                  marginLeft: 10,
                }}>
                <Image
                  source={{
                    uri: `https://marqueberrry.s3.ap-south-1.amazonaws.com/marqueberrylogofiles/${item.Logo}`,
                  }}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 99,
                    alignSelf: 'center',
                  }}
                />
                <Text
                  style={{
                    // margin: 10,
                    alignSelf: 'center',
                    color: colors.color_TextNormal,
                    fontFamily: FontFamily.semibold,
                  }}>
                  {item.campaign_name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const ThirdRoute = () => {
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
      // Set initial data
      setFilteredData(contest);
    }, []);
    useEffect(() => {
      handleFilter(search);
    }, [search]);

    const handleFilter = searchword => {
      const newFilter = contest.filter(value => {
        // Modify as per your data structure
        const searchableText = value.contestName.toLowerCase();
        return searchableText.includes(searchword.toLowerCase());
      });
      const sortedFilter = newFilter.sort((a, b) =>
        a.contestName.localeCompare(b.contestName),
      );

      setFilteredData(newFilter);
    };

    return (
      <View style={{backgroundColor: colors.color_PageColor, height: '100%'}}>
        <View style={styles.searchContainer}>
          <View style={{alignSelf: 'center', marginLeft: 15}}>
            <SearchIcon color={colors.arrow} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Search.."
            value={search}
            onChangeText={text => {
              setSearch(text);
              handleFilter(text);
            }}
            placeholderTextColor={colors.color_PlaceHolderColor}
          />
          {search ? (
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setSearch('')}>
              <CancelIcon color={colors.arrow} />
            </TouchableOpacity>
          ) : null}
        </View>
        <FlatList
          data={filteredData}
          keyExtractor={item => item.Id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => {
                navigation.navigate('Campaign', {
                  item,
                });
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  marginTop: 25,
                  marginLeft: 10,
                }}>
                <Image
                  source={{
                    uri: `https://adoro-data-storage.s3.ap-south-1.amazonaws.com/Contest/${item.fileName}`,
                  }}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 99,
                    alignSelf: 'center',
                  }}
                />
                <Text
                  style={{
                    // margin: 10,
                    alignSelf: 'center',
                    color: colors.color_TextNormal,
                    fontFamily: FontFamily.semibold,
                  }}>
                  {item.contestName}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const handleIndexChange = newIndex => {
    setIndex(newIndex);
  };

  const [data, setData] = useState([]);
  const [campaign, setCampaign] = useState([]);
  const [contest, setContest] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${config.production}/app/user/allusers`,
      );
      if (response.data.status === 200) {
        setData(response.data.data);
      } else {
        Alert.alert('Error in fetching User Details');
      }

      const res = await axios.get(
        `${config.production}/app/user/campaigndetails`,
      );
      setCampaign(res.data.campaigndetails);

      const rescontest = await axios.get(
        `${config.production}/app/user/getallcontest`,
      );
      setContest(rescontest.data.contest);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error in fetching User Details');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.color_PageColor}}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={handleIndexChange}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={{backgroundColor: colors.color_TabBarColor}}
            indicatorStyle={{backgroundColor: colors.color_TextNormal}}
            labelStyle={styles.tabLabel}
            activeColor={colors.color_TextNormal} // Set the active tint color
            inactiveColor={'gray'}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#E6E6E6',
    margin: 10,
    borderRadius: 15,
  },
  input: {
    flex: 1,
    color: '#07142E',
    fontSize: 14,
    fontFamily: FontFamily.semibold,
    marginLeft: 10,
  },
  closeIcon: {
    alignSelf: 'center',
    marginRight: 15,
  },
  tabBar: {
    backgroundColor: 'white',
  },
  tabLabel: {
    fontSize: Size.title,
    fontFamily: FontFamily.semibold,
  },
});

export default Search;
