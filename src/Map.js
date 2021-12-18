/*eslint-disable*/
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import MapView from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {actions} from './redux/user/slice';
import {getMe} from './redux/user/actions';

const openMap = () => {
  // const query = `37.78825,-122.4324`;
  // Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
};

navigator.geolocation = require('@react-native-community/geolocation');

const Map = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.data);
  const [value, setValue] = useState(userData.address);
  const width = Dimensions.get('window').width;
  const [lat, setLat] = useState(userData?.position?.lat);
  const [lng, setLng] = useState(userData?.position?.lng || 0);

  console.log('userData', userData);

  const handleClickCancel = () => {
    dispatch(getMe());
    // navigation.navigate('Account', {screen: 'Account'});
  };

  const handleClickSave = () => {
    console.log(lat, lng)
    dispatch(
      actions.setInfo({
        address: value,
        position: {
          lat: lat,
          lng: lng,
        },
      }),
    );
    // navigation.navigate('Account', {screen: 'Account'});
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.09922,
          longitudeDelta: 0.09421,
        }}>
        <MapView.Marker
          coordinate={{
            latitude: lat,
            longitude: lng,
          }}
          title="My location"
          onPress={openMap}
        />
      </MapView>
      <View
        style={{maxHeight: 200, width: width, zIndex: 1, position: 'absolute'}}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          enablePoweredByContainer={false}
          onPress={(data, details = null) => {
            setValue(data.description);
            setLat(details.geometry.location.lat);
            setLng(details.geometry.location.lng);
          }}
          query={{
            key: 'AIzaSyDGZOhb6qWmy1PLYJrLmtBho18Vasw0C_U',
            language: 'vi',
          }}
          fetchDetails={true}
          textInputProps={{
            placeholderTextColor: '#000',
            onChangeText: text => {
              setValue(text);
            },
            value: value,
          }}
          styles={{
            textInputContainer: {
              padding: 10,
              // backgroundColor: 'red',
              zIndex: 0,
            },
            textInput: {
              height: 38,
              color: '#5d5d5d',
              fontSize: 16,
              elevation: 5,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
        />
      </View>
      <View
        style={{
          width: width,
          height: 'auto',
          margin: 'auto',
          zIndex: 3,
          position: 'absolute',
          bottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity style={styles.btn} onPress={handleClickSave}>
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleClickCancel}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // height: Dimensions.get('window').height,
    flex: 1,
    position: 'relative',
    margin: 0,
  },
  map: {
    minHeight: 600,
    flex: 1,
    zIndex: 0,
  },
  btn: {
    backgroundColor: '#fff',
    fontSize: 20,
    margin: 10,
    padding: 10,
    paddingVertical: 5,
    borderRadius: 8,
    width: 100,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Map;
