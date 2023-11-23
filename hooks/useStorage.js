import AsyncStorage from "@react-native-async-storage/async-storage"

export default useStorage = async (method, itemName, data) => {
  if (method !== "set" && method !== "get" && method !== "remove") console.warn(`"${method}" is not a valid argument for useStorage. Please use "get", "set", or "remove" as the first argument.`)

  if (!method) console.warn(`useStorage requires a method as the first argument. Please use "get", "set", or "remove" as the first argument.`)

  if (!itemName) console.warn(`useStorage requires an itemName. Please include the key of the item you wish to access as the second argument.`)

  try {
    switch (method) {
      case ('get'):
        const value = await AsyncStorage.getItem(itemName)
        return JSON.parse(value)
        break;
      case ('set'):
        if (!data) console.warn(`useStorage requires data as the third argument when using "set" as the first argument.`)
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