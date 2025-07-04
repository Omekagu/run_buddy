import React, { useState } from 'react'
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

// Define the shape of a check-in
export interface WelfareCheckIn {
  id: string
  date: string
  mood: string
  location: string
  notes: string
}

export default function WelfareScreen () {
  const [current, setCurrent] = useState<Omit<WelfareCheckIn, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    mood: '',
    location: '',
    notes: ''
  })
  const [checkIns, setCheckIns] = useState<WelfareCheckIn[]>([])
  const [moodOpen, setMoodOpen] = useState(false)
  const moodOptions = [
    { label: 'Happy', value: 'happy' },
    { label: 'Neutral', value: 'neutral' },
    { label: 'Sad', value: 'sad' },
    { label: 'Stressed', value: 'stressed' }
  ]

  // Generic field updater
  function handleChange<K extends keyof typeof current> (
    field: K,
    value: string
  ) {
    setCurrent(prev => ({ ...prev, [field]: value }))
  }

  // Submit a new check-in
  function handleAddCheckIn () {
    if (!current.mood || !current.location) {
      alert('Please select your mood and enter location.')
      return
    }
    const newEntry: WelfareCheckIn = {
      id: Date.now().toString(),
      ...current
    }
    setCheckIns(prev => [newEntry, ...prev])
    // Reset except date
    setCurrent(prev => ({ ...prev, mood: '', location: '', notes: '' }))
  }

  const renderCheckIn = ({ item }: { item: WelfareCheckIn }) => (
    <View style={styles.checkInItem}>
      <Text style={styles.checkInDate}>{item.date}</Text>
      <Text style={styles.checkInMood}>Mood: {item.mood}</Text>
      <Text style={styles.checkInLocation}>Location: {item.location}</Text>
      {item.notes ? (
        <Text style={styles.checkInNotes}>{item.notes}</Text>
      ) : null}
    </View>
  )

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={checkIns}
        keyExtractor={item => item.id}
        renderItem={renderCheckIn}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <View style={styles.inputBox}>
            <Text style={styles.sectionTitle}>New Check-In</Text>

            <Text style={styles.labelHeader}>Date</Text>
            <TextInput
              style={styles.input}
              value={current.date}
              onChangeText={t => handleChange('date', t)}
              placeholder='YYYY-MM-DD'
            />

            <Text style={styles.labelHeader}>Mood</Text>
            <DropDownPicker
              open={moodOpen}
              value={current.mood}
              items={moodOptions}
              setOpen={setMoodOpen}
              setValue={val => handleChange('mood', val())}
              placeholder='Select your mood'
              containerStyle={{ marginBottom: 12 }}
              zIndex={1000}
            />

            <Text style={styles.labelHeader}>Location</Text>
            <TextInput
              style={styles.input}
              placeholder='Where are you?'
              value={current.location}
              onChangeText={t => handleChange('location', t)}
            />

            <Text style={styles.labelHeader}>Notes</Text>
            <TextInput
              style={styles.textarea}
              placeholder='Any additional comments'
              value={current.notes}
              onChangeText={t => handleChange('notes', t)}
              multiline
            />

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleAddCheckIn}
              activeOpacity={0.8}
            >
              <Text style={styles.submitBtnText}>Add Check-In</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  listContainer: { paddingTop: 20, paddingBottom: 30 },
  inputBox: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12
  },
  labelHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginTop: 10,
    marginBottom: 6
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#D1D1D6',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 15
  },
  textarea: {
    backgroundColor: '#fff',
    borderColor: '#D1D1D6',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    height: 80,
    textAlignVertical: 'top',
    fontSize: 15
  },
  submitBtn: {
    marginTop: 14,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3
  },
  submitBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  checkInItem: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1
  },
  checkInDate: { fontSize: 14, fontWeight: '600', color: '#1C1C1E' },
  checkInMood: { fontSize: 13, color: '#3A3A3C', marginTop: 4 },
  checkInLocation: { fontSize: 13, color: '#3A3A3C', marginTop: 2 },
  checkInNotes: { fontSize: 13, color: '#3A3A3C', marginTop: 4 }
})
