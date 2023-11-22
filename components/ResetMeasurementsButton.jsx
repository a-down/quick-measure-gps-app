import { Text, Pressable, Alert, Button, View } from 'react-native';
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
    <View className="p-2 flex-grow">
      <Button 
        color={mapType === "standard" ? "#000" : "#fff"}
        title="Reset" 
        onPress={resetMeasurementsAlert} />
      {/* <Pressable className="py-2 px-4 bg-gray-9 flex-row justify-center border-green-2 rounded-full" style={{gap: 8}}>
        <Feather name="x-circle" size={24} color="#477F3C"/>
        <Text className="mt-1 text-green-2">Reset</Text>
      </Pressable> */}
    </View>
  )
}

export default ResetMeasurementsButton