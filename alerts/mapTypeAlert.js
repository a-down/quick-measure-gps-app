import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const storeMapPreferences = async (data) => {
  try {
    await AsyncStorage.setItem('mapPreferences', JSON.stringify(data));
  } catch (eror) {
    console.log(error);
  }
}

export default updateDistanceAlert = () => {
  Alert.alert(
    "Map Type",
    "What type of map would you like to use?",
    [
      { text: "Standard", onPress: () => storeMapPreferences("standard") },
      { text: "Satellite", onPress: () => storeMapPreferences("satellite") },
      { text: "Hybrid", onPress: () => storeMapPreferences("hybrid") },
      { text: "Cancel", style: "cancel" }
    ]
  );
}