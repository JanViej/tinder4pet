import React, {createContext, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

export const UserContext = createContext({});

export const UserProvider = ({children}) => {
  const userData = useSelector(state => state?.auth?.data);

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};
