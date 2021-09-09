import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const images = [
  {
    id: 1,
    name: 'hi',
    url:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/funny-dog-captions-1563456605.jpg?crop=0.747xw:1.00xh;0.0459xw,0&resize=768:*',
  },
  {
    id: 2,
    name: 'hi',
    url:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/funny-dog-captions-1563456605.jpg?crop=0.747xw:1.00xh;0.0459xw,0&resize=768:*',
  },
  {
    id: 3,
    name: 'hi',
    url:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/funny-dog-captions-1563456605.jpg?crop=0.747xw:1.00xh;0.0459xw,0&resize=768:*',
  },
  {
    id: 4,
    name: 'hi',
    url:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/funny-dog-captions-1563456605.jpg?crop=0.747xw:1.00xh;0.0459xw,0&resize=768:*',
  },
  {
    id: 5,
    name: 'hi',
    url:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/funny-dog-captions-1563456605.jpg?crop=0.747xw:1.00xh;0.0459xw,0&resize=768:*',
  },
  {
    id: 6,
    name: 'hi',
    url:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/funny-dog-captions-1563456605.jpg?crop=0.747xw:1.00xh;0.0459xw,0&resize=768:*',
  },
  {
    id: 7,
    name: 'hi',
    url:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/funny-dog-captions-1563456605.jpg?crop=0.747xw:1.00xh;0.0459xw,0&resize=768:*',
  },
  {
    id: 8,
    name: 'hi',
    url:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/funny-dog-captions-1563456605.jpg?crop=0.747xw:1.00xh;0.0459xw,0&resize=768:*',
  },
  {
    id: 9,
    name: 'hi',
    url:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/funny-dog-captions-1563456605.jpg?crop=0.747xw:1.00xh;0.0459xw,0&resize=768:*',
  },
  {
    id: 10,
    name: 'hi',
    url:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/funny-dog-captions-1563456605.jpg?crop=0.747xw:1.00xh;0.0459xw,0&resize=768:*',
  },
];

const ImageView = ({navigation}) => {
  const header = () => {
    return (
      <View
        style={{
          // backgroundColor: 'red',
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingTop: 35,
          justifyContent: 'space-between',
          position: 'absolute',
          width: '100%',
          top: 0,
          zIndex: 100,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name="arrowleft" color="#fff" size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <SimpleLineIcons name="trash" color="#fff" size={22} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Modal visible={true} transparent={true}>
      <ImageViewer index={2} imageUrls={images} renderHeader={header} />
    </Modal>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  container: {
    // padding: 20,
  },
  name: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 24,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
