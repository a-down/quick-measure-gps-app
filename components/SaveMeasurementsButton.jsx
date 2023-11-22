import { View, Button, Alert, Pressable, Text } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter, Link } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const SaveMeasurementsButton = ({ polygonCoordinates, polygonArea, polygonDistance, mapType }) => {
  const router = useRouter();

  // return (
  //   <View className="flex-grow">

  //     <Button 
  //       style={{fontWeight: 'bold'}}
  //       color={mapType === "standard" ? "#1D3F13" : "#E7F8E6"}
  //       title="Save" 
  //       onPress={() => router.push({pathname: "/SaveMapFormScreen", params: { polygonCoordinates: JSON.stringify(polygonCoordinates), mapType }})} />  
  //   </View>
  // )
  // return (
  //   <Pressable className="flex-grow rounded-md bg-green-1 border border-green-3 flex-row px-4 py-3 items-center justify-center" style={{gap: 8}} onPress={() => router.push({pathname: "/SaveMapFormScreen", params: { polygonCoordinates: JSON.stringify(polygonCoordinates), mapType }})}>
  //     {/* <Feather name="download" size={24} color="#2B561F"/> */}
  //     <Text className=" text-green-9 text-lg font-semibold">Save</Text>
  //   </Pressable>
  // )
  return (
    <View className="flex-grow">
      <Pressable className="flex-row justify-center rounded-full items-center" style={{gap: 8}} onPress={() => router.push({pathname: "/SaveMapFormScreen", params: { polygonCoordinates: JSON.stringify(polygonCoordinates), mapType }})}>
        <Feather name="download" size={24} color={mapType === "standard" ? "#1D3F13" : "#E7F8E6"}/>
        <Text className="text-lg" style={{color: mapType === "standard" ? "#1D3F13" : "#E7F8E6"}}>Save</Text>
      </Pressable>
    </View>
  )
}

export default SaveMeasurementsButton