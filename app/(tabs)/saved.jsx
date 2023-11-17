import { View, Text } from 'react-native';
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Saved = () => {
  const [ savedMaps, setSavedMaps ] = useState({})

  const getMaps = async () => {
    try {
      const value = await AsyncStorage.getItem('savedMaps')
      console.log(value)
      if (value !== null) {
        setSavedMaps(JSON.parse(value))
      }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getMaps()
  }, [])
  if(savedMaps) console.log(savedMaps[0])

  return (
    <>
      {savedMaps && (
        savedMaps.map((map, index) => (
          <>
            <Text>{map.mapType}</Text>
            <Text>{map.polygonArea}</Text>
            <Text>{map.polygonDistance}</Text>
          </>
        ))
      )}
    </>
  )
}

export default Saved;