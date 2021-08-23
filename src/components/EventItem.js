/*eslint-disable*/
import React from 'react';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';

const style = StyleSheet.create({
  containers: {
    marginRight: 10,
    backgroundColor: '#5fa4b6',
    borderRadius: 8,
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    // flex: 1,
    fontSize: 18,
    fontWeight: '700',
    width: 100,
    textAlign: 'right',
  },
  desc: {
    // flex: 1,
    textAlign: 'right',
    color: '#fff',
    // backgroundColor: 'transparent',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    width: 100,
    height: '100%',
    // backgroundColor: 'red',
  },
  content: {
    // flexDirection: 'row',
    width: 100,
  },
});

const image = {
  uri:
    'https://firebasestorage.googleapis.com/v0/b/thecoffee-1a154.appspot.com/o/coffee.png?alt=media&token=b61667ae-293e-492e-b517-62271d3357b0',
};

const EventItem = ({event}) => {
  console.log('event', event);
  return (
    <View>
      {event.active && (
        <View style={style.containers}>
          <ImageBackground source={image} style={style.image}></ImageBackground>
          <View style={style.content}>
            <Text style={style.title}>{event.name}</Text>
            <Text style={style.desc}>{event.desc}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default EventItem;
