import {createSelector} from 'reselect';

const getAllUserData = state => state?.home?.allUsersData;
const getLiker = state => state?.auth?.data?.data?.liker;

export const getLikers = createSelector(
  [getAllUserData, getLiker],
  (usersData, liker) => {
    return usersData.filter(item => liker?.find(e => e.id === item.id));
  },
);
