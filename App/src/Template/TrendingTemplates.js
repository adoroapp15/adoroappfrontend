import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import BackArrow from '../assets/svg/BackArrow';
import FontFamily from '../common/components/FontFamily';
import TemplateItem from './TemplateItem';

const TrendingTemplates = ({navigation, route}) => {
  const {colors} = useTheme();
  const {selectedItem, data} = route.params;


  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          height: 56,
          backgroundColor: colors.color_TabBarColor,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => navigation.push('Trending Template')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: 20,
          }}>
          Trending Template
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => <TemplateItem item={item} />}
        keyExtractor={(item, index) => index.toString()} 
      />
    </>
  );
};

export default TrendingTemplates;
