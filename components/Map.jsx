import MapView, { Polygon, Marker, Polyline } from 'react-native-maps';
import { useState, useEffect } from 'react';
import mapMarker from '../assets/map-marker.png';
import mapMarkerRed from '../assets/map-marker-red.png';

export default function Map({ region, polygonCoordinates, mapType, addLocationToPolygon, tappable, areaVisible, deleteMode, markersToDelete, setMarkersToDelete }) {

  return (
    <>
      {tappable === true ? (
        <MapView 
          style={{flex: 1, width: '100%'}}
          region={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
          }}

          onPress={(e) => !deleteMode ? addLocationToPolygon(e.nativeEvent.coordinate) : null}

          mapType={mapType || "satellite"}>

            {polygonCoordinates.length > 0 && (
              (polygonCoordinates.map((coordinate, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                  }}
                  onPress={() => {
                    if (!deleteMode) return false
                    markersToDelete.includes(coordinate) 
                      ? setMarkersToDelete(markersToDelete.filter(marker => marker !== coordinate))
                      : setMarkersToDelete([...markersToDelete, coordinate])
                  }}
                  pinColor={ deleteMode && markersToDelete.includes(coordinate) ? "#2B561F" : "red" }
                  image={ deleteMode && markersToDelete.includes(coordinate) ? mapMarkerRed : mapMarker}
                  />
              )))
            )}

            {polygonCoordinates.length > 0 && (
              <Polyline
                strokeColor="red"
                strokeWidth={2}
                coordinates={polygonCoordinates}
                lineJoin='round' />
            )}

            {polygonCoordinates.length > 2 && areaVisible && (
              <Polygon
                strokeColor='transparent'
                fillColor="rgba(255, 255, 255, 0.6)"
                strokeWidth={1}
                coordinates={polygonCoordinates} />
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

          mapType={mapType || "satellite"}>

            {polygonCoordinates.length > 0 && (
              (polygonCoordinates.map((coordinate, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                  }}
                  onPress={() => {
                    if (!deleteMode) return false
                    markersToDelete.includes(coordinate) 
                      ? setMarkersToDelete(markersToDelete.filter(marker => marker !== coordinate))
                      : setMarkersToDelete([...markersToDelete, coordinate])
                  }}
                  pinColor={ deleteMode && markersToDelete.includes(coordinate) ? "red" : "wheat" }
                  image={ deleteMode && markersToDelete.includes(coordinate) ? mapMarkerRed : mapMarker}
                  />
              )))
            )}

            {polygonCoordinates.length > 0 && (
              <Polyline
                strokeColor="#05400A"
                strokeWidth={2}
                coordinates={polygonCoordinates}
                lineJoin='round' />
            )}

            {polygonCoordinates.length > 2 && areaVisible && (
              <Polygon
                strokeColor='transparent'
                fillColor="rgba(255, 255, 255, 0.6)"
                strokeWidth={1}
                coordinates={polygonCoordinates} />
            )}
        </MapView>
      )}
    </>
    )
}