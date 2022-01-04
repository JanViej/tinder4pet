import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {setMatch} from '../redux/recommend/actions';
import moment from 'moment';

export const useMatching = () => {
  const userData = useSelector(state => state.auth.data);
  const dispatch = useDispatch();

  const getIsMatch = ({partner}) => {
    if (
      !partner?.match?.find(e => e.id === userData?.id) &&
      partner?.like?.find(e => e.id === userData?.id)
    ) {
      const matchId = moment().unix();

      dispatch(
        setMatch({
          data: {
            id: userData?.id,
            avatar: userData?.data?.avatar,
            name: userData?.data?.petName,
            currentText: 'Say Hi to new friend !!!',
            status: 'undone',
            matchId: matchId,
          },
          id: partner?.id,
        }),
      );
      dispatch(
        setMatch({
          data: {
            id: partner?.id,
            avatar: partner.avatar,
            name: partner.petName,
            currentText: 'Say Hi to new friend !!!',
            status: 'undone',
            matchId: matchId,
          },
          id: userData.id,
        }),
      );
    }
  };
  return {getIsMatch};
};
