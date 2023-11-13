import { Text, View, Pressable, useWindowDimensions, Alert, AsyncStorage } from 'react-native';
import { useState } from 'react';

const defaultPreferences = { area: 'sq meters', areaShort: 'sqm', distance: 'meters', distanceShort: 'm' }

const MeasurementDisplay = ({ polygonArea, polygonDistance }) => {
  const { width } = useWindowDimensions();

  const [ measurementPreferences, setMeasurementPreferences ] = useState(getPreferences || defaultPreferences)

  // const updateAreaMeasurements = () => {
  //   Alert.alert(
  //     "Area Unit of Measurement",
  //     "What unit of measurement would you like to use for area?",
  //     [
  //       { text: "Sq Feet", onPress: () => setMeasurementPreferences({...measurementPreferences, area: 'sq feet', areaShort: 'sqm'}) },
  //       { text: "Sq Meters", onPress: () => setMeasurementPreferences({...measurementPreferences, area: 'sq meters', areaShort: 'sqm'}) },
  //       { text: "Sq Feet", onPress: () => setMeasurementPreferences({...measurementPreferences, area: 'sq feet', areaShort: 'sqm'}) },
  //       { text: "Sq Meters", onPress: () => setMeasurementPreferences({...measurementPreferences, area: 'sq meters', areaShort: 'sqm'}) },
  //       { text: "Cancel", style: "cancel"}
  //     ]
  //   );
  // }

  const storePreferences = async (data) => {
    try {
      await AsyncStorage.setItem(
        'measurementPreferences',
        JSON.stringify(data)
      );
    } catch (error) {
        Alert.alert('Cannot save preferences', 'Please try again')
    }
  }

  const getPreferences = async () => {
    try {
      const value = await AsyncStorage.getItem('measurementPreferences');
      if (value !== null) {
        return JSON.parse(value)
      } else {
        return null;
      }
    } catch (error) {
        return null;
    }
  }

  const updateAreaMeasurements = () => {
    Alert.alert(
      "Area Unit of Measurement",
      "What unit of measurement would you like to use for area?",
      [
        { text: "Sq Feet", onPress: () => setMeasurementPreferences({...measurementPreferences, area: 'sq feet', areaShort: 'sqm'}) },
        { text: "Sq Meters", onPress: () => setMeasurementPreferences({...measurementPreferences, area: 'sq meters', areaShort: 'sqm'}) },
        { text: "Sq Feet", onPress: () => setMeasurementPreferences({...measurementPreferences, area: 'sq feet', areaShort: 'sqm'}) },
        { text: "Sq Meters", onPress: () => setMeasurementPreferences({...measurementPreferences, area: 'sq meters', areaShort: 'sqm'}) },
        { text: "Cancel", style: "cancel"}
      ]
    );
  }
  
  const updateDistanceMeasurements = () => {
    Alert.alert(
      "Area Unit of Measurement",
      "What unit of measurement would you like to use for area?",
      [
        { text: "Feet", onPress: () => setMeasurementPreferences({...measurementPreferences, area: 'feet', areaShort: 'ft'}) },
        { text: "Meters", onPress: () => setMeasurementPreferences({...measurementPreferences, area: 'meters', areaShort: 'm'}) },
        { text: "Feet", onPress: () => setMeasurementPreferences({...measurementPreferences, area: 'feet', areaShort: 'ft'}) },
        { text: "Meters", onPress: () => setMeasurementPreferences({...measurementPreferences, area: 'meters', areaShort: 'm'}) },
        { text: "Cancel", style: "cancel"}
      ]
    );
  }

  return (
    <View className="bg-white p-4 absolute top-2 rounded-sm shadow-sm" style={{width: width-16}}>
      <View className="flex-row justify-between flex-wrap">
        <Text className="text-lg mb-4">
          <Text className="text-3xl">{ polygonArea || 0}</Text>
          {` `}{ measurementPreferences.area }
        </Text>
        <Text className="text-lg mb-4">
          <Text className="text-3xl">{ polygonDistance || 0 }</Text>
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