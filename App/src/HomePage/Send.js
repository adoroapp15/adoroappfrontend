import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import FontFamily from '../common/components/FontFamily';

const Send = () => {
  const [send, setSend] = React.useState(false);
  const [send1, setSend1] = React.useState(false);
  const [send2, setSend2] = React.useState(false);
  const postSend1 = () => {
    setSend1(true);
  };
  const postSend2 = () => {
    setSend2(true);
  };
  const postSend = () => {
    setSend(true);
  };
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View
        style={{
          // borderWidth: 0.3,
          flexDirection: 'row',
          backgroundColor: 'white',
          gap: 5,
        }}>
        <Image style={{margin: 10}} source={require('../assets/User.png')} />
        <View style={{flexDirection: 'column', top: 8}}>
          <Text
            style={{
              color: '#07142E',
              fontSize: 16,
              fontWeight: '600',
              fontFamily: FontFamily.bold,
            }}>
            Jane ui_ux
          </Text>
          <Text
            style={{
              color: '#6F7F92',
              fontSize: 14,
              fontWeight: '500',
              fontFamily: FontFamily.semibold,
            }}>
            @jane_cooper
          </Text>
        </View>
        {send ? (
          <TouchableOpacity
            // style={{margin: 140, marginTop: 150}}
            style={{
              alignSelf: 'center',
              left: 55,
              width: 130,
              height: 35,
              borderRadius: 8,
              backgroundColor: '#2F65B9',
            }}
            onPress={postSend}>
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                textAlign: 'center',
                fontSize: 16,
                top: 5,
              }}>
              Sent
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            // style={{margin: 140, marginTop: 150}}
            style={{left: 50, alignSelf: 'center'}}
            onPress={postSend}>
            <LinearGradient
              colors={[
                'rgba(0,255,255,0.4)',
                'rgba(255,192,203,1)',
                'rgba(255,255,0,0.5)',
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={{
                // bottom: 25,
                width: 130,
                padding: 7,
                justifyContent: 'center',
                borderRadius: 8,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  textAlign: 'center',
                  fontSize: 16,
                }}>
                Send
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          marginTop: 10,
          marginBottom: 10,
          height: '0.1%',
          width: '90%',
          alignSelf: 'center',
          backgroundColor: '#F1F1F1',
        }}
      />
      <View
        style={{
          // borderWidth: 0.3,
          flexDirection: 'row',
          backgroundColor: 'white',
          gap: 5,
        }}>
        <Image style={{margin: 10}} source={require('../assets/User.png')} />
        <View style={{flexDirection: 'column', top: 8}}>
          <Text
            style={{
              color: '#07142E',
              fontSize: 16,
              fontWeight: '600',
              fontFamily: FontFamily.bold,
            }}>
            Jane ui_ux
          </Text>
          <Text
            style={{
              color: '#6F7F92',
              fontSize: 14,
              fontWeight: '500',
              fontFamily: FontFamily.semibold,
            }}>
            @jane_cooper
          </Text>
        </View>
        {send ? (
          <TouchableOpacity
            // style={{margin: 140, marginTop: 150}}
            style={{
              alignSelf: 'center',
              left: 55,
              width: 130,
              height: 35,
              borderRadius: 8,
              backgroundColor: '#2F65B9',
            }}
            onPress={postSend}>
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                textAlign: 'center',
                fontSize: 16,
                top: 5,
              }}>
              Sent
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            // style={{margin: 140, marginTop: 150}}
            style={{top: 10, left: 50}}
            onPress={postSend}>
            <LinearGradient
              colors={[
                'rgba(0,255,255,0.4)',
                'rgba(255,192,203,1)',
                'rgba(255,255,0,0.5)',
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={{
                // bottom: 25,
                width: 130,
                padding: 7,
                justifyContent: 'center',
                borderRadius: 8,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  textAlign: 'center',
                  fontSize: 16,
                }}>
                Send
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          marginTop: 10,
          marginBottom: 10,
          height: '0.1%',
          width: '90%',
          alignSelf: 'center',
          backgroundColor: '#F1F1F1',
        }}
      />
      <View
        style={{
          // borderWidth: 0.3,
          flexDirection: 'row',
          backgroundColor: 'white',
          gap: 5,
        }}>
        <Image style={{margin: 10}} source={require('../assets/User.png')} />
        <View style={{flexDirection: 'column', top: 8}}>
          <Text
            style={{
              color: '#07142E',
              fontSize: 16,
              fontWeight: '600',
              fontFamily: FontFamily.bold,
            }}>
            Jane ui_ux
          </Text>
          <Text
            style={{
              color: '#6F7F92',
              fontSize: 14,
              fontWeight: '500',
              fontFamily: FontFamily.semibold,
            }}>
            @jane_cooper
          </Text>
        </View>
        {send ? (
          <TouchableOpacity
            // style={{margin: 140, marginTop: 150}}
            style={{
              alignSelf: 'center',
              left: 55,
              width: 130,
              height: 35,
              borderRadius: 8,
              backgroundColor: '#2F65B9',
            }}
            onPress={postSend}>
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                textAlign: 'center',
                fontSize: 16,
                top: 5,
              }}>
              Sent
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            // style={{margin: 140, marginTop: 150}}
            style={{top: 10, left: 50}}
            onPress={postSend}>
            <LinearGradient
              colors={[
                'rgba(0,255,255,0.4)',
                'rgba(255,192,203,1)',
                'rgba(255,255,0,0.5)',
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={{
                // bottom: 25,
                width: 130,
                padding: 7,
                justifyContent: 'center',
                borderRadius: 8,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  textAlign: 'center',
                  fontSize: 16,
                }}>
                Send
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          marginTop: 10,
          marginBottom: 10,
          height: '0.1%',
          width: '90%',
          alignSelf: 'center',
          backgroundColor: '#F1F1F1',
        }}
      />
    </View>
  );
};

export default Send;

const styles = StyleSheet.create({});
