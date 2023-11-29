import { View } from 'react-native';
import { useLocalSearchParams, useFocusEffect, Stack } from 'expo-router';
import { MeasurementDisplay, Map } from '../components';
import MapView, { Polygon, Marker, Polyline } from 'react-native-maps';
import { getAreaOfPolygon, getPathLength, getCenterOfBounds } from 'geolib';
import { useState, useCallback } from 'react';

const SavedMap = () => {
  const [ mapData, setMapData ] = useState(null)
  const [ polygonCenter, setPolygonCenter ] = useState(null)
  const [ areaVisible, setAreaVisible ] = useState(true)
  const [ markersVisible, setMarkersVisible ] = useState(true)

  const { map } = useLocalSearchParams();

  useFocusEffect(
    useCallback(() => {
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
            <Map 
              region={polygonCenter}
              polygonCoordinates={mapData.polygonCoordinates}
              mapType={mapData.mapType}
              areaVisible={areaVisible}
              markersVisible={markersVisible}/>

            <MeasurementDisplay 
              polygonArea={getAreaOfPolygon(mapData.polygonCoordinates)} 
              polygonDistance={getPathLength(mapData.polygonCoordinates)}
              preferredMeasurements={mapData.measurements}
              areaVisible={areaVisible}
              setAreaVisible={setAreaVisible}
              markersVisible={markersVisible}
              setMarkersVisible={setMarkersVisible}/>
          </>
        )}
        
      </View>
    </>
  )
}

export default SavedMap;