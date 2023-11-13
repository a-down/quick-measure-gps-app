import { Text, View, Pressable, useWindowDimensions, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { convertArea, convertDistance } from 'geolib';
import AsyncStorage from '@react-native-async-storage/async-storage';

// preferences default to sq meters and meters
const defaultPreferences = { area: 'sq meters', areaShort: 'sqm', distance: 'meters', distanceShort: 'm' }

const MeasurementDisplay = ({ polygonArea, polygonDistance }) => {
  const { width } = useWindowDimensions();
  const [ measurementPreferences, setMeasurementPreferences ] = useState(defaultPreferences)

  // set preferences
  useEffect(() => {
    getPreferences()
  }, [])

  // save and get preferences with AsyncStorage
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

  // Alert prompts used to update preferences
  const updateAreaMeasurements = () => {
    Alert.alert(
      "Area Unit of Measurement",
      "What unit of measurement would you like to use for area?",
      [
        { text: "Sq Feet", onPress: () => storePreferences({...measurementPreferences, area: 'sq feet', areaShort: 'sqft'}) },
        { text: "Sq Yards", onPress: () => storePreferences({...measurementPreferences, area: 'sq yards', areaShort: 'sqyd'}) },
        { text: "Acres", onPress: () => storePreferences({...measurementPreferences, area: 'acres', areaShort: 'a'}) },
        { text: "Sq Meters", onPress: () => storePreferences({...measurementPreferences, area: 'sq meters', areaShort: 'sqm'}) },
        { text: "Sq Kilometers", onPress: () => storePreferences({...measurementPreferences, area: 'sq km', areaShort: 'sqkm'}) },
        { text: "Cancel", style: "cancel" }
      ]
    );
  }
  
  const updateDistanceMeasurements = () => {
    Alert.alert(
      "Area Unit of Measurement",
      "What unit of measurement would you like to use for area?",
      [
        { text: "Feet", onPress: () => storePreferences({...measurementPreferences, distance: 'feet', distanceShort: 'ft'}) },
        { text: "Yards", onPress: () => storePreferences({...measurementPreferences, distance: 'yards', distanceShort: 'yd'}) },
        { text: "Meters", onPress: () => storePreferences({...measurementPreferences, distance: 'meters', distanceShort: 'm'}) },
        { text: "Kilometers", onPress: () => storePreferences({...measurementPreferences, distance: 'km', distanceShort: 'km'}) },
        { text: "Miles", onPress: () => storePreferences({...measurementPreferences, distance: 'miles', distanceShort: 'mi'}) },
        { text: "Cancel", style: "cancel" }
      ]
    );
  }

  return (
    <View className="bg-white p-4 absolute top-2 rounded-sm shadow-sm" style={{width: width-16}}>
      <View className="flex-row justify-between flex-wrap">
        <Text className="text-lg mb-4">
          <Text className="text-3xl">
            { polygonArea 
              ? convertArea(polygonArea, measurementPreferences.areaShort).toFixed(2)
              : 0}
          </Text>
          {` `}{ measurementPreferences.area }
        </Text>
        <Text className="text-lg mb-4">
          <Text className="text-3xl">
            { polygonDistance
              ? convertDistance(polygonDistance, measurementPreferences.distanceShort).toFixed(2)
              : 0 }
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