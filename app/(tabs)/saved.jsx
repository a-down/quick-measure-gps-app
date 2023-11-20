import { View, Text, Pressable, FlatList, Button, Alert } from 'react-native';
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAreaOfPolygon, getPathLength, convertArea, convertDistance } from 'geolib';
import { useRouter } from 'expo-router';

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

  useEffect(() => {
    getMaps()
      // try {
      //     AsyncStorage.removeItem('savedMaps');
      // }
      // catch(exception) {
      // }
  }, [])

//   <View className="bg-gray-2 shadow-sm">
//   <Pressable className="flex w-full bg-white" onPress={() => router.push("/")}>
//     <View className="bg-white w-full p-2 absolute bottom-0">
//       <Text className="text-lg font-semibold text-green-10">{map.mapName}</Text>
//       <Text className="text-base text-gray-7">{map.dateCreated}</Text>
//     </View>
//   </Pressable>
// </View>

const Card = ({ item }) => {
  const polygonArea = getAreaOfPolygon(item.polygonCoordinates)
  const polygonDistance = getPathLength(item.polygonCoordinates)

  return (
    <View className="flex w-full bg-white relative p-4" style={{gap: 8}}>
      <View className="bg-white w-full">
        <Text className="text-lg font-semibold text-green-10">{item.mapName}</Text>
        <Text className="text-base text-gray-7">{item.dateCreated.split("T")[0]}</Text>
      </View>

      <View className="flex-row flex-wrap mb-4" style={{gapY: 8}}>
        <Text className="text-lg mr-8">
          <Text className="text-3xl">
            { polygonArea
              ? convertArea(polygonArea, item.measurements.areaShort).toFixed(2)
              : 0}
          </Text>
          {` `}{ item.measurements.area }
        </Text>
        <Text className="text-lg">
          <Text className="text-3xl">
            { polygonDistance
              ? convertDistance(polygonDistance, item.measurements.distanceShort).toFixed(2)
              : 0 }
          </Text>
          {` `}{ item.measurements.distance }
        </Text>
      </View>  

      <View>
        <Pressable className="bg-green-5 p-2 rounded-md mb-2">
          <Text className="text-white font-semibold text-lg text-center">View Map</Text>
        </Pressable>
        <Button 
          title="Delete"
          color="#C7504B"
          onPress={() => {Alert.alert("delete")}} />
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
      <Button
        title="Clear Saved Maps"
        onPress={() => AsyncStorage.removeItem('savedMaps')} />
      <Button
        title="Refresh Maps"
        onPress={() => setSavedMaps(AsyncStorage.getItem('savedMaps'))} />

    </View>
  )
}

export default Saved;