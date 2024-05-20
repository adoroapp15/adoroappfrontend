import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import FontFamily from './FontFamily';

const PropertyTypeButton = ({
  isActive,
  onPress,
  title,
  inactiveStyle,
  activeStyle,
  activeTextStyle,
  inactiveTextStyle,
  activeIndicatorStyle,
  inactiveIndicatorStyle
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text
        style={[
          styles.textstyle,
          {
            backgroundColor: isActive ? activeStyle : inactiveStyle,
            color: isActive ? activeTextStyle : inactiveTextStyle,
          },
        ]}>
        {title}
      </Text>
      <View style={{height:2,backgroundColor:isActive ?  activeIndicatorStyle :  inactiveIndicatorStyle}}>
      </View>
    </TouchableOpacity>
  );
};

export default PropertyTypeButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textstyle: {
    alignItems: 'center',
    fontFamily: FontFamily.semibold,
    textAlign: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    //marginVertical: 2,
    //marginHorizontal: 2,
    fontSize: 16,
  },
});
