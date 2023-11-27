import MapView, { Polygon, Marker, Polyline } from 'react-native-maps';
import { useState, useEffect } from 'react';

export default function Map({ region, polygonCoordinates, mapType, addLocationToPolygon, tappable, areaVisible, removeLocationFromPolygon, selectedCoordinateIndex }) {
  const [ selectedMarker, setSelectedMarker ] = useState(null)

  return (
    <>
      {tappable === true ? (
        <MapView 
          style={{flex: 1, width: '100%'}}
          region={{
            latitude: selectedCoordinateIndex ? polygonCoordinates[selectedCoordinateIndex].latitude : region.latitude,
            longitude: selectedCoordinateIndex ? polygonCoordinates[selectedCoordinateIndex].longitude : region.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
          }}

          onPress={(e) => addLocationToPolygon(e.nativeEvent.coordinate)}

          mapType={mapType || "standard"}>

            {polygonCoordinates.length > 0 && (
              (polygonCoordinates.map((coordinate, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                  }}
                  pinColor={ selectedCoordinateIndex === index ? "red" : "wheat"}
                  />
              )))
            )}

            {polygonCoordinates.length < 3 && (
              <Polyline
                strokeColor="red"
                strokeWidth={2}
                coordinates={polygonCoordinates}
              />
            )}

            {polygonCoordinates.length > 2 && (
              <>
                {areaVisible && (
                  <Polygon
                    strokeColor='transparent'
                    fillColor="rgba(255, 255, 255, 0.6)"
                    strokeWidth={1}
                    coordinates={polygonCoordinates} />
                )}
                
                <Polyline
                  strokeColor="red"
                  strokeWidth={2}
                  coordinates={polygonCoordinates} />
              </>
            )}
        </MapView>
      ) : (
        <MapView 
          style={{flex: 1, width: '100%'}}
          region={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
          }}

          mapType={mapType || "standard"}>

            {polygonCoordinates.length > 0 && (
              (polygonCoordinates.map((coordinate, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                  }}
                  pinColor={ selectedCoordinateIndex === index ? "red" : "wheat"}
                  />
              )))
            )}

            {polygonCoordinates.length < 3 && (
              <Polyline
                strokeColor="red"
                strokeWidth={2}
                coordinates={polygonCoordinates}
              />
            )}

            {polygonCoordinates.length > 2 && (
              <>
                {areaVisible && (
                  <Polygon
                    strokeColor='transparent'
                    fillColor="rgba(255, 255, 255, 0.6)"
                    strokeWidth={1}
                    coordinates={polygonCoordinates} />
                )}
                
                <Polyline
                  strokeColor="red"
                  strokeWidth={2}
                  coordinates={polygonCoordinates} />
              </>
            )}
        </MapView>
      )}
    </>
    )
}