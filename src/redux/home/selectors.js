import {createSelector} from 'reselect';

const getAllUserData = state => state?.home?.allUsersData;

export const getDogs = createSelector([getAllUserData], usersData => {
  return usersData.filter(item => item?.type === 'dog' || item?.type === 'all');
});

export const getCats = createSelector([getAllUserData], usersData => {
  return usersData.filter(item => item?.type === 'cat' || item?.type === 'all');
});
