import React, {useEffect, useCallback, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackHandler,
  Modal,
} from 'react-native';
import {
  GiftedChat,
  MessageText,
  Bubble,
  Composer,
  InputToolbar,
  Actions,
  Send,
} from 'react-native-gifted-chat';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {getPartnerData, getMatch} from './redux/room/actions';
import {setMatch} from './redux/recommend/actions';
import PrivateWrapper from './PrivateWrapper';
import UploadScreen from './UploadScreen';

const Chat = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);
  const currentUser = useSelector(state => state.auth.data);
  const partnerUser = useSelector(state => state.room?.partnerData);
  const {partnerData} = route?.params;

  console.log('asd partnerData', partnerData);
  const dispatch = useDispatch();
  const [visible, setModalVisible] = useState(false);
  const [user, setVoximplantPartner] = useState();
  const [customText, setCustomText] = useState('');
  const [currentImg, setCurrentImg] = useState('');
  const backAction = () => {
    dispatch(getMatch(currentUser?.id));
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useLayoutEffect(() => {
    const unsubscribe = firestore()
      .collection('message')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        setMessages(
          snapshot?.docs
            ?.filter(doc => doc?.data()?.matchId === partnerData?.matchId)
            ?.map(doc => {
              return {
                _id: doc?.data()?._id,
                createdAt: doc?.data()?.createdAt?.toDate(),
                text: doc?.data()?.text,
                user: doc?.data()?.user,
                image: doc?.data()?.image,
              };
            }),
        );
      });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getPartnerData(partnerData?.id));
  }, []);

  useEffect(() => {
    if (partnerUser?.id) {
      setVoximplantPartner({
        user_id: partnerUser.voximplantUserId,
        user_name: partnerUser.voximplantUsername,
        user_display_name: partnerUser.voximplantUsername,
      });
    }
  }, [partnerUser]);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, createdAt, text, user, image} = messages[0];
    const messageObj = {
      _id,
      createdAt,
      ...(text && {
        text: text,
      }),
      user,
      ...(image && {
        image: image,
      }),
      matchId: partnerData?.matchId,
    };

    firestore().collection('message').add(messageObj);

    dispatch(
      setMatch({
        data: {
          currentText: text ? `you: ${text}` : 'You send an image',
          status: 'done',
          matchId: partnerData?.matchId,
        },
        id: currentUser.id,
      }),
    );

    dispatch(
      setMatch({
        data: {
          currentText: text
            ? `${currentUser.data.petName}: ${text}`
            : `${currentUser.data.petName} send an image`,
          status: 'undone',
          matchId: partnerData?.matchId,
        },
        id: partnerData?.id,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderMessageText = props => (
    <MessageText
      {...props}
      containerStyle={{
        left: {backgroundColor: '#FEE5E1', borderRadius: 20},
        right: {backgroundColor: '#FF8C76', borderRadius: 20},
      }}
      textStyle={{
        left: {color: '#FF8C76'},
        right: {color: '#fff'},
      }}
    />
  );

  const renderBubble = props => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {backgroundColor: 'transparent'},
        right: {backgroundColor: 'transparent'},
      }}
      timeTextStyle={{
        right: {
          color: '#C2BDBD',
          backgroundColor: 'transparent',
        },
        left: {
          color: '#C2BDBD',
          backgroundColor: 'transparent',
        },
      }}
    />
  );

  const renderComposer = props => (
    <Composer
      {...props}
      textInputStyle={{
        color: '#000',
      }}
    />
  );

  const renderInputToolbar = props => (
    <InputToolbar
      {...props}
      containerStyle={{
        padding: 5,
      }}
      primaryStyle={{alignItems: 'center'}}
    />
  );

  const renderSend = props => {
    return (
      <Send
        {...props}
        {...(!props.text &&
          currentImg !== '' && {
            sendButtonProps: {
              onPress: () => {
                onSend([
                  {
                    createdAt: new Date(),
                    image: currentImg,
                    user: {
                      _id: currentUser?.data?.gmail,
                      name: currentUser?.data?.petName,
                      avatar: currentUser?.data?.avatar,
                    },
                    _id: new Date().getTime(),
                  },
                ]);
                setCurrentImg('');
                setCustomText('');
              },
            },
          })}
        {...(props.text && {
          sendButtonProps: {
            onPress: () => {
              onSend([
                {
                  createdAt: new Date(),
                  text: props.text,
                  ...(currentImg && {
                    image: currentImg,
                  }),
                  user: {
                    _id: currentUser?.data?.gmail,
                    name: currentUser?.data?.petName,
                    avatar: currentUser?.data?.avatar,
                  },
                  _id: new Date().getTime(),
                },
              ]);
              setCurrentImg('');
              setCustomText('');
            },
          },
        })}
        containerStyle={{
          width: 44,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 4,
        }}>
        <Feather name="send" color="#FF8C76" size={28} />
      </Send>
    );
  };

  const handleRemove = () => {
    setCurrentImg('');
  };

  const renderActions = props => (
    <Actions
      {...props}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 0,
        zIndex: 0,
      }}
      icon={() => <AntDesign name="camerao" color="#FF8C76" size={28} />}
      options={{
        'Choose From Library': () => {
          setModalVisible(true);
        },
        Cancel: () => {
          console.log('Cancel');
        },
      }}
      optionTintColor="#222B45"
    />
  );

  const handleVideoCall = () => {
    navigation.navigate('CallingScreen', {user});
  };

  const getUrlImg = url => {
    setCurrentImg(url);
  };

  const renderFooter = props => <View style={{marginTop: 110}} />;
  return (
    <PrivateWrapper navigationHandler={navigation}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setModalVisible(!visible);
        }}>
        <UploadScreen
          propImage="chatImg"
          setModalVisible={setModalVisible}
          onGetUrl={getUrlImg}
        />
      </Modal>
      <View style={{flex: 1}}>
        <View
          style={{
            padding: 10,
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            elevation: 5,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                dispatch(getMatch(currentUser?.id));
                navigation.goBack();
              }}>
              <AntDesign name="arrowleft" color="#FF8C76" size={28} />
            </TouchableOpacity>
            <Image
              source={{
                uri: partnerUser?.avatar,
              }}
              style={styles.image}
            />
            <Text style={{fontSize: 18, fontFamily: 'FredokaOne-Regular'}}>
              {partnerUser?.petName}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.headerBtn}>
              <Feather name="phone-call" color="#FF8C76" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={handleVideoCall}>
              <SimpleLineIcons name="camera" color="#FF8C76" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={true}
          onSend={messages => {
            onSend(messages);
          }}
          user={{
            _id: currentUser?.data?.gmail,
            name: currentUser?.data?.petName,
            avatar: currentUser?.data?.avatar,
          }}
          renderAvatarOnTop
          renderMessageText={renderMessageText}
          renderBubble={renderBubble}
          renderComposer={renderComposer}
          renderInputToolbar={renderInputToolbar}
          renderSend={renderSend}
          {...(!currentImg && {
            renderActions: renderActions,
          })}
          alwaysShowSend
          {...(currentImg && {
            renderFooter: renderFooter,
          })}
          text={customText}
          onInputTextChanged={text => setCustomText(text)}
        />
        {currentImg !== '' && (
          <View>
            <TouchableOpacity
              onPress={handleRemove}
              style={{
                position: 'absolute',
                bottom: 160,
                left: 105,
                zIndex: 5,
                opacity: 10,
              }}>
              <AntDesign name="closecircleo" color="#000" size={20} />
            </TouchableOpacity>
            <Image
              style={{
                width: 100,
                height: 100,
                position: 'absolute',
                bottom: 65,
                left: 10,
                opacity: 10,
                borderRadius: 10,
              }}
              source={{
                uri: currentImg,
              }}
            />
          </View>
        )}
      </View>
    </PrivateWrapper>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 45,
    height: 45,
    borderRadius: 100,
    marginHorizontal: 10,
  },
  headerBtn: {
    backgroundColor: '#fff',
    elevation: 5,
    padding: 6,
    borderRadius: 10,
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
});
export default Chat;
