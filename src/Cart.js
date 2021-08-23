/*eslint-disable*/

import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';
import {isEmpty} from 'lodash';
import {Button, ButtonGroup} from 'react-native-elements';
import CardItem from './components/CardItem';
import Delete from './components/Delete';
import {SwipeListView} from 'react-native-swipe-list-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  getDataCartItems,
  getTotalPrice,
  getItemsToCreate,
} from './redux/cart/selector';
import {createOrder} from './redux/order/actions';
import {actions} from './redux/cart/slice';
import Modal from 'react-native-modal';

export default function Cart({navigation}) {
  const dispatch = useDispatch();
  const dataList = useSelector(getDataCartItems);
  const totalPrice = useSelector(getTotalPrice);
  const itemsToCreate = useSelector(getItemsToCreate);
  const [isVisible, setVisible] = useState(false);
  const [isSpin, setSpin] = useState(false);
  const token = useSelector(state => state.user.token);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const onClickBack = () => {
    navigation.goBack();
  };

  const deleteRow = rowKey => {
    console.log('delete row at', rowKey);
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  console.log('isSpin', isSpin);

  const onClickBuy = () => {
    if (token) {
      setSpin(true);
      dispatch(createOrder(itemsToCreate)).then(() => {
        setTimeout(() => {
          setVisible(true);
          setSpin(false);
          dispatch(actions.resetCart());
        }, 2000);
      });
    } else {
      navigation.push('Login');
    }
  };

  const renderItem = data => (
    <TouchableHighlight
      onPress={() => console.log('You touched me')}
      underlayColor={'#fff'}>
      <View>
        <CardItem data={data.item} isCart />
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = data => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(data.item.key)}>
        <Delete />
        {/* <Text style={styles.backTextWhite}>Delete</Text> */}
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Modal style={styles.modal} isVisible={isVisible}>
        <View style={styles.modalWrapper}>
          <AntDesign name="checkcircle" color="#5fa4b7" size={18} />
          <Text style={styles.text}>Your order is placed, check History !</Text>
          <Button
            onPress={handleCloseModal}
            title="x"
            titleStyle={{fontSize: 20, color: '#5fa4b7'}}
            containerStyle={styles.btnCloseContainer}
            buttonStyle={styles.buttonCloseStyle}
          />
        </View>
      </Modal>
      {isEmpty(dataList) ? (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.back} onPress={onClickBack}>
              <AntDesign name="left" color="#fff" size={18} />
            </TouchableOpacity>
            <Text style={styles.title}>Cart List</Text>
          </View>
          <Text style={styles.empty}>Your cart is empty</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.back} onPress={onClickBack}>
              <AntDesign name="left" color="#fff" size={18} />
            </TouchableOpacity>
            <Text style={styles.title}>Cart List</Text>
          </View>
          <ActivityIndicator animating={isSpin} size="large" color="#1F5D74" />
          <SwipeListView
            data={dataList}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-70}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onRowDidOpen}
          />
          <View style={styles.footer}>
            <Text style={styles.totalPrice}>{totalPrice} VND</Text>
            <Button
              onPress={onClickBuy}
              title="Buy Now"
              titleStyle={{fontSize: 20}}
              containerStyle={styles.btnContainer}
              buttonStyle={styles.buttonStyle}
            />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: 10,
  },
  btnCloseContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  buttonCloseStyle: {
    backgroundColor: '#fff',
    padding: 0,
    margin: 0,
  },
  text: {
    flex: 9,
    paddingLeft: 5,
  },
  modalWrapper: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonStyle: {
    backgroundColor: '#5ca4b8',
    paddingHorizontal: 30,
    borderRadius: 8,
    marginHorizontal: 20,
    fontSize: 20,
  },
  empty: {
    fontSize: 20,
    flex: 1,
    color: '#586573',
    textAlign: 'center',
    paddingVertical: 10,
  },
});
