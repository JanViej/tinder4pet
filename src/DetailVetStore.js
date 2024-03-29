import React, {useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
  Linking,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {ScrollView} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import loveIcon from './assets/image/love.png';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width: screenWidth} = Dimensions.get('window');

const DetailVetStore = ({navigation, route}) => {
  const [activeSlide, setActiveSlide] = useState(userData?.data?.images[0]);
  const userData = useSelector(state => state.auth.data);
  const {vet, store} = route.params;
  const [isVisible, setIsVisible] = useState(false);

  console.log('asd vet', vet);
  const swipeCardRef = useRef();

  // useEffect(() => {
  //   if (screen !== 'Account' && itemId) {
  //     dispatch(getUserById(itemId));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [screen, itemId]);

  // useEffect(() => {
  //   if (screen !== 'Account' && partnerDetail && userData) {
  //     setDataDetail(partnerDetail);
  //     setLove(
  //       compact(partnerDetail?.liker?.filter(e => e.id === userData?.id))
  //         .length > 0
  //         ? true
  //         : false,
  //     );
  //   } else {
  //     setDataDetail(userData.data);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [screen, partnerDetail]);

  const handleClickImage = current => {
    navigation.navigate('ImageView', {
      index: current?._activeItem,
      images: current?.props?.data,
      screen: 'VetStore',
    });
  };

  const _renderItem = ({item, index}, parallaxProps) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => handleClickImage(swipeCardRef.current)}>
        <ParallaxImage
          source={{
            uri: item.url,
          }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <Modal
        style={styles.modal}
        isVisible={isVisible}
        backdropColor="#fff"
        backdropOpacity={0.6}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        onBackdropPress={() => setIsVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={loveIcon} style={styles.icon} />
        </View>
      </Modal>
      <View>
        <Carousel
          data={vet?.images || []}
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
          ref={swipeCardRef}
        />
        <TouchableOpacity
          style={{...styles.headerBtn, left: 30}}
          onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" color="#A5A5A5" size={28} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.headerBtn, right: 30}}
          onPress={() => {
            Linking.openURL(`tel:${vet?.phone}`);
          }}>
          <Ionicons name="call" color="#ffac9c" size={24} />
        </TouchableOpacity>
        <Pagination
          dotsLength={vet?.images?.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.containerDotStyle}
          dotStyle={styles.activeDotStyle}
          inactiveDotStyle={styles.inactiveDotStyle}
        />
      </View>
      <View style={{paddingHorizontal: 20, marginTop: 10}}>
        <Text style={styles.name}>{vet.name}</Text>
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
            {vet.address}
          </Text>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'space-between',
          }}>
          <View style={styles.boxInfo}>
            <Text style={styles.key}>Sex</Text>
            <Text style={styles.value}>{vet.petGender}</Text>
          </View>
          <View style={styles.boxInfo}>
            <Text style={styles.key}>Age</Text>
            <Text style={styles.value}>{dataDetail.age}</Text>
          </View>
          <View style={styles.boxInfo}>
            <Text style={styles.key}>Weight</Text>
            <Text style={styles.value}>{dataDetail.weight || 'No Data'}</Text>
          </View>
        </View> */}
        <Text
          style={{
            fontSize: 14,
            lineHeight: 20,
            marginBottom: 20,
          }}>
          {vet.description || 'No Data'}
        </Text>
      </View>
    </ScrollView>
  );
};

export default DetailVetStore;

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
  icon: {
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
