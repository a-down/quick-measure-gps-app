import { Text, View, Pressable, useWindowDimensions, Alert, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { convertArea, convertDistance } from 'geolib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import convertToAcres from '../hooks/convertToAcres';
import handleConvertArea from '../hooks/handleConvertArea';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';

// preferences default to sq meters and meters
const defaultPreferences = { area: 'sq meters', areaShort: 'sqm', distance: 'meters', distanceShort: 'm' }

const MeasurementDisplay = ({ polygonArea, polygonDistance, setMapType, preferredMeasurements, distanceAround }) => {
  const { width } = useWindowDimensions();
  const [ measurementPreferences, setMeasurementPreferences ] = useState(defaultPreferences)

  // set preferences
  useEffect(() => {
    preferredMeasurements ? setMeasurementPreferences(preferredMeasurements) : getPreferences()
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

  const settingsIcon = () => {
    {setMapType && (      
      // <Button 
      //   title="Map Settings"
      //   color="#888"
      //   onPress={() => {
      //     Alert.alert(
      //       "Map Settings",
      //       "What would you like to change?",
      //       [
      //         { text: "Map Type", onPress: () => mapTypeAlert() },
      //         { text: "Area Units", onPress: () => updateAreaAlert() },
      //         { text: "Distance Units", onPress: () => updateDistanceAlert() },
      //         { text: "Cancel", style: "cancel" }
      //       ]
      //     )
      //   }}/>
      <Pressable
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
      }}>
        <Feather name="settings" size={24} color="black" />
      </Pressable>
    )}
  }
  

  return (
    <>
      {/* <Stack.Screen options={{
        title: 'Tap to Measure',
        headerBackTitleVisible: false,
        headerTintColor: '#6DAB64',
        headerTitleStyle: {
          color: '#1D3F13',
        },
        headerRight: () => (    
          <Button 
            title="Set"
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
          )
      }} /> */}

      <View className="bg-gray-1 p-3 py-2 top-0 rounded-b-sm shadow-lg absolute flex-row justify-between" style={{width: width, gap: 8}}>
        <View className=" justify-between flex-wrap" style={{gapY: 8}}>
          <View>
            <Text className="text-base text-gray-9">
              <Text className="text-xl text-black">
                { polygonArea 
                  ? handleConvertArea(polygonArea, measurementPreferences.areaShort).toFixed(2)
                  : 0}
              </Text>
              {` `}{ measurementPreferences.area }
              <Text className="text-sm text-gray-6">{' '}(area)</Text>
            </Text>
            
          </View>
          <View>
            <Text className="text-base text-gray-9">
              <Text className="text-xl text-black">
                { polygonDistance
                  ? convertDistance(polygonDistance, measurementPreferences.distanceShort).toFixed(2)
                  : 0 }
              </Text>
              {` `}{ measurementPreferences.distance }
              <Text className="text-sm text-gray-6">{' '}
                {distanceAround ? "(distance around)" : "(distance traveled)"}
              </Text>
            </Text>
          
          </View>
        </View>

        {setMapType && (  
          <View>
            <Pressable
              className="mt-2"
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
              }}>
              <Feather name="settings" size={24} color="#477F3C" />
            </Pressable>

            {/* <Pressable>
              <Feather name="x-circle" size={24} color="#477F3C"/>
            </Pressable> */}
          </View>
        )}

      </View>
    </>
  )
}

export default MeasurementDisplay;