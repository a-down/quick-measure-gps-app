import { View, Text, Pressable, FlatList, Button } from 'react-native';
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Saved = () => {
  const [ savedMaps, setSavedMaps ] = useState([])

  const getMaps = async () => {
    try {
      const value = await AsyncStorage.getItem('savedMaps')
      console.log(value)
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

const Card = ({ item }) => (
  <View className="bg-gray-2 shadow-sm">
    <Pressable className="flex w-full bg-white relative" onPress={() => router.push("/")}>
      <View className="bg-white w-full p-2">
        <Text className="text-lg font-semibold text-green-10">{item.mapName}</Text>
        <Text className="text-base text-gray-7">{item.dateCreated.split("T")[0]}</Text>
      </View>
    </Pressable>
  </View>
)

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