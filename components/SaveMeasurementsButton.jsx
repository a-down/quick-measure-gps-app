import { Pressable, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { regular, medium } from '../hooks/useJostFont';

const SaveMeasurementsButton = ({ polygonCoordinates, polygonArea, polygonDistance, mapType, saveSheetRef }) => {
  const router = useRouter();

  return (
    <Pressable 
      className="flex-grow flex-row justify-center rounded-full items-center" 
      style={{gap: 8}} 
      onPress={() => saveSheetRef.current.snapToIndex(0)}>

      <Feather name="download" size={24} color={mapType === "standard" ? "#1D3F13" : "#E7F8E6"}/>
      <Text style={[medium, {color: mapType === "standard" ? "#1D3F13" : "#E7F8E6", fontSize: 20}]}>Save</Text>
      
    </Pressable>
  )
}

export default SaveMeasurementsButton