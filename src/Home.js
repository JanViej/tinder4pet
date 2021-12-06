import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SwipeCards from 'react-native-swipe-cards-deck';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import selection from './assets/image/selection.png';
import {logout} from './redux/auth/actions';
import shadow from './assets/image/shadow.png';
import {useRef} from 'react';
import {actions as userActions} from './redux/user/slice';
import {useDispatch, useSelector} from 'react-redux';
import {getAllUser, reactLike, reactDislike} from './redux/home/actions';
import {getCats, getDogs} from './redux/home/selectors';
import moment from 'moment';
import Call from './Call';

const StatusCard = ({text}) => {
  return (
    <View style={{flex: 1}}>
      <Text style={styles.cardsText}>{text}</Text>
    </View>
  );
};

const categories = [
  {
    id: 1,
    name: 'Dog',
    value: 'dog',
  },
  {
    id: 2,
    name: 'Cat',
    value: 'cat',
  },
  {
    id: 3,
    name: 'All',
    value: 'all',
  },
];

const Home = ({navigation}) => {
  // const [cards, setCards] = useState();
  const swipeCardRef = useRef();
  const dispatch = useDispatch();
  // const currentCategory = useSelector(state => state.user.currentCategory);
  const all = useSelector(state => state.home.allUsersData);
  const userData = useSelector(state => state.auth.data);
  const dog = useSelector(getDogs);
  const cat = useSelector(getCats);
  const [filterData, setFilterData] = useState(all);
  const [currentCategory, setCurrentCategory] = useState(categories[2]);

  useEffect(() => {
    if (all) {
      setFilterData(all);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all]);

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  const Card = ({data}) => {
    return (
      <View style={[styles.card, {backgroundColor: data.backgroundColor}]}>
        <TouchableOpacity onPress={handelClickDetail(data.id)}>
          <Image source={{uri: data?.avatar}} style={styles.image} />
          <Image source={shadow} style={{position: 'absolute', bottom: 90}} />
          <Text
            style={{
              position: 'absolute',
              bottom: 100,
              color: '#fff',
              left: 10,
              fontSize: 20,
              fontWeight: '700',
            }}>
            {data?.petName},
          </Text>
        </TouchableOpacity>
        <View style={styles.bottomReact}>
          <TouchableOpacity
            style={styles.iconClose}
            onPress={swipeCardRef.current?.swipeNope}>
            <Ionicons name="close" color="#FFB8D0" size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconLove}
            onPress={swipeCardRef.current?.swipeYup}>
            <AntDesign name="heart" color="#fff" size={28} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleYup = card => {
    dispatch(
      reactLike({
        id: card?.id,
        createdAt: moment().toISOString(),
      }),
    );
    return true; // return false if you wish to cancel the action
  };
  const handleNope = card => {
    dispatch(
      reactDislike({
        id: card?.id,
        createdAt: moment().toISOString(),
      }),
    );
    return true;
  };
  const handleMaybe = card => {
    return false;
  };

  const handelClickDetail = id => () => {
    navigation.navigate('Detail', {
      itemId: id,
      screen: 'Home',
    });
  };

  const handleClickAddress = () => {
    // dispatch(logout());
    navigation.push('Call');
  };

  const handleClickBell = () => {};

  const handleSelectCategory = category => () => {
    if (category.value === 'dog') {
      setFilterData(dog);
      setCurrentCategory(categories[0]);
    } else if (category.value === 'cat') {
      setFilterData(cat);
      setCurrentCategory(categories[1]);
    } else {
      setFilterData(all);
      setCurrentCategory(categories[2]);
    }
    // dispatch(userActions.setCurrentCategory(category));
  };

  return (
    <View style={styles.container}>
      <View style={{width: '100%'}}>
        <Text style={{fontSize: 18, color: '#aba3a2'}}>Location</Text>
        <View style={styles.addressRow}>
          <Fontisto name="map-marker" color="#ffac9c" size={24} />
          <Text
            style={{flex: 5, fontSize: 24, fontWeight: '700', marginLeft: 10}}>
            {userData?.data?.address}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flex: 3,
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={styles.btnIcon}
              onPress={handleClickAddress}>
              <Ionicons name="search" color="#ffac9c" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnIcon} onPress={handleClickBell}>
              <FontAwesome5 name="bell" color="#ffac9c" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            elevation: 1,
            borderRadius: 10,
            height: 45,
            marginRight: 15,
          }}>
          <Image
            source={selection}
            style={{width: 32, height: 28, margin: 8}}
          />
        </View>
        {categories.map(item => (
          <TouchableOpacity
            style={{
              ...styles.cirleSelect,
              ...(currentCategory.id === item.id && {
                backgroundColor: '#FEE5E1',
              }),
            }}
            onPress={handleSelectCategory(item)}
            key={item.id}>
            <Text
              style={{
                ...styles.categoryItem,
                ...(currentCategory.id === item.id && {
                  color: '#000',
                  fontFamily: 'FredokaOne-Regular',
                }),
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filterData ? (
        <SwipeCards
          ref={swipeCardRef}
          cards={filterData}
          renderCard={cardData => <Card data={cardData} />}
          keyExtractor={cardData => String(cardData.text)}
          renderNoMoreCards={() => <StatusCard text="No more cards..." />}
          actions={{
            nope: {
              onAction: handleNope,
              view: (
                <View style={styles.reactCancel}>
                  <Ionicons name="close" color="#FFB8D0" size={28} />
                </View>
              ),
              containerStyle: styles.oldStyle,
            },
            yup: {
              onAction: handleYup,
              view: (
                <View style={styles.reactLove}>
                  <AntDesign name="heart" color="#fff" size={28} />
                </View>
              ),
              containerStyle: styles.oldStyle,
            },
            maybe: {onAction: handleMaybe},
          }}
          hasMaybeAction={false}
        />
      ) : (
        <StatusCard text="Loading..." />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 450,
    borderRadius: 20,
    elevation: 5,
  },
  cardsText: {
    fontSize: 22,
  },
  reactLove: {
    borderRadius: 100,
    backgroundColor: '#FFBFB3',
    borderColor: '#FFBFB3',
    padding: 20,
    bottom: 100,
    right: 10,
    position: 'absolute',
  },
  reactCancel: {
    borderRadius: 100,
    backgroundColor: '#FEE5E1',
    borderColor: '#FEE5E1',
    padding: 20,
    bottom: 100,
    left: 10,
    position: 'absolute',
  },
  oldStyle: {
    borderWidth: 0,
    width: '85%',
  },
  bottomReact: {
    position: 'absolute',
    bottom: 0,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    // height: 60,
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  image: {
    width: 300,
    height: 450,
    borderRadius: 20,
  },
  iconClose: {
    borderRadius: 100,
    backgroundColor: '#FEE5E1',
    borderColor: '#FEE5E1',
    padding: 12,
  },
  iconLove: {
    borderRadius: 100,
    backgroundColor: '#FFBFB3',
    borderColor: '#FFBFB3',
    padding: 12,
  },
  btnIcon: {
    elevation: 5,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    width: 40,
    alignItems: 'center',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryItem: {
    color: '#ffac9c',
    fontFamily: 'FredokaOne-Regular',
  },
  cirleSelect: {
    borderColor: '#FEE5E1',
    borderWidth: 1,
    marginRight: 15,
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
