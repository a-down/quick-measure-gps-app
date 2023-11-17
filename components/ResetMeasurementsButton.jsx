import { Text, Pressable, Alert } from 'react-native';

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
    <Pressable className="flex-grow p-4" onPress={resetMeasurementsAlert}>
      <Text className="text-center text-lg text-[#515151]">Reset</Text>
    </Pressable>
  )
}

export default ResetMeasurementsButton