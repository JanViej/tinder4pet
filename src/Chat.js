import React, {useEffect, useCallback, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import {Avatar} from 'react-native-elements';
// import {auth} from '../firebase';
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

const Chat = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);
  const currentUser = useSelector(state => state.auth.data);
  const partnerUser = useSelector(state => state.room.partnerData);
  const {partnerData} = route?.params;
  const dispatch = useDispatch();

  const [user, setVoximplantPartner] = useState();

  console.log('asd chat');

  console.log('asd chat user', user);

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
              };
            }),
        );
      });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getPartnerData(partnerData.id));
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
    const {_id, createdAt, text, user} = messages[0];
    firestore().collection('message').add({
      _id,
      createdAt,
      text,
      user,
      matchId: partnerData.matchId,
    });

    dispatch(
      setMatch({
        data: {
          currentText: `you: ${text}`,
          status: 'done',
          matchId: partnerData.matchId,
        },
        id: currentUser.id,
      }),
    );

    dispatch(
      setMatch({
        data: {
          currentText: `${currentUser.data.petName}: ${text}`,
          status: 'undone',
          matchId: partnerData.matchId,
        },
        id: partnerData.id,
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

  const renderSend = props => (
    <Send
      {...props}
      disabled={!props.text}
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

  return (
    <PrivateWrapper navigationHandler={navigation}>
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
              onPress={() => navigation.navigate('CallingScreen', {user})}>
              <SimpleLineIcons name="camera" color="#FF8C76" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={true}
          onSend={messages => onSend(messages)}
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
        />
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
