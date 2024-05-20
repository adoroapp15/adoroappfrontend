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
        // backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        // top: '30%',
      }}>
      <Image
        style={{
          margin: 20,
          alignSelf: 'center',
          justifyContent: 'center',
        }}
        source={require('../assets/Tick.png')}
      />
      <TouchableOpacity
        style={{}}
        // onPress={Alert.alert("Applied Successfully") }
      >
        {/*onPress={() => navigation.navigate('InterestScreen')}> */}
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
