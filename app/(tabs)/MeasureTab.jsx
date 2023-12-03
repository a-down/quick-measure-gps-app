import { Text, View, Pressable, useWindowDimensions, Image, ScrollView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { regular, semibold, bold, medium } from '../../hooks/useJostFont';
import walkingIcon from '../../assets/walking-icon.png';
import { MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useStorage } from '../../hooks';
import { useCallback, useState } from 'react';

// import { BannerAd, TestIds, BannerAdSize } from 'react-native-google-mobile-ads';
// import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';

export default function App() {
  const { width } = useWindowDimensions();
  const router = useRouter();

  const [ savedMaps, setSavedMaps ] = useState([])

  useFocusEffect(
    useCallback(() => {
      getRecentlySaved()
    }, [])
  );

  const getRecentlySaved = async () => {
    const value = await useStorage('get', 'savedMaps')
    const reversed = value.reverse()
    let numberOfMaps
    reversed.length < 3 ? numberOfMaps = reversed.length : numberOfMaps = 3
    setSavedMaps(reversed.slice(0, numberOfMaps))
  }

  const pageLinks = [
    {link: '/AutoMeasureScreen', title: 'Auto', description: 'Measure automatically with GPS', icon: 'satellite-dish'},
    {link: '/ManualMeasureScreen', title: 'Manual', description: 'Measure manually with GPS', icon: 'plus-circle'},
    {link: '/TapMeasureScreen', title: 'Tap', description: 'Measure anywhere by tapping', icon: 'gesture-tap'},
  ]

  const Icon = (name) => {
    switch(name) {
      case 'satellite-dish':
        return <FontAwesome5 name={name} size={48} color='#8CC185' style={{textAlign: 'center', marginBottom: 4}}/>
      case 'gesture-tap':
        return <MaterialCommunityIcons name={name} size={48} color='#8CC185' style={{textAlign: 'center', marginBottom: 4}}/>
      case 'plus-circle':
        return <FontAwesome5 name={name} size={48} color='#8CC185' style={{textAlign: 'center', marginBottom: 4}}/>
    }
  }

  return (
    <SafeAreaView className="bg-green-9 relative flex-1 items-center w-full h-full">
      <StatusBar style="light" />
      {/* <BannerAd 
        unitId={TestIds.BANNER}
        size={BannerAdSize.SMALL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      /> */}



      {/* <ScrollView className="flex-1 top-0 left-0 absolute p-8" contentContainerStyle={{ alignItems: 'center'}}>
        <View className="items-center justify-start" style={{gap: 24}}>
          <Image source={walkingIcon} style={{height: 115, width: 80}}/>
          <Text className="text-white text-center mb-6" style={[bold, {fontSize: 24, maxWidth: 200}]}>Easy Tools for a Quick Measure</Text>
        </View>

        <View className="bg-gray-1 w-full rounded-lg shadow-2xl p-4 flex-row flex-wrap justify-around" style={{width: width-64, gap: 16}}>
          {pageLinks.map((item, index) => (
            <Pressable onPress={() => router.push(item.link)} className="items-center justify-end active:opacity-80" key={index} style={{width: 131}}>
              {Icon(item.icon)}
              <Text className=" text-green-10 text-center mt-2" style={[semibold, {fontSize: 18}]}>{item.title}</Text>
              <Text className=" text-gray-7 text-center" style={[regular, {fontSize: 14}]}>{item.description}</Text>  
            </Pressable>
          ))}
        </View>
      </ScrollView> */}

      <ScrollView className="w-full h-full pt-8 absolute" contentContainerStyle={{ alignItems: 'center'}} alwaysBounceVertical={false}>
        <View className="bg-green-8 w-[1060px] aspect-square absolute bottom-[400px] rounded-full"></View>
        <View className="items-center justify-start mb-8" style={{gap: 24}}>
          <Image source={walkingIcon} style={{height: 115, width: 80, marginRight: 12}}/>
          <Text className="text-white text-center" style={[bold, {fontSize: 24, maxWidth: 200}]}>Easy Tools for a Quick Measure</Text>
        </View>

        <View className="bg-green-9 w-full items-center pt-4 px-4 rounded-lg" style={{width: width-32}}>
          {pageLinks.map((item, index) => (
            <Pressable 
              className=" bg-gray-1 active:bg-gray-2 flex-row justify-start items-center p-4 w-full rounded-md" 
              onPress={() => router.push(item.link)} 
              key={item.title + index} style={{ marginBottom: 16, gap: 24}}>
              {Icon(item.icon)}
              <View className="justify-center items-start mt-1">
                <Text className=" text-green-10 text-center" style={[semibold, {fontSize: 22, lineHeight: 24}]}>{item.title}</Text>
                <Text className=" text-gray-7 text-center text-wrap overflow-ellipsis" style={[regular, {fontSize: 15, lineHeight: 17}]}>{item.description}</Text>  
              </View>
            </Pressable>
          ))}

          <View className="w-full mt-4 pb-12">
            <Text className="text-white mb-4" style={[bold, {fontSize: 20}]}>Recently Saved</Text>
            {savedMaps.map((map, index) => (
              <Pressable 
                className="p-4 bg-green-8 rounded-md mb-2 flex-row justify-between items-center" 
                onPress={() => router.push({ pathname: '/SavedMapScreen', params: { map: JSON.stringify(map) }})}
                key={index}>
                <View>
                  <Text className="text-white" style={[medium, {fontSize: 18}]}>{map.mapName}</Text>
                  <Text className="text-gray-1" style={[regular, {fontSize: 12}]}>
                    {map.dateCreated.split("T")[0].split("-")[1]}/
                    {map.dateCreated.split("T")[0].split("-")[2]}/
                    {map.dateCreated.split("T")[0].split("-")[0]}
                  </Text>
                </View>
                <Feather name="chevron-right" size={24} color="#fff"/>
              </Pressable>
              
            ))}

          </View>
        </View>

        

      </ScrollView>

    </SafeAreaView>
  );
}