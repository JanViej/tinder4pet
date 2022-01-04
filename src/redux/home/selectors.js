import {createSelector} from 'reselect';
import {intersectionBy} from 'lodash';

const getAllUserData = state => state?.home?.allUsersData;
const getMatchData = state => state?.room?.matchData;

export const getDogs = createSelector([getAllUserData], usersData => {
  return usersData.filter(item => item?.type === 'dog' || item?.type === 'all');
});

export const getCats = createSelector([getAllUserData], usersData => {
  return usersData.filter(item => item?.type === 'cat' || item?.type === 'all');
});

export const getRooms = createSelector(
  [getAllUserData, getMatchData],
  (usersData, matchData) => {
    const a = intersectionBy(usersData, matchData, 'id');

    return a.map((item, index) => ({
      avatar: item.avatar,
      petName: item.petName,
      match: matchData.filter(e => e.id === item.id),
    }));
  },
);
