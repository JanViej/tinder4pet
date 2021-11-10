import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width: windowWidth} = Dimensions.get('window');

const ListImage = ({
  images,
  listOption,
  handleClickChoose,
  handleClickView,
  handleClickAdd,
}) => {
  return (
    <View style={{flexDirection: 'row', width: windowWidth, flexWrap: 'wrap'}}>
      <TouchableOpacity
        style={{
          width: windowWidth / 4 - 6,
          height: windowWidth / 4 - 6,
          borderWidth: 3,
          borderStyle: 'dashed',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: '#CDCBCB',
          margin: 3,
        }}
        onPress={handleClickAdd}>
        <Text style={{color: '#727070', fontWeight: '700'}}>+ Add</Text>
      </TouchableOpacity>

      {images?.map(item => (
        <TouchableOpacity
          onPress={handleClickView}
          onLongPress={handleClickChoose(item?.url)}>
          <Image
            source={{
              uri: item.url,
            }}
            style={styles.image}
          />
          {listOption?.includes(item.url) && (
            <AntDesign
              style={{position: 'absolute', right: 10, top: 10}}
              name="checkcircle"
              color="#ffac9c"
              size={18}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ListImage;

const styles = StyleSheet.create({
  container: {
    // padding: 20,
  },
  name: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 24,
  },
  image: {
    width: windowWidth / 4 - 6,
    height: windowWidth / 4 - 6,
    margin: 3,
  },
});
