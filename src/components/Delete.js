import React, {useState} from 'react';
import {
  Text, 
  View, 
  StyleSheet, 
  Image,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const style = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: '#B3CEDA',
    padding: 10,
    width: 'auto',
    height: 'auto',
  }
});

const Delete = () => {
  const handleDelete = () => {
    console.log("delete");
  }

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={handleDelete}>
        <MaterialCommunityIcons name="delete" color='#fff' size={30} />
      </TouchableOpacity>
    </View>
  )
}

export default Delete;