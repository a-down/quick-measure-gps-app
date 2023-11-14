import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeMapPreferences = async (data) => {
  try {
    await AsyncStorage.setItem(
      'mapPreferences',
      JSON.stringify(data)
    );
  } catch (error) {
      console.log(error)
  }
}

const MapTypeAlert = async () => {
  Alert.alert(
    "Map Type",
    "What type of map would you like to use?",
    [
      { text: "Standard", onPress: () => storeMapPreferences("Standard") },
      { text: "Satellite", onPress: () => storePreferences("Satellite") },
      { text: "Hybrid", onPress: () => storePreferences("Hybrid") },
      { text: "Cancel", style: "cancel" }
    ]
  );
}

export default MapTypeAlert;