import {useSelector} from 'react-redux';

export const useComment = () => {
  const users = useSelector(state => state.home.users);

  const getComment = ({comment}) => {
    return comment?.map((item, index) => ({
      avatar: users.find(e => e.id === item.id)?.avatar,
      petName: users.find(e => e.id === item.id)?.petName,
      comment: item,
    }));
  };
  return {getComment};
};
