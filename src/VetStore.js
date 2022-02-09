import React, {useEffect, useState} from 'react';
import {
  View,
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TabBar,
  Image,
} from 'react-native';
import {TabView, SceneMap, SceneRendererProps} from 'react-native-tab-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getVet, getStore} from './redux/vetStore/actions';
import {useDispatch, useSelector} from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';

const renderTabBar = (props: SceneRendererProps & {navigationState: State}) => (
  <View style={styles.tabbar}>
    {props.navigationState.routes.map((route: Route, index: number) => {
      return (
        <TouchableWithoutFeedback
          key={route.key}
          onPress={() => props.jumpTo(route.key)}>
          {renderItem(props)({route, index})}
        </TouchableWithoutFeedback>
      );
    })}
  </View>
);

const renderItem = ({navigationState, position}) => ({route, index}) => {
  const inputRange = navigationState.routes.map((_, i) => i);

  const activeOpacity = position.interpolate({
    inputRange,
    outputRange: inputRange.map((i: number) => (i === index ? 1 : 0)),
  });
  const inactiveOpacity = position.interpolate({
    inputRange,
    outputRange: inputRange.map((i: number) => (i === index ? 0 : 1)),
  });

  return (
    <View style={styles.tab}>
      <Animated.View style={[styles.item, {opacity: inactiveOpacity}]}>
        <Ionicons
          name={route.icon}
          size={26}
          style={[styles.icon, styles.inactive]}
        />
        <Text style={[styles.label, styles.inactive]}>{route.title}</Text>
      </Animated.View>
      <Animated.View
        style={[styles.item, styles.activeItem, {opacity: activeOpacity}]}>
        <Ionicons
          name={route.icon}
          size={26}
          style={[styles.icon, styles.active]}
        />
        <Text style={[styles.label, styles.active]}>{route.title}</Text>
      </Animated.View>
    </View>
  );
};

const VetStore = ({navigation}) => {
  const dispatch = useDispatch();
  const vets = useSelector(state => state.vetStore.vets);
  const stores = useSelector(state => state.vetStore.stores);

  const FirstRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#ff4081'}]}>
      {vets?.map((item, index) => (
        <TouchableOpacity
          key={`vet-${index}`}
          style={{
            flexDirection: 'row',
            borderRadius: 15,
            padding: 10,
            elevation: 5,
            backgroundColor: '#fff',
            marginHorizontal: 20,
            marginBottom: 20,
            alignItems: 'center',
            marginTop: 10,
          }}
          onPress={() => {
            navigation.push('DetailVetStore', {
              vet: item,
            });
          }}>
          <Image
            source={{
              uri: item?.cover,
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
                  fontSize: 20,
                }}>
                {item.name}
              </Text>
            </View>
            <Text style={{fontSize: 14, fontWeight: '700'}}>
              Doc: {item?.admin}
            </Text>
            <Text style={{fontSize: 14, fontWeight: '700'}}>
              Phone: {item?.phone}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
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
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const SecondRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#673ab7'}]}>
      {stores?.map((item, index) => (
        <TouchableOpacity
          key={`vet-${index}`}
          style={{
            flexDirection: 'row',
            borderRadius: 15,
            padding: 10,
            elevation: 5,
            backgroundColor: '#fff',
            marginHorizontal: 20,
            marginBottom: 20,
            alignItems: 'center',
            marginTop: 10,
          }}
          onPress={() => {
            console.log('asd click store');
            navigation.push('DetailVetStore', {
              vet: item,
            });
          }}>
          <Image
            source={{
              uri: item?.cover,
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
                  fontSize: 20,
                }}>
                {item.name}
              </Text>
            </View>
            <Text style={{fontSize: 14, fontWeight: '700'}}>
              Owner: {item?.admin}
            </Text>
            <Text style={{fontSize: 14, fontWeight: '700'}}>
              Phone: {item?.phone}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
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
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const initialLayout = {width: Dimensions.get('window').width};

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Vet'},
    {key: 'second', title: 'Store'},
  ]);

  useEffect(() => {
    dispatch(getVet());
  }, []);

  useEffect(() => {
    dispatch(getStore());
  }, []);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          elevation: 5,
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" color="#000" size={22} />
        </TouchableOpacity>
        <Text
          style={{
            flexGrow: 1,
            textAlign: 'center',
            paddingRight: 20,
            fontSize: 18,
            fontFamily: 'FredokaOne-Regular',
          }}>
          Explore
        </Text>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.container}
        renderTabBar={renderTabBar}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .2)',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    height: 45,
    marginTop: -5,
    // paddingTop: 4.5,
  },
  activeItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  active: {
    color: '#ff4081',
  },
  inactive: {
    color: '#939393',
  },
  icon: {
    height: 26,
    width: 26,
  },
  label: {
    margin: 0,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: 10,
  },
});

export default VetStore;
