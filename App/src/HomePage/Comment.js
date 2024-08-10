// import React, {useState, useEffect, useRef} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   FlatList,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   Platform,
//   Keyboard,
//   ScrollView,
// } from 'react-native';
// import axios from 'axios';
// import {config} from '../config';
// import FontFamily from '../common/components/FontFamily';
// import {useTheme} from '@react-navigation/native';
// import useStore from '../store';
// import Size from '../common/components/Size';
// import CancelIcon from '../assets/svg/CancelIcon';
// import BackArrow from '../assets/svg/BackArrow';

// const Comment = ({navigation, route}) => {
//   const {Id, user, profile} = route.params;
//   const {dark, toggleTheme} = useStore();
//   const {colors} = useTheme();

//   const [comment, setComment] = useState([]);
//   const [replyTextInput, setReplyTextInput] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [replyingToComment, setReplyingToComment] = useState(null);
//   const [chat, setChat] = useState('');
//   const [submittedReply, setSubmittedReply] = useState('');
//   const [isTextInputEmpty, setIsTextInputEmpty] = useState(true);
//   const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

//   const handleTextInputChange = text => {
//     setChat(text);
//     setIsTextInputEmpty(text.trim().length === 0);
//   };

//   const textInputRef = useRef(null);

//   useEffect(() => {
//     if (replyTextInput && !isKeyboardOpen) {
//       textInputRef.current.focus();
//     }
//   }, [replyTextInput, isKeyboardOpen]);

//   const replyTo = item => {
//     setReplyingToComment(item);
//     setReplyTextInput(true);
//     setUserName(item?.userName);
//     setChat(`Replying to @${userName}`);
//   };

//   const keyboardDidShow = () => {
//     setIsKeyboardOpen(true);
//   };

//   const keyboardDidHide = () => {
//     setIsKeyboardOpen(false);
//   };

//   useEffect(() => {
//     Keyboard.addListener('keyboardDidShow', keyboardDidShow);
//     Keyboard.addListener('keyboardDidHide', keyboardDidHide);

//     return () => {
//       Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
//       Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
//     };
//   }, []);

//   const postcomment = async commentText => {
//     try {
//       const res = await axios.post(
//         `${config.production}/app/user/postcomment`,
//         {
//           text: commentText,
//           post_Id: Id,
//           user,
//           profile,
//           parent_id: replyingToComment,
//         },
//       );

//       if (res.status === 200) {
//         getcomment();
//         setChat('');
//         setIsTextInputEmpty(true);
//         if (replyingToComment) {
//           setSubmittedReply(commentText);
//         }
//       }
//     } catch (error) {
//       console.error('Error posting comment:', error);
//     }
//   };

//   const getcomment = async () => {
//     try {
//       const res = await axios.get(
//         `${config.production}/app/user/getallcomment`,
//         {
//           params: {post_id: Id},
//         },
//       );
//       setComment(res.data.comments);
//     } catch (error) {
//       console.error('Error fetching comments:', error);
//     }
//   };

//   useEffect(() => {
//     getcomment();
//   }, []);

//   const CommentItem = ({item}) => {
//     const [heart, setHeart] = useState(false);
//     const [profile, setProfile] = useState(null);
//     const [counter, setCounter] = useState(0);
//     const [showReplyInput, setShowReplyInput] = useState(false);
//     const [reply, setReply] = useState('');
//     const [heart1, setHeart1] = useState(false);
//     const [counter1, setCounter1] = useState(0);

//     const handleHeartPress = () => {
//       setHeart(!heart);
//       setCounter(heart ? counter - 1 : counter + 1);
//     };
//     const handleHeartPress1 = () => {
//       setHeart1(!heart1);
//       setCounter1(heart1 ? counter1 - 1 : counter1 + 1);
//     };
//     const handleReplyPress = () => {
//       setShowReplyInput(true);
//     };

//     return (
//       <>
//         <View style={{marginBottom: 45}}>
//           <View key={item.commentId}>
//             <TouchableOpacity
//               style={{flex: 1}}
//               onPress={() => {
//                 navigation.navigate('Profile', {
//                   mobileNo: item.mobileNo,
//                   profile: item.profile,
//                 });
//               }}>
//               <View style={{flexDirection: 'row', flex: 1}}>
//                 <Image
//                   style={{
//                     width: 40,
//                     height: 40,
//                     margin: 10,
//                     borderRadius: 20,
//                     justifyContent: 'flex-start',
//                   }}
//                   source={
//                     profile
//                       ? {
//                           uri: `https://www.adoro.social/UserProfilePic/${profile}`,
//                         }
//                       : require('../assets/Profile.png')
//                   }
//                   onError={() => console.log('Error loading image')}
//                 />
//                 <Text
//                   style={{
//                     color: colors.color_TextNormal,
//                     alignSelf: 'center',
//                     flex: 1,
//                     fontSize: Size.title,
//                     fontFamily: FontFamily.semibold,
//                   }}>
//                   {'@' + item.userName}
//                 </Text>
//                 <Text
//                   style={{
//                     alignSelf: 'center',
//                     fontFamily: FontFamily.medium,
//                     fontSize: Size.subtitle,
//                     justifyContent: 'flex-end',
//                     marginRight: 10,
//                     color: colors.color_TextNormal,
//                   }}>
//                   1 min ago
//                 </Text>
//               </View>
//             </TouchableOpacity>
//             <Text
//               style={{
//                 left: 10,
//                 fontFamily: FontFamily.semibold,
//                 fontSize: Size.subtitle,
//                 color: colors.color_commentText,
//               }}>
//               {item.text}
//             </Text>
//             <View style={{flexDirection: 'row', gap: 20}}>
//               <TouchableOpacity onPress={handleHeartPress}>
//                 <View
//                   style={{
//                     left: 10,
//                     flexDirection: 'row',
//                     backgroundColor: 'white',
//                     borderRadius: 6,
//                     width: 60,
//                     height: 35,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginTop: 10,
//                   }}>
//                   <Image
//                     style={{
//                       height: 12,
//                       width: 12,
//                       marginRight: 8,
//                       borderColor: heart ? 'red' : '#6F7F92',
//                     }}
//                     source={
//                       heart
//                         ? require('../assets/Heart1.png')
//                         : require('../assets/Heart.png')
//                     }
//                   />
//                   <Text
//                     style={{
//                       color: colors.color_commentText,
//                       fontFamily: FontFamily.medium,
//                       fontSize: Size.subtitle,
//                     }}>
//                     {counter}
//                   </Text>
//                 </View>
//               </TouchableOpacity>

//               <View style={{flex: 1}}>
//                 <TouchableOpacity
//                   style={{
//                     backgroundColor: 'white',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     width: 60,
//                     height: 35,
//                     borderRadius: 6,
//                     marginTop: 10,
//                   }}
//                   onPress={() => {
//                     replyTo(item.Id);
//                     setUserName(item?.userName);
//                   }}>
//                   <Text
//                     style={{
//                       color: colors.color_commentText,
//                       fontFamily: FontFamily.medium,
//                     }}>
//                     Reply
//                   </Text>
//                 </TouchableOpacity>
//                 {comment.map(reply => {
//                   if (reply.reply == item.Id) {
//                     return (
//                       <View
//                         style={{
//                           flexDirection: 'column',
//                         }}>
//                         <View style={{flexDirection: 'column'}}>
//                           <View
//                             key={reply.reply}
//                             style={{
//                               flexDirection: 'row',
//                             }}>
//                             <Image
//                               style={{
//                                 width: 40,
//                                 height: 40,
//                                 margin: 10,
//                                 borderRadius: 20,
//                                 justifyContent: 'flex-start',
//                               }}
//                               source={
//                                 profile
//                                   ? {
//                                       uri: `https://www.adoro.social/UserProfilePic/${profile}`,
//                                     }
//                                   : require('../assets/Profile.png')
//                               }
//                               onError={() => console.log('Error loading image')}
//                             />
//                             <Text
//                               style={{
//                                 color: colors.color_TextNormal,
//                                 alignSelf: 'center',
//                                 flex: 1,
//                                 fontSize: Size.title,
//                                 fontFamily: FontFamily.semibold,
//                               }}>
//                               {'@' + reply.userName}
//                             </Text>
//                             <Text
//                               style={{
//                                 alignSelf: 'center',
//                                 fontFamily: FontFamily.medium,
//                                 fontSize: Size.subtitle,
//                                 justifyContent: 'flex-end',
//                                 marginRight: 10,
//                                 color: colors.color_TextNormal,
//                               }}>
//                               1 min ago
//                             </Text>
//                           </View>
//                         </View>
//                         <Text
//                           style={{
//                             left: 10,
//                             fontFamily: FontFamily.semibold,
//                             fontSize: Size.subtitle,
//                             color: colors.color_commentText,
//                           }}>
//                           {reply.text}
//                         </Text>
//                       </View>
//                     );
//                   }
//                 })}
//               </View>
//             </View>
//           </View>
//         </View>
//       </>
//     );
//   };

