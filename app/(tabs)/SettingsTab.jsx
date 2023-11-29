import { View, Text, ScrollView, Button } from 'react-native';
import { useRef, useMemo, useCallback } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { useStorage } from '../../hooks';

const Settings = () => {
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ['10%', '50%', '100%'], []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index)
  }, []);

  return (
    <View className="flex-1">
      <Button title="Delete Stored Data" onPress={() => {
        useStorage('remove', 'savedMaps')
      }} />

    </View>
  )
}

export default Settings;