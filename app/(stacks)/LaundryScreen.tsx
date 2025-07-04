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

export interface LaundryRequest {
  id: string
  item: string
  quantity: string
  detergent: string
  fabricSoftener: boolean
  specialInstructions: string
  pickupLocation: string
  dropoffLocation?: string
}

export default function LaundryScreen () {
  const [current, setCurrent] = useState<Omit<LaundryRequest, 'id'>>({
    item: '',
    quantity: '1',
    detergent: '',
    fabricSoftener: false,
    specialInstructions: '',
    pickupLocation: '',
    dropoffLocation: ''
  })
  const [requests, setRequests] = useState<LaundryRequest[]>([])
  const [step, setStep] = useState<1 | 2>(1)
  const [detergentOpen, setDetergentOpen] = useState(false)
  const detergentOptions = [
    { label: 'Standard', value: 'standard' },
    { label: 'Hypoallergenic', value: 'hypoallergenic' },
    { label: 'Scented', value: 'scented' }
  ]

  function handleChange<K extends keyof typeof current> (field: K, value: any) {
    setCurrent(prev => ({ ...prev, [field]: value }))
  }

  function toggleSoftener () {
    setCurrent(prev => ({ ...prev, fabricSoftener: !prev.fabricSoftener }))
  }

  // Proceed to review step
  function goToReview () {
    if (!current.item) {
      alert('Please enter the item.')
      return
    }
    setStep(2)
  }

  // Submit final request
  function handleSubmit () {
    if (!current.pickupLocation) {
      alert('Please enter pickup location.')
      return
    }
    const newReq: LaundryRequest = { id: Date.now().toString(), ...current }
    setRequests(prev => [newReq, ...prev])
    // Reset and back to step 1
    setCurrent({
      item: '',
      quantity: '1',
      detergent: '',
      fabricSoftener: false,
      specialInstructions: '',
      pickupLocation: '',
      dropoffLocation: ''
    })
    setStep(1)
  }

  const renderRequest = ({ item }: { item: LaundryRequest }) => (
    <View style={styles.requestItem}>
      <Text style={styles.requestTitle}>
        {item.quantity} × {item.item}
      </Text>
      <Text style={styles.requestDetail}>
        Detergent: {item.detergent || 'Standard'}
      </Text>
      <Text style={styles.requestDetail}>
        Fabric Softener: {item.fabricSoftener ? 'Yes' : 'No'}
      </Text>
      <Text style={styles.requestDetail}>Pickup: {item.pickupLocation}</Text>
      {item.dropoffLocation ? (
        <Text style={styles.requestDetail}>
          Dropoff: {item.dropoffLocation}
        </Text>
      ) : null}
      {item.specialInstructions ? (
        <Text style={styles.requestInstructions}>
          {item.specialInstructions}
        </Text>
      ) : null}
    </View>
  )

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={requests}
        keyExtractor={item => item.id}
        renderItem={renderRequest}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <View style={styles.inputBox}>
            {step === 1 ? (
              <>
                <Text style={styles.sectionTitle}>Laundry Details</Text>
                <Text style={styles.label}>Item</Text>
                <TextInput
                  style={styles.input}
                  placeholder='What item?'
                  value={current.item}
                  onChangeText={t => handleChange('item', t)}
                />

                <Text style={styles.label}>Quantity</Text>
                <TextInput
                  style={styles.input}
                  keyboardType='numeric'
                  value={current.quantity}
                  onChangeText={t => handleChange('quantity', t)}
                />

                <Text style={styles.label}>Detergent</Text>
                <DropDownPicker
                  open={detergentOpen}
                  value={current.detergent}
                  items={detergentOptions}
                  setOpen={setDetergentOpen}
                  setValue={val => handleChange('detergent', val())}
                  placeholder='Select detergent'
                  containerStyle={{ marginBottom: 12 }}
                  zIndex={1000}
                />

                <TouchableOpacity
                  onPress={toggleSoftener}
                  style={styles.checkboxContainer}
                >
                  <View
                    style={[
                      styles.checkbox,
                      current.fabricSoftener && styles.checkboxChecked
                    ]}
                  />
                  <Text style={styles.checkboxLabel}>Use Fabric Softener</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Special Instructions</Text>
                <TextInput
                  style={styles.textarea}
                  placeholder='Any notes?'
                  value={current.specialInstructions}
                  onChangeText={t => handleChange('specialInstructions', t)}
                  multiline
                />

                <TouchableOpacity
                  style={styles.nextBtn}
                  onPress={goToReview}
                  activeOpacity={0.8}
                >
                  <Text style={styles.nextBtnText}>
                    Next: Review & Location
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.sectionTitle}>Review & Location</Text>
                <Text style={styles.reviewText}>
                  Item: {current.quantity} × {current.item}
                </Text>
                <Text style={styles.reviewText}>
                  Detergent: {current.detergent || 'Standard'}
                </Text>
                <Text style={styles.reviewText}>
                  Fabric Softener: {current.fabricSoftener ? 'Yes' : 'No'}
                </Text>
                {current.specialInstructions ? (
                  <Text style={styles.reviewText}>
                    Notes: {current.specialInstructions}
                  </Text>
                ) : null}

                <Text style={styles.label}>Pickup Location</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Where to pick up?'
                  value={current.pickupLocation}
                  onChangeText={t => handleChange('pickupLocation', t)}
                />

                <Text style={styles.label}>Dropoff Location (optional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Where to return?'
                  value={current.dropoffLocation}
                  onChangeText={t => handleChange('dropoffLocation', t)}
                />

                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={handleSubmit}
                  activeOpacity={0.8}
                >
                  <Text style={styles.submitBtnText}>Submit Request</Text>
                </TouchableOpacity>
              </>
            )}
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
  label: {
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#D1D1D6',
    borderRadius: 4,
    marginRight: 8
  },
  checkboxChecked: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  checkboxLabel: { fontSize: 14, color: '#1C1C1E' },
  nextBtn: {
    marginTop: 14,
    backgroundColor: '#FF9500',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3
  },
  nextBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
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
  reviewText: { fontSize: 14, color: '#3A3A3C', marginTop: 4 },
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
  requestTitle: { fontSize: 16, fontWeight: '600', color: '#1C1C1E' },
  requestDetail: { fontSize: 13, color: '#3A3A3C', marginTop: 4 },
  requestInstructions: { fontSize: 13, color: '#3A3A3C', marginTop: 6 }
})
