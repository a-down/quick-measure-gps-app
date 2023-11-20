import { Text, View, Pressable, useWindowDimensions, Alert, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { convertArea, convertDistance } from 'geolib';
import AsyncStorage from '@react-native-async-storage/async-storage';

// preferences default to sq meters and meters
const defaultPreferences = { area: 'sq meters', areaShort: 'sqm', distance: 'meters', distanceShort: 'm' }

const MeasurementDisplay = ({ polygonArea, polygonDistance, setMapType }) => {
  const { width } = useWindowDimensions();
  const [ measurementPreferences, setMeasurementPreferences ] = useState(defaultPreferences)

  // set preferences
  useEffect(() => {
    getPreferences()
  }, [])

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

  // Alert prompts used to update preferences
  const updateAreaAlert = () => {
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
  
  const updateDistanceAlert = () => {
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

  const storeMapPreferences = async (data) => {
    try {
      setMapType(data)
      await AsyncStorage.setItem(
        'mapPreferences',
        JSON.stringify(data)
      );
    } catch (error) {
        console.log(error)
    }
  }

  const mapTypeAlert = async () => {
    Alert.alert(
      "Map Type",
      "What type of map would you like to use?",
      [
        { text: "Standard", onPress: () => storeMapPreferences("standard") },
        { text: "Satellite", onPress: () => storeMapPreferences("satellite") },
        { text: "Hybrid", onPress: () => storeMapPreferences("hybrid") },
        { text: "Cancel", style: "cancel" }
      ]
    );
  }
  

  return (
    <View className="bg-white p-4 pb-2 absolute top-2 rounded-lg shadow-lg" style={{width: width-16, gap: 8}}>
      <View className="flex-row justify-between flex-wrap" style={{gapY: 8}}>
        <Text className="text-lg">
          <Text className="text-3xl">
            { polygonArea 
              ? convertArea(polygonArea, measurementPreferences.areaShort).toFixed(2)
              : 0}
          </Text>
          {` `}{ measurementPreferences.area }
        </Text>
        <Text className="text-lg">
          <Text className="text-3xl">
            { polygonDistance
              ? convertDistance(polygonDistance, measurementPreferences.distanceShort).toFixed(2)
              : 0 }
          </Text>
          {` `}{ measurementPreferences.distance }
        </Text>
      </View>

      <Button 
        title="Map Settings"
        color="#888"
        onPress={() => {
          Alert.alert(
            "Map Settings",
            "What would you like to change?",
            [
              { text: "Map Type", onPress: () => mapTypeAlert() },
              { text: "Area Units", onPress: () => updateAreaAlert() },
              { text: "Distance Units", onPress: () => updateDistanceAlert() },
              { text: "Cancel", style: "cancel" }
            ]
          )
        }}/>

    </View>
  )
}

export default MeasurementDisplay;