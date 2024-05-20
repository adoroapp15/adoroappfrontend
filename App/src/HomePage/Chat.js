import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import CameraIcon from '../assets/svg/CameraIcon';

const Chat = () => {
  const [chat, setChat] = React.useState('');
  const [profile, setProfile] = React.useState(null);

  const imagePick = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setProfile(image.path);
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.messageContainer}>
            <TouchableOpacity style={{marginLeft: 20}} onPress={imagePick}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 20,
                  backgroundColor: '#2F65B9',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CameraIcon />
              </View>
            </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              onChangeText={setChat}
              value={chat}
              placeholder="Messages.."
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    right: 10,
    alignItems: 'center',
  },
  cameraIcon: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginLeft: 30,
  },
  textInput: {
    flex: 1,
    height: 40,
    // borderColor: '#000000',
    // borderBottomWidth: 1,
    // marginBottom: 20,
    marginLeft: 10,
  },
});

export default Chat;
