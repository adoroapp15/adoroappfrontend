import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import PropertyTypeButton from '../common/components/PropertyTypeButton';


const AllPostTemplatesTypeOptions = ({accountType, setaccountType, style}) => {
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {...style}]}>
      <PropertyTypeButton
        isActive={accountType === 1}
        onPress={() => setaccountType(1)}
        title={'All posts'}
        activeStyle={colors.color_TabBarColor}
        inactiveStyle={colors.color_TabBarColor}
        activeTextStyle={colors.color_TabActiveTxt}
        inactiveTextStyle={'gray'}
        activeIndicatorStyle={colors.color_TabIndicatorcolor}
        inactiveIndicatorStyle={colors.color_TabBarColor}
      />
      <PropertyTypeButton
        isActive={accountType === 2}
        onPress={() => setaccountType(2)}
        title={'My templates'}
        activeStyle={colors.color_TabBarColor}
        inactiveStyle={colors.color_TabBarColor}
        activeTextStyle={colors.color_TabActiveTxt}
        inactiveTextStyle={'gray'}
        activeIndicatorStyle={colors.color_TabIndicatorcolor}
        inactiveIndicatorStyle={colors.color_TabBarColor}
      />
    </View>
  );
};

export default AllPostTemplatesTypeOptions;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
