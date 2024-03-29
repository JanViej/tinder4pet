import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from './redux/auth/actions';
import PrivateWrapper from './PrivateWrapper';

const Account = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const listMenu = [
    {
      id: 5,
      title: 'My Background',
      icon: (
        <MaterialCommunityIcons
          name="account-circle-outline"
          color="#fff"
          size={22}
        />
      ),
      icBackground: '#F5576A',
      onClick: () => {
        navigation.push('Detail');
        navigation.navigate('Detail', {
          itemId: userData.id,
          screen: 'Account',
        });
      },
    },
    {
      id: 1,
      title: 'Edit Account',
      icon: <Feather name="edit-2" color="#fff" size={22} />,
      icBackground: '#ffac9c',
      onClick: () => {
        navigation.push('Profile');
      },
    },
    {
      id: 2,
      title: 'Edit Profile',
      icon: <AntDesign name="solution1" color="#fff" size={22} />,
      icBackground: '#6A9CFD',
      onClick: () => {
        navigation.push('FormProfile2');
      },
    },

    {
      id: 4,
      title: 'Add media',
      icon: <AntDesign name="camerao" color="#fff" size={22} />,
      icBackground: '#058154',
      onClick: () => {
        navigation.push('Gallery');
      },
    },
    {
      id: 5,
      title: 'Find Vet and Store',
      icon: <AntDesign name="search1" color="#fff" size={22} />,
      icBackground: '#222201',
      onClick: () => {
        navigation.push('VetStore');
      },
    },
    {
      id: 3,
      title: 'Logout',
      icon: <Feather name="log-out" color="#fff" size={22} />,
      icBackground: '#9E220A',
      onClick: () => {
        dispatch(logout());
      },
    },
  ];
  return (
    <PrivateWrapper navigationHandler={navigation}>
      <View style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 40,
            marginTop: 80,
          }}>
          <Image
            source={{
              uri: userData?.data?.avatar,
            }}
            style={styles.image}
          />
          <Text
            style={{
              fontFamily: 'FredokaOne-Regular',
              fontSize: 22,
            }}>
            {userData?.data?.petName}
          </Text>
          <Text style={{fontWeight: '700', color: '#C2BDBD', fontSize: 18}}>
            {userData?.data?.age} | {userData?.data?.address}
          </Text>
        </View>

        {listMenu?.map((item, index) => (
          <TouchableOpacity
            key={`listmenu-account-${index}`}
            onPress={item.onClick}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              paddingBottom: 10,
              borderBottomColor: '#CDCBCB',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: item.icBackground,
                  borderRadius: 100,
                  padding: 10,
                  marginRight: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {item.icon}
              </View>
              <Text style={{fontSize: 16, color: '#706F6F'}}>{item.title}</Text>
            </View>

            <AntDesign name="right" color="#706F6F" size={18} />
          </TouchableOpacity>
        ))}
      </View>
    </PrivateWrapper>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    // padding: 20,
  },
  name: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 24,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 100,
    margin: 10,
  },
});
