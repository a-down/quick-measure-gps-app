import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = (itemName) => {
  const getFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem(itemName);
      if (!value) return null;

      return JSON.parse(value);
    } catch (error) {
      if (__DEV__) console.log(error);
      return null;
    }
  };

  const setToStorage = async (data) => {
    try {
      await AsyncStorage.setItem(itemName, JSON.stringify(data));
      const value = await AsyncStorage.getItem(itemName);
      if (!value) {
        if (__DEV__) console.log("Error setting data to storage");
        return null;
      }

      return JSON.parse(value);
    } catch (error) {
      if (__DEV__) console.log(error);
      return null;
    }
  };

  const removeFromStorage = async () => {
    try {
      const removed = await AsyncStorage.getItem(itemName);
      await AsyncStorage.removeItem(itemName);
      if (!removed) return null;

      return JSON.parse(removed);
    } catch (error) {
      if (__DEV__) console.log(error);
      return null;
    }
  };

  return { getFromStorage, setToStorage, removeFromStorage };
};

export { useStorage };
