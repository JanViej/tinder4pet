import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {login} from './redux/user/actions';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'red',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    flex: 1,
  },
  header: {
    marginBottom: 15,
    marginTop: 150,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F5D74',
  },
  signup: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  signup1: {
    color: '#8dc1d0',
    fontSize: 18,
    marginBottom: 15,
  },
  signup2: {
    color: '#5ca4b8',
    fontWeight: 'bold',
    fontSize: 18,
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
  btnContainer: {
    justifyContent: 'flex-end',
    marginBottom: 30,
    flexGrow: 1,
  },
  buttonStyle: {
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#5fa2b7',
  },
  back: {
    backgroundColor: '#5fa4b7',
    padding: 5,
    borderRadius: 8,
    marginTop: 15,
    width: 30,
  },
});

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [inputUsername, onChangeInputUsername] = useState('');
  const [inputPassword, onChangeInputPassword] = useState('');

  const onClickLogin = () => {
    if(inputUsername.trim() && inputPassword.trim()) {
      dispatch(login({
        username: inputUsername,
        password: inputPassword,
      })).then(response => {
        if (!response.error)
          navigation.push('Splash');
      })
    }
  };

  const onClickSignUp = () => {
    console.log('hihi');
    navigation.push('Signup');
  };

  const onClickBack = () => {
    navigation.push('Menu');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={onClickBack}>
        <AntDesign name="left" color="#fff" size={18} />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>Hey,</Text>
        <Text style={styles.title}>Login Now.</Text>
      </View>
      <View style={styles.signup}>
        <Text style={styles.signup1}>If you are new / </Text>
        <Text style={styles.signup2} onPress={onClickSignUp}>
          Create new
        </Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#5ca4b8"
          onChangeText={onChangeInputUsername}
        value={inputUsername}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#5ca4b8"
          onChangeText={onChangeInputPassword}
        value={inputPassword}
        />
      </View>
      <Button
        onPress={onClickLogin}
        title="Login"
        titleStyle={{fontSize: 20}}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.buttonStyle}
      />
    </View>
  );
};

export default Login;
