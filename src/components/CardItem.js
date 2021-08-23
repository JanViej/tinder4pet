/*eslint-disable*/
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {getDrinkById} from '../redux/cart/actions';
import {getDrinkById as getDrinkFromHistory} from '../redux/order/actions';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../redux/cart/slice';

const style = StyleSheet.create({
  tinyLogo: {
    flex: 4,
    width: 130,
    height: 130,
    marginRight: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  rowFront: {
    height: 130,
    margin: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5fa4b7',
    borderRadius: 20,
    borderColor: '#fff',
  },
  icon: {
    backgroundColor: '#B3CEDA',
    borderRadius: 100,
    width: 26,
    height: 26,
  },
  overView: {
    flex: 5,
    alignItems: 'flex-start',
  },
  quantity: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    paddingBottom: 5,
  },
  price: {
    fontSize: 16,
    paddingBottom: 5,
    color: '#fff',
  },
  number: {
    fontSize: 16,
    color: '#fff',
    paddingHorizontal: 10,
  },
  text: {
    color: '#fff',
  },
  number2: {
    fontSize: 16,
    color: '#fff',
  },
});

const CardItem = ({isHistory, data, status, isCart}) => {
  const [cartItemImg, setCartItemImg] = useState('')
  const dispatch = useDispatch();
  // const [image, setImage] = useState(
  //   'https://firebasestorage.googleapis.com/v0/b/thecoffee-1a154.appspot.com/o/copy_703997980.png?alt=media&token=368365b6-8e43-475d-b07b-ab89a0081048',
  // );

  console.log('data :', data);
  const handleClickAdd = () => {
    console.log('add');
    dispatch(actions.setQuantity({
      id: data.id,
      quantity: data.quantity + 1,
    }));
  };
  const handleClickMinus = () => {
    console.log('minus');
    if (quantity > 0) {
      dispatch(actions.setQuantity({
        id: data.id,
        quantity: data.quantity - 1,
      }));
    };
  };

  useEffect(() => {
    if (isCart) {
      dispatch(getDrinkById(data.id));
    }
    if(isHistory) {
      dispatch(getDrinkFromHistory(data['_id'])).then(({ payload }) => setCartItemImg(payload?.image));
    }
  }, []);

  return (
    <View style={style.rowFront}>
      <Image
        style={style.tinyLogo}
        source={{
          uri: data.image || cartItemImg,
        }}
      />
      <View style={style.overView}>
        {isHistory ? (
          <View>
            <Text style={style.title}>{data.name}</Text>
            <Text style={style.price}>{data.price} VND</Text>
            <Text style={style.number2}>Quantity: {data.quantity}</Text>
            {status === 'success' && (
              <Text style={style.text}>Press to leave a comment</Text>
            )}
          </View>
        ) : (
          <View>
            <Text style={style.title}>{data.name}</Text>
            <Text style={style.price}>{data.price} VND</Text>
            <View style={style.quantity}>
              <TouchableOpacity onPress={handleClickMinus}>
                <Feather
                  style={style.icon}
                  name="minus"
                  color="#fff"
                  size={26}
                />
              </TouchableOpacity>
              <Text style={style.number}>{data.quantity}</Text>
              <TouchableOpacity onPress={handleClickAdd}>
                <Entypo style={style.icon} name="plus" color="#fff" size={26} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default CardItem;
