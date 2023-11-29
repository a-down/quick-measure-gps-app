import { View, Text, ScrollView, Button, Pressable } from 'react-native';
import { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { useStorage } from '../../hooks';

const Settings = () => {
  const [ settingsState, setSettingsState ] = useState({})
  
  useEffect(() => {
    const getSettings = async () => {
      const map = await useStorage('get', 'mapPreferences')
      const measurements = await useStorage('get', 'measurementPreferences')
      console.log({map, measurements})
      setSettingsState({map, measurements})
    }
    getSettings()
  }, [])

  return (
    <View className="flex-1 p-4">
      {/* <Button title="Delete Stored Data" onPress={() => {
        useStorage('remove', 'savedMaps')
      }} /> */}

      <View className="flex-1" style={{gap: 8}}>
        <Text className="text-lg font-semibold">App Preferences</Text>
        <View>
          <Text className="font-medium">Map Type</Text>

        </View>
      </View>

    </View>
  )
}

export default Settings;