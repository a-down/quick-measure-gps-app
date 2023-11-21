import { View, Text, TextInput, Pressable, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import React from 'react'
import { MeasurementDisplay } from '../components'
import { useLocalSearchParams, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid';

const SaveMapForm = () => {
  const router = useRouter();
  const [ mapName, setMapName ] = useState('')
  const { mapType, polygonCoordinates } = useLocalSearchParams();

  // save and get preferences with AsyncStorage
  const saveMap = async () => {
    if (!mapName) return Alert.alert("Please enter a name for the map")

    try {
      const measurements = await AsyncStorage.getItem('measurementPreferences');
      const value = await AsyncStorage.getItem('savedMaps')
      let data
      if (value !== null) {
        data = [
          ...JSON.parse(value),
          {
            id: uuid.v4(),
            dateCreated: new Date(),
            mapName,
            mapType,
            polygonCoordinates: JSON.parse(polygonCoordinates),
            measurements: JSON.parse(measurements),
          }
        ] 
      } else {
        data = [{
          id: uuid.v4(),
          dateCreated: new Date(),
          mapName,
          mapType,
          polygonCoordinates: JSON.parse(polygonCoordinates),
          measurements: JSON.parse(measurements),
        }]
      }
      await AsyncStorage.setItem(
        'savedMaps',
        JSON.stringify(data)
      );

      Alert.alert(`${mapName} saved!`)

      router.back()

    } catch (error) {
        console.log(error)
    }
  }

  return (
    <View className="flex-1 p-4 bg-gray-1">
      <Text className=" text-lg font-medium mb-2">Enter a name for the map</Text>

      <TextInput 
        className="w-full bg-white p-2 rounded-lg border-gray-4 border mb-3"
        value={mapName}
        onChangeText={setMapName}></TextInput>

      <Pressable 
        className=" p-4 rounded-2xl shadow-sm mt-4" 
        style={{backgroundColor: '#6DAB64'}}
        onPress={saveMap}>
        <Text className="text-center text-xl text-white font-semibold">
          Save Map
        </Text>
      </Pressable>
    </View>
  )
}

export default SaveMapForm