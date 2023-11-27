import { useMemo, useCallback } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { Text, Pressable, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

function DeleteOptionsBottomSheet({ children, bottomSheetRef, deleteMode, setDeleteMode, setPolygonCoordinates, previousCoordinates, setPreviousCoordinates }) {

  const snapPoints = useMemo(() => [200], []);
  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      setDeleteMode(false)
      setPreviousCoordinates([])
    }
  }, []);

  return (
    <BottomSheet
      style={{ flex: 1 }}
      color={'#7f1d1d'}
      backgroundStyle={{ backgroundColor: '#7f1d1d' }}
      handleIndicatorStyle={{ backgroundColor: '#fee2e2' }}
      ref={bottomSheetRef}
      index={deleteMode ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onChange={handleSheetChanges}>

      <View className="flex-1 px-6 justify-start relative" style={{gap: 24}}>
        <Text className=" text-[#fee2e2] text-sm text-center mb-2 ">(swipe down to dismiss)</Text>

        {previousCoordinates.length > 0 && (
          <Pressable className="absolute left-4 py-2 px-3 bg-[#fee2e2] text-[#7f1d1d] rounded-full flex-row"
            style={{gap: 4}} 
            onPress={() => {
              setPolygonCoordinates(previousCoordinates[0])
              previousCoordinates.length > 1 
                ? setPreviousCoordinates(previousCoordinates.slice(1))
                : setPreviousCoordinates([])
          }}>
            <Feather name="rotate-ccw" size={16} color="#7f1d1d" />
            <Text>Undo</Text>
          </Pressable>
        )}

        {children}
        
      </View>

    </BottomSheet>
  )
}

export default DeleteOptionsBottomSheet