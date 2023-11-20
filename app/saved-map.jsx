import { View, Text, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { MeasurementDisplay } from '../components';
import MapView, { Polygon, Marker, Polyline } from 'react-native-maps';
import { getAreaOfPolygon, getPathLength, getCenterOfBounds } from 'geolib';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedMap = () => {
  const router = useRouter();
  const [ mapData, setMapData ] = useState(null)
  const [ polygonCenter, setPolygonCenter ] = useState(null)

  const { map } = useLocalSearchParams();

  useFocusEffect(
    useCallback(() => {
      console.log(JSON.parse(map))
      setMapData(JSON.parse(map))
      setPolygonCenter(getCenterOfBounds(JSON.parse(map).polygonCoordinates))
    }, [])
  );

  const getMapData = async () => {
    try {
      const value = await AsyncStorage.getItem('savedMaps')
      return JSON.parse(value).filter(map => map.id === id)[0]
    } catch (error) {
      console.log
      router.back()
      Alert.alert("Could not load map")
    }
  }
  
  return (
      <View className="flex-1 items-center justify-center">
        {mapData && (
          <>
            <MapView 
              style={{flex: 1, width: '100%'}}
              initialRegion={{
                latitude: polygonCenter.latitude,
                longitude: polygonCenter.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
              }}
              mapType={mapData.mapType}
              >

                <Polygon 
                  strokeColor="red"
                  strokeWidth={2}
                  coordinates={mapData.polygonCoordinates}
                />
            </MapView>

            <MeasurementDisplay 
              polygonArea={getAreaOfPolygon(mapData.polygonCoordinates)} 
              polygonDistance={getPathLength(mapData.polygonCoordinates)}/>
          </>
        )}
        
      </View>
  )
}

export default SavedMap;