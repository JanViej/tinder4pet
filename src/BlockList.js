import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackHandler,
  Modal,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Notification from './components/Notification';
import {setMatch} from './redux/recommend/actions';
import {setUnblock} from './redux/room/actions';

const BlockList = ({navigation}) => {
  const dispatch = useDispatch();
  const blockData = useSelector(state => state.room.blockData);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPartner, setCurrentPartner] = useState();
  const userData = useSelector(state => state.auth.data);

  const handleClickUnlock = () => {
    setIsVisible(false);
    dispatch(
      setMatch({
        data: {
          deActiveId: false,
          matchId: currentPartner?.matchId,
        },
        id: userData.id,
      }),
    );
    dispatch(
      setMatch({
        data: {
          deActiveId: false,
          matchId: currentPartner?.matchId,
        },
        id: currentPartner.id,
      }),
    );
    dispatch(
      setUnblock({
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
      <TouchableOpacity onPress={handleClickUnlock}>
        <Text>Unlock</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <Notification
        title="Unlock Friend"
        desc={`You are about to remove ${currentPartner?.name} for good. ${currentPartner?.name} will not be able to contact with you at any change, both information are keep secretly until you change this action.`}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        extraComponent={extraComponent}
        height={180}
      />
      <View style={styles.header}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name="left" color="#000" size={20} />
          {/* <Text style={{fontSize: 16, marginLeft: 5}}>Back</Text> */}
        </TouchableOpacity>
        <Text style={{fontSize: 16, fontWeight: '700', marginRight: 10}}>
          BlockList
        </Text>
      </View>
      {blockData?.map(item => (
        <TouchableOpacity key={item.id}>
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
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'FredokaOne-Regular',
                flexGrow: 1,
              }}>
              {item.name}
            </Text>
            <TouchableOpacity
              style={{marginRight: 20}}
              onPress={() => {
                setIsVisible(true);
                setCurrentPartner(item);
              }}>
              <AntDesign name="unlock" color="#000" size={30} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BlockList;
const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginLeft: 20,
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    paddingHorizontal: 20,
    marginVertical: 10,
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
  input: {
    color: '#000',
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#FFC3B8',
    elevation: 5,
    backgroundColor: '#fff',
  },
});
