import React, {useState} from 'react';
import {
  GiftedChat,
  MessageText,
  Bubble,
  Composer,
  InputToolbar,
  Actions,
  Send,
} from 'react-native-gifted-chat';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const MessageContent = () => {
  const [messages, setMessages] = useState([
    {
      _id: 0,
      text: 'Say Hi to new friend',
      createdAt: new Date().getTime(),
      system: true,
    },
    {
      _id: 1,
      text: 'Henlo!',
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'Test User',
        avatar:
          'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/funny-dog-captions-1563456605.jpg?crop=0.747xw:1.00xh;0.0459xw,0&resize=768:*',
      },
      image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/funny-dog-captions-1563456605.jpg?crop=0.747xw:1.00xh;0.0459xw,0&resize=768:*',
    },
  ]);

  const handleSend = (newMessage = []) => {
    setMessages(GiftedChat.append(messages, newMessage));
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
        onSend={newMessage => handleSend(newMessage)}
        user={{_id: 1}}
        renderAvatarOnTop
        renderMessageText={renderMessageText}
        renderBubble={renderBubble}
        renderComposer={renderComposer}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderActions}
        renderSend={renderSend}
      />
    </View>
  );
};

export default MessageContent;

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
