import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getMatch} from './redux/room/actions';
import {useDispatch} from 'react-redux';
import {setMatch} from './redux/recommend/actions';
import firestore from '@react-native-firebase/firestore';
import {voximplantLogin} from './redux/auth/actions';
import {getRooms} from './redux/home/selectors';
import {SwipeListView} from 'react-native-swipe-list-view';
import Notification from './components/Notification';
import {setBlock} from './redux/room/actions';

const {width: windowWidth} = Dimensions.get('window');

const Room = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const matchData = useSelector(state => state.room.matchData);
  const loading = useSelector(state => state.room.loading);
  const roomData = useSelector(getRooms);
  const [match, setMatchs] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [currentPartner, setCurrentPartner] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRefreshing(true);
      dispatch(getMatch(userData?.id)).then(() => {
        setRefreshing(false);
      });
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('account')
      .doc(userData?.id)
      .onSnapshot(snapshot => {
        setMatchs(snapshot?._data?.match || {});
      });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getMatch(userData?.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(voximplantLogin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.data?.voximplantUsername]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getMatch(userData?.id)).then(() => {
      setRefreshing(false);
    });
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          if (!item?.deActiveId) {
            navigation.navigate('Chat', {
              partnerData: item,
            });
            dispatch(
              setMatch({
                data: {
                  status: 'done',
                  matchId: item?.matchId,
                },
                id: userData.id,
              }),
            );
          }
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 12,
            borderTopWidth: 0.5,
            borderColor: '#FEE5E1',
            backgroundColor: '#fff',
            aligndatas: 'center',
          }}>
          <Image
            source={{
              uri: item.avatar,
            }}
            style={styles.image}
          />
          <View>
            <Text style={{fontSize: 18, fontFamily: 'FredokaOne-Regular'}}>
              {item.name}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                width: windowWidth - 150,
                color: '#C2BDBD',
                ...(item.status === 'undone' &&
                  !item?.deActiveId && {
                    color: '#000',
                    fontWeight: '700',
                  }),
              }}>
              {item?.deActiveId
                ? `Sorry, You can not reach ${item.name}`
                : item.currentText}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHiddenItem = data => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={styles.backRightBtn}
          onPress={() => {
            setIsVisible(true);
            setCurrentPartner(data.item);
          }}>
          <MaterialCommunityIcons
            name="account-off-outline"
            color="#ffac9c"
            size={30}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const handleClickRemove = () => {
    setIsVisible(false);
    dispatch(
      setMatch({
        data: {
          deActiveId: userData.id,
          matchId: currentPartner?.matchId,
        },
        id: userData.id,
      }),
    );
    dispatch(
      setMatch({
        data: {
          deActiveId: userData.id,
          matchId: currentPartner?.matchId,
        },
        id: currentPartner.id,
      }),
    );
    dispatch(
      setBlock({
        id: currentPartner.id,
      }),
    );
  };

  const extraComponent = (
    <View
      style={{
        borderTopColor: 'black',
        borderTopWidth: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 5,
        paddingTop: 5,
      }}>
      <TouchableOpacity onPress={() => setIsVisible(false)}>
        <Text>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleClickRemove}>
        <Text>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text style={{fontSize: 18, color: '#ffac9c'}}>Message</Text>
          <Text
            style={{
              fontFamily: 'FredokaOne-Regular',
              fontSize: 24,
            }}>
            People Waiting
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.push('BlockList');
          }}>
          <AntDesign name="appstore-o" color="#ffac9c" size={30} />
        </TouchableOpacity>
      </View>
      <Notification
        title="Remove Friend"
        desc={`You are about to remove ${currentPartner?.name} for good. ${currentPartner?.name} will not be able to contact with you at any change, both information are keep secretly until you change this action.`}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        extraComponent={extraComponent}
        height={180}
      />
      {loading ? (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <ActivityIndicator
            animating={true}
            size="large"
            color="#1F5D74"
            style={{
              position: 'absolute',
              left: '45%',
              top: '45%',
            }}
          />
        </View>
      ) : matchData?.length > 0 ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {/* {matchData?.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                navigation.navigate('Chat', {
                  partnerData: item,
                });
                dispatch(
                  setMatch({
                    data: {
                      status: 'done',
                      matchId: item?.matchId,
                    },
                    id: userData.id,
                  }),
                );
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 12,
                  borderTopWidth: 0.5,
                  borderColor: '#FEE5E1',
                  backgroundColor: '#fff',
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri: item.avatar,
                  }}
                  style={styles.image}
                />
                <View>
                  <Text
                    style={{fontSize: 18, fontFamily: 'FredokaOne-Regular'}}>
                    {item.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      width: windowWidth - 150,
                      color: '#C2BDBD',
                      ...(item.status === 'undone' && {
                        color: '#000',
                        fontWeight: '700',
                      }),
                    }}>
                    {item.currentText}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))} */}
          <SwipeListView
            data={matchData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-70}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onRowDidOpen}
          />
        </ScrollView>
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
    </View>
  );
};

export default Room;

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginLeft: 20,
    marginRight: 10,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },

  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    backgroundColor: '#FFF',
    right: 0,
  },
});
