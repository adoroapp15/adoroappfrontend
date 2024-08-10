import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import BackArrow from '../assets/svg/BackArrow';
import {useTheme} from '@react-navigation/native';
import FontFamily from '../common/components/FontFamily';
import LinearGradient from 'react-native-linear-gradient';
import PlusIcon from '../assets/svg/PlusIcon';

const CreateMeme = ({navigation}) => {
  const {colors} = useTheme();
  const [selectedLayout, setSelectedLayout] = useState(null);
  const handleLayoutSelect = layout => {
    setSelectedLayout(layout);
  };
  const goToNextScreen = () => {
    navigation.navigate('NextScreen', {selectedLayout});
  };

  return (
    <ScrollView
      style={{
        flexGrow: 1,
        backgroundColor: colors.color_TabBarColor,
      }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.color_TabBarColor,
          zIndex: 1,
          height: 56,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => navigation.navigate('CreatePost')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: 20,
          }}>
          Create Meme
        </Text>
      </View>
      <Text
        style={{
          alignSelf: 'center',
          fontWeight: '700',
          color: 'black',
          marginTop: 20,
          fontSize: 20,
        }}>
        Choose layout
      </Text>
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
          alignSelf: 'center',
          marginTop: 20,
        }}>
        <TouchableOpacity
          style={{
            height: 250,
            width: '40%',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: 'black',
            marginLeft: 5,
            position: 'relative',
          }}
          onPress={() => handleLayoutSelect(1)}>
          <CheckBox
            value={selectedLayout === 1}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: colors.color_Logintext,
            }}
            onChange={() => handleLayoutSelect(1)}
          />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: '600',
                marginBottom: 30,
              }}>
              Top text
            </Text>
            <View
              style={{height: 1, width: '100%', backgroundColor: 'black'}}
            />
            <Image
              source={require('../assets/gallery.png')}
              style={{height: 80, width: 140}}
            />
            <View
              style={{height: 1, width: '100%', backgroundColor: 'black'}}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: '600',
                marginTop: 20,
              }}>
              Bottom Text
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 250,
            width: '40%',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: 'black',
            position: 'relative',
          }}
          onPress={() => handleLayoutSelect(2)}>
          <CheckBox
            value={selectedLayout === 2}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,

              color: colors.color_Logintext,
            }}
            onChange={() => handleLayoutSelect(2)}
          />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: '600',
                marginBottom: 30,
              }}>
              Top text
            </Text>
            <View
              style={{height: 1, width: '100%', backgroundColor: 'black'}}
            />
            <Image
              source={require('../assets/gallery.png')}
              style={{height: 80, width: 140, marginTop: 20}}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
          alignSelf: 'center',
          marginTop: 20,
        }}>
        <TouchableOpacity
          style={{
            height: 250,
            width: '40%',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: 'black',
            marginLeft: 5,
            position: 'relative',
          }}
          onPress={() => handleLayoutSelect(3)}>
          <CheckBox
            value={selectedLayout === 3}
            style={{
              position: 'absolute',
              top: 0,
              right: 10,
              color: colors.color_Logintext,
            }}
            onChange={() => handleLayoutSelect(3)}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 30,
            }}>
            <Image
              source={require('../assets/gallery.png')}
              style={{height: 80, width: 140, top: 15}}
            />
            <View
              style={{height: 1, width: '100%', backgroundColor: 'black'}}
            />
            <Image
              source={require('../assets/gallery.png')}
              style={{height: 80, width: 140}}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 250,
            width: '40%',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: 'black',
            position: 'relative',
          }}
          onPress={() => handleLayoutSelect(4)}>
          <CheckBox
            value={selectedLayout === 4}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: colors.color_Logintext,
            }}
            onChange={() => handleLayoutSelect(4)}
          />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignSelf: 'center', gap: 20}}>
              <Image
                source={require('../assets/gallery.png')}
                style={{height: 80, width: 60, backgroundColor: 'white'}}
              />
              <View
                style={{
                  height: '255%',
                  width: 1,
                  backgroundColor: 'black',
                  // marginTop: 10,
                  // marginBottom:50,
                }}
              />
              <Text
                style={{
                  // flex:1,
                  color: 'black',
                  fontSize: 20,
                  fontWeight: '600',
                  alignSelf: 'center',
                  // marginRight:5
                }}>
                Text
              </Text>
            </View>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: 'black',
                // marginTop: 10,
                // marginBottom: 50,
              }}
            />
            <View style={{flexDirection: 'row', alignSelf: 'center', gap: 20}}>
              <Image
                source={require('../assets/gallery.png')}
                style={{height: 80, width: 60, alignSelf: 'center'}}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: '600',
                  alignSelf: 'center',
                }}>
                Text
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
          alignSelf: 'center',
          marginTop: 20,
        }}>
        <TouchableOpacity
          style={{
            height: 250,
            width: '40%',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: 'black',
            marginLeft: 5,
            position: 'relative',
          }}
          onPress={() => handleLayoutSelect(5)}>
          <CheckBox
            value={selectedLayout === 5}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: colors.color_Logintext,
            }}
            onChange={() => handleLayoutSelect(5)}
          />
          <View style={{}}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: '600',
                alignSelf: 'center',
                marginTop: 10,
              }}>
              Text
            </Text>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: 'black',
                marginTop: 10,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 70,
                gap: 5,
              }}>
              <Image
                source={require('../assets/gallery.png')}
                style={{height: 60, width: 60}}
              />
              <View
                style={{
                  height: '330%',
                  width: 1,
                  backgroundColor: 'black',
                  // marginBottom: 10,
                }}
              />
              <Image
                source={require('../assets/gallery.png')}
                style={{height: 60, width: 60}}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 250,
            width: '40%',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: 'black',
            position: 'relative',
          }}
          onPress={() => handleLayoutSelect(6)}>
          <CheckBox
            value={selectedLayout === 6}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: colors.color_Logintext,
            }}
            onChange={() => handleLayoutSelect(6)}
          />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../assets/gallery.png')}
              style={{height: 60, width: 60}}
            />
            <View
              style={{height: 1, width: '100%', backgroundColor: 'black'}}
            />

            <Image
              source={require('../assets/gallery.png')}
              style={{height: 60, width: 60}}
            />
            <View
              style={{height: 1, width: '100%', backgroundColor: 'black'}}
            />

            <Image
              source={require('../assets/gallery.png')}
              style={{height: 60, width: 60}}
            />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 20,
height:100,
width:"60%",
            // backgroundColor: selectedLayout ? 'green' : 'gray',
            // padding: 10,
            borderRadius: 5,
          }}
          disabled={!selectedLayout}
          onPress={goToNextScreen}>
      <LinearGradient
        colors={
          selectedLayout
            ? [
                'rgba(0,255,255,0.4)',
                'rgba(255,192,203,1)',
                'rgba(255,255,0,0.5)',
              ]
            : ['#f0f0f0', '#e0e0e0']
        }
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{
          width: '60%',
          height:40,
          alignSelf: 'center',
          marginTop: 10,
          marginBottom: 10,
          alignItems: 'center',
          borderRadius: 10,
        }}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              marginTop:7,
              textAlignVertical: 'center',
              // marginBottom: 15,
            }}>
            Next
          </Text>
      </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateMeme;

const styles = StyleSheet.create({});
