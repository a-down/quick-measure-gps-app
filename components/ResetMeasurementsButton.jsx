import { Text, Pressable, Alert, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ResetMeasurementsButton = ({ resetMeasurements, mapType }) => {
  const resetMeasurementsAlert = () => {
    Alert.alert(
      "Reset Measurements",
      "Are you sure you want to reset your measurements?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Reset", 
          style: "destructive",
          onPress: () => resetMeasurements() 
        }
      ]
    );
  }

  return (
    <View className="flex-grow">
      <Pressable className="flex-row justify-center rounded-full items-center" style={{gap: 8}} onPress={resetMeasurementsAlert}>
        <Feather 
          name="x-circle" 
          size={24} 
          color={mapType === "standard" ? "#7f1d1d" : "#fee2e2"}/>
        <Text 
          className="text-lg" 
          style={{color: mapType === "standard" ? "#7f1d1d" : "#fee2e2"}}>
            Reset
        </Text>
      </Pressable>
    </View>
  )
}

export default ResetMeasurementsButton