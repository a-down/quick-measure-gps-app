import { View, Button, Alert } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter, Link } from 'expo-router';

const SaveMeasurementsButton = ({ polygonCoordinates, polygonArea, polygonDistance, mapType }) => {
  const router = useRouter();

  return (
    <View className="flex-grow p-2">

              <Button 
        style={{fontWeight: 'bold'}}
        color="#000"
        title="Save" 
        onPress={() => router.push({pathname: "/save-map-form", params: { polygonCoordinates, mapType }})} />  
    </View>
  )
}

export default SaveMeasurementsButton