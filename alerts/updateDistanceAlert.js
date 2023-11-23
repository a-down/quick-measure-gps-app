import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const getPreferences = async () => {
  try {
    const preferences = await AsyncStorage.getItem('measurementPreferences');
    if (preferences !== null) {
      return JSON.parse(preferences);
    }
  } catch (error) {
    console.log(error);
  }
}

const storePreferences = async (data) => {
  try {
    await AsyncStorage.setItem('measurementPreferences', JSON.stringify(data));
  } catch (eror) {
    console.log(error);
  }
}

export default updateDistanceAlert = async () => {
  const measurementPreferences = await getPreferences();
  Alert.alert(
    "Area Unit of Measurement",
    "What unit of measurement would you like to use for area?",
    [
      { text: "Feet", onPress: () => storePreferences({...measurementPreferences, distance: 'feet', distanceShort: 'ft'}) },
      { text: "Yards", onPress: () => storePreferences({...measurementPreferences, distance: 'yards', distanceShort: 'yd'}) },
      { text: "Meters", onPress: () => storePreferences({...measurementPreferences, distance: 'meters', distanceShort: 'm'}) },
      { text: "Kilometers", onPress: () => storePreferences({...measurementPreferences, distance: 'km', distanceShort: 'km'}) },
      { text: "Miles", onPress: () => storePreferences({...measurementPreferences, distance: 'miles', distanceShort: 'mi'}) },
      { text: "Cancel", style: "cancel" }
    ]
  );
}