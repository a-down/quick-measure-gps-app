import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import MapView, { Polygon, Marker } from 'react-native-maps';
import { useEffect, useState} from 'react';
import * as Location from "expo-location";



export default function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
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
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{flex: 0.2, backgroundColor: '#fff', justifyContent: 'flex-end', alignItems: 'center'}}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Text style={{color: '#000', fontSize: 24}}>Map</Text>
          <Text style={{color: '#000', fontSize: 24}}>Map</Text>
          <Text style={{color: '#000', fontSize: 24}}>Map</Text>
        </View>
      </View>
      <MapView 
        style={{flex: 1, width: '100%'}}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}>
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation ? currentLocation.latitude : 0,
                longitude: currentLocation.longitude,
              }}
              title="Your Location"
            />
          )}
        <Polygon 
          strokeColor="red"
          strokeWidth={2}
          coordinates={[
            {
              latitude: 44.010862,
              longitude: -92.411936
            },
            {
              latitude: 44.011397,
              longitude: -92.405360
            },
            {
              latitude: 44.007199,
              longitude: -92.404200
            },
            {
              latitude: 44.008040,
              longitude: -92.410658
            }
          ]}
        />
      </MapView>
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
