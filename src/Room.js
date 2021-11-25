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
} from 'react-native';
import {useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {getMatch} from './redux/room/actions';
import {useDispatch} from 'react-redux';

const {width: windowWidth} = Dimensions.get('window');

const Room = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const matchData = useSelector(state => state.room.matchData);
  useEffect(() => {
    dispatch(getMatch(userData?.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getMatch(userData?.id)).then(() => {
      setRefreshing(false);
    });
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={{padding: 20}}>
        <Text style={{fontSize: 18, color: '#ffac9c'}}>Message</Text>
        <Text
          style={{
            fontFamily: 'FredokaOne-Regular',
            fontSize: 24,
          }}>
          People Waiting
        </Text>
      </View>
      {matchData?.length > 0 ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {matchData?.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate('Chat', {
                  partnerData: item,
                })
              }>
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
                      fontWeight: '700',
                      ...(item.status === 'undone' && {color: '#000'}),
                    }}>
                    {item.currentText}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
});
