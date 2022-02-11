import React, {useState, useEffect} from 'react';
import {Voximplant} from 'react-native-voximplant';

const PrivateWrapper = ({children, navigationHandler}) => {
  const voximplant = Voximplant.getInstance();

  useEffect(() => {
    voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
      // console.log(
      //   'asd incomingCallEvent',
      //   incomingCallEvent,
      //   '_______',
      //   incomingCallEvent.call,
      // );
      navigationHandler.navigate('IncomingCallScreen', {
        call: incomingCallEvent.call,
        isVideoCall: incomingCallEvent?.video ? true : false,
      });
    });

    return () => {
      voximplant.off(Voximplant.ClientEvents.IncomingCall);
    };
  }, []);
  return children;
};

export default PrivateWrapper;
