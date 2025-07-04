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

  const renderLabel = (label: string) => (
    <TouchableOpacity
      key={label}
      style={[
        styles.label,
        current.labels?.includes(label) && styles.labelSelected
      ]}
      onPress={() => handleLabelToggle(label)}
    >
      <Text
        style={[
          styles.labelText,
          current.labels?.includes(label) && styles.labelTextSelected
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )

  const renderRequest = ({ item }: { item: CustomGroceryRequest }) => (
    <View style={styles.requestItem}>
      <Text style={styles.requestTitle}>{item.item}</Text>
      <Text style={styles.requestDetails}>
        {item.market}
        {item.specialty ? ` • Specialty: ${item.specialty}` : ''}
      </Text>
      {item.description ? (
        <Text style={styles.requestDescription}>{item.description}</Text>
      ) : null}
      {item.labels && item.labels.length > 0 ? (
        <View style={styles.requestLabels}>
          {item.labels.map(label => (
            <Text key={label} style={styles.requestLabel}>
              {label}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  )

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f8f8f8' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={requests}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={renderRequest}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <View style={styles.customInputBox}>
            <Text style={styles.sectionTitle}> Grocery Request</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={'#eee'}
              placeholder='What do you want us to buy?'
              value={current.item}
              onChangeText={text => handleChange('item', text)}
            />

            <Text style={styles.labelHeader}>Category Labels</Text>
            <TextInput
              style={styles.textarea}
              placeholderTextColor={'#eee'}
              placeholder='Special instructions or description'
              value={current.description}
              onChangeText={text => handleChange('description', text)}
              multiline
              numberOfLines={3}
            />

            <Text style={styles.labelHeader}>Category Labels</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={'#eee'}
              placeholder='Specialty (e.g., Brand, Size, Type)'
              value={current.specialty}
              onChangeText={text => handleChange('specialty', text)}
            />

            <Text style={styles.labelHeader}>Category Labels</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={'#eee'}
              placeholder='Where should we shop? e.g., Ogbete Main Market'
              value={current.market}
              onChangeText={text => handleChange('market', text)}
            />
            <Text style={styles.labelHeader}>Category Labels</Text>
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
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 30,
    paddingHorizontal: 0,
    paddingBottom: 16
  },
  customInputBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    margin: 16,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#232323'
  },
  input: {
    borderColor: '#ececec',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 15,
    backgroundColor: '#fafafa'
  },
  textarea: {
    borderColor: '#ececec',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    height: 80,
    textAlignVertical: 'top',
    marginBottom: 10,
    fontSize: 15,
    backgroundColor: '#fafafa'
  },
  labelHeader: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 6,
    marginBottom: 8,
    color: '#232323'
  },
  labelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10
  },
  label: {
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 6,
    marginBottom: 6,
    backgroundColor: '#fff'
  },
  labelSelected: {
    backgroundColor: '#232323',
    borderColor: '#232323'
  },
  labelText: {
    color: '#232323',
    fontSize: 13
  },
  labelTextSelected: {
    color: '#fff'
  },
  submitBtn: {
    backgroundColor: '#232323',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15
  },
  requestItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowOffset: { width: 0, height: 1 }
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#232323'
  },
  requestDetails: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
    marginBottom: 2
  },
  requestDescription: {
    fontSize: 13,
    color: '#505050',
    marginBottom: 5
  },
  requestLabels: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  requestLabel: {
    backgroundColor: '#ececec',
    color: '#232323',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 12,
    marginRight: 6,
    marginBottom: 3
  }
})
