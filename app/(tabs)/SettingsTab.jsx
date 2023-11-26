import { View, Text, ScrollView } from 'react-native';
import { useRef, useMemo, useCallback } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

const Settings = () => {
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ['10%', '50%', '100%'], []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index)
  }, []);

  return (
    <View className="flex-1">
      <BottomSheet
      style={{ flex: 1 }}
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <ScrollView className="flex-1 p-4">
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
          <Text className="font-semibold">View/Edit Markers</Text>
        </ScrollView>
      </BottomSheet>

    </View>
  )
}

export default Settings;