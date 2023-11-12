import { Text, Pressable, Alert } from 'react-native';

const StopMeasuringButton = ({ isMeasuring, setIsMeasuring }) => {
  const stopMeasuringAlert = () => {
    isMeasuring 
      ? Alert.alert(
        "Stop Measuring",
        "Are you sure you want to stop measuring?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { text: "Stop Measuring", onPress: () => setIsMeasuring(false) }
        ]
      )
      : setIsMeasuring(true)
  }

  return (
    <Pressable 
      className=" p-4 rounded-md shadow-sm" 
      style={{backgroundColor: isMeasuring ? '#ddd' : '#fff'}}
      onPress={stopMeasuringAlert}>
      <Text className="text-center text-xl">
        { isMeasuring ? "Stop Measuring" : "Start Measuring" }
      </Text>
    </Pressable>
  )
}

export default StopMeasuringButton;