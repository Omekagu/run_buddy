import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

const Status = () => {
  const [flightNumber, setFlightNumber] = useState('')
  const [routeFrom, setRouteFrom] = useState('')
  const [routeTo, setRouteTo] = useState('')
  const [trackingOption, setTrackingOption] = useState('flight') // 'flight', 'route', 'random'

  const renderRentSearch = () => (
    <View style={styles.inputGroup}>
      <TextInput
        placeholder='Airline eg. British Airways'
        style={styles.input}
        placeholderTextColor='#ccc'
      />
      <TextInput
        placeholder='Rent Number (e.g. BA203)'
        style={styles.input}
        placeholderTextColor='#ccc'
      />
      <TextInput
        placeholder='Date (YYYY-MM-DD)'
        style={styles.input}
        placeholderTextColor='#ccc'
        keyboardType='numeric'
      />

      <TouchableOpacity style={styles.trackButton}>
        <Ionicons name='search' size={22} color='#fff' />
        <Text style={styles.trackButtonText}>Track Rent</Text>
      </TouchableOpacity>
    </View>
  )

  const renderRouteSearch = () => (
    <View style={styles.inputGroup}>
      <TextInput
        placeholder='Departure Airport Code (e.g. LHR)'
        style={styles.input}
        placeholderTextColor='#ccc'
        value={routeFrom}
        onChangeText={setRouteFrom}
      />
      <TextInput
        placeholder='Arrival Airport Code (e.g. JFK)'
        style={styles.input}
        placeholderTextColor='#ccc'
      />
      <TextInput
        placeholder='Airline (e.g. British Airways)'
        style={styles.input}
        placeholderTextColor='#ccc'
      />
      <TextInput
        placeholder='date (YYYY-MM-DD)'
        keyboardType='numeric'
        style={styles.input}
        placeholderTextColor='#ccc'
      />
      <TextInput
        placeholder='time (HH:MM)'
        keyboardType='numeric'
        style={styles.input}
        placeholderTextColor='#ccc'
      />
      <TouchableOpacity style={styles.trackButton}>
        <Ionicons name='navigate' size={22} color='#fff' />
        <Text style={styles.trackButtonText}>Search Route</Text>
      </TouchableOpacity>
    </View>
  )

  const renderRandomTracker = () => (
    <TouchableOpacity style={[styles.trackButton, { marginTop: 30 }]}>
      <Ionicons name='shuffle' size={22} color='#fff' />
      <Text style={styles.trackButtonText}>Track Random Rent</Text>
    </TouchableOpacity>
  )

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20
          }}
        >
          <Text style={styles.title}>Track Rent Status</Text>
          <Text style={styles.title}>
            <FontAwesome6 name='newspaper' size={24} color='#fff' />
          </Text>
        </View>

        <View style={styles.switchContainer}>
          <TouchableOpacity
            style={[
              styles.switchButton,
              trackingOption === 'Rent' && styles.activeButton
            ]}
            onPress={() => setTrackingOption('Rent')}
          >
            <Text style={styles.switchText}>Search by Rent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.switchButton,
              trackingOption === 'route' && styles.activeButton
            ]}
            onPress={() => setTrackingOption('route')}
          >
            <Text style={styles.switchText}>By Airport Route</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.switchButton,
              trackingOption === 'random' && styles.activeButton
            ]}
            onPress={() => setTrackingOption('random')}
          >
            <Text style={styles.switchText}>Random Rent</Text>
          </TouchableOpacity>
        </View>

        {trackingOption === 'Rent' && renderRentSearch()}
        {trackingOption === 'route' && renderRouteSearch()}
        {trackingOption === 'random' && renderRandomTracker()}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fc8403' },
  content: {
    padding: 20,
    paddingTop: 40
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  switchButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#2c2c2c',
    flex: 1,
    marginHorizontal: 5
  },
  activeButton: {
    backgroundColor: '#fc8403'
  },
  switchText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 13,
    fontWeight: '800'
  },
  inputGroup: {
    marginBottom: 20
  },
  input: {
    backgroundColor: '#2c2c2c',
    borderRadius: 8,
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
    height: 50
  },
  trackButton: {
    backgroundColor: '#fc8403',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 50,
    height: 60
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8
  }
})

export default Status
