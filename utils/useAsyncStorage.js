import { AsyncStorage } from 'react-native';

export default async function useAsyncStorage(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value)
    } else {
      return null
    }
  } catch (error) {
      return null
  }
}