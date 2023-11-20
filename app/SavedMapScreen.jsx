import { View } from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect, Stack } from 'expo-router';
import { MeasurementDisplay } from '../components';
import MapView, { Polygon, Marker, Polyline } from 'react-native-maps';
import { getAreaOfPolygon, getPathLength, getCenterOfBounds } from 'geolib';
import { useState, useCallback } from 'react';

const SavedMap = () => {
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
  
  return (
    <>
      <Stack.Screen options={{
        title: mapData ? mapData.mapName : "",
        headerBackTitleVisible: false,
        headerTintColor: '#6DAB64',
        headerTitleStyle: {
          color: '#1D3F13',
        },
      }} />

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
            
              {mapData.polygonCoordinates.map((coordinate, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                  }}
                  title="Location"
                  />
              ))}

              {mapData.polygonCoordinates.length < 3 && (
                <Polyline
                  strokeColor="red"
                  strokeWidth={2}
                  coordinates={mapData.polygonCoordinates}
                />
              )}

              {mapData.polygonCoordinates.length > 2 && (
                <Polygon 
                  strokeColor="red"
                  strokeWidth={2}
                  coordinates={mapData.polygonCoordinates}
                />
              )}

            </MapView>

            <MeasurementDisplay 
              polygonArea={getAreaOfPolygon(mapData.polygonCoordinates)} 
              polygonDistance={getPathLength(mapData.polygonCoordinates)}/>
          </>
        )}
        
      </View>
    </>
  )
}

export default SavedMap;