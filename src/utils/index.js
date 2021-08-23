import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value, key) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value.substring(1, value.length - 1);
  } catch (e) {
    // error reading value
  }
};

export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {}
};
