import { Text, Pressable, Alert } from 'react-native';

const StopMeasuringButton = ({ addLocationToPolygon }) => {

  return (
    <Pressable 
      className=" p-4 rounded-md shadow-sm" 
      style={{backgroundColor: '#fff'}}
      onPress={addLocationToPolygon}>
      <Text className="text-center text-xl">
        Add Marker
      </Text>
    </Pressable>
  )
}

export default StopMeasuringButton;