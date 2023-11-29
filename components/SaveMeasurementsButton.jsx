import { Pressable, Text } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const SaveMeasurementsButton = ({ polygonCoordinates, polygonArea, polygonDistance, mapType, saveSheetRef }) => {
  const router = useRouter();

  return (
    <Pressable 
      className="flex-grow flex-row justify-center rounded-full items-center" 
      style={{gap: 8}} 
      onPress={() => saveSheetRef.current.snapToIndex(0)}>

      <Feather name="download" size={24} color={mapType === "standard" ? "#1D3F13" : "#E7F8E6"}/>
      <Text className="text-lg" style={{color: mapType === "standard" ? "#1D3F13" : "#E7F8E6"}}>Save</Text>
      
    </Pressable>
  )
}

export default SaveMeasurementsButton