// import React from 'react';
// import {View, Image} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import Login from '../Login/Login';
// import Signup from '../Signup/Signup';

// const Tab = createMaterialTopTabNavigator();

// const TopTabNavigation = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarStyle: {
//           backgroundColor: 'white',
//           top: 10,
//           zIndex: 0,
//           borderRadius: 15,
//           height: 60,
//         },
//         tabBarIndicatorStyle: {
//           height: 0, // Hides the indicator line
//         },
//       }}>
//       <Tab.Screen name="Login" component={Login} />
//       <Tab.Screen name="Signup" component={Signup} />
//     </Tab.Navigator>
//   );
// };
// export default TopTabNavigation;

// import React from 'react';
// import {View, Image, StyleSheet} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import Login from '../Login/Login';
// import Signup from '../Signup/Signup';

// const Tab = createMaterialTopTabNavigator();

// const TopTabNavigation = () => {
//   return (
//     <View style={styles.container}>
//       <Tab.Navigator
//         tabBar={props => {
//           return (
//             <LinearGradient
//               colors={[
//                 'rgba(0,255,255,0.4)',
//                 'rgba(255,192,203,1)',
//                 'rgba(255,255,0,0.5)',
//               ]}
//               start={{x: 0, y: 0}}
//               end={{x: 1, y: 1}}>
//             </LinearGradient>
//           );
//         }}
//         screenOptions={{
//           tabBarStyle: {
//             backgroundColor: 'transparent', // Set tab bar background to transparent
//             elevation: 0, // Remove shadow on Android
//             shadowOpacity: 0, // Remove shadow on iOS
//             position: 'absolute', // Position tabs absolutely
//             top: 0, // Align tabs to the top
//             left: 0,
//             right: 0,
//             height: 60,
//             borderTopLeftRadius: 20,
//             borderTopRightRadius: 20,
//             // borderRadius: 20,
//             zIndex: 1, // Ensure tabs appear below content
//           },
//           tabBarIndicatorStyle: {
//             height: 0, // Hides the indicator line
//           },
//         }}>
//         <Tab.Screen name="Login" component={Login} />
//         <Tab.Screen name="Signup" component={Signup} />
//       </Tab.Navigator>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'transparent', // Set background color to transparent
//   },
//   content: {
//     flex: 1,
//     position: 'relative', // Ensure content is positioned relative to allow absolute positioning of tabs
//   },
//   gradient: {
//     ...StyleSheet.absoluteFillObject, // Position the gradient absolutely to cover the entire screen
//   },
// });

// export default TopTabNavigation;

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
