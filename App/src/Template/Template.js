import * as React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import TemplateNavigator from './TemplateNavigator';
import BackArrow from '../assets/svg/BackArrow';
import FontFamily from '../common/components/FontFamily';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';

function Template({navigation}) {
  const {colors} = useTheme();
  const {dark, toggleTheme} = useStore();
  return (
    <View style={{backgroundColor:colors.color_PageColor, height:'100%'}}>
      {/* <View
        style={{
          flexDirection: 'row',
          margin: 10,
          backgroundColor: 'white',
          borderRadius: 15,
        }}>
        <Image
          style={{top: 12, height: 20, width: 20}}
          source={require('../assets/Search.png')}
        />
        <TextInput
          style={styles.input}
          //onChangeText={setTalk}
          //value={talk}
          placeholder="  Search templates.."
        />
      </View> */}
      <View style={{flexDirection: 'row', backgroundColor: colors.color_TabBarColor,height:56}}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10,alignSelf:'center'}}
          onPress={() => navigation.push('Template')}>
          <BackArrow color={colors.arrow}/>
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: 16,
            top:5
          }}>
          Browse Template
        </Text>
      </View>

      <TemplateNavigator />
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    // backgroundColor: 'gray',
    margin: 10,
    marginTop: 50,
    alignItems: 'center',
  },
});

export default Template;
