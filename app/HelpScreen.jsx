import { SafeAreaView, ScrollView, View, Text } from 'react-native'
import { regular, semibold, medium } from '../hooks/useJostFont'
import React from 'react'

const HelpScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4" contentContainerStyle={{gap: 32, paddingBottom: 32}}>
        <View style={{gap: 8}}>
          <Text style={[semibold, {fontSize: 20}]}>Usage Directions</Text>

          <Text style={[regular, {lineHeight: 28}]}>
            1. Choose a measurement tool (Auto, Manual, Tap).
          </Text>

          <Text style={[regular, {lineHeight: 28}]}>
            2. "Start Measuring" in Auto Measure or start adding markers in Manual Measure or Tap to Measure.
          </Text>

          <Text style={[regular, {lineHeight: 28}]}>
            3. Adjust display and measurement settings with the gear icon in the upper right of the screen.
          </Text>

          <Text style={[regular, {lineHeight: 28}]}>
            4. Make changes with "Delete Options" to either select individual markers to delete or delete all markers.
          </Text>

          <Text style={[regular, {lineHeight: 28}]}>
            5. Use 
            <Text className="text-green-5" style={[semibold]}>Save</Text> 
            to open the Save Menu. Then name your map and press "Save Map".
          </Text>

          <Text style={[regular, {lineHeight: 28}]}>
            6. View your saved measurement by returning to the home screen and navigating to the saved tab.
          </Text>

          <Text style={[regular, {lineHeight: 28}]}>
            7. Click on a saved measurement to view the map, or delete the measurement with the trash icon.
          </Text>

        </View>

        <Text style={[medium, {lineHeight: 28}]}>Measurements are saved to your device. Measurements are NOT saved outside of your device (ex. online databse).</Text>

        <View style={{gap: 8}}>
          <Text style={[semibold, {fontSize: 20}]}>General Information</Text>

          <Text style={[regular, {lineHeight: 28}]}>Quick Measure - GPS should NEVER be used or official or legal measurements. Contact a professional land surveyor when an official measurement is required.</Text>

          <Text style={[regular, {lineHeight: 28}]}>Quick Measure - GPS should NEVER be used in an emergency situation.</Text>

          <Text style={[regular, {lineHeight: 28}]}>Quick Measure - GPS should NEVER be used while operating machinery.</Text>

          <Text style={[regular, {lineHeight: 28}]}>Quick Measure - GPS should NEVER be used as a turn-based navigation app.</Text>

          <Text style={[regular, {lineHeight: 28}]}>GPS measurements will be more accurate outdoors.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default HelpScreen