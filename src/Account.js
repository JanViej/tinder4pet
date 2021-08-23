/*eslint-disable*/
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Login from './Login';
import Signup from './Signup';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {Avatar} from 'react-native-elements';
import {Button} from 'react-native-elements';
import {ScrollView} from 'react-native';
import {logout, getMe, updateUser, changePassword} from './redux/user/actions';
import Modal from 'react-native-modal';
import Map from './Map';
import {actions} from './redux/user/slice';
import {actions as cartActions} from './redux/cart/slice';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: 15,
  },
  header: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F5D74',
    flexGrow: 1,
    textAlign: 'center',
  },
  back: {
    backgroundColor: '#5fa4b7',
    padding: 5,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  edit: {
    backgroundColor: '#5fa4b7',
    padding: 5,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  icon: {
    backgroundColor: '#5fa4b750',
    padding: 20,
    borderRadius: 50,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  input: {
    color: '#1F5D74',
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: '#e1eff5',
    paddingVertical: 15,
  },
  data: {
    flex: 1,
    marginHorizontal: 20,
  },
  wrapper: {
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  btnContainer: {
    width: 100,
    paddingBottom: 20,
  },
  buttonStyle: {
    backgroundColor: '#5ca4b8',
    borderRadius: 8,
  },
  btnChangePassContainer: {},
  buttonChangePassStyle: {
    backgroundColor: 'transparent',
  },
  changePass: {
    height: 100,
    flexGrow: 3,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  headerModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleModal: {
    color: '#1F5D74',
    fontSize: 18,
    fontWeight: '700',
  },
  btnCloseContainer: {
    backgroundColor: '#fff',
  },
  buttonCloseStyle: {
    backgroundColor: '#fff',
    padding: 0,
    margin: 0,
  },
  modalWrapper: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    paddingLeft: 10,
    flexGrow: 1,
  },
});

const Account = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.data);
  const token = useSelector(state => state.user.token);
  const active = useSelector(state => state.user.isActive);
  const password = useSelector(state => state.user.password);

  const [inputOldPassword, setInputOldPassword] = useState('');
  const [inputNewPassword, setInputNewPassword] = useState('');
  const [inputRetypePassword, setInputRetypePassword] = useState('');
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const [inputPassword, onChangeInputPassword] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isWarningVisible, setWarningVisible] = useState(false);
  const [isWarning1, setWarning1] = useState(false);
  const [isWarning2, setWarning2] = useState(false);
  const [isWarning3, setWarning3] = useState(false);

  const onChangeInputUsername = value => {
    dispatch(actions.setInfo({username: value}));
  };

  const onChangeInputAddress = value => {
    dispatch(actions.setInfo({address: value}));
  };

  const onChangeInputPhoneNo = value => {
    dispatch(actions.setInfo({phone: value}));
  };

  const onChangeInputOldPassword = value => {
    setInputOldPassword(value);
  };

  const onChangeInputNewPassword = value => {
    setInputNewPassword(value);
  };

  const onChangeInputReTypePassword = value => {
    setInputRetypePassword(value);
  };

  const onClickBack = () => {
    dispatch(actions.setActive({isActive: false}));
    navigation.goBack();
  };

  const onClickEdit = () => {
    dispatch(actions.setActive({isActive: true}));
  };

  const onClickSave = () => {
    dispatch(actions.setActive({isActive: false}));
    dispatch(
      updateUser({
        username: userData.username,
        phone: userData.phone,
        address: userData.address,
        position: userData.position,
      }),
    ).then(response => {
      if (!response.error) {
        navigation.push('Splash');
      }
    });
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleCloseWarningModal = () => {
    setWarningVisible(false);
  };

  const onClickCancel = () => {
    dispatch(actions.setActive(false));

    dispatch(getMe());
  };

  const onClickLogout = () => {
    dispatch(logout());
    dispatch(cartActions.resetCart());
  };

  const handleClickShowMap = () => {
    if (active) navigation.push('Map');
  };

  const handleClickBack = () => {
    setModalVisible(false);
  };

  const onClickChange = () => {
    setVisible(true);
  };

  const handleChangePass = () => {
    if (inputOldPassword !== password) setWarning1(true);
    if (inputNewPassword === inputOldPassword) setWarning3(true);
    if (inputNewPassword !== inputRetypePassword) setWarning2(true);
    else if (inputOldPassword) {
      dispatch(
        changePassword({
          password: inputOldPassword,
          newPassword: inputNewPassword,
          newPasswordAgain: inputRetypePassword,
        }),
      ).then(() => {
        setVisible(false);
        setWarningVisible(true);
      });
    }
  };

  useEffect(() => {
    if (!userData.length) {
      dispatch(getMe());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Modal style={styles.modalWarning} isVisible={isWarningVisible}>
        <View style={styles.modalWrapper}>
          <AntDesign name="checkcircle" color="#5fa4b7" size={18} />
          <Text style={styles.text1}>Updated!</Text>
          <Button
            onPress={handleCloseWarningModal}
            title="x"
            titleStyle={{fontSize: 20, color: '#5fa4b7'}}
            containerStyle={styles.btnCloseContainer}
            buttonStyle={styles.buttonCloseStyle}
          />
        </View>
      </Modal>
      <Modal transparent isVisible={isVisible}>
        <View style={styles.modal}>
          <View style={styles.headerModal}>
            <Text style={styles.titleModal}>Change Password</Text>
            <Button
              onPress={handleCloseModal}
              title="x"
              titleStyle={{fontSize: 20, color: '#1F5D74'}}
              buttonStyle={{backgroundColor: 'transparent'}}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Your old password"
              placeholderTextColor="#5ca4b8"
              onChangeText={onChangeInputOldPassword}
              defaultValue={inputOldPassword}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Your new password"
              placeholderTextColor="#5ca4b8"
              onChangeText={onChangeInputNewPassword}
              defaultValue={inputNewPassword}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Retype your new password"
              placeholderTextColor="#5ca4b8"
              onChangeText={onChangeInputReTypePassword}
              defaultValue={inputRetypePassword}
            />
            <Text style={{display: isWarning1 ? 'flex' : 'none'}}>
              <AntDesign name="close" color="red" size={18} />
              Your old password is incorrect
            </Text>
            <Text style={{display: isWarning2 ? 'flex' : 'none'}}>
              <AntDesign name="close" color="red" size={18} />
              Your new password is not matching
            </Text>
            <Text style={{display: isWarning3 ? 'flex' : 'none'}}>
              <AntDesign name="close" color="red" size={18} />
              Your new password has to be different with the old one
            </Text>
            <Button
              onPress={handleChangePass}
              title="Save"
              titleStyle={{fontSize: 20, color: '#1F5D74'}}
              buttonStyle={{backgroundColor: '#5ca4b850', marginTop: 10}}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={onClickLogout}>
          <Feather name="log-out" color="#fff" size={18} />
        </TouchableOpacity>
        <Text style={styles.title}>Personal Data</Text>
        <TouchableOpacity style={styles.edit} onPress={onClickEdit}>
          <AntDesign name="edit" color="#fff" size={18} />
        </TouchableOpacity>
      </View>
      {userData?.active ? (
        <View>
          <View style={styles.wrapper}>
            <View style={styles.icon}>
              <Feather name="user" color="#5fa4b7" size={50} />
            </View>
          </View>

          <View style={styles.data}>
            <Text style={styles.text}>Your name</Text>
            <TextInput
              editable={active}
              style={styles.input}
              defaultValue={userData.username}
              onChangeText={onChangeInputUsername}
              placeholderTextColor="#5ca4b8"
              placeholder={userData.username}
            />
            <Text style={styles.text}>Your address</Text>
            <TouchableOpacity onPress={handleClickShowMap}>
              <TextInput
                editable={false}
                style={styles.input}
                value={userData.address}
                placeholderTextColor="#5ca4b8"
                // onChangeText={onChangeInputAddress}
                placeholder={userData.address}
                autoFocus={true}
                selection={{start: 0, end: 0}}
              />
            </TouchableOpacity>
            <Text style={styles.text}>Your phone number</Text>
            <TextInput
              editable={active}
              style={styles.input}
              defaultValue={userData.phone}
              placeholderTextColor="#5ca4b8"
              onChangeText={onChangeInputPhoneNo}
              placeholder={userData.phone}
            />
          </View>
        </View>
      ) : (
        <View>
          <Text>
            There are some problems with your account, please contact TheCoffee
          </Text>
        </View>
      )}

      {active && (
        <View style={styles.btn}>
          <Button
            onPress={onClickSave}
            title="Save"
            titleStyle={{fontSize: 18}}
            containerStyle={styles.btnContainer}
            buttonStyle={styles.buttonStyle}
          />
          <Button
            onPress={onClickCancel}
            title="Cancel"
            titleStyle={{fontSize: 18}}
            containerStyle={styles.btnContainer}
            buttonStyle={styles.buttonStyle}
          />
        </View>
      )}

      {!active && (
        <View style={styles.changePass}>
          <Button
            onPress={onClickChange}
            title="Change Password"
            titleStyle={{color: '#5fa4b7', textDecorationLine: 'underline'}}
            containerStyle={styles.btnChangePassContainer}
            buttonStyle={styles.buttonChangePassStyle}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Account;
