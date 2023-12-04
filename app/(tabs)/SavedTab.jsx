import { View, Text, Pressable, FlatList, Alert, ScrollView } from 'react-native';
import { useState, useCallback } from 'react'
import { getAreaOfPolygon, getPathLength, convertDistance } from 'geolib';
import { useRouter, useFocusEffect } from 'expo-router';
import handleConvertArea from '../../hooks/handleConvertArea';
import { useStorage } from '../../hooks';
import { Feather } from '@expo/vector-icons';
import { regular, semibold } from '../../hooks/useJostFont'
import { StatusBar } from 'expo-status-bar';

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

  const Card2 = ({ item }) => {
    const polygonArea = getAreaOfPolygon(item.polygonCoordinates)
    const polygonDistance = getPathLength(item.polygonCoordinates)

    return (
      <Pressable className="flex-row w-full p-4 pb-3 bg-white relative justify-between rounded-lg mb-4 shadow-sm active:shadow-xl" onPress={() => router.push({ pathname: "/SavedMapScreen", params: { map: JSON.stringify(item) }})}>
        <View className="h-full flex-grow ">
          <View className="mb-2 ">
            <Text className=" text-green-8" style={[semibold, {fontSize: 24, lineHeight: 26}]}>{item.mapName}</Text>
            <Text className=" text-gray-7" style={[regular, {fontSize: 16}]}>
              {item.dateCreated.split("T")[0].split("-")[1]}/
              {item.dateCreated.split("T")[0].split("-")[2]}/
              {item.dateCreated.split("T")[0].split("-")[0]}
            </Text>
          </View>

          <View className=" flex-wrap flex-row">
            <Text className=" text-gray-8 mr-4" style={[regular, {fontSize: 18}]}>
              <Text className="text-gray-10" style={{fontSize: 20}}>
                { polygonArea ? handleConvertArea(polygonArea, item.measurements.areaShort).toFixed(2) : 0 }
              </Text>
              {` `}{ item.measurements.area }
            </Text>

            <Text className=" text-gray-8 flex-grow" style={[regular, {fontSize: 18}]}>
              <Text className="text-gray-10" style={{fontSize: 20}}>
                { polygonDistance ? convertDistance(polygonDistance, item.measurements.distanceShort).toFixed(2) : 0 }
              </Text>
              {` `}{ item.measurements.distance }
            </Text>

            <Pressable className="active:opacity-40" hitSlop={28} onPress={() => deleteMapAlert({id: item.id, mapName: item.mapName})}>
              <Feather name="trash-2" size={24} color="#B1B1B1"/>
            </Pressable> 
          </View>  


        </View>

      </Pressable>
    )
  }

  

  return (
    <View className=" bg-gray-1 flex-1">
      <StatusBar style="light" />
      {savedMaps && (
        <FlatList
          contentContainerStyle={{paddingBottom: 16, paddingTop: 24, alignItems: 'center'}}
          data={savedMaps}
          renderItem={({item}) => <Card2 item={item} />}
          keyExtractor={(item, index) => `${item.mapName}-${index}`}
          alwaysBounceVertical={false}f
          overScrollMode={'never'}
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
                Tap to Measure
              </Text>
            </Text>
          </Pressable>
        </View>
      )}   
    </View>
  )
}

export default Saved;