import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
  TextInput,
  Button,
  Image,
} from 'react-native';
import {Formik} from 'formik';
import ListImage from './components/ListImage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';

const {width: windowWidth} = Dimensions.get('window');

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

const FormProfile = ({navigation}) => {
  const [listOption, setListOption] = useState([]);
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
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: 'mewo',
          address: 'DaNang, VietNam',
          weight: '4kg',
          sex: 'Male',
          age: '5 Months',
          description:
            "If you're having a ruff time thinking of caption ideas, stop hounding yourself! We already did the work for you. From punny phrases to  touching quotes, here are the best Instagram captions for dogs that are sure to have your followers howlin",
        }}
        onSubmit={values => console.log(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={{flex: 1}}>
            <View style={styles.header}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => navigation.goBack()}>
                <AntDesign name="left" color="#000" size={20} />
                <Text style={{fontSize: 16, marginLeft: 5}}>Back</Text>
              </TouchableOpacity>
              <Text style={{fontSize: 16, fontWeight: '700', marginRight: 10}}>
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
              />
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri:
                      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/funny-dog-captions-1563456605.jpg?crop=0.747xw:1.00xh;0.0459xw,0&resize=768:*',
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
              />
              <Text style={styles.title}>Photos</Text>
              <ListImage
                images={images}
                listOption={listOption}
                handleClickChoose={handleClickChoose}
                handleClickView={handleClickView}
              />
            </ScrollView>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default FormProfile;

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    // backgroundColor: 'red',
    width: windowWidth,
    flex: 1,
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
