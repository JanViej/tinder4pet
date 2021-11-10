import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  ImageBackground,
} from 'react-native';
import instruction1 from './assets/image/instruction1.png';
import UploadScreen from './UploadScreen';
import {useSelector, useDispatch} from 'react-redux';
import {writeDataToAccount} from './redux/account/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 250,
    height: 280,
  },
  avatar: {
    borderRadius: 20,
    width: 200,
    height: 300,
    transform: [{rotate: '-10deg'}],
    marginBottom: 40,
  },
});

const Instruction = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  console.log('instruction');

  const introText = [
    ...(isUpload
      ? []
      : [
          {
            title: 'Choose an avatar to setup your profile',
            btnTitle: 'Setup avatar',
            onclick: () => {
              setModalVisible(true);
            },
            image: (
              <ImageBackground source={instruction1} style={styles.image}>
                <Text />
              </ImageBackground>
            ),
          },
        ]),
    {
      title:
        'Now to let everyone know about you, press the button to create your background first!!!',
      btnTitle: 'Create background',
      onclick: () => {
        // navigation.push('FormProfile', {
        //   fromPage: 'Instruction',
        // });
        dispatch(
          writeDataToAccount({
            introStep: 'FormProfile',
          }),
        );
      },
      image: (
        <Image
          source={{
            uri: userData.data.avatar,
          }}
          style={styles.avatar}
        />
      ),
    },
  ];

  // useEffect(() => {
  //   if (isUpload) {
  //     introText.pop();
  //     setModalVisible(false);
  //   }
  // }, [isUpload]);

  return (
    <View
      style={{
        backgroundColor: '#FEE5E1',
        flex: 1,
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
      }}>
      <Text
        style={{
          marginBottom: 50,
          fontSize: 20,
          fontFamily: 'FredokaOne-Regular',
        }}>
        {introText[0].title}
      </Text>
      <View>{introText[0].image}</View>
      <TouchableOpacity
        style={{
          borderRadius: 8,
          backgroundColor: '#fff',
          padding: 10,
          elevation: 5,
          marginTop: 10,
        }}
        onPress={introText[0].onclick}>
        <Text style={{fontSize: 16, color: '#FF8C76'}}>
          {introText[0].btnTitle}
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <UploadScreen
          propImage="avatar"
          setIsUpload={setIsUpload}
          setModalVisible={setModalVisible}
        />
      </Modal>
    </View>
  );
};

export default Instruction;
