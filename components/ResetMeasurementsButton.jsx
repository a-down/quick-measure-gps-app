import { Text, Pressable, Alert, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ResetMeasurementsButton = ({ resetMeasurements, mapType, setMarkersToDelete }) => {
  const resetMeasurementsAlert = () => {
    Alert.alert(
      "Reset Measurements",
      "Are you sure you want to delete ALL markers?",
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
          color={"#fee2e2"}/>
        <Text 
          className="text-lg font-medium" 
          style={{color: "#fee2e2"}}>
            Delete All Markers
        </Text>
      </Pressable>
    </View>
  )
}

export default ResetMeasurementsButton