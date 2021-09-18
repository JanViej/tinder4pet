/*eslint-disable*/
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Menu from '../Menu';
import Details from '../ItemDetails';
import Cart from '../Cart';
import History from '../History';
import Splash from '../Splash';
import Login from '../Login';
import Signup from '../Signup';
import Map from '../Map';
import HistoryDetails from '../HistoryDetails';
import IntroSlider from '../IntroSlider';
import PhoneSignIn from '../PhoneSignIn';
import Home from '../Home';
import Detail from '../Detail';
import Recommend from '../Recommend';
import Room from '../Room';
import Message from '../Message';
import UploadScreen from '../UploadScreen';
import Account from '../Account';
import Gallery from '../Gallery';
import ImageView from '../ImageView';
import Profile from '../Profile';
import FormProfile from '../FormProfile';
import Questionnaire from '../Questionnaire';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigation = () => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const accountTabComponent = isAuthenticated ? Home : PhoneSignIn;
  return (
    <Tab.Navigator
      // initialRouteName="Menu"
      activeColor="#64A1BD"
      inactiveColor="#DDECF1"
      barStyle={{backgroundColor: '#fff'}}>
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="view-dashboard-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      {isAuthenticated && (
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarLabel: 'History',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="history" color={color} size={26} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

const MenuStack = createStackNavigator();

const MenuStackScreen = () => (
  <MenuStack.Navigator headerMode={false}>
    <MenuStack.Screen name="Login" component={Login} />
    <MenuStack.Screen name="IntroSlider" component={IntroSlider} />
    <MenuStack.Screen name="Questionnaire" component={Questionnaire} />
    <MenuStack.Screen name="Account" component={Account} />
    <MenuStack.Screen name="Profile" component={Profile} />
    <MenuStack.Screen name="FormProfile" component={FormProfile} />
    <MenuStack.Screen name="Gallery" component={Gallery} />
    <MenuStack.Screen name="ImageView" component={ImageView} />
    <MenuStack.Screen name="UploadScreen" component={UploadScreen} />
    <MenuStack.Screen name="Message" component={Message} />
    <MenuStack.Screen name="Room" component={Room} />
    <MenuStack.Screen name="Recommend" component={Recommend} />
    <MenuStack.Screen name="Detail" component={Detail} />
    <MenuStack.Screen name="Home" component={Home} />
    <MenuStack.Screen name="Splash" component={Splash} />
    <MenuStack.Screen name="Menu" component={BottomNavigation} />
    <MenuStack.Screen name="Details" component={Details} />
    <MenuStack.Screen name="Cart" component={Cart} />
    <MenuStack.Screen name="PhoneSignIn" component={PhoneSignIn} />
    <MenuStack.Screen name="Signup" component={Signup} />
    <MenuStack.Screen name="HistoryDetails" component={HistoryDetails} />
    <MenuStack.Screen name="Map" component={Map} />
  </MenuStack.Navigator>
);

export default MenuStackScreen;