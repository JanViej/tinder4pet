import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

const Notification = ({
  title,
  desc,
  colorTitle = 'red',
  isVisible,
  setIsVisible,
  extraComponent,
  width,
  height,
}) => {
  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      backdropColor="#000"
      backdropOpacity={0.1}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
      onBackdropPress={() => setIsVisible(false)}>
      <View
        style={{
          width: width || 250,
          height: height || 100,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          opacity: 5,
          borderRadius: 8,
          padding: 10,
        }}>
        <Text
          style={{
            fontWeight: '700',
            marginBottom: 20,
            color: colorTitle,
          }}>
          {title}
        </Text>
        <Text>{desc}</Text>
        {extraComponent && extraComponent}
      </View>
    </Modal>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    // padding: 20,
  },
  name: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 24,
  },
  image: {
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
