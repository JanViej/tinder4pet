import React, {useEffect, useMemo} from 'react';
import {ScrollView} from 'react-native';
import {orderBy} from 'lodash';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {getListOrderByMe} from './redux/order/actions';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  order: {
    flex: 1,
    marginVertical: 5,
    backgroundColor: '#d6e5ec',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    borderRadius: 8,
    // minWidth: 300,
    flexDirection: 'row',
    marginTop: 15,
  },
  id: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5a6775',
    paddingBottom: 10,
  },
  dateTime: {
    color: '#5a6775',
    paddingBottom: 10,
  },
  success: {
    backgroundColor: '#8dc1d0',
    borderRadius: 8,
    maxWidth: 100,
  },
  delivery: {
    backgroundColor: '#ff6666',
    borderRadius: 8,
    maxWidth: 100,
  },
  pending: {
    backgroundColor: '#ff8c1a',
    borderRadius: 8,
    maxWidth: 100,
  },
  statusPending: {
    backgroundColor: '#8dc1d0',
    borderRadius: 8,
    maxWidth: 100,
  },
  statusDelivery: {
    backgroundColor: '#8dc1d0',
    borderRadius: 8,
    maxWidth: 100,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    padding: 3,
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    paddingVertical: 15,
    backgroundColor: '#5da5b7',
    width: '100%',
    textAlign: 'center',
    // marginBottom: 20,
  },
  img: {
    width: 90,
    height: 90,
    marginRight: 10,
  },
});

const listHistoryData = [
  {
    id: '60741a2d45dbfe7a1ef3eced',
    date: '22/04/21',
    time: '06:30',
    status: 'success',
  },
  {
    id: '60741a2d45dbfe7a1ef3eced',
    date: '22/04/21',
    time: '06:30',
    status: 'success',
  },
  {
    id: '60741a2d45dbfe7a1ef3eced',
    date: '22/04/21',
    time: '06:30',
    status: 'success',
  },
  {
    id: '60741a2d45dbfe7a1ef3eced',
    date: '22/04/21',
    time: '06:30',
    status: 'success',
  },
  {
    id: '60741a2d45dbfe7a1ef3eced',
    date: '22/04/21',
    time: '06:30',
    status: 'success',
  },
  {
    id: '60741a2d45dbfe7a1ef3eced',
    date: '22/04/21',
    time: '06:30',
    status: 'success',
  },
  {
    id: '60741a2d45dbfe7a1ef3eced',
    date: '22/04/21',
    time: '06:30',
    status: 'success',
  },
  {
    id: '60741a2d45dbfe7a1ef3eced',
    date: '22/04/21',
    time: '06:30',
    status: 'success',
  },
];

const History = ({navigation}) => {
  const dispatch = useDispatch();
  const historyData = useSelector(state => state.order.historyData);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  const getDate = (date) => {
    return moment(new Date(date)).format('DD/MM/YYYY');
  }

  const getTime = (time) => {
    return moment(new Date(time)).format('HH:mm');
  }

  // console.log(
  //   'historyData',
  //   orderBy(historyData.order || [], ['createdAt'], ['desc']),
  // );
  const onClickDetailHistory = (orderNo, data) => () => {
    navigation.navigate('HistoryDetails', {
      orderNo,
      data,
    });
  };

  useEffect(() => {
    isAuthenticated && dispatch(getListOrderByMe());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History Order</Text>
      <ScrollView style={styles.scrollView}>
        {orderBy(historyData.order || [], ['createdAt'], ['desc']).map(
          (data, index) => (
            <TouchableOpacity
              style={styles.order}
              key={`order-${index}`}
              onPress={onClickDetailHistory(historyData.order?.length - index, data)}>
              <View>
                <Text style={styles.id}>
                  Order #{historyData.order?.length - index}
                </Text>
                <Text style={styles.dateTime}>Order at {getDate(data.createdAt)}, {getTime(data.createdAt)}p</Text>
                <View style={styles[`${data.status}`]}>
                  <Text style={styles.text}>{data.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ),
        )}
      </ScrollView>
    </View>
  );
};

export default History;