//   return (
//     <>
//       <View
//         style={{
//           flexDirection: 'row',
//           backgroundColor: colors.color_TabBarColor,
//           zIndex: 1,
//           height: 56,
//         }}>
//         <TouchableOpacity
//           style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
//           onPress={() => navigation.navigate('HomePage')}>
//           <BackArrow color={colors.arrow} />
//         </TouchableOpacity>
//         <Text
//           style={{
//             color: colors.color_TextNormal,
//             fontFamily: FontFamily.semibold,
//             alignSelf: 'center',
//             fontSize: Size.tabtext,
//           }}>
//           Comment
//         </Text>
//       </View>
//       <View style={{flex: 1, backgroundColor: colors.color_PageColor}}>
//         <ScrollView style={{flex: 1}}>
//           <FlatList
//             data={comment?.filter(item => item.reply === null)}
//             renderItem={({item}) => <CommentItem item={item} />}
//             keyExtractor={item => item.Id.toString()}
//           />
//         </ScrollView>
//         {replyTextInput && (
//           <View style={styles.replyingToContainer}>
//             <Text
//               style={{
//                 color: colors.color_TextNormal,
//                 alignSelf: 'center',
//                 flex: 1,
//                 fontFamily: FontFamily.medium,
//                 fontSize: Size.subtitle,
//               }}>
//               Replying to {'@' + userName}
//             </Text>
//             <TouchableOpacity
//               style={styles.cancelReplyButton}
//               onPress={() => {
//                 setReplyingToComment(null);
//                 setReplyTextInput(false);
//                 setChat('');
//               }}>
//               <CancelIcon color={colors.arrow} />
//             </TouchableOpacity>
//           </View>
//         )}
//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'ios' ? 'padding' : null}
//           keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
//           <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//             <View style={styles.inputContainer}>
//               <Image
//                 style={styles.profileImage}
//                 source={
//                   profile
//                     ? {
//                         uri: `https://www.adoro.social/UserProfilePic/${profile}`,
//                       }
//                     : require('../assets/Profile.png')
//                 }
//                 onError={() => console.log('Error loading image')}
//               />
//               <TextInput
//                 ref={textInputRef}
//                 style={{
//                   flex: 1,
//                   marginLeft: 15,
//                   color: colors.color_Text,
//                   fontFamily: FontFamily.semibold,
//                   fontSize: Size.inputText,
//                 }}
//                 autoFocus={true}
//                 onChangeText={handleTextInputChange}
//                 value={chat} // Bind the value of the text input
//                 placeholder="Write A Comment.."
//                 placeholderTextColor={colors.color_PlaceHolderColor}
//               />
//               <TouchableOpacity
//                 style={styles.postButton}
//                 onPress={() => postcomment(chat)}
//                 disabled={isTextInputEmpty}>
//                 <Text
//                   style={{
//                     color: isTextInputEmpty
//                       ? colors.color_DisabledText
//                       : colors.color_PostTextColor,
//                     fontFamily: FontFamily.semibold,
//                     fontSize: Size.inputText,
//                   }}>
//                   Post
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableWithoutFeedback>
//         </KeyboardAvoidingView>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   inputContainer: {
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     padding: 5,
//     alignItems: 'center',
//   },
//   profileImage: {
//     width: 40,
//     height: 40,
//     marginLeft: 10,
//     borderRadius: 99,
//   },
//   postButton: {
//     marginRight: 15,
//   },
//   replyingToContainer: {
//     flexDirection: 'row',
//     marginLeft: 10,
//     marginRight: 10,
//     marginTop: 10,
//   },
//   cancelReplyButton: {
//     justifyContent: 'flex-end',
//   },
// });

