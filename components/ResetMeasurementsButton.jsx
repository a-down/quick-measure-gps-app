import { Text, Pressable, Alert } from 'react-native';

const ResetMeasurementsButton = ({ resetMeasurements }) => {
  const resetMeasurementsAlert = () => {
    Alert.alert(
      "Reset Measurements",
      "Are you sure you want to reset your measurements?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Reset", onPress: () => resetMeasurements() }
      ]
    );
  }

  return (
    <Pressable className="flex-grow p-4" onPress={resetMeasurementsAlert}>
      <Text className="text-center text-lg">Reset</Text>
    </Pressable>
  )
}

export default ResetMeasurementsButton