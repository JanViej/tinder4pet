import React, {useState, useEffect} from 'react';
import {Voximplant} from 'react-native-voximplant';

const PrivateWrapper = ({children, navigationHandler}) => {
  const voximplant = Voximplant.getInstance();
  useEffect(() => {
    voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
      navigationHandler.navigate('IncomingCallScreen', {
        call: incomingCallEvent.call,
      });
    });

    return () => {
      voximplant.off(Voximplant.ClientEvents.IncomingCall);
    };
  }, []);
  return children;
};

export default PrivateWrapper;
