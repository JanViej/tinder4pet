import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Text, View, TouchableOpacity} from 'react-native';
import ListImage from './components/ListImage';
import AntDesign from 'react-native-vector-icons/AntDesign';

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

const Gallery = ({navigation}) => {
  const [listOption, setListOption] = useState([]);

  console.log('listOption', listOption);
  const handleClickChoose = id => () => {
    const index = listOption.indexOf(id);
    if (index > -1) {
      const a = [...listOption];
      a.splice(index, 1);
      setListOption(a);
    } else {
      setListOption([...listOption, id]);
    }
  };
  const handleClickView = () => {
    navigation.push('ImageView');
  };
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          elevation: 5,
          paddingHorizontal: 20,
          paddingVertical: 15,
          marginBottom: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" color="#000" size={22} />
        </TouchableOpacity>
        <Text
          style={{
            flexGrow: 1,
            textAlign: 'center',
            paddingRight: 20,
            fontSize: 18,
            fontFamily: 'FredokaOne-Regular',
          }}>
          Gallery
        </Text>
      </View>
      <ScrollView>
        <ListImage
          images={images}
          listOption={listOption}
          handleClickChoose={handleClickChoose}
          handleClickView={handleClickView}
        />
      </ScrollView>
    </View>
  );
};

export default Gallery;
