import { Text, View, Pressable, useWindowDimensions, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { regular, semibold, bold } from '../../hooks/useJostFont';
import walkingIcon from '../../assets/walking-icon.png';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

// import { BannerAd, TestIds, BannerAdSize } from 'react-native-google-mobile-ads';
// import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';

export default function App() {
  const { width } = useWindowDimensions();
  const router = useRouter();

  const pageLinks = [
    {link: '/AutoMeasureScreen', title: 'Auto', description: 'Measure automatically with GPS', icon: 'satellite-dish'},
    {link: '/ManualMeasureScreen', title: 'Manual', description: 'Measure manually with GPS', icon: 'plus-circle'},
    {link: '/TapMeasureScreen', title: 'Tap', description: 'Measure anywhere in the world by tapping', icon: 'gesture-tap'},
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
      {/* <BannerAd 
        unitId={TestIds.BANNER}
        size={BannerAdSize.SMALL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      /> */}

      <View className="bg-green-8 w-[1060px] aspect-square relative bottom-[600px] rounded-full"></View>

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

      <ScrollView className="w-full h-full p-8 absolute" contentContainerStyle={{ alignItems: 'center'}}>
        <View className="items-center justify-start" style={{gap: 24}}>
          <Image source={walkingIcon} style={{height: 115, width: 80, marginRight: 12}}/>
          <Text className="text-white text-center mb-6" style={[bold, {fontSize: 24, maxWidth: 200}]}>Easy Tools for a Quick Measure</Text>
        </View>

        {pageLinks.map((item, index) => (
          <View>
            <Pressable onPress={() => router.push(item.link)} className=" active:opacity-80 flex-row justify-start items-center p-4 bg-green-1 rounded-md" key={index} style={{width: width-32, marginBottom: 16, gap: 16}}>
              {Icon(item.icon)}
              <View className="items-start">
                <Text className=" text-green-10 text-center" style={[semibold, {fontSize: 22}]}>{item.title}</Text>
                <Text className=" text-gray-7 text-center" style={[regular, {fontSize: 14}]}>{item.description}</Text>  
              </View>
            </Pressable>
          </View>
        ))}

      </ScrollView>

    </SafeAreaView>
  );
}