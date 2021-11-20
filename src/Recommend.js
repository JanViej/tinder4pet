import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import {getAllUser, reactLike, reactDislike} from './redux/home/actions';
import {getLikers} from './redux/recommend/selectors';
import moment from 'moment';
const Recommend = () => {
  const dispatch = useDispatch();
  const liker = useSelector(getLikers);
  console.log('liker asd', liker);
  const handleClickLove = id => () => {
    dispatch(
      reactLike({
        id: id,
        createdAt: moment().toISOString(),
      }),
    );
  };
  return (
    <View style={{backgroundColor: '#FFF5F3', flex: 1}}>
      {liker?.length > 0 ? (
        <>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              padding: 20,
            }}>
            Make friend with me
          </Text>
          <ScrollView style={styles.container}>
            {liker?.map((item, index) => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  borderRadius: 15,
                  padding: 10,
                  elevation: 5,
                  backgroundColor: '#fff',
                  marginHorizontal: 20,
                  marginBottom: 20,
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri: item.avatar,
                  }}
                  style={styles.image}
                />
                <View style={{flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'FredokaOne-Regular',
                        fontSize: 22,
                      }}>
                      {item.petName}
                    </Text>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 0,
                        width: 40,
                        height: 40,
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderColor: '#C2BDBD',
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={handleClickLove(item.id)}>
                      <AntDesign name="heart" color="#E8E8E8" size={18} />
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                    <Fontisto name="map-marker" color="#ffac9c" size={18} />
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 14,
                        fontWeight: '700',
                        color: '#C2BDBD',
                      }}>
                      {item.address}
                    </Text>
                  </View>
                  {/* <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 14, fontWeight: '700'}}>Origin:</Text>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 14,
                    fontWeight: '700',
                    color: '#C2BDBD',
                  }}>
                  Autralian
                </Text>
              </View> */}
                  <Text style={{fontSize: 14, fontWeight: '700'}}>
                    {item.petGender} | {item.age}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      ) : (
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              textAlign: 'center',
              marginTop: 100,
            }}>
            Opps, Let make some friend now!
          </Text>
          <Feather
            name="user-plus"
            color="#ffac9c"
            size={100}
            style={{textAlign: 'center', marginTop: 50}}
          />
        </View>
      )}
    </View>
  );
};

export default Recommend;

const styles = StyleSheet.create({
  container: {
    // padding: 20,
  },
  name: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 24,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: 10,
  },
});
