import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
const {width: windowWidth} = Dimensions.get('window');

const Profile = ({navigation}) => {
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff',
          paddingVertical: 15,
          paddingHorizontal: 20,
          elevation: 5,
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" color="#000" size={20} />
          <Text style={{fontSize: 16, marginLeft: 5}}>Back</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 16, fontWeight: '700', marginRight: 10}}>
          Profile
        </Text>
        <TouchableOpacity>
          <Text style={{fontSize: 16}}>Done</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          // marginBottom: 40,
          marginTop: 40,
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri:
              'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/funny-dog-captions-1563456605.jpg?crop=0.747xw:1.00xh;0.0459xw,0&resize=768:*',
          }}
          style={styles.image}
        />
        <Text>Change Profile Picture</Text>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 25,
            right: windowWidth / 2 - 50,
            backgroundColor: '#fff',
            borderRadius: 100,
            padding: 5,
            elevation: 5,
          }}>
          <Feather name="edit-2" color="#000" size={16} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrap}>
          <Text>Pet name</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#AEE4FF"
            // onChangeText={onChangeInputUsername}
            // value={inputUsername}
          />
        </View>
        <View style={styles.inputWrap}>
          <Text>Breed</Text>
          <TextInput
            style={styles.input}
            placeholder="Breed"
            placeholderTextColor="#AEE4FF"
            // onChangeText={onChangeInputUsername}
            // value={inputUsername}
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    // padding: 20,
  },
  name: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 24,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 100,
    margin: 10,
    backgroundColor: 'red',
  },
  inputContainer: {
    marginTop: 50,
    paddingHorizontal: 30,
    marginBottom: 35,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 30,
    elevation: 5,
  },
});
