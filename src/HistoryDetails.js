/*eslint-disable*/
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  View,
} from 'react-native';
import {isEmpty} from 'lodash';
import {Button} from 'react-native-elements';
import CardItem from './components/CardItem';
import Delete from './components/Delete';
import {SwipeListView} from 'react-native-swipe-list-view';
import AntDesign from 'react-native-vector-icons/AntDesign';

const dataList = [
  {
    key: '1',
    value: 'hihi',
    quantity: 2,
  },
  {
    key: '2',
    value: 'hihi',
    quantity: 4,
  },
  {
    key: '3',
    value: 'hihi',
    quantity: 9,
  },
  {
    key: '555',
    value: 'hicakcascksanchi',
    quantity: 0,
  },
  {
    key: '55',
    value: 'hicakcascksanchi',
    quantity: 0,
  },
];

// const dataList = [];

export default function HistoryDetails({route, navigation}) {
  const {orderNo, data} = route.params;
  const onClickBack = () => {
    navigation.goBack();
  };
  
  const status = 'pending';

  const onClickComment = id => () => {
    if(data.status==='success')
    navigation.navigate('Details', {
      isCommendable: true,
      id: id,
    });
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={onClickBack}>
          <AntDesign name="left" color="#fff" size={18} />
        </TouchableOpacity>
        <Text style={styles.title}>Order no #{orderNo}</Text>
      </View>
      <ScrollView>
        {data.drink.map((item, index) => (
          <TouchableOpacity onPress={onClickComment(item['_id'])}>
          <CardItem data={item} isHistory={true} status={data.status} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.totalPrice}>{data.totalPrice}VND</Text>
        <Text style={styles[`${data.status}`]}>{data.status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F5D74',
    marginRight: 35,
    flexGrow: 1,
    textAlign: 'center',
  },
  back: {
    backgroundColor: '#5fa4b7',
    padding: 5,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  header: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  backTextWhite: {
    color: '#000',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#488AA2',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 'auto',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#FFF',
    right: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ecf3f4',
    borderBottomColor: '#fff',
  },
  totalPrice: {
    // backgroundColor: 'red',
    flex: 1,
    paddingHorizontal: 20,
    fontSize: 20,
    color: '#586573',
    fontWeight: 'bold',
  },
  btnContainer: {
    flex: 3,
  },
  success: {
    backgroundColor: '#5ca4b8',
    paddingHorizontal: 30,
    borderRadius: 8,
    marginHorizontal: 20,
    fontSize: 20,
    color: '#fff',
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  delivery: {
    backgroundColor: '#ff6666',
    paddingHorizontal: 30,
    borderRadius: 8,
    marginHorizontal: 20,
    fontSize: 20,
    color: '#fff',
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  pending: {
    backgroundColor: '#ff8c1a',
    paddingHorizontal: 30,
    borderRadius: 8,
    marginHorizontal: 20,
    fontSize: 20,
    color: '#fff',
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  empty: {
    fontSize: 20,
    flex: 1,
    color: '#586573',
    textAlign: 'center',
    paddingVertical: 10,
  },
});
