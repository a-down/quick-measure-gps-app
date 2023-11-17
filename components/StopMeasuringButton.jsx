import { Text, Pressable, Alert } from 'react-native';
import { useState, useEffect } from 'react';

const StopMeasuringButton = ({ isMeasuring, setIsMeasuring, polygonCoordinates }) => {
  const [ buttonText, setButtonText ] = useState("Stop Measuring")
  
  useEffect(() => {
    if (isMeasuring) {
      setButtonText("Stop Measuring")
    } else if (!isMeasuring && polygonCoordinates.length !== 0) {
      setButtonText("Resume Measuring")
    } else {
      setButtonText("Start Measuring")
    }
  }, [isMeasuring, polygonCoordinates])

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
      className=" p-4 rounded-2xl shadow-sm" 
      style={{backgroundColor: isMeasuring ? '#C9E9C8' : '#6DAB64'}}
      onPress={stopMeasuringAlert}>
      <Text className="text-center text-xl font-semibold" style={{color: isMeasuring ? '#3B3B3B' : '#fff'}}>
        { buttonText }
      </Text>
    </Pressable>
  )
}

export default StopMeasuringButton;