import { Text, Pressable, Alert, Button, View, Circle } from 'react-native';
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
      <Button 
        color={mapType === "standard" ? "#7f1d1d" : "#fee2e2"}
        title="Reset" 
        onPress={resetMeasurementsAlert} />
      {/* <Pressable className="py-2 px-4 bg-gray-9 flex-row justify-center border-green-2 rounded-full" style={{gap: 8}}>
        <Feather name="x-circle" size={24} color="#477F3C"/>
        <Text className="mt-1 text-green-2">Reset</Text>
      </Pressable> */}
    </View>
  )
  // return (
  //   <Pressable className="flex-grow rounded-md bg-gray-1 border border-red-200 flex-row px-4 py-3 items-center justify-center" style={{gap: 8}} onPress={resetMeasurements}>
  //     {/* <Feather name="x-circle" size={24} color="#7f1d1d"/> */}
  //     <Text className=" text-red-900 text-lg font-semibold">Reset</Text>
  //   </Pressable>
  // )
}

export default ResetMeasurementsButton