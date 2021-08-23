import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
const data = [
  {
    title: 'Title 1',
    text: 'The huge base of \nusers',
    image: require('./assets/image/slide1.png'),
    bg: '#fff',
  },
  {
    title: 'Title 2',
    text: 'Choose the coolest guy',
    image: require('./assets/image/slide2.png'),
    bg: '#fff',
  },
  {
    title: 'Rocket guy',
    text: 'See who like you',
    image: require('./assets/image/slide3.png'),
    bg: '#fff',
  },
];
const width = Dimensions.get('window').width;

const IntroSlider = ({navigation}) => {
  // eslint-disable-next-line no-undef
  const _renderItem = ({item}) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.bg,
          },
        ]}>
        <Image source={item.image} style={styles.image} />
        <Text style={[styles.text, {color: '#000', zIndex: 1}]}>
          {item.text}
        </Text>
        <Image
          source={require('./assets/image/circle.png')}
          style={styles.circle}
        />
        <Image
          source={require('./assets/image/png.png')}
          style={styles.circle2}
        />
      </View>
    );
  };

  // eslint-disable-next-line no-undef
  const _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    // navigation.push('Login');
    navigation.navigate('Login');
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text
          style={{
            color: '#fff',
            width: '100%',
            textAlign: 'center',
            fontSize: 24,
          }}>
          Next
        </Text>
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text
          style={{
            color: '#fff',
            width: '100%',
            textAlign: 'center',
            fontSize: 22,
          }}>
          Start now
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        renderItem={_renderItem}
        data={data}
        onDone={_onDone}
        bottomButton
        dotStyle={{backgroundColor: '#FEE5E1'}}
        activeDotStyle={{backgroundColor: '#FFB8D0'}}
        renderNextButton={_renderNextButton}
        renderDoneButton={_renderDoneButton}
      />
    </View>
  );
};

export default IntroSlider;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    position: 'relative',
  },
  image: {
    width: width,
    height: 300,
    marginVertical: 32,
  },
  text: {
    marginTop: 40,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Sriracha-Regular',
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
  buttonCircle: {
    flex: 1,
    backgroundColor: '#FFB8D0',
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    height: 80,
    width: 80,
    zIndex: 0,
    bottom: 180,
    left: 40,
  },
  circle2: {
    position: 'absolute',
    height: 120,
    width: 120,
    zIndex: 0,
    bottom: 30,
    right: -40,
  },
});
