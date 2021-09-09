import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
  Dimensions,
} from 'react-native';

const {width: windowWidth} = Dimensions.get('window');
const dataList = [
  {
    id: 1,
    name: 'Mewo',
    avatar:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/funny-dog-captions-1563456605.jpg?crop=0.747xw:1.00xh;0.0459xw,0&resize=768:*',
    currentText: 'hihhi',
    status: 'done',
  },
  {
    id: 2,
    name: 'Mewo',
    avatar:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/funny-dog-captions-1563456605.jpg?crop=0.747xw:1.00xh;0.0459xw,0&resize=768:*',
    currentText: 'hihhi',
    status: 'undone',
  },
  {
    id: 3,
    name: 'Mewo',
    avatar:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/funny-dog-captions-1563456605.jpg?crop=0.747xw:1.00xh;0.0459xw,0&resize=768:*',
    currentText: 'hihhi',
    status: 'undone',
  },
];

const Room = () => {
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
      <ScrollView>
        {dataList?.map(item => (
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
              <View>
                <Text style={{fontSize: 18, fontFamily: 'FredokaOne-Regular'}}>
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
