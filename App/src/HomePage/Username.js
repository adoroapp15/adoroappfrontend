import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
 
const data = [
  {id: '1', source: require('../assets/Savage.png')},
  {id: '2', source: require('../assets/Savage.png')},
  {id: '3', source: require('../assets/Savage.png')},
  {id: '4', source: require('../assets/Savage.png')},
  {id: '5', source: require('../assets/Savage.png')},
  {id: '6', source: require('../assets/Savage.png')},
  {id: '7', source: require('../assets/Savage.png')},
  {id: '8', source: require('../assets/Savage.png')},
  {id: '9', source: require('../assets/Savage.png')},
  {id: '10', source: require('../assets/Savage.png')},
  {id: '11', source: require('../assets/Savage.png')},
  {id: '12', source: require('../assets/Savage.png')},
  {id: '13', source: require('../assets/Savage.png')},
  {id: '14', source: require('../assets/Savage.png')},
  {id: '15', source: require('../assets/Savage.png')},
];
const AllPosts = () => (
  <ScrollView>
    <FlatList
      data={data}
      numColumns={3}
      renderItem={({item, index}) => (
        <View
          style={{
            flex: 1,
            aspectRatio: 1,
            margin: 3,
          }}>
          <Image
            key={index}
            source={item.source}
            style={{width: '100%', height: '100%', borderRadius: 12}}
          />
        </View>
      )}
    />
  </ScrollView>
);
 
const Mentions = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'blue',
    }}
  />
);
const renderScene = SceneMap({
  first: AllPosts,
  second: Mentions,
});
const Username = ({navigation}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [follow, setFollow] = useState(false);
 
  const [routes] = useState([
    {key: 'first', title: 'AllPosts'},
    {key: 'second', title: 'Mentions'},
  ]);
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: '#242760',
      }}
      style={{
        backgroundColor: 'white',
        height: 44,
      }}
      renderLabel={({focused, route}) => (
        <Text style={[{color: focused ? 'black' : 'gray'}]}>{route.title}</Text>
      )}
    />
  );
 
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <StatusBar backgroundColor={'gray'} />
      <View>
        <Image
          source={require('../assets/Background.png')}
          resizeMode="cover"
          style={{
            height: 120,
            width: '100%',
          }}
        />
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          source={require('../assets/Profile.png')}
          resizeMode="contain"
          style={{
            height: 80,
            width: 80,
            borderRadius: 999,
            borderWidth: 2,
            marginTop: -50,
          }}
        />
        <Text
          style={{
            color: '#07142E',
            fontWeight: '800',
          }}>
          Rahul Singh
        </Text>
        <Text
          style={{
            color: '#6F7F92',
            fontWeight: '500',
          }}>
          @rahulsingh
        </Text>
        <View
          style={{
            paddingVertical: 15,
            gap: 50,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                color: '#6F7F92',
              }}>
              Posts
            </Text>
            <Text
              style={{
                color: '#07142E',
                fontWeight: '800',
              }}>
              0
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Followers/Following')}>
              <Text
                style={{
                  color: '#6F7F92',
                }}>
                Followers
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: '#07142E',
                fontWeight: '800',
              }}>
              0
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <TouchableOpacity
              onPress={() => () => navigation.navigate('Followers/Following')}>
              <Text
                style={{
                  color: '#6F7F92',
                }}>
                Following
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: '#07142E',
                fontWeight: '800',
              }}>
              0
            </Text>
          </View>
        </View>
        <View>
          {!follow ? (
            <LinearGradient
              colors={[
                'rgba(0,255,255,0.4)',
                'rgba(255,192,203,1)',
                'rgba(255,255,0,0.5)',
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={{
                width: 330,
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                marginHorizontal: 8,
              }}>
              <TouchableOpacity onPress={() => setFollow(true)}>
                <Text
                  style={{
                    color: 'white',
                    alignItems: 'center',
                    fontWeight: '800',
                  }}>
                  Follow
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  width: 165,
                  height: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  marginHorizontal: 8,
                }}
                onPress={() => setFollow(false)}>
                <Text style={{color: 'black'}}>Following</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 165,
                  height: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  marginHorizontal: 8,
                }}
                onPress={() => navigation.navigate('Chat')}>
                <Text>Message</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          marginHorizontal: 22,
          marginTop: -170,
          backgroundColor: 'white',
        }}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          initialLayout={{width: layout.width}}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
        />
      </View>
    </SafeAreaView>
  );
};
 
export default Username;
 
const styles = StyleSheet.create({});
 