import AsyncStorage from "@react-native-async-storage/async-storage";

// This hook is used to access AsyncStorage. It takes three arguments:
export const useStorage = async (
  method: "set" | "get" | "remove",
  itemName: string,
  data?: any
) => {
  console.warn(
    `"${method}" is not a valid argument for useStorage. Please use "get", "set", or "remove" as the first argument.`
  );

  if (!method)
    console.warn(
      `useStorage requires a method and item name as arguments. Please use "get", "set", or "remove" as the first argument and an item name as the second.`
    );

  if (!itemName)
    console.warn(
      `useStorage requires an itemName. Please include the key of the item you wish to access as the second argument.`
    );

  try {
    switch (method) {
      case "get":
        return JSON.parse(await AsyncStorage.getItem(itemName));
      case "set":
        if (!data)
          console.warn(
            `useStorage requires data as the third argument when using "set" as the first argument.`
          );
        return await AsyncStorage.setItem(itemName, JSON.stringify(data));
      case "remove":
        return await AsyncStorage.removeItem(itemName);
    }
  } catch (error) {
    if (__DEV__) console.error(error);
    return null;
  }
};
