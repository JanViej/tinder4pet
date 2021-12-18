import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
  Image,
} from 'react-native';
import {writeDataToAccount} from './redux/account/actions';

import {Formik} from 'formik';
import ListImage from './components/ListImage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import UploadScreen from './UploadScreen';
import PrivateWrapper from './PrivateWrapper';

const {width: windowWidth} = Dimensions.get('window');

const FormProfile = ({navigation, route}) => {
  const [listOption, setListOption] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const [initialValues, setInitialValues] = useState({});

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

  useEffect(() => {
    if (userData) {
      setInitialValues({
        name: userData?.data?.petName,
        address: userData?.data?.address,
        weight: '',
        sex: userData?.data?.petGender,
        age: userData?.data?.age,
        description: userData?.data?.description || '',
        images: userData?.data?.images,
      });
    }
  }, [userData]);

  const handleClickAdd = () => {
    setModalVisible(true);
  };

  return (
    <PrivateWrapper navigationHandler={navigation}>
      <View style={styles.container}>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={values => {
            dispatch(
              writeDataToAccount({
                petName: values.name,
                petGender: values.sex,
                address: values.address,
                age: values.age,
                weight: values.weight,
                description: values.description,
                introStep: 'Done',
              }),
            );
          }}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={{flex: 1}}>
              <View style={styles.header}>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => {
                    if (userData.data.introStep === 'FormProfile') {
                      dispatch(
                        writeDataToAccount({
                          introStep: 'Instruction',
                        }),
                      );
                    } else {
                      navigation.goBack();
                    }
                  }}>
                  <AntDesign name="left" color="#000" size={20} />
                  <Text style={{fontSize: 16, marginLeft: 5}}>Back</Text>
                </TouchableOpacity>
                <Text
                  style={{fontSize: 16, fontWeight: '700', marginRight: 10}}>
                  My Background
                </Text>
                <TouchableOpacity onPress={handleSubmit}>
                  <Text style={{fontSize: 16}}>Save</Text>
                </TouchableOpacity>
              </View>
              <ScrollView>
                <Text style={styles.title}>My Info</Text>
                <TextInput
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  underlineColorAndroid="transparent"
                  style={{
                    ...styles.input,
                    fontFamily: 'FredokaOne-Regular',
                    fontSize: 20,
                    marginHorizontal: 20,
                    paddingHorizontal: 10,
                    marginBottom: 10,
                  }}
                  placeholder="Pet Name"
                  placeholderTextColor="#2f33374f"
                />
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{
                      uri: userData.data.avatar,
                    }}
                    style={styles.image}
                  />
                  <View style={{flex: 1}}>
                    <TextInput
                      onChangeText={handleChange('address')}
                      onBlur={handleBlur('address')}
                      value={values.address}
                      style={{
                        ...styles.input,
                        textAlign: 'center',
                        marginBottom: 10,
                      }}
                      placeholder="Address"
                      placeholderTextColor="#2f33374f"
                    />
                    <TextInput
                      onChangeText={handleChange('age')}
                      onBlur={handleBlur('age')}
                      value={values.age}
                      style={{
                        ...styles.input,
                        textAlign: 'center',
                        marginBottom: 10,
                      }}
                      placeholder="Age"
                      placeholderTextColor="#2f33374f"
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <TextInput
                        onChangeText={handleChange('sex')}
                        onBlur={handleBlur('sex')}
                        value={values.sex}
                        style={{
                          ...styles.input,
                          textAlign: 'center',
                          width: '48%',
                        }}
                        placeholder="Pet Gender"
                        placeholderTextColor="#2f33374f"
                      />
                      <TextInput
                        onChangeText={handleChange('weight')}
                        onBlur={handleBlur('weight')}
                        value={values.weight}
                        style={{
                          ...styles.input,
                          textAlign: 'center',
                          width: '48%',
                        }}
                        placeholder="Weight"
                        placeholderTextColor="#2f33374f"
                      />
                    </View>
                  </View>
                </View>
                <Text style={styles.title}>Description</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  ellipsizeMode="tail"
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  style={{
                    ...styles.input,
                    marginHorizontal: 20,
                    paddingHorizontal: 10,
                  }}
                  placeholder="Let write something about your pet here"
                  placeholderTextColor="#2f33374f"
                />
                <Text style={styles.title}>Photos</Text>
                <ListImage
                  images={values.images}
                  listOption={listOption}
                  handleClickChoose={handleClickChoose}
                  handleClickView={handleClickView}
                  handleClickAdd={handleClickAdd}
                />
              </ScrollView>
            </View>
          )}
        </Formik>
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

export default FormProfile;

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    // backgroundColor: 'red',
    width: windowWidth,
    flex: 1,
    paddingBottom: 20,
  },
  name: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 24,
  },
  image: {
    width: 100,
    height: 170,
    borderRadius: 10,
    // margin: 10,
    elevation: 5,
    marginRight: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    paddingHorizontal: 20,
    marginVertical: 10,
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
  input: {
    color: '#000',
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#FFC3B8',
    elevation: 5,
    backgroundColor: '#fff',
  },
});
