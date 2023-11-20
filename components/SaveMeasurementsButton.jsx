import { View, Button, Alert } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter, Link } from 'expo-router';

const SaveMeasurementsButton = ({ polygonCoordinates, polygonArea, polygonDistance, mapType}) => {
  const router = useRouter();

  // save and get preferences with AsyncStorage
  const saveMap = async () => {
    try {
      const value = await AsyncStorage.getItem('savedMaps')
      let data
      console.log(value)
      if (value !== null) {
        data = [
          ...JSON.parse(value),
          {
            polygonCoordinates,
            polygonArea,
            polygonDistance,
            mapType
          }
        ] 
      } else {
        data = [{
          polygonCoordinates,
          mapType
        }]
      }
      await AsyncStorage.setItem(
        'savedMaps',
        JSON.stringify(data)
      );

    } catch (error) {
        console.log(error)
    }
  }

  const saveMapAlert = () => {
    Alert.prompt(
      ""
    )
  }

  return (
    <View className="flex-grow p-2">
      <Button 
        style={{fontWeight: 'bold'}}
        color="#000"
        title="Save" 
        onPress={() => router.push("/save-map-form")} />
    </View>
  )
}

export default SaveMeasurementsButton