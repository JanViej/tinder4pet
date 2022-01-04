import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {getAllUser, reactLike, reactDislike} from './redux/home/actions';
import {getLikers} from './redux/recommend/selectors';
import moment from 'moment';
import balloon from './assets/image/balloons.png';
import Modal from 'react-native-modal';
import {useEffect} from 'react';
import {compact} from 'lodash';
import {setMatch} from './redux/recommend/actions';
import PrivateWrapper from './PrivateWrapper';
import {useMatching} from './hooks/useMatching';

const Recommend = ({navigation}) => {
  const dispatch = useDispatch();
  const liker = useSelector(getLikers);
  const [isVisible, setIsVisible] = useState(false);
  const {getIsMatch} = useMatching();
  const [refreshing, setRefreshing] = useState(false);
  const userData = useSelector(state => state.auth.data);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getAllUser()).then(() => {
      setRefreshing(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRefreshing(true);
      dispatch(getAllUser()).then(() => {
        setRefreshing(false);
      });
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const handleClickLove = (id, item) => {
    setIsVisible(true);
    dispatch(
      reactLike({
        id: id,
        createdAt: moment().toISOString(),
      }),
    ).then(() => {
      dispatch(getAllUser());
      getIsMatch({
        partner: item,
      });
    });
    // const matchId = moment().unix();
    // dispatch(
    //   setMatch({
    //     data: {
    //       id: userData?.id,
    //       avatar: userData?.data?.avatar,
    //       name: userData?.data?.petName,
    //       currentText: 'Say Hi to new friend !!!',
    //       status: 'undone',
    //       matchId: matchId,
    //     },
    //     id: id,
    //   }),
    // );
    // dispatch(
    //   setMatch({
    //     data: {
    //       id: id,
    //       avatar: item.avatar,
    //       name: item.petName,
    //       currentText: 'Say Hi to new friend !!!',
    //       status: 'undone',
    //       matchId: matchId,
    //     },
    //     id: userData.id,
    //   }),
    // );
  };

  const handleClickDetail = id => () => {
    navigation.navigate('Detail', {
      itemId: id,
      screen: 'Recommend',
    });
  };

  return (
    <PrivateWrapper navigationHandler={navigation}>
      <ScrollView
        style={{backgroundColor: '#FFF5F3', flex: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Modal
          style={styles.modal}
          isVisible={isVisible}
          backdropColor="#ffac9c"
          backdropOpacity={0.6}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={balloon} style={styles.image} />
            <Text style={{marginTop: 30, fontSize: 20}}>
              Your pets are matched,
            </Text>
            <TouchableOpacity>
              <Text style={{marginTop: 8}}>
                Press here to start talking now
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setIsVisible(false)}>
            <Text style={{marginBottom: 20, textDecorationLine: 'underline'}}>
              Skip
            </Text>
          </TouchableOpacity>
        </Modal>
        {liker?.length > 0 ? (
          <>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '700',
                padding: 20,
              }}>
              Make friend with me
            </Text>
            <View>
              {liker?.map((item, index) => (
                <TouchableOpacity
                  key={`liker-${index}`}
                  style={{
                    flexDirection: 'row',
                    borderRadius: 15,
                    padding: 10,
                    elevation: 5,
                    backgroundColor: '#fff',
                    marginHorizontal: 20,
                    marginBottom: 20,
                    alignItems: 'center',
                  }}
                  onPress={handleClickDetail(item.id)}>
                  <Image
                    source={{
                      uri: item.avatar,
                    }}
                    style={styles.image}
                  />
                  <View style={{flex: 1}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'FredokaOne-Regular',
                          fontSize: 22,
                        }}>
                        {item.petName}
                      </Text>
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          right: 0,
                          width: 40,
                          height: 40,
                          backgroundColor: '#fff',
                          borderWidth: 1,
                          borderColor: '#ffac9c',
                          borderRadius: 100,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          console.log(
                            'asd aaaa',
                            compact(
                              item?.liker?.filter(e => e.id === userData?.id),
                            ).length > 0,
                          );
                          if (
                            compact(
                              item?.liker?.filter(e => e.id === userData?.id),
                            ).length > 0
                          ) {
                            navigation.navigate('Room');
                          } else {
                            handleClickLove(item.id, item);
                          }
                        }}>
                        {compact(
                          item?.liker?.filter(e => e.id === userData?.id),
                        ).length > 0 ? (
                          <MaterialCommunityIcons
                            name="message"
                            color="#ffac9c"
                            size={18}
                          />
                        ) : (
                          <AntDesign name="heart" color="#E8E8E8" size={18} />
                        )}
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{flexDirection: 'row', alignItems: 'baseline'}}>
                      <Fontisto name="map-marker" color="#ffac9c" size={18} />
                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 14,
                          fontWeight: '700',
                          color: '#C2BDBD',
                        }}>
                        {item.address}
                      </Text>
                    </View>
                    {/* <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 14, fontWeight: '700'}}>Origin:</Text>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 14,
                    fontWeight: '700',
                    color: '#C2BDBD',
                  }}>
                  Autralian
                </Text>
              </View> */}
                    <Text style={{fontSize: 14, fontWeight: '700'}}>
                      {item.petGender} | {item.age}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                textAlign: 'center',
                marginTop: 100,
              }}>
              Opps, Let make some friend now!
            </Text>
            <Feather
              name="user-plus"
              color="#ffac9c"
              size={100}
              style={{textAlign: 'center', marginTop: 50}}
            />
          </View>
        )}
      </ScrollView>
    </PrivateWrapper>
  );
};

export default Recommend;

const styles = StyleSheet.create({
  container: {
    // padding: 20,
  },
  name: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 24,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: 10,
  },
  modal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
