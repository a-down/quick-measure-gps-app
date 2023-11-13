import { Text, View, Pressable, useWindowDimensions, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { convertArea, convertDistance } from 'geolib';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultPreferences = { area: 'sq meters', areaShort: 'sqm', distance: 'meters', distanceShort: 'm' }

const MeasurementDisplay = ({ polygonArea, polygonDistance }) => {
  const { width } = useWindowDimensions();
  const [ measurementPreferences, setMeasurementPreferences ] = useState(defaultPreferences)

  useEffect(() => {
    getPreferences()
  }, [])

  const storePreferences = async (data) => {
    try {
      setMeasurementPreferences(data)
      await AsyncStorage.setItem(
        'measurementPreferences',
        JSON.stringify(data)
      );
    } catch (error) {
        console.log(error)
    }
  }
  
  const getPreferences = async () => {
    try {
      const value = await AsyncStorage.getItem('measurementPreferences');
      if (value !== null) {
        setMeasurementPreferences(JSON.parse(value))
      } 
    } catch (error) {
        console.log(error)
    }
  }

  const updateAreaMeasurements = () => {
    Alert.alert(
      "Area Unit of Measurement",
      "What unit of measurement would you like to use for area?",
      [
        { text: "Sq Feet", onPress: () => storePreferences({...measurementPreferences, area: 'sq feet', areaShort: 'sqft'}) },
        { text: "Sq Meters", onPress: () => storePreferences({...measurementPreferences, area: 'sq meters', areaShort: 'sqm'}) },
        { text: "Sq Feet", onPress: () => storePreferences({...measurementPreferences, area: 'sq feet', areaShort: 'sqft'}) },
        { text: "Sq Meters", onPress: () => storePreferences({...measurementPreferences, area: 'sq meters', areaShort: 'sqm'}) },
        { text: "Cancel", style: "cancel"}
      ]
    );
  }
  
  const updateDistanceMeasurements = () => {
    Alert.alert(
      "Area Unit of Measurement",
      "What unit of measurement would you like to use for area?",
      [
        { text: "Feet", onPress: () => storePreferences({...measurementPreferences, distance: 'feet', distanceShort: 'ft'}) },
        { text: "Meters", onPress: () => storePreferences({...measurementPreferences, distance: 'meters', distanceShort: 'm'}) },
        { text: "Feet", onPress: () => storePreferences({...measurementPreferences, distance: 'feet', distanceShort: 'ft'}) },
        { text: "Meters", onPress: () => storePreferences({...measurementPreferences, distance: 'meters', distanceShort: 'm'}) },
        { text: "Cancel", style: "cancel"}
      ]
    );
  }

  return (
    <View className="bg-white p-4 absolute top-2 rounded-sm shadow-sm" style={{width: width-16}}>
      <View className="flex-row justify-between flex-wrap">
        <Text className="text-lg mb-4">
          <Text className="text-3xl">
            { convertArea(polygonArea, measurementPreferences.areaShort).toFixed(2) || 0}
          </Text>
          {` `}{ measurementPreferences.area }
        </Text>
        <Text className="text-lg mb-4">
          <Text className="text-3xl">
            { convertDistance(polygonDistance, measurementPreferences.distanceShort).toFixed(2) || 0 }
          </Text>
          {` `}{ measurementPreferences.distance }
        </Text>
      </View>

      <View className="flex-row justify-between">
        <Pressable onPress={updateAreaMeasurements}>
          <Text className="text-center text-gray-700">Change Area Units</Text>
        </Pressable>
        <Pressable onPress={updateDistanceMeasurements}>
          <Text className="text-center text-gray-700">Change Distance Units</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default MeasurementDisplay;