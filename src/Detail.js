import React, {useState} from 'react';
import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';

const _renderItem = ({item, index}, parallaxProps) => {
  return (
    <View style={styles.item}>
      <ParallaxImage
        source={{
          uri:
            'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/funny-dog-captions-1563456605.jpg?crop=0.747xw:1.00xh;0.0459xw,0&resize=768:*',
        }}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.4}
        {...parallaxProps}
      />
    </View>
  );
};

const {width: screenWidth} = Dimensions.get('window');

const entries = [
  {
    title: 'Item 1',
    text: 'Text 1',
  },
  {
    title: 'Item 2',
    text: 'Text 2',
  },
  {
    title: 'Item 3',
    text: 'Text 3',
  },
  {
    title: 'Item 4',
    text: 'Text 4',
  },
  {
    title: 'Item 5',
    text: 'Text 5',
  },
];

const Detail = ({navigation}) => {
  const [activeSlide, setActiveSlide] = useState(entries[0]);
  return (
    <View>
      <View>
        <Carousel
          data={entries}
          renderItem={_renderItem}
          onSnapToItem={index => setActiveSlide(index)}
          itemWidth={screenWidth - 40}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          hasParallaxImages={true}
        />
        <TouchableOpacity
          style={{...styles.headerBtn, left: 30}}
          onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" color="#A5A5A5" size={28} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.headerBtn, right: 30}}
          onPress={() =>
            navigation.push('FormProfile', {
              fromPage: 'Detail',
            })
          }>
          {/* <AntDesign name="heart" color="#FF8C76" size={24} /> */}
          <Feather name="edit-2" color="#FF8C76" size={24} />
        </TouchableOpacity>
        <Pagination
          dotsLength={entries.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.containerDotStyle}
          dotStyle={styles.activeDotStyle}
          inactiveDotStyle={styles.inactiveDotStyle}
        />
      </View>
      <View style={{paddingHorizontal: 20, marginTop: 10}}>
        <Text style={styles.name}>Mewo Persiion Cat</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            marginVertical: 5,
          }}>
          <Fontisto name="map-marker" color="#ffac9c" size={24} />
          <Text
            style={{
              paddingLeft: 10,
              fontSize: 18,
              color: '#A5A5A5',
              fontWeight: '700',
              fontFamily: 'FredokaOne-Regular',
            }}>
            DaNang, VietNam
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'space-between',
          }}>
          <View style={styles.boxInfo}>
            <Text style={styles.key}>Sex</Text>
            <Text style={styles.value}>Male</Text>
          </View>
          <View style={styles.boxInfo}>
            <Text style={styles.key}>Age</Text>
            <Text style={styles.value}>5 Months</Text>
          </View>
          <View style={styles.boxInfo}>
            <Text style={styles.key}>Weight</Text>
            <Text style={styles.value}>2kg</Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 14,
            lineHeight: 20,
          }}>
          If you're having a ruff time thinking of caption ideas, stop hounding
          yourself! We already did the work for you. From punny phrases to
          touching quotes, here are the best Instagram captions for dogs that
          are sure to have your followers howlin'.
        </Text>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  name: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 24,
  },
  slider: {
    marginTop: 15,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
  item: {
    width: screenWidth - 40,
    height: 400,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 20,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  activeDotStyle: {
    width: 30,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  inactiveDotStyle: {
    width: 10,
    height: 10,
    backgroundColor: '#000',
  },
  containerDotStyle: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
  },
  boxInfo: {
    borderWidth: 1,
    borderColor: '#ffac9c',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  key: {
    fontFamily: 'FredokaOne-Regular',
    fontWeight: '700',
    color: '#A5A5A5',
  },
  value: {
    fontFamily: 'FredokaOne-Regular',
    fontWeight: '700',
    fontSize: 18,
  },
  headerBtn: {
    top: 35,
    backgroundColor: '#fff',
    elevation: 5,
    position: 'absolute',
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
