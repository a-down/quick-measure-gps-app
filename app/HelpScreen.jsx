import { SafeAreaView, ScrollView, View, Text, Linking, Pressable } from 'react-native'
import { regular, semibold, medium } from '../hooks/useJostFont'
import React from 'react'
import { Feather } from '@expo/vector-icons';

const HelpScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4" contentContainerStyle={{gap: 32, paddingBottom: 32}}>
        <View style={{gap: 8}}>
          <Text style={[semibold, {fontSize: 20}]}>Usage Directions</Text>

          <Text style={[regular, {lineHeight: 28}]}>1. Choose a measurement tool (Auto, Manual, Tap).</Text>

          <Text style={[regular, {lineHeight: 28}]}>2. 
            <Text className="text-green-5" style={[semibold]}>
              <Feather name='play' size={16} />{' Start Measuring '}
            </Text>
            in Auto Measure or start adding markers in Manual Measure or Tap to Measure.
          </Text>

          <Text style={[regular, {lineHeight: 28}]}>3. Adjust display and measurement settings with the
            <Text className="text-green-5" style={[semibold]}>
              {' gear icon '}<Feather name="settings" size={16}/>{' '}
            </Text>
            in the upper right of the screen.
          </Text>

          <Text style={[regular, {lineHeight: 28}]}>4. 
            Make changes with
            <Text className="text-green-5" style={[semibold]}>{' '}
              <Feather name="trash-2" size={16}/>{' Delete Options '}
            </Text>
            to either select individual markers to delete or delete all markers.
          </Text>

          <Text style={[regular, {lineHeight: 28}]}>
            5. Use 
            <Text className="text-green-5" style={[semibold]}>
              {' '}<Feather name="download" size={16}/>{' Save '}
            </Text> 
            to open the Save Menu. Then name your map and press 
            <Text className="text-green-5" style={[semibold]}>{' '}
              <Feather name="download" size={16}/>{' Save Map'}
            </Text>.
          </Text>

          <Text style={[regular, {lineHeight: 28}]}>6. View your saved measurement by returning to the home screen and navigating to the saved tab.</Text>

          <Text style={[regular, {lineHeight: 28}]}>
            7. Click on a saved measurement to view the map, or delete the measurement with the
            <Text className="text-green-5" style={[semibold]}>
              {' trash icon '}<Feather name="trash-2" size={16}/>
            </Text>.
          </Text>
        </View>

        <Text style={[medium, {lineHeight: 28}]}>Measurements are saved to your device. Measurements are NOT saved outside of your device (ex. online database).</Text>

        <View style={{gap: 8}}>
          <Text style={[semibold, {fontSize: 20}]}>General Information</Text>

          <Text style={[regular, {lineHeight: 28}]}>Quick Measure - GPS should NEVER be used or official or legal measurements. Contact a professional land surveyor when an official measurement is required.</Text>
          <Text style={[regular, {lineHeight: 28}]}>Quick Measure - GPS should NEVER be used in an emergency situation.</Text>
          <Text style={[regular, {lineHeight: 28}]}>Quick Measure - GPS should NEVER be used while operating machinery.</Text>
          <Text style={[regular, {lineHeight: 28}]}>Quick Measure - GPS should NEVER be used as a turn-based navigation app.</Text>
          <Text style={[regular, {lineHeight: 28}]}>GPS measurements will be more accurate outdoors.</Text>
        </View>

        <View style={{gap: 8}}>
          <Text style={[semibold, {fontSize: 20}]}>Contact</Text>

          <Text style={[regular, {lineHeight: 28}]}>If you have questions about or issues with Quick Measure, please reach out at{' '} 
            <Pressable onPress={() => Linking.openURL('mailto:alec@alecdowning.com')} className="active:opacity-40">
              <Text className="text-green-5" style={[semibold]}>
                alec@alecdowning.com.
              </Text>
            </Pressable>
          </Text>

          <Text style={[regular, {lineHeight: 28}]}>If you love the app, I'd love to hear from you too. Please rate and review, and thank you for using Quick Measure - GPS!</Text>
          <Text style={[semibold, {lineHeight: 28, textAlign: 'right', marginRight: 12}]}>- Alec</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HelpScreen