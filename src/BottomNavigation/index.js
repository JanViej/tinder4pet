/*eslint-disable*/
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
import IntroSlider2 from '../IntroSlider';

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
import Instruction from '../Instruction';

import Chat from '../Chat';
import Call from '../Call'

const Tab = createMaterialBottomTabNavigator();

const BottomNavigation = () => {
  // const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  // const accountTabComponent = isAuthenticated ? Home : PhoneSignIn;
  return (
    <Tab.Navigator
      // initialRouteName="Menu"
      activeColor="#FFAC9C"
      inactiveColor="#FEE5E1"
      barStyle={{backgroundColor: '#fff'}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Foundation name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Recommend"
        component={Recommend}
        options={{
          tabBarLabel: 'Discovery',
          tabBarIcon: ({color}) => (
            <Ionicons name="heart" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Room"
        component={Room}
        options={{
          tabBarLabel: 'Connect',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="message" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="user" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const StepScreen = {
  Login,
  Questionnaire,
  IntroSlider,
  Instruction,
  FormProfile,
};
const MenuStack = createStackNavigator();

const MenuStackScreen = () => {
  const currentUser = useSelector(state => state.auth.data);
  //  steps = ['INTRO_SLIDER', 'INSTRUCTION', 'FORM_PROFILE', 'DONE']S
  return (
    <MenuStack.Navigator headerMode={false}>
      {(() => {
        if(currentUser?.data?.currentScreen === 'Signup') {
          return <MenuStack.Screen name="Signup2" component={Signup} />;
        }
        else 
        {if (!currentUser?.data?.gmail)
          return <MenuStack.Screen name="Login" component={Login} />;
        if (!currentUser?.data?.introStep)
          return (
            <MenuStack.Screen name="IntroSlider" component={IntroSlider} />
          );
        if (currentUser?.data?.introStep !== 'Done')
          return (
            <MenuStack.Screen
              name={`${currentUser?.data?.introStep}`}
              component={StepScreen[currentUser?.data?.introStep]}
            />
          );
        return <MenuStack.Screen name="Home" component={BottomNavigation} />;}
      })()}
      <MenuStack.Screen name="Chat" component={Chat} />
      <MenuStack.Screen name="Login2" component={Login} />

      <MenuStack.Screen name="Home2" component={Home} />
      <MenuStack.Screen name="FormProfile2" component={FormProfile} />
      {/* <MenuStack.Screen name="Questionnaire" component={Questionnaire} /> */}
      <MenuStack.Screen name="Account" component={Account} />
      <MenuStack.Screen name="Profile" component={Profile} />
      <MenuStack.Screen name="Gallery" component={Gallery} />
      <MenuStack.Screen name="ImageView" component={ImageView} />
      <MenuStack.Screen name="UploadScreen" component={UploadScreen} />
      <MenuStack.Screen name="Message" component={Message} />
      <MenuStack.Screen name="Room" component={Room} />
      <MenuStack.Screen name="Recommend" component={Recommend} />
      <MenuStack.Screen name="Detail" component={Detail} />
      <MenuStack.Screen name="Splash" component={Splash} />
      <MenuStack.Screen name="Menu" component={BottomNavigation} />
      <MenuStack.Screen name="Details" component={Details} />
      <MenuStack.Screen name="Cart" component={Cart} />
      <MenuStack.Screen name="PhoneSignIn" component={PhoneSignIn} />
      <MenuStack.Screen name="Signup" component={Signup} />
      <MenuStack.Screen name="HistoryDetails" component={HistoryDetails} />
      <MenuStack.Screen name="Call" component={Call} />
    </MenuStack.Navigator>
  );
};

export default MenuStackScreen;
