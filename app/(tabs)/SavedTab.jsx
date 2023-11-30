import { View, Text, Pressable, FlatList, Alert } from 'react-native';
import { useState, useCallback } from 'react'
import { getAreaOfPolygon, getPathLength, convertDistance } from 'geolib';
import { useRouter, useFocusEffect } from 'expo-router';
import handleConvertArea from '../../hooks/handleConvertArea';
import { useStorage } from '../../hooks';
import { Feather } from '@expo/vector-icons';
import { regular, medium, semibold, bold } from '../../hooks/useJostFont'

const Saved = () => {
  const router = useRouter();
  const [ savedMaps, setSavedMaps ] = useState([])

  const getMaps = async () => {
    const value = await useStorage('get', 'savedMaps')
    if (value !== null) setSavedMaps(value.reverse())
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
      const value = await useStorage('get', 'savedMaps')
      const data = value.filter(map => map.id !== id)
      await useStorage('set', 'savedMaps', data)
      setSavedMaps(data.reverse())
      Alert.alert("Map deleted")
    } catch {
      Alert.alert("Could not delete map")
    }
  }

  const Card = ({ item }) => {
    const polygonArea = getAreaOfPolygon(item.polygonCoordinates)
    const polygonDistance = getPathLength(item.polygonCoordinates)

    return (
      <Pressable className="flex w-full bg-white relative p-4" onPress={() => router.push({ pathname: "/SavedMapScreen", params: { map: JSON.stringify(item) }})}>
        <View className="w-full mb-1">
          <Text className=" text-green-10" style={[semibold, {fontSize: 24}]}>{item.mapName}</Text>
          <Text className=" text-gray-7" style={regular}>
            {item.dateCreated.split("T")[0].split("-")[1]}/
            {item.dateCreated.split("T")[0].split("-")[2]}/
            {item.dateCreated.split("T")[0].split("-")[0]}
          </Text>
        </View>

        <View className="flex-row flex-wrap mb-3">
          <Text className=" text-gray-8 mr-8" style={[regular, {fontSize: 20}]}>
            <Text className="text-2xl">
              { polygonArea
                ? handleConvertArea(polygonArea, item.measurements.areaShort).toFixed(2)
                : 0}
            </Text>
            {` `}{ item.measurements.area }
          </Text>
          <Text className=" text-gray-8" style={[regular, {fontSize: 20}]}>
            <Text className="text-2xl">
              { polygonDistance
                ? convertDistance(polygonDistance, item.measurements.distanceShort).toFixed(2)
                : 0 }
            </Text>
            {` `}{ item.measurements.distance }
          </Text>
        </View>  

        <View className=" flex-row w-full items-center" style={{gap: 8}}>
          <Pressable className="bg-green-5 p-2 rounded-md flex-grow" onPress={() => router.push({ pathname: "/SavedMapScreen", params: { map: JSON.stringify(item) }})}>
            <Text className="text-white text-center" style={[semibold, {fontSize: 20}]}>View Map</Text>
          </Pressable>
        </View>  

        <Pressable className="absolute right-4 top-5" hitSlop={20} onPress={() => deleteMapAlert({id: item.id, mapName: item.mapName})}>
          <Feather name="trash-2" size={24} color="#C7504B"/>
        </Pressable> 
      </Pressable>
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

      {savedMaps.length === 0 && (
        <View className="h-full justify-center items-center " style={{gap: 16}}>
          <Feather name="bookmark" size={64} color="#6DAB64" style={{marginBottom: 64}}/>
          <Text className=" text-gray-8 text-center" style={[regular, {fontSize: 20}]}>Save a map to see it here!</Text>
          <Pressable className="w-3/4" onPress={() => router.push("/TapMeasureScreen")}>
            <Text className=" text-gray-8 text-center" style={[regular, {fontSize: 20}]}>
              Try using{' '}
              <Text className="text-green-8 " style={[semibold, {fontSize: 20}]}>
                Tap to Measure.
              </Text>
            </Text>
          </Pressable>
        </View>
      )}   
    </View>
  )
}

export default Saved;