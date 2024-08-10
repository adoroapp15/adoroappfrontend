import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React from 'react';

const Apply = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{
          margin: 20,
          alignSelf: 'center',
          justifyContent: 'center',
        }}
        source={require('../assets/Tick.png')}
      />
      <TouchableOpacity style={{}}>
        {' '}
        <Image
          style={{alignSelf: 'center', justifyContent: 'center', gap: 5}}
          source={require('../assets/Submit.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Apply;

const styles = StyleSheet.create({});
