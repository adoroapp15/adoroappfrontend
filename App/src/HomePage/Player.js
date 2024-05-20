import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';

const Player = props => {
  const {playing, onPlay, onPause, skipForwards, skipBackwards} = props;

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={playing ? onPause : onPlay}>
        {playing ? (
          <Image
            source={require('../assets/pause.png')}
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#fff',
              borderRadius: 25,
            }}
          />
        ) : (
          <Image
            source={require('../assets/play.png')}
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#fff',
              borderRadius: 25,
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 3,
  },
  touchable: {
    padding: 5,
  },
  touchableDisabled: {
    opacity: 0.3,
  },
});

export default Player;
