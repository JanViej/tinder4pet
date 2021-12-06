import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import call from 'react-native-phone-call';

const triggerCall = () => {
  const args = {
    number: '0967704704',
    prompt: true,
  };
  // Make a call
  call(args).catch(console.error);
};

const Call = () => {
  return (
    <View>
      <TouchableOpacity onPress={triggerCall}>
        <Text>Press</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Call;
