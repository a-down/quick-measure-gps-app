import { useMemo, useCallback } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { Text, Pressable, View, TextInput, Keyboard, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useStorage } from '../hooks';
import uuid from 'react-native-uuid';
import { Feather } from '@expo/vector-icons';
import { regular, medium, semibold } from '../hooks/useJostFont';
import { handleConvertArea } from '../hooks'
import { convertDistance } from 'geolib';

function SaveMapBottomSheet({ polygonCoordinates, saveSheetRef, mapType, polygonArea, polygonDistance, currentPreferences, tool }) {

  const [ mapName, setMapName ] = useState('')

  const snapPoints = useMemo(() => ["80%"], []);
  const handleSheetChanges = useCallback((index) => {
    if (index !== 0) Keyboard.dismiss()
  }, []);

  const keyboardDismiss = () => {
    Keyboard.dismiss()
    saveSheetRef.current.snapToIndex(0)
  }

  // save the map to storage
    // view in saved maps screen
  const saveMap = async () => {
    if (!mapName) return Alert.alert("Please enter a name for the map")

    try {
      const measurements = await useStorage('get', 'measurementPreferences');
      const value = await useStorage('get', 'savedMaps')

      // create new array or add current map to existing array
      let data
      if (value !== null) {
        data = [
          ...value,
          {
            id: uuid.v4(),
            dateCreated: new Date(),
            mapName,
            mapType,
            polygonCoordinates: polygonCoordinates,
            measurements: measurements,
            tool: tool
          }
        ] 
      } else {
        data = [{
          id: uuid.v4(),
          dateCreated: new Date(),
          mapName,
          mapType,
          polygonCoordinates: polygonCoordinates,
          measurements: measurements,
          tool: tool
        }]
      }
      await useStorage('set', 'savedMaps', data);

      Alert.alert(`${mapName} saved!`)
      saveSheetRef.current.close()
      Keyboard.dismiss()

    } catch (error) {
      Alert.alert('There was an error saving the map. Please try again.')
    }
  }

  return (
    <BottomSheet
      style={{ flex: 1 }}
      backgroundStyle={{ backgroundColor: '#fff' }}
      ref={saveSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onChange={handleSheetChanges}
      onPress={keyboardDismiss}>

      <View className="flex-1 px-6 justify-start relative" style={{gap: 8}}>
        
        <View style={{gap: 8}}>
          <Text style={[medium, {fontSize: 20}]}>Enter a name for the map</Text>

          <TextInput
            className="w-full bg-white p-2 rounded-sm border-gray-4 border text-gray-8"
            style={regular}
            value={mapName}
            onChangeText={setMapName}
            onFocus={() => saveSheetRef.current.snapToIndex(0)}
            onBlur={() => Keyboard.dismiss()}/>
        </View>

        <Text className="text-gray-6 text-center" style={regular}>
          You cannot change this map's preferences after saving. Preview below{' '} 
          <Feather name='chevron-down' size={16} color='#7E7E7E' />
        </Text>

        <Pressable 
          className=" p-4 rounded-2xl shadow-sm flex-row justify-center items-center bg-green-5 active:bg-green-4 mb-8" 
          style={{gap: 8}}
          onPress={saveMap}>
          <Feather name="download" size={24} color="white" />
          <Text className="text-center text-white" style={[semibold, {fontSize: 22}]}>
            Save Map
          </Text>
        </Pressable>

        {currentPreferences && (
          <View>
            <Text style={medium}>
              Measurements and Preferences to Save:
            </Text>

            <Text style={regular}>
              Area: {polygonArea > 0 ? handleConvertArea(polygonArea, currentPreferences.areaShort).toFixed(2) : 0} {currentPreferences.area}
            </Text>

            <Text style={regular}>
              Distance: {polygonArea > 0 ? convertDistance(polygonDistance, currentPreferences.distanceShort).toFixed(2) : 0} {currentPreferences.distance}
            </Text>

            <Text style={regular}>
              Map Type: {mapType || 'hybrid'}
            </Text>
            <Text style={regular} className="ml-2 mb-8 text-gray-6">
              (ex. satellite, hybrid, standard)
            </Text>
          </View>
        )}

        </View>

    </BottomSheet>
  )
}

export default SaveMapBottomSheet