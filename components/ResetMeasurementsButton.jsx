import { Text, Pressable, Alert, Button, View } from 'react-native';

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
    <View className="flex-grow p-2">
      <Button 
        color="#222222"
        title="Reset" 
        onPress={resetMeasurementsAlert} />
    </View>
  )
}

export default ResetMeasurementsButton