import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Text, View, TouchableOpacity, Modal} from 'react-native';
import ListImage from './components/ListImage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import UploadScreen from './UploadScreen';
import PrivateWrapper from './PrivateWrapper';

const Gallery = ({navigation}) => {
  const [listOption, setListOption] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const userData = useSelector(state => state.auth.data);

  const handleClickAdd = () => {
    setModalVisible(true);
  };

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
    <PrivateWrapper navigationHandler={navigation}>
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
            images={userData?.data?.images || []}
            listOption={listOption}
            handleClickChoose={handleClickChoose}
            handleClickView={handleClickView}
            handleClickAdd={handleClickAdd}
          />
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <UploadScreen propImage="images" setModalVisible={setModalVisible} />
        </Modal>
      </View>
    </PrivateWrapper>
  );
};

export default Gallery;
