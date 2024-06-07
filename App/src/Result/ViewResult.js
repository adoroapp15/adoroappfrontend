import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import FontFamily from '../common/components/FontFamily';
import BackArrow from '../assets/svg/BackArrow';
 
const ViewResult = ({navigation, route}) => {
  const {result} = route.params; // Assuming results is an array
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();
  console.log('resulttttttttttttt', result);
 
  return (
    <View style={{backgroundColor: colors.color_PageColor, height: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.color_TabBarColor,
          height: 56,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => navigation.push('Result')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: 20,
          }}>
          View Result
        </Text>
      </View>
      {result.map((result, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            marginTop: 10,
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 8,
            width: '95%',
            alignSelf: 'center',
            paddingBottom: 8,
            backgroundColor: colors.color_CardColorResult,
            borderRadius: 10,
            gap: 15,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontFamily: FontFamily.semibold,
              color: colors.color_TextNormal,
            }}>
            {index + 1}.
          </Text>
          <Text
            style={{
              flex: 1,
              alignSelf: 'center',
              color: colors.color_TextNormal,
              fontSize: 16,
              fontFamily: FontFamily.semibold,
              fontWeight: '600',
            }}>
            {result.userName}
          </Text>
        </View>
      ))}
    </View>
  );
};
 
export default ViewResult;
 
const styles = StyleSheet.create({});
 