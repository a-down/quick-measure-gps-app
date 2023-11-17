import { View, Button } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SaveMeasurementsButton = ({ polygonCoordinates, polygonArea, polygonDistance, mapType}) => {

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
            polygonArea,
            polygonDistance,
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

  return (
    <View className="flex-grow p-2">
      <Button 
        style={{fontWeight: 'bold'}}
        color="#000"
        title="Save" 
        onPress={saveMap} />
    </View>
  )
}

export default SaveMeasurementsButton