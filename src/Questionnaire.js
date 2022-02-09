import React, {useState, useEffect} from 'react';
import {
  GiftedChat,
  MessageText,
  Bubble,
  Composer,
  InputToolbar,
  Avatar,
  Send,
} from 'react-native-gifted-chat';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {cities} from './configs/cities';

import Feather from 'react-native-vector-icons/Feather';
import logofull from './assets/image/logofull.png';
import {actions} from './redux/auth/slice';
import {useDispatch} from 'react-redux';
import {writeDataToAccount} from './redux/account/actions';

const {width: screenWidth} = Dimensions.get('window');

const messagesContent = [
  {
    _id: 1,
    text:
      'Welcome to Tinder4Pet, lets answer few questions to let us know more about you ?',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/ChatBotIcon%2Ftext.png?alt=media&token=8baa776e-0bb2-499e-ab67-1a16606207a2',
    },
    quickReplies: {
      type: 'radio',
      values: [
        {
          title: '😋 Yes',
          value: 'true',
        },
        {
          title: '😞 No. Not this time, I"ll answer it later',
          value: 'skip',
        },
      ],
    },
  },
];

const chatBotContent = [
  {
    _id: 3,
    text: 'You are interesting with ?',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Tinder4Pet',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/ChatBotIcon%2Ftext.png?alt=media&token=8baa776e-0bb2-499e-ab67-1a16606207a2',
    },
    quickReplies: {
      type: 'radio',
      values: [
        {
          title: 'Dog',
          value: 'dog',
        },
        {
          title: 'Cat',
          value: 'cat',
        },
        {
          title: 'All type',
          value: 'all',
        },
      ],
    },
    type: 'type',
  },
  {
    _id: 4,
    text: 'What is your pet name ?',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Tinder4Pet',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/ChatBotIcon%2Ftext.png?alt=media&token=8baa776e-0bb2-499e-ab67-1a16606207a2',
    },
    type: 'petName',
  },
  {
    _id: 5,
    text: 'What is your pet gender ?',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Tinder4Pet',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/ChatBotIcon%2Ftext.png?alt=media&token=8baa776e-0bb2-499e-ab67-1a16606207a2',
    },
    quickReplies: {
      type: 'radio',
      values: [
        {
          title: 'Boy',
          value: 'male',
        },
        {
          title: 'Girl',
          value: 'female',
        },
      ],
    },
    type: 'petGender',
  },
  {
    _id: 6,
    text: "What is your pet's breed ?",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Tinder4Pet',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/ChatBotIcon%2Ftext.png?alt=media&token=8baa776e-0bb2-499e-ab67-1a16606207a2',
    },
    type: 'breed',
  },
  {
    _id: 7,
    text: 'What is your pet age ?',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Tinder4Pet',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/ChatBotIcon%2Ftext.png?alt=media&token=8baa776e-0bb2-499e-ab67-1a16606207a2',
    },
    type: 'age',
  },
  {
    _id: 8,
    text:
      'Now, let us know a little bit about you. What is your phone number ?',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Tinder4Pet',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/ChatBotIcon%2Ftext.png?alt=media&token=8baa776e-0bb2-499e-ab67-1a16606207a2',
    },
    type: 'phoneNumber',
  },
  {
    _id: 9,
    text: 'Where do you live (city) ?',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Tinder4Pet',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/ChatBotIcon%2Ftext.png?alt=media&token=8baa776e-0bb2-499e-ab67-1a16606207a2',
    },
    type: 'address',
  },
  {
    _id: 10,
    text: 'What is your name ?',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Tinder4Pet',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/ChatBotIcon%2Ftext.png?alt=media&token=8baa776e-0bb2-499e-ab67-1a16606207a2',
    },
    type: 'ownerName',
  },
  {
    _id: 11,
    text: 'Thanks for answer all questions! Let start now 😍😍😍',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Tinder4Pet',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/ChatBotIcon%2Ftext.png?alt=media&token=8baa776e-0bb2-499e-ab67-1a16606207a2',
    },
    quickReplies: {
      type: 'radio',
      values: [
        {
          title: 'Yeah',
          value: 'yeah',
        },
      ],
    },
    type: 'end',
  },
  {
    _id: 12,
    text: 'You can answer it anytime 😍😍😍',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Tinder4Pet',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/ChatBotIcon%2Ftext.png?alt=media&token=8baa776e-0bb2-499e-ab67-1a16606207a2',
    },
    quickReplies: {
      type: 'radio',
      values: [
        {
          title: 'Yeah',
          value: 'yeah',
        },
      ],
    },
    type: 'end',
  },
];

const Questionnaire = ({navigation}) => {
  const [messages, setMessages] = useState(messagesContent);
  const dispatch = useDispatch();
  const [key, setKey] = useState('introSlider');
  const [answer, setAnswer] = useState({});
  const [visible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   dispatch(
  //     actions.setUserData({
  //       introSlider: true,
  //     }),
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleSend = (newMessage = []) => {
    setMessages(
      GiftedChat.append(messages, [
        newMessage[0],
        {
          ...newMessage[1],
          text: newMessage?.[1]?.text?.title || newMessage?.[1]?.text,
        },
      ]),
    );
    setKey(newMessage?.[0]?.type);

    if (newMessage?.[0]?.type !== 'end') {
      chatBotContent.shift();
    }
    setAnswer({
      ...answer,
      [key]: newMessage?.[1]?.text?.value || newMessage?.[1]?.text,
    });
  };
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

  const renderAvatar = props => (
    <Avatar
      {...props}
      containerStyle={{left: {margin: 0}, right: {}}}
      imageStyle={{
        left: {
          border: 'none',
          borderRadius: 0,
          width: 20,
          height: 20,
          resizeMode: 'contain',
          marginTop: 5,
        },
        right: {},
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

  const renderInputToolbar = props => {
    if (props?.messages?.[0]?._id === 9) {
      return (
        <InputToolbar
          {...props}
          containerStyle={{
            padding: 5,
          }}
          primaryStyle={{alignItems: 'center'}}
          renderActions={() => (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={{width: screenWidth}}>
              <Text>Select a City</Text>
            </TouchableOpacity>
          )}
        />
      );
    }
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          padding: 5,
        }}
        primaryStyle={{alignItems: 'center'}}
      />
    );
  };

  // const renderActions = props => (
  //   <Actions
  //     {...props}
  //     containerStyle={{
  //       width: 44,
  //       height: 44,
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //       marginLeft: 4,
  //       marginRight: 4,
  //       marginBottom: 0,
  //     }}
  //     icon={() => (
  //       <Image
  //         style={{width: 32, height: 32}}
  //         source={{
  //           uri: 'https://placeimg.com/32/32/any',
  //         }}
  //       />
  //     )}
  //     options={{
  //       'Choose From Library': () => {
  //         console.log('Choose From Library');
  //       },
  //       Cancel: () => {
  //         console.log('Cancel');
  //       },
  //     }}
  //     optionTintColor="#222B45"
  //   />
  // );

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

  const onQuickReply = async quickReply => {
    let message = quickReply?.[0];
    let msg = {
      _id: new Date(),
      text: message,
      createdAt: new Date(),
      user: {
        _id: 1,
      },
    };

    if (quickReply[0].value === 'yeah') {
      dispatch(
        writeDataToAccount({
          ...answer,
          oldPetName: '000',
          introStep: 'IntroSlider',
        }),
      );
    } else if (quickReply[0].value === 'skip') {
      handleSend([chatBotContent[chatBotContent.length - 1], msg]);
    } else {
      handleSend([chatBotContent[0], msg]);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Modal
        animationType="slide"
        visible={visible}
        style={{width: 100}}
        onRequestClose={() => {
          setModalVisible(!visible);
        }}>
        <View style={{padding: 20}}>
          <FlatList
            data={cities}
            renderItem={({item, index, separators}) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => {
                  let msg = {
                    _id: new Date(),
                    text: item.value,
                    createdAt: new Date(),
                    user: {
                      _id: 1,
                    },
                  };
                  setModalVisible(false);
                  handleSend([chatBotContent[0], msg]);
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderBottomWidth: 1,
                    borderColor: '#000',
                    padding: 10,
                  }}>
                  <Text style={{fontSize: 16}}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}>
        <View style={{width: '100%', alignItems: 'center', marginTop: 50}}>
          <Image source={logofull} style={styles.logo} />
          <Text style={styles.title}>Tinder4pet</Text>
        </View>
      </View>
      <GiftedChat
        messages={messages}
        quickReply={messages.quickReplies}
        onSend={newMessage => handleSend([chatBotContent[0], newMessage[0]])}
        user={{_id: 1}}
        renderAvatarOnTop
        renderMessageText={renderMessageText}
        renderBubble={renderBubble}
        renderComposer={renderComposer}
        renderInputToolbar={renderInputToolbar}
        renderAvatar={renderAvatar}
        onQuickReply={quickReply => onQuickReply(quickReply)}
        renderSend={renderSend}
      />
    </View>
  );
};

export default Questionnaire;

const styles = StyleSheet.create({
  image: {
    width: 45,
    height: 45,
    borderRadius: 100,
    marginHorizontal: 10,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontFamily: 'Pacifico-Regular',
    fontSize: 26,
    color: '#6A9CFD',
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
