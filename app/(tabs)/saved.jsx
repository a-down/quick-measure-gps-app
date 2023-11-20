import { View, Text, Pressable, FlatList, Button, Alert } from 'react-native';
import { useEffect, useState, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAreaOfPolygon, getPathLength, convertArea, convertDistance } from 'geolib';
import { useRouter, useFocusEffect, Stack } from 'expo-router';


const Saved = () => {
  const router = useRouter();
  const [ savedMaps, setSavedMaps ] = useState([])

  const getMaps = async () => {
    try {
      const value = await AsyncStorage.getItem('savedMaps')
      console.log(JSON.parse(value))
      if (value !== null) {
        setSavedMaps(JSON.parse(value))
      }
    } catch (error) {
        console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getMaps()
    }, [])
  );

  const deleteMapAlert = ({mapName, id}) => {
    Alert.alert(
      "Delete Map",
      `Are you sure you want to delete ${mapName}?`,
      [
        { text: `Delete ${mapName}`, style: "destructive", onPress: () => deleteMap(id) },
        { text: "Cancel", style: "cancel" }
      ]
    )
  }

  const deleteMap = async (id) => {
    try {
      const value = await AsyncStorage.getItem('savedMaps')
      if (value !== null) {
        const data = JSON.parse(value).filter(map => map.id !== id)
        await AsyncStorage.setItem(
          'savedMaps',
          JSON.stringify(data)
        );
        setSavedMaps(data)
        Alert.alert("Map deleted")
      }
    } catch (error) {
        console.log(error)
        Alert.alert("Could not delete map")
    }
  }

  const Card = ({ item }) => {
    const polygonArea = getAreaOfPolygon(item.polygonCoordinates)
    const polygonDistance = getPathLength(item.polygonCoordinates)

    return (
      <View className="flex w-full bg-white relative p-4" style={{gap: 8}}>
        <View className="bg-white w-full">
          <Text className="text-2xl font-semibold text-green-10">{item.mapName}</Text>
          <Text className="text-base text-gray-7">{item.dateCreated.split("T")[0]}</Text>
        </View>

        <View className="flex-row flex-wrap mb-4" style={{gapY: 8}}>
          <Text className="text-lg text-gray-8 mr-8">
            <Text className="text-2xl">
              { polygonArea
                ? convertArea(polygonArea, item.measurements.areaShort).toFixed(2)
                : 0}
            </Text>
            {` `}{ item.measurements.area }
          </Text>
          <Text className="text-lg text-gray-8">
            <Text className="text-2xl">
              { polygonDistance
                ? convertDistance(polygonDistance, item.measurements.distanceShort).toFixed(2)
                : 0 }
            </Text>
            {` `}{ item.measurements.distance }
          </Text>
        </View>  

        <View className=" flex-row w-full" style={{gap: 8}}>
          <Pressable className="bg-green-5 p-2 rounded-md flex-grow" onPress={() => router.push({ pathname: "/saved-map", params: { map: JSON.stringify(item) }})}>
            <Text className="text-white font-semibold text-lg text-center">View Map</Text>
          </Pressable>
          <Pressable className="bg-[#C7504B] opacity-60 w-11 h-full rounded-md" onPress={() => deleteMapAlert({id: item.id, mapName: item.mapName})}></Pressable>
        </View>      
      </View>
    )
  }

  return (
    <View className=" bg-gray-1 flex-1">
      {savedMaps && (
        <FlatList
          data={savedMaps}
          renderItem={({item}) => <Card item={item} />}
          keyExtractor={(item, index) => `${item.mapName}-${index}`}
          ItemSeparatorComponent={() => <View className="h-4 bg-gray-1"></View>}
          />
      )}
    </View>
  )
}

export default Saved;