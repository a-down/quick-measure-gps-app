import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert } from "react-native"

const getPreferences = async () => {
  try {
    const preferences = await AsyncStorage.getItem('measurementPreferences')
    if (preferences !== null) {
      return JSON.parse(preferences)
    }
  } catch (error) {
    console.log(error)
  }
}

const storePreferences = async (data) => {
  try {
    await AsyncStorage.setItem('measurementPreferences', JSON.stringify(data))
  } catch (eror) {
    console.log(error)
  }
}

export default updateAreaAlert = async () => {
  const measurementPreferences = await getPreferences()
  Alert.alert(
    "Area Unit of Measurement",
    "What unit of measurement would you like to use for area?",
    [
      { text: "Sq Feet", onPress: () => storePreferences({...measurementPreferences, area: 'sq feet', areaShort: 'sqft'}) },
      { text: "Sq Yards", onPress: () => storePreferences({...measurementPreferences, area: 'sq yards', areaShort: 'sqyd'}) },
      { text: "Acres", onPress: () => storePreferences({...measurementPreferences, area: 'acres', areaShort: 'a'}) },
      { text: "Sq Meters", onPress: () => storePreferences({...measurementPreferences, area: 'sq meters', areaShort: 'sqm'}) },
      { text: "Sq Kilometers", onPress: () => storePreferences({...measurementPreferences, area: 'sq km', areaShort: 'sqkm'}) },
      { text: "Cancel", style: "cancel" }
    ]
  );
}