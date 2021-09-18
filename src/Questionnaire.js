import React, {useState} from 'react';
import {
  GiftedChat,
  MessageText,
  Bubble,
  Composer,
  InputToolbar,
  Actions,
  Avatar,
  Send,
} from 'react-native-gifted-chat';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

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
          value: 'yes',
        },
        {
          title: '😞 No. Not this time, I"ll answer it later',
          value: 'no',
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
  },
  {
    _id: 5,
    text: 'What is your phone number ?',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Tinder4Pet',
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/tinder4pet.appspot.com/o/ChatBotIcon%2Ftext.png?alt=media&token=8baa776e-0bb2-499e-ab67-1a16606207a2',
    },
  },
];

const Questionnaire = () => {
  const [messages, setMessages] = useState(messagesContent);

  const handleSend = (newMessage = []) => {
    setMessages(GiftedChat.append(messages, newMessage));
    // console.log('newMessage', newMessage);
    chatBotContent.shift();
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

  const renderInputToolbar = props => (
    <InputToolbar
      {...props}
      containerStyle={{
        padding: 5,
      }}
      primaryStyle={{alignItems: 'center'}}
    />
  );

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
      }}
      icon={() => (
        <Image
          style={{width: 32, height: 32}}
          source={{
            uri: 'https://placeimg.com/32/32/any',
          }}
        />
      )}
      options={{
        'Choose From Library': () => {
          console.log('Choose From Library');
        },
        Cancel: () => {
          console.log('Cancel');
        },
      }}
      optionTintColor="#222B45"
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

  const onQuickReply = async quickReply => {
    let message = quickReply?.[0]?.title;
    let msg = {
      _id: new Date(),
      text: message,
      createdAt: new Date(),
      user: {
        _id: 1,
      },
    };

    if (quickReply[0].value === 'yes') {
      // console.log('yes');
      handleSend([chatBotContent[0], msg]);
    } else if (quickReply[0].value === 'no') {
      // console.log('no');
    } else {
      handleSend([chatBotContent[0], msg]);
    }
  };

  console.log('chatBotContent', chatBotContent);

  return (
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
          <TouchableOpacity>
            <AntDesign name="arrowleft" color="#FF8C76" size={28} />
          </TouchableOpacity>
          <Image
            source={{
              uri:
                'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/funny-dog-captions-1563456605.jpg?crop=0.747xw:1.00xh;0.0459xw,0&resize=768:*',
            }}
            style={styles.image}
          />
          <Text style={{fontSize: 18, fontFamily: 'FredokaOne-Regular'}}>
            Mewo
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.headerBtn}>
            <Feather name="phone-call" color="#FF8C76" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn}>
            <SimpleLineIcons name="camera" color="#FF8C76" size={24} />
          </TouchableOpacity>
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
        // renderActions={renderActions}
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
