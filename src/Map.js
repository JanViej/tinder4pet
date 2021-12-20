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
navigator.geolocation = require('@react-native-community/geolocation');

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {actions} from './redux/user/slice';
import {getMe} from './redux/user/actions';

const openMap = () => {
  // const query = `37.78825,-122.4324`;
  // Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
};

const Map = ({navigation}) => {
  const dispatch = useDispatch();
  // const userData = useSelector(state => state.user.data);
  const [value, setValue] = useState('');
  const width = Dimensions.get('window').width;
  // const [lat, setLat] = useState(userData?.position?.lat);
  // const [lng, setLng] = useState(userData?.position?.lng || 0);

  return (
    <View style={styles.container}>
      <View
        style={{maxHeight: 200, width: width, zIndex: 1, position: 'absolute'}}>
        <GooglePlacesAutocomplete
          placeholder="Address"
          enablePoweredByContainer={false}
          onPress={(data, details = null) => {
            setValue(data.description);
            console.log('details', details.geometry.location);
            console.log('details', data.description);
            // setLocation(details.geometry.location);
          }}
          query={{
            key: 'AIzaSyAIXbWGnDn_LAZiLLweDNk6FMD-WWFrdXc',
            language: 'vi',
          }}
          fetchDetails={true}
          textInputProps={{
            placeholderTextColor: '#5ca4b8',
            onChangeText: text => {
              setValue(text);
            },
            value: value,
            borderRadius: 10,
          }}
          styles={{
            textInput: {
              height: 60,
              color: '#1F5D74',
              fontSize: 16,
              fontSize: 18,
              fontWeight: '600',
              backgroundColor: '#e1eff5',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
        />
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
