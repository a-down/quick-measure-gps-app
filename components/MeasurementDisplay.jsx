import { Text, View, Pressable, useWindowDimensions, Alert } from 'react-native';

const MeasurementDisplay = ({ polygonArea, polygonDistance, measurementPreferences, setMeasurementPreferences }) => {
  const { width } = useWindowDimensions();

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