import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

const ID_TYPES = [
  {
    key: 'nin',
    label: 'NIN',
    icon: 'card-outline',
    placeholder: 'Enter NIN',
    maxLength: 11,
    keyboardType: 'number-pad'
  },
  {
    key: 'passport',
    label: 'International Passport',
    icon: 'airplane-outline',
    placeholder: 'Enter Passport Number',
    maxLength: 9,
    keyboardType: 'default'
  },
  {
    key: 'driver',
    label: 'Driver’s License',
    icon: 'car-outline',
    placeholder: 'Enter Driver’s License Number',
    maxLength: 16,
    keyboardType: 'default'
  },
  {
    key: 'voter',
    label: 'Voter’s Card',
    icon: 'id-card-outline',
    placeholder: 'Enter Voter’s Card Number',
    maxLength: 16,
    keyboardType: 'default'
  }
]

export default function StepIdentification ({ onNext, onBack }) {
  const [selected, setSelected] = useState(ID_TYPES[0])
  const [idValue, setIdValue] = useState('')
  const [error, setError] = useState('')
  const [dropdownVisible, setDropdownVisible] = useState(false)

  const handleNext = () => {
    if (!idValue) {
      setError('Please enter your ' + selected.label.toLowerCase())
      return
    }
    if (selected.key === 'nin' && idValue.length !== 11) {
      setError('NIN must be exactly 11 digits')
      return
    }
    // Add more validation for other types if needed
    setError('')
    onNext({ idType: selected.key, idValue })
  }

  const handleSelectType = type => {
    setSelected(type)
    setIdValue('')
    setError('')
    setDropdownVisible(false)
  }

  return (
    <KeyboardAvoidingView
      style={styles.outer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Means of Identification</Text>

        {/* Dropdown Selector */}
        <TouchableOpacity
          style={styles.dropdownSelector}
          onPress={() => setDropdownVisible(true)}
        >
          <Ionicons
            name={selected.icon}
            size={20}
            color='#000'
            style={{ marginRight: 7 }}
          />
          <Text style={styles.dropdownLabel}>{selected.label}</Text>
          <Ionicons
            name='chevron-down'
            size={20}
            color='#000'
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>

        <Modal
          visible={dropdownVisible}
          animationType='fade'
          transparent
          onRequestClose={() => setDropdownVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setDropdownVisible(false)}
          >
            <View style={styles.dropdownMenu}>
              <FlatList
                data={ID_TYPES}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.dropdownItem,
                      selected.key === item.key && styles.dropdownItemActive
                    ]}
                    onPress={() => handleSelectType(item)}
                  >
                    <Ionicons
                      name={item.icon}
                      size={18}
                      color={selected.key === item.key ? '#000' : '#888'}
                      style={{ marginRight: 10 }}
                    />
                    <Text
                      style={[
                        styles.dropdownItemLabel,
                        selected.key === item.key && {
                          color: '#000',
                          fontWeight: 'bold'
                        }
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Input Field */}
        <TextInput
          style={styles.input}
          placeholder={selected.placeholder}
          placeholderTextColor='#b0b0b0'
          keyboardType={selected.keyboardType}
          value={idValue}
          onChangeText={text => {
            let val = text
            if (selected.key === 'nin')
              val = text.replace(/[^0-9]/g, '').slice(0, 11)
            setIdValue(val)
            setError('')
          }}
          maxLength={selected.maxLength}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.buttonAlt} onPress={onBack}>
            <Ionicons name='arrow-back' size={20} color='#000' />
            <Text style={styles.buttonTextAlt}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
            <Ionicons
              name='arrow-forward'
              size={20}
              color='#fff'
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 18,
    padding: 24,
    width: '94%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 18,
    textAlign: 'center'
  },
  dropdownSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: '#000',
    backgroundColor: '#f6faff',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 18
  },
  dropdownLabel: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropdownMenu: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.11,
    shadowRadius: 13,
    elevation: 8
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 16
  },
  dropdownItemActive: {
    backgroundColor: '#e6f2fa'
  },
  dropdownItemLabel: {
    fontSize: 15,
    color: '#555'
  },
  input: {
    width: '100%',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1.2,
    borderColor: '#000',
    backgroundColor: '#f7fbff',
    fontSize: 16,
    color: '#222',
    letterSpacing: 1.2,
    marginTop: 8,
    marginBottom: 2
  },
  error: { color: '#ff4a4a', fontWeight: '600', marginBottom: 5, marginTop: 2 },
  btnRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 24,
    justifyContent: 'space-between'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 9,
    paddingVertical: 12,
    paddingHorizontal: 26
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 17 },
  buttonAlt: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#edf7ff',
    borderRadius: 9,
    paddingVertical: 12,
    paddingHorizontal: 21
  },
  buttonTextAlt: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 5
  }
})
