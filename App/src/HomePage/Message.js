import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import FontFamily from '../common/components/FontFamily';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const Message = ({navigation}) => {
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View
        style={{
          height: 65,
          width: 355,
          flexDirection: 'row',
          margin: 2,
        }}>
        <Image style={{margin: 10}} source={require('../assets/User.png')} />
        <View style={{flexDirection: 'column', alignSelf: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Text
              style={{
                color: '#07142E',
                fontSize: 16,
                fontFamily: FontFamily.bold,
              }}>
              username
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', gap:5 }}>
            <Text
              style={{
                color: '#6F7F92',
                fontSize: 14,
                fontFamily: FontFamily.semibold,
              }}>
              Don't know
            </Text>
            <View
              style={{
                backgroundColor: '#6F7F92',
                alignSelf: 'center',
                width:3,
                height: 3,
                borderRadius: 5,
              }}
            />
            <Text
              style={{
                color: '#6F7F92',
                fontSize: 14,
                fontFamily: FontFamily.semibold,
              }}>
              21h
            </Text>
          </View>
        </View>
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
          height: 65,
          width: 355,
          flexDirection: 'row',
          margin: 2,
        }}>
        <Image style={{margin: 10}} source={require('../assets/User.png')} />
        <View style={{flexDirection: 'column', top: 8}}>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Text
              style={{
                color: '#07142E',
                fontSize: 16,
                fontFamily: FontFamily.bold,
              }}>
              username
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: '#6F7F92',
              fontSize: 14,
              fontFamily: FontFamily.semibold,
            }}>
            Don't know .21h
          </Text>
        </View>
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
          height: 65,
          margin: 2,
          width: 355,
          flexDirection: 'row',
        }}>
        <Image style={{margin: 10}} source={require('../assets/User.png')} />
        <View style={{flexDirection: 'column', top: 8}}>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Text
              style={{
                color: '#07142E',
                fontSize: 16,
                fontWeight: '600',
                fontFamily: FontFamily.bold,
              }}>
              username
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: '#6F7F92',
              fontSize: 14,
              fontWeight: '500',
              fontFamily: FontFamily.semibold,
            }}>
            Don't know .21h
          </Text>
        </View>
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
          margin: 2,
          height: 65,
          width: 355,
          flexDirection: 'row',
        }}>
        <Image style={{margin: 10}} source={require('../assets/User.png')} />
        <View style={{flexDirection: 'column', top: 8}}>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Text
              style={{
                color: '#07142E',
                fontSize: 16,
                fontWeight: '600',
                fontFamily: FontFamily.bold,
              }}>
              username
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: '#6F7F92',
              fontSize: 14,
              fontWeight: '500',
              fontFamily: FontFamily.semibold,
            }}>
            Don't know .21h
          </Text>
        </View>
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

export default Message;

const styles = StyleSheet.create({});
