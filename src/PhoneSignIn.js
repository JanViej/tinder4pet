import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import auth from '@react-native-firebase/auth';

const PhoneSignIn = () => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  console.log('code', code);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log('confirmation', confirmation);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      const a = await confirm.confirm(code);
      console.log('a', a);
    } catch (error) {
      console.log('Invalid code.', error);
    }
  }

  if (!confirm) {
    return (
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+84 345 161 386')}
      />
    );
  }

  return (
    <View>
      <TextInput
        style={{color: '#000'}}
        value={code}
        onChangeText={text => setCode(text)}
      />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </View>
  );
};

export default PhoneSignIn;