// export default Comment;


import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {config} from '../config';
import FontFamily from '../common/components/FontFamily';
import {useTheme} from '@react-navigation/native';
import useStore from '../store';
import Size from '../common/components/Size';
import CancelIcon from '../assets/svg/CancelIcon';
import BackArrow from '../assets/svg/BackArrow';
 
const Comment = ({navigation, route}) => {
  const {Id, user, profile} = route.params;
  const {dark, toggleTheme} = useStore();
  const {colors} = useTheme();
 
  const [comment, setComment] = useState([]);
  const [replyTextInput, setReplyTextInput] = useState(false);
  const [userName, setUserName] = useState('');
  const [replyingToComment, setReplyingToComment] = useState(null);
  const [chat, setChat] = useState('');
  const [submittedReply, setSubmittedReply] = useState('');
  const [isTextInputEmpty, setIsTextInputEmpty] = useState(true);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
 
  const handleTextInputChange = text => {
    setChat(text);
    setIsTextInputEmpty(text.trim().length === 0);
  };
 
  const textInputRef = useRef(null);
 
  useEffect(() => {
    if (replyTextInput && !isKeyboardOpen) {
      textInputRef.current.focus();
    }
  }, [replyTextInput, isKeyboardOpen]);
 
  const replyTo = item => {
    setReplyingToComment(item);
    setReplyTextInput(true);
    setUserName(item?.userName);
    setChat(`Replying to @${userName}`);
  };
 
  const keyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };
 
  const keyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };
 
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);
 
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);
 
  const postcomment = async commentText => {
    try {
      const res = await axios.post(
        `${config.production}/app/user/postcomment`,
        {
          text: commentText,
          post_Id: Id,
          user,
          profile,
          parent_id: replyingToComment,
        },
      );
 
      if (res.status === 200) {
        getcomment();
        setChat('');
        setIsTextInputEmpty(true);
        if (replyingToComment) {
          setSubmittedReply(commentText);
        }
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };
 
  const getcomment = async () => {
    try {
      const res = await axios.get(
        `${config.production}/app/user/getallcomment`,
        {
          params: {post_id: Id},
        },
      );
      setComment(res.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
 
  useEffect(() => {
    getcomment();
  }, []);
 
  const CommentItem = ({item}) => {
    const [heart, setHeart] = useState(false);
    const [profile, setProfile] = useState(null);
    const [counter, setCounter] = useState(0);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [reply, setReply] = useState('');
    const [heart1, setHeart1] = useState(false);
    const [counter1, setCounter1] = useState(0);
 
    const handleHeartPress = () => {
      setHeart(!heart);
      setCounter(heart ? counter - 1 : counter + 1);
    };
    const handleHeartPress1 = () => {
      setHeart1(!heart1);
      setCounter1(heart1 ? counter1 - 1 : counter1 + 1);
    };
    const handleReplyPress = () => {
      setShowReplyInput(true);
    };
 
    const getTimeDifference = postDateTime => {
      // Split the date-time string into date and time parts
      const [datePart, timePart] = postDateTime.split('_');
      // Split the date part into year, month, and day
      const [year, month, day] = datePart.split('-').map(Number);
      // Split the time part into hours, minutes, and seconds
      const [hoursPart, minutesPart, secondsPart] = timePart
        .split(':')
        .map(Number);
      // Create a Date object using the extracted date and time components
      const postDate = new Date(
        year,
        month - 1,
        day,
        hoursPart,
        minutesPart,
        secondsPart,
      );
 
      // Get current date and time in IST
      const currentDate = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
      const currentIST = new Date(currentDate.getTime() + istOffset);
 
      const differenceInSeconds = Math.floor((currentIST - postDate) / 1000);
      const days = Math.floor(differenceInSeconds / (24 * 3600));
      const remainingHours = Math.floor(
        (differenceInSeconds % (24 * 3600)) / 3600,
      );
      const remainingMinutes = Math.floor((differenceInSeconds % 3600) / 60);
      const remainingSeconds = differenceInSeconds % 60;
      if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
      } else if (remainingHours > 0) {
        return `${remainingHours} hour${remainingHours > 1 ? 's' : ''} ago`;
      } else if (remainingMinutes > 0) {
        return `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''} ago`;
      } else {
        return `${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''} ago`;
      }
    };
 
    return (
      <>
        <View style={{marginBottom: 45}}>
          <View key={item.commentId}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                navigation.navigate('Profile', {
                  mobileNo: item.mobileNo,
                  profile: item.profile,
                });
              }}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    margin: 10,
                    borderRadius: 20,
                    justifyContent: 'flex-start',
                  }}
                  source={
                    profile
                      ? {
                          uri: `https://www.adoro.social/UserProfilePic/${profile}`,
                        }
                      : require('../assets/Profile.png')
                  }
                  onError={() => console.log('Error loading image')}
                />
                <Text
                  style={{
                    color: colors.color_TextNormal,
                    alignSelf: 'center',
                    flex: 1,
                    fontSize: Size.title,
                    fontFamily: FontFamily.semibold,
                  }}>
                  {'@' + item.userName}
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontFamily: FontFamily.medium,
                    fontSize: Size.subtitle,
                    justifyContent: 'flex-end',
                    marginRight: 10,
                    color: colors.color_TextNormal,
                  }}>
                 {getTimeDifference(item.Date)}
                </Text>
              </View>
            </TouchableOpacity>
            <Text
              style={{
                left: 10,
                fontFamily: FontFamily.semibold,
                fontSize: Size.subtitle,
                color: colors.color_commentText,
              }}>
              {item.text}
            </Text>
            <View style={{flexDirection: 'row', gap: 20}}>
              <TouchableOpacity onPress={handleHeartPress}>
                <View
                  style={{
                    left: 10,
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    borderRadius: 6,
                    width: 60,
                    height: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Image
                    style={{
                      height: 12,
                      width: 12,
                      marginRight: 8,
                      borderColor: heart ? 'red' : '#6F7F92',
                    }}
                    source={
                      heart
                        ? require('../assets/Heart1.png')
                        : require('../assets/Heart.png')
                    }
                  />
                  <Text
                    style={{
                      color: colors.color_commentText,
                      fontFamily: FontFamily.medium,
                      fontSize: Size.subtitle,
                    }}>
                    {counter}
                  </Text>
                </View>
              </TouchableOpacity>
 
              <View style={{flex: 1}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 60,
                    height: 35,
                    borderRadius: 6,
                    marginTop: 10,
                  }}
                  onPress={() => {
                    replyTo(item.Id);
                    setUserName(item?.userName);
                  }}>
                  <Text
                    style={{
                      color: colors.color_commentText,
                      fontFamily: FontFamily.medium,
                    }}>
                    Reply
                  </Text>
                </TouchableOpacity>
                {comment.map(reply => {
                  if (reply.reply == item.Id) {
                    return (
                      <View
                        style={{
                          flexDirection: 'column',
                        }}>
                        <View style={{flexDirection: 'column'}}>
                          <View
                            key={reply.reply}
                            style={{
                              flexDirection: 'row',
                            }}>
                            <Image
                              style={{
                                width: 40,
                                height: 40,
                                margin: 10,
                                borderRadius: 20,
                                justifyContent: 'flex-start',
                              }}
                              source={
                                profile
                                  ? {
                                      uri: `https://www.adoro.social/UserProfilePic/${profile}`,
                                    }
                                  : require('../assets/Profile.png')
                              }
                              onError={() => console.log('Error loading image')}
                            />
                            <Text
                              style={{
                                color: colors.color_TextNormal,
                                alignSelf: 'center',
                                flex: 1,
                                fontSize: Size.title,
                                fontFamily: FontFamily.semibold,
                              }}>
                              {'@' + reply.userName}
                            </Text>
                            <Text
                              style={{
                                alignSelf: 'center',
                                fontFamily: FontFamily.medium,
                                fontSize: Size.subtitle,
                                justifyContent: 'flex-end',
                                marginRight: 10,
                                color: colors.color_TextNormal,
                              }}>
                              1 min ago
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={{
                            left: 10,
                            fontFamily: FontFamily.semibold,
                            fontSize: Size.subtitle,
                            color: colors.color_commentText,
                          }}>
                          {reply.text}
                        </Text>
                      </View>
                    );
                  }
                })}
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };
 
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.color_TabBarColor,
          zIndex: 1,
          height: 56,
        }}>
        <TouchableOpacity
          style={{flex: 0.5, paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => navigation.navigate('HomePage')}>
          <BackArrow color={colors.arrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.color_TextNormal,
            fontFamily: FontFamily.semibold,
            alignSelf: 'center',
            fontSize: Size.tabtext,
          }}>
          Comment
        </Text>
      </View>
      <View style={{flex: 1, backgroundColor: colors.color_PageColor}}>
        <ScrollView style={{flex: 1}}>
          <FlatList
            data={comment?.filter(item => item.reply === null)}
            renderItem={({item}) => <CommentItem item={item} />}
            keyExtractor={item => item.Id.toString()}
          />
        </ScrollView>
        {replyTextInput && (
          <View style={styles.replyingToContainer}>
            <Text
              style={{
                color: colors.color_TextNormal,
                alignSelf: 'center',
                flex: 1,
                fontFamily: FontFamily.medium,
                fontSize: Size.subtitle,
              }}>
              Replying to {'@' + userName}
            </Text>
            <TouchableOpacity
              style={styles.cancelReplyButton}
              onPress={() => {
                setReplyingToComment(null);
                setReplyTextInput(false);
                setChat('');
              }}>
              <CancelIcon color={colors.arrow} />
            </TouchableOpacity>
          </View>
        )}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <Image
                style={styles.profileImage}
                source={
                  profile
                    ? {
                        uri: `https://www.adoro.social/UserProfilePic/${profile}`,
                      }
                    : require('../assets/Profile.png')
                }
                onError={() => console.log('Error loading image')}
              />
              <TextInput
                ref={textInputRef}
                style={{
                  flex: 1,
                  marginLeft: 15,
                  color: colors.color_Text,
                  fontFamily: FontFamily.semibold,
                  fontSize: Size.inputText,
                }}
                autoFocus={true}
                onChangeText={handleTextInputChange}
                value={chat} // Bind the value of the text input
                placeholder="Write A Comment.."
                placeholderTextColor={colors.color_PlaceHolderColor}
              />
              <TouchableOpacity
                style={styles.postButton}
                onPress={() => postcomment(chat)}
                disabled={isTextInputEmpty}>
                <Text
                  style={{
                    color: isTextInputEmpty
                      ? colors.color_DisabledText
                      : colors.color_PostTextColor,
                    fontFamily: FontFamily.semibold,
                    fontSize: Size.inputText,
                  }}>
                  Post
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};
 
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 5,
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    marginLeft: 10,
    borderRadius: 99,
  },
  postButton: {
    marginRight: 15,
  },
  replyingToContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  cancelReplyButton: {
    justifyContent: 'flex-end',
  },
});
 
export default Comment;
 