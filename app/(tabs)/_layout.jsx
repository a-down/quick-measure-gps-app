import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useFonts, Jost_400Regular, Jost_500Medium, Jost_600SemiBold, Jost_700Bold } from '@expo-google-fonts/jost';

const Layout = () => {
  let [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_500Medium,
    Jost_600SemiBold,
    Jost_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Tabs>
      <Tabs.Screen 
        name="MeasureTab"
        options={{
          tabBarLabel: "Measure",
          title: "Quick Measure",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#6DAB64',
          },
          headerTitleStyle: {
            color: '#fff',
            fontFamily: 'Jost_700Bold',
            fontSize: 18
          },
          tabBarIcon: ({ color, size }) => (
            <Feather name="map" size={size} color={color} />
          ),
          tabBarInactiveTintColor: "#6DAB64",
          tabBarActiveTintColor: "#AED6A9",
          tabBarStyle: {
            backgroundColor: "#2B561F",
            borderTopColor: "transparent",
          },
          tabBarLabelStyle: {
            fontWeight: "bold",
            fontFamily: 'Jost_500Medium', 
            fontSize: 13
          }
        }}
      />
      
      <Tabs.Screen 
        name="SavedTab"
        options={{
          tabBarLabel: "Saved",
          title: "Saved Measurements",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#6DAB64',
          },
          headerTitleStyle: {
            color: '#fff',
            fontFamily: 'Jost_700Bold',
            fontSize: 18
          },
          tabBarIcon: ({ color, size }) => (
            <Feather name="bookmark" size={size} color={color} className="mt-4"/>
          ),
          tabBarInactiveTintColor: "#9F9F9F",
          tabBarActiveTintColor: "#6DAB64",
          tabBarLabelStyle: {
            fontFamily: 'Jost_500Medium',
            fontSize: 13
          }
        }}
      />
      
    </Tabs>
  )
}

export default Layout;