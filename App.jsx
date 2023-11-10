import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import MapView, { Polygon, Marker } from 'react-native-maps';
import { useEffect, useState} from 'react';
import * as Location from "expo-location";


const demoCoordinates = [
  {
    latitude: 44.007199,
    longitude: -92.404200
  },
  {
    latitude: 44.008040,
    longitude: -92.410658
  },
  {
    latitude: 44.010862,
    longitude: -92.411936
  },
  {
    latitude: 44.011397,
    longitude: -92.405360
  },
]


export default function App() {
  const [ currentLocation, setCurrentLocation ] = useState(null);
  const [ initialRegion, setInitialRegion ] = useState(null);
  const [ polygonCoordinates, setPolygonCoordinates ] = useState([])

  useEffect(() => {
    const getInitialLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });

      const locationSubscription = await Location.watchPositionAsync(
        {accuracy:Location.Accuracy.BestForNavigation, distanceInterval: 1},
        (loc) => {
          console.log(loc)
          setCurrentLocation(loc.coords)
          addLocationToPolygon(loc.coords)
        }
      );
    };

    getInitialLocation();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      addLocationToPolygon(currentLocation)
    }
  }, [currentLocation])

  const addLocationToPolygon = async (newLocation) => {
    // let location = await Location.getCurrentPositionAsync({});
    // await setCurrentLocation(location.coords);
    // const newLocation = location.coords
    await setPolygonCoordinates([{ latitude: newLocation.latitude, longitude: newLocation.longitude}, ...polygonCoordinates])
    // console.log(location.coords.latitude, location.coords.longitude)
    console.log(polygonCoordinates)
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 0.2, backgroundColor: '#fff', justifyContent: 'flex-end', alignItems: 'center'}}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          {currentLocation && (
            <>
              <Text style={{color: '#000', fontSize: 24}}>{`lat: ${currentLocation.latitude}`}</Text>
              <Text style={{color: '#000', fontSize: 24}}>{`long: ${currentLocation.longitude}`}</Text>
            </>
          )}

        </View>
      </View>

      {initialRegion && (
        <MapView 
          style={{flex: 1, width: '100%'}}
          initialRegion={{
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}>

            {currentLocation && (
              <Marker
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                title="Your Location"
              />
            )}

            <Polygon 
              strokeColor="red"
              strokeWidth={2}
              coordinates={polygonCoordinates}
            />
        </MapView>
      )}

      <Pressable onPress={() => addLocationToPolygon(currentLocation)} style={{backgroundColor: '#92e1c0', padding: 8, position: 'absolute', bottom: 20}}>
        <Text>
          Add Location
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});