/*eslint-disable*/
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {getData} from './utils';
import {actions} from './redux/user/slice';
import {setAuthToken} from './api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getToken = async () => {
      const token = await getData('sessionToken');
      // const isActive = await getData('active');
      // setAuthToken(token);
      if (token) dispatch(actions.setToken(token));
      // dispatch(actions.setActive(isActive));
      navigation.navigate('Menu');
      console.log('token', token);
    };
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Text>Loading</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Splash;
