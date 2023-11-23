import { Text, Pressable } from 'react-native';

const RedoMarkerButton = ({ redoPreviousMarker }) => {

  return (
    <Pressable 
      className=" p-4 rounded-md shadow-sm" 
      style={{backgroundColor: '#fff'}}
      onPress={redoPreviousMarker}>
      <Text className="text-center text-xl">
        Redo Marker
      </Text>
    </Pressable>
  )
}

export default RedoMarkerButton;