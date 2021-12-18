/*eslint-disable*/
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {get, debounce} from 'lodash';
import {SearchBar} from 'react-native-elements';
import {getCategory, getDrink} from './redux/drink/actions';
import {getEvent} from './redux/event/actions';
import {actions as drinkActions} from './redux/drink/slice';
import MenuItem from './components/MenuItem';
import EventItem from './components/EventItem';
import wave from './assets/image/wave.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Coffee from './assets/image/coffee.svg';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    backgroundColor: '#64A1BD',
    color: '#fff',
    padding: 0,
    margin: 0,
    textAlign: 'right',
  },
  category: {
    paddingTop: 8,
    marginHorizontal: 20,
  },
  categoryItem: {
    marginRight: 15,
    fontSize: 18,
    color: '#c5dfe7',
    fontWeight: '500',
  },
  searchBarContainer: {
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    backgroundColor: '#64A1BD',
    borderWidth: 0,
    marginTop: 6,
    padding: 0,
    flex: 6,
  },
  inputContainer: {
    backgroundColor: '#64A1BD',
    padding: 0,
    margin: 0,
    flexDirection: 'row-reverse',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
    paddingTop: 5,
  },
  title2: {
    color: '#3d5056',
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
    paddingTop: 5,
  },
  scrollView: {
    flex: 1,
  },
  spinner: {
    height: 300,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
  },
  image: {
    height: Dimensions.get('window').height - 135,
  },
  imageBackground: {height: 300},
  secondaryText: {
    color: '#404d4d',
  },
  horizonList: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#64A1BD',
    alignItems: 'center',
  },
  cart: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    backgroundColor: '#64A1BD',
    // height: '80%',
    justifyContent: 'center',
    margin: 'auto',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 100,
    marginStart: 20,
    padding: 10,
    // marginTop: 5,
  },
  event: {
    marginLeft: 20,
    marginTop: 10,
  }
});

const Menu = ({navigation}) => {
  const dispatch = useDispatch();
  const [searchingText, setSearchingText] = useState('');
  const categories = useSelector(state => state.drink.categories);
  const drinks = useSelector(state => state.drink.drinks);
  const loading = useSelector(state => state.drink.loading);
  const events = useSelector(state => state.event.data);

  const currentCategory = useSelector(state => state.drink.currentCategory);

  const updateSearch = search => {
    setSearchingText(search);
    debounce(
      () =>
        dispatch(
          getDrink({
            keyword: search,
            ...(currentCategory?._id && {
              category: currentCategory._id,
            }),
          }),
        ),
      800,
    )();
  };

  const onClickItem = id => {
    // navigation.navigate('Details', {
    //   id,
    // });
  };

  const onClickCart = () => {
    navigation.push('Cart');
  };

  const handleSelectCategory = category => () => {
    dispatch(drinkActions.setCurrentCategory(category));
  };

  useEffect(() => {
    dispatch(getDrink());
    dispatch(getCategory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentCategory?._id) {
      setSearchingText('');
      dispatch(
        getDrink({
          category: currentCategory._id,
        }),
      );
    }
  }, [currentCategory]);

  useEffect(() => {
    dispatch(getEvent());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Coffee style={styles.logo} height={35} width={35} />
        <SearchBar
          style={styles.searchBar}
          placeholder="Find your drink..."
          onChangeText={updateSearch}
          value={searchingText}
          lightTheme
          inputStyle={styles.input}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.inputContainer}
          placeholderTextColor={'#fff'}
          searchIcon={{color: '#fff', size: 30}}
        />
        <TouchableOpacity style={styles.cart} onPress={onClickCart}>
          <Ionicons name="cart" color="#fff" size={30} />
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={wave}
        style={styles.image}
        imageStyle={styles.imageBackground}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Best Coffee In Town</Text>
          <ScrollView horizontal style={styles.category}>
            {categories.map(category => (
              <TouchableOpacity
                onPress={handleSelectCategory(category)}
                key={category._id}>
                <Text
                  style={{
                    ...styles.categoryItem,
                    ...(currentCategory._id === category._id && {
                      color: '#fff',
                      fontWeight: 'bold',
                    }),
                  }}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView horizontal style={styles.horizonList}>
            {loading && (
              <View style={styles.spinner}>
                <ActivityIndicator size="large" color="#17729c" />
              </View>
            )}
            {drinks.map(drink => (
              <MenuItem onClickItem={onClickItem} {...drink} key={drink._id} />
            ))}
          </ScrollView>
          <Text style={styles.title2}>Newest Events</Text>
          <ScrollView horizontal style={styles.event}>
            {events?.data?.map((event, index) => (
              <EventItem event={event} key={`event-${index}`}/>
            ))}
          </ScrollView>
          {/* <Text
            style={{
              ...styles.title,
              ...styles.secondaryText,
            }}>
            Most popular
          </Text>
          <ScrollView horizontal style={styles.horizonList}>
            {menus.map(menu => (
              <MenuItem
                onClickItem={onClickItem}
                key={menu.id}
                {...menu}
                imageHeight={150}
              />
            ))}
          </ScrollView> */}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Menu;
