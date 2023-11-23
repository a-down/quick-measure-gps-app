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
      <Pressable className="flex-row justify-center rounded-full items-center" style={{gap: 8}} onPress={resetMeasurementsAlert}>
        <Feather name="x-circle" lineWidth={1} size={24} color={mapType === "standard" ? "#7f1d1d" : "#fee2e2"}/>
        <Text className="text-lg" style={{color: mapType === "standard" ? "#7f1d1d" : "#fee2e2"}}>Reset</Text>
      </Pressable>
    </View>
    // <Feather.Button name="x-circle" size={24} color={mapType === "standard" ? "#7f1d1d" : "#fee2e2"} backgroundColor="transparent" onPress={resetMeasurementsAlert}>
    //   Reset Map
    // </Feather.Button>
  )
  // return (
  //   <Pressable className="flex-grow rounded-md bg-gray-1 border border-red-200 flex-row px-4 py-3 items-center justify-center" style={{gap: 8}} onPress={resetMeasurements}>
  //     {/* <Feather name="x-circle" size={24} color="#7f1d1d"/> */}
  //     <Text className=" text-red-900 text-lg font-semibold">Reset</Text>
  //   </Pressable>
  // )
}

export default ResetMeasurementsButton