import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useFonts, Jost_400Regular, Jost_600SemiBold, Jost_700Bold } from '@expo-google-fonts/jost';

const Layout = () => {
  let [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
    Jost_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Tabs>
      <Tabs.Screen 
        name="ToolsTab"
        options={{
          tabBarLabel: "Tools",
          title: "Quick Measure",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#6DAB64',
          },
          headerTitleStyle: {
            color: '#fff',
            fontFamily: 'Jost_700Bold'
          },
          tabBarIcon: ({ color, size }) => (
            <Feather name="map" size={size} color={color} />
          ),
          tabBarInactiveTintColor: "#9F9F9F",
          tabBarActiveTintColor: "#6DAB64",
          tabBarLabelStyle: {
            fontWeight: "bold",
            fontFamily: 'Jost_600SemiBold', 
            fontSize: 14
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
            fontFamily: 'Jost_700Bold'
          },
          tabBarIcon: ({ color, size }) => (
            <Feather name="bookmark" size={size} color={color} className="mt-4"/>
          ),
          tabBarInactiveTintColor: "#9F9F9F",
          tabBarActiveTintColor: "#6DAB64",
          tabBarLabelStyle: {
            fontFamily: 'Jost_600SemiBold',
            fontSize: 14
          }
        }}
      />
      
    </Tabs>
  )
}

export default Layout;