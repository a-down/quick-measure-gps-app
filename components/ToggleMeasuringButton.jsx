import { Text, Pressable, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from "expo-location";
import { Feather } from '@expo/vector-icons';

const ToggleMeasuringButton = ({ isMeasuring, setIsMeasuring, polygonCoordinates, setPolygonCoordinates }) => {
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

  const stopMeasuringAlert = async () => {
    if (polygonCoordinates.length === 0) {
      let location = await Location.getCurrentPositionAsync({});
      setPolygonCoordinates([{latitude: location.coords.latitude, longitude: location.coords.longitude}])
    }
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
      className=" p-4 rounded-full shadow-sm flex-row items-center justify-center" 
      style={{backgroundColor: isMeasuring ? '#C9E9C8' : '#6DAB64', gap: 8}}
      onPress={stopMeasuringAlert}>
        {isMeasuring 
          ? <Feather name="pause" size={24} color='#1D3F13'/> 
          : <Feather name="play" size={24} color='#fff'/>}
      <Text className="text-center text-xl font-semibold" style={{color: isMeasuring ? '#1D3F13' : '#fff'}}>
        { buttonText }
      </Text>
    </Pressable>
  )
}

export default ToggleMeasuringButton;