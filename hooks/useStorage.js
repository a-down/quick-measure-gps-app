import AsyncStorage from "@react-native-async-storage/async-storage"

export default useStorage = async (method, itemName, data) => {
  try {
    switch (method) {
      case ('get'):
        return AsyncStorage.getItem(itemName)
        break;
      case ('set'):
        return await AsyncStorage.setItem(itemName, JSON.stringify(data))
        break;
      case ('remove'):
        return await AsyncStorage.removeItem(itemName)
        break;
    }

  } catch (error) {
    console.log(error)
    return null;
  }
}