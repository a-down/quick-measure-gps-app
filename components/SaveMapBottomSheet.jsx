import { useMemo, useCallback } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { Text, Pressable, View, TextInput, Keyboard, Alert } from 'react-native';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useStorage } from '../hooks';
import uuid from 'react-native-uuid';

function SaveMapBottomSheet({ polygonCoordinates, saveSheetRef, mapType }) {

  const [ mapName, setMapName ] = useState('')

  const snapPoints = useMemo(() => [220, "80%"], []);
  const handleSheetChanges = useCallback((index) => {
    if (index === 0) Keyboard.dismiss()
    if (index === 1) Keyboard.isVisible(true)
  }, []);

  const keyboardDismiss = () => {
    Keyboard.dismiss()
    saveSheetRef.current.snapToIndex(0)
  }

  const saveMap = async () => {
    if (!mapName) return Alert.alert("Please enter a name for the map")

    try {
      const measurements = await useStorage('get', 'measurementPreferences');
      const value = await useStorage('get', 'savedMaps')

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
        }]
      }
      await useStorage('set', 'savedMaps', data);

      Alert.alert(`${mapName} saved!`)
      saveSheetRef.current.close()
      Keyboard.dismiss()

    } catch (error) {
      console.log(error)
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

      <View className="flex-1 px-6 justify-start relative" style={{gap: 16}}>
        
        <Text className=" text-lg font-medium">Enter a name for the map</Text>

        <TextInput
          className="w-full bg-white p-2 rounded-sm border-gray-4 border mb-2"
          value={mapName}
          onChangeText={setMapName}
          onFocus={() => saveSheetRef.current.snapToIndex(1)}/>

        <Pressable 
          className=" p-4 rounded-2xl shadow-sm" 
          style={{backgroundColor: '#6DAB64'}}
          onPress={saveMap}>
          <Text className="text-center text-xl text-white font-semibold">
            Save Map
          </Text>
        </Pressable>

      </View>

    </BottomSheet>
  )
}

export default SaveMapBottomSheet