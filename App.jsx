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

const walkToMailbox = [{latitude: 44.00719339068559, longitude: -92.39045458757248}, {latitude: 44.00720777521759, longitude: -92.39044857257788}, {latitude: 44.00722463996818, longitude: -92.39044552876923}, {latitude: 44.00723910893775, longitude: -92.39043884259915}, {latitude: 44.007253440055344, longitude: -92.3904339617919}, {latitude: 44.00726996411364, longitude: -92.39043368123015}, {latitude: 44.00728242210206, longitude: -92.39042937761312}, {latitude: 44.00729738115168, longitude: -92.39042271172833}, {latitude: 44.00730698411163, longitude: -92.39041823226454}, {latitude: 44.00731678282986, longitude: -92.39041522381036}, {latitude: 44.007331483445654, longitude: -92.39041748500719}, {latitude: 44.00734617151441, longitude: -92.3904142248112}, {latitude: 44.00735833376541, longitude: -92.39039820105242}, {latitude: 44.007364923916036, longitude: -92.39038508187748}, {latitude: 44.007367904436194, longitude: -92.39036323363482}, {latitude: 44.00737559615935, longitude: -92.39032280977409}, {latitude: 44.007378468563495, longitude: -92.39030045648173}, {latitude: 44.007364136986915, longitude: -92.39028344733238}, {latitude: 44.00734465621704, longitude: -92.39027301229494}, {latitude: 44.00733953882428, longitude: -92.39026151148018}, {latitude: 44.00732452117864, longitude: -92.39025160479204}, {latitude: 44.007319364866696, longitude: -92.3902394959468}, {latitude: 44.007319364866696, longitude: -92.3902394959468}]


export default function App() {
  const [ currentLocation, setCurrentLocation ] = useState(null);
  const [ initialRegion, setInitialRegion ] = useState(null);
  const [ polygonCoordinates, setPolygonCoordinates ] = useState(walkToMailbox)

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