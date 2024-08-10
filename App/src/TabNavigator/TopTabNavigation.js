import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import FontFamily from '../common/components/FontFamily';
import Size from '../common/components/Size';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigation = () => {
  // Define colors for the LinearGradient
  const linearGradientColors = [
    'rgba(0,255,255,0.4)',
    'rgba(255,192,203,1)',
    'rgba(255,255,0,0.5)',
  ];

  return (
    <Tab.Navigator
      tabBar={props => {
        return (
          <View style={styles.tabBar}>
            <LinearGradient
              colors={linearGradientColors}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.tabBarGradient} // Apply styles to the LinearGradient
            />
            {props.state.routes.map((route, index) => {
              const {options} = props.descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;
              const isFocused = props.state.index === index;

              const onPress = () => {
                const event = props.navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  props.navigation.navigate(route.name);
                }
              };

              const onLongPress = () => {
                props.navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };

              return (
                <TouchableOpacity
                  key={index}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? {selected: true} : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={styles.tabItem}>
                  <Text
                    style={{
                      color: isFocused ? 'white' : 'skyblue',
                      fontSize: Size.tabtext,
                      top: 20,
                      fontFamily: FontFamily.semibold,
                    }}>
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }}>
      <Tab.Screen name="LOGIN" component={Login} />
      <Tab.Screen name="SIGN UP" component={Signup} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 1,
    // flexGrow:1,
  },
  tabBarGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TopTabNavigation;
