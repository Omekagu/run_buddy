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

export interface CustomGroceryRequest {
  item: string
  description: string
  market: string
  specialty?: string
  labels?: string[]
}

const LABEL_OPTIONS = [
  'Fresh Produce',
  'Dairy',
  'Bakery',
  'Meat',
  'Seafood',
  'Snacks',
  'Beverages',
  'Frozen',
  'Organic',
  'Imported',
  'Gluten-Free'
]

export default function GroceryScreen () {
  const [current, setCurrent] = useState<CustomGroceryRequest>({
    item: '',
    description: '',
    market: '',
    specialty: '',
    labels: []
  })
  const [requests, setRequests] = useState<CustomGroceryRequest[]>([])

  function handleChange<K extends keyof CustomGroceryRequest> (
    field: K,
    value: string
  ) {
    setCurrent(prev => ({ ...prev, [field]: value }))
  }

  function handleLabelToggle (label: string) {
    setCurrent(prev => ({
      ...prev,
      labels: prev.labels?.includes(label)
        ? prev.labels?.filter(l => l !== label)
        : [...(prev.labels ?? []), label]
    }))
  }

  function handleSubmit () {
    if (!current.item || !current.market) {
      alert('Please enter item name and market location.')
      return
    }
    setRequests(prev => [...prev, current])
    setCurrent({
      item: '',
      description: '',
      market: '',
      specialty: '',
      labels: []
    })
  }

  function handleSendRequests () {
    // TODO: call your API here
    console.log('Sending requests:', requests)
    // After successful send:
    setRequests([])
    alert('All requests sent!')
  }

  const renderLabel = (label: string) => {
    const selected = current.labels?.includes(label)
    return (
      <TouchableOpacity
        key={label}
        style={[styles.label, selected && styles.labelSelected]}
        onPress={() => handleLabelToggle(label)}
      >
        <Text style={[styles.labelText, selected && styles.labelTextSelected]}>
          {label}
        </Text>
      </TouchableOpacity>
    )
  }

  const renderRequest = ({ item }: { item: CustomGroceryRequest }) => (
    <View style={styles.requestItem}>
      <Text style={styles.requestTitle}>{item.item}</Text>
      <Text style={styles.requestDetails}>
        {item.market}
        {item.specialty ? ` • ${item.specialty}` : ''}
      </Text>
      {item.description ? (
        <Text style={styles.requestDescription}>{item.description}</Text>
      ) : null}
      {item.labels && item.labels.length > 0 && (
        <View style={styles.requestLabels}>
          {item.labels.map(l => (
            <Text key={l} style={styles.requestLabel}>
              {l}
            </Text>
          ))}
        </View>
      )}
    </View>
  )

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={requests}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={renderRequest}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <View style={styles.customInputBox}>
            <Text style={styles.sectionTitle}>New Grocery Request</Text>

            <Text style={styles.labelHeader}>Item</Text>
            <TextInput
              style={styles.input}
              placeholder='What do you want us to buy?'
              placeholderTextColor='#999'
              value={current.item}
              onChangeText={t => handleChange('item', t)}
            />

            <Text style={styles.labelHeader}>Description</Text>
            <TextInput
              style={styles.textarea}
              placeholder='Any special instructions?'
              placeholderTextColor='#999'
              value={current.description}
              onChangeText={t => handleChange('description', t)}
              multiline
            />

            <Text style={styles.labelHeader}>Specialty</Text>
            <TextInput
              style={styles.input}
              placeholder='Brand, size, type...'
              placeholderTextColor='#999'
              value={current.specialty}
              onChangeText={t => handleChange('specialty', t)}
            />

            <Text style={styles.labelHeader}>Market</Text>
            <TextInput
              style={styles.input}
              placeholder='Where to shop?'
              placeholderTextColor='#999'
              value={current.market}
              onChangeText={t => handleChange('market', t)}
            />

            <Text style={styles.labelHeader}>Labels</Text>
            <View style={styles.labelsContainer}>
              {LABEL_OPTIONS.map(renderLabel)}
            </View>

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.submitBtnText}>Add Request</Text>
            </TouchableOpacity>
          </View>
        }
        ListFooterComponent={
          requests.length > 0 && (
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={handleSendRequests}
              activeOpacity={0.8}
            >
              <Text style={styles.sendBtnText}>
                Send All ({requests.length})
              </Text>
            </TouchableOpacity>
          )
        }
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7'
  },
  listContainer: {
    paddingTop: 20,
    paddingBottom: 30
  },
  customInputBox: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    // Android elevation
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
  labelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  label: {
    borderWidth: 1,
    borderColor: '#D1D1D6',
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 6,
    marginBottom: 6,
    backgroundColor: '#fff'
  },
  labelSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF'
  },
  labelText: {
    color: '#1C1C1E',
    fontSize: 13
  },
  labelTextSelected: {
    color: '#fff'
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
  submitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  sendBtn: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: '#34C759',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3
  },
  sendBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  requestItem: {
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
  requestTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E'
  },
  requestDetails: {
    fontSize: 13,
    color: '#3A3A3C',
    marginTop: 4
  },
  requestDescription: {
    fontSize: 13,
    color: '#3A3A3C',
    marginTop: 4,
    marginBottom: 6
  },
  requestLabels: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  requestLabel: {
    backgroundColor: '#E5E5EA',
    color: '#1C1C1E',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    marginRight: 6,
    marginBottom: 4
  }
})
