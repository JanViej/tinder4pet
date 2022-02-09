import {useSelector} from 'react-redux';

export const useFilterAddress = () => {
  // const userData = useSelector(state => state.auth.data);
  const all = useSelector(state => state.home.allUsersData);

  const getAllUserAddress = (address, currentCategory) => {
    let data = [...all];
    if (address !== 'All') {
      data = all.filter(item => item?.address === address);
    }
    if (currentCategory?.id === 3) {
      return data;
    }
    return data.filter(item => item?.type === currentCategory?.value);
  };
  return {getAllUserAddress};
};
