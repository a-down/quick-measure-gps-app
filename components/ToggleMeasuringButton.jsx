import { Text, Pressable, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from "expo-location";
import { Feather } from '@expo/vector-icons';
import { semibold } from '../hooks/useJostFont';

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
      className={` p-4 rounded-full shadow-sm flex-row items-center justify-center ${isMeasuring ? 'bg-green-3' : 'bg-green-5'} ${isMeasuring  ? 'active:bg-green-2' : 'active:bg-green-4'}`} 
      style={{gap: 8}}
      onPress={stopMeasuringAlert}>
        {isMeasuring 
          ? <Feather name="pause-circle" size={24} color='#1D3F13'/> 
          : <Feather name="play" size={24} color='#fff'/>}
      <Text className="text-center" style={[semibold, {color: isMeasuring ? '#1D3F13' : '#fff', fontSize: 20}]}>
        { buttonText }
      </Text>
    </Pressable>
  )
}

export default ToggleMeasuringButton;