import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

const { width } = Dimensions.get('window')

export default function StepResidence ({
  onNext,
  onBack,
  accountType
}: {
  onNext: (data: any) => void
  onBack: () => void
  accountType: 'Landlord' | 'Tenant'
}) {
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [docImage, setDocImage] = useState<string | null>(null)
  const [error, setError] = useState('')

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7
    })
    if (!result.canceled && result.assets.length > 0) {
      setDocImage(result.assets[0].uri)
      setError('')
    }
  }

  const handleNext = () => {
    if (
      !address.trim() ||
      !city.trim() ||
      !state.trim() ||
      !postalCode.trim()
    ) {
      setError('Please fill all address fields.')
      return
    }
    if (!docImage) {
      if (accountType === 'Landlord')
        setError('Upload proof of house ownership.')
      else setError('Upload a utility bill (e.g. NEPA bill).')
      return
    }
    setError('')
    onNext({
      address,
      city,
      state,
      postalCode,
      proofType:
        accountType === 'Landlord' ? 'Ownership Document' : 'Utility Bill',
      proofUri: docImage
    })
  }

  return (
    <KeyboardAvoidingView
      style={styles.outer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Ionicons name='home-outline' size={32} color='#000' />
        </View>
        <Text style={styles.title}>Residence Verification</Text>
        <Text style={styles.subtitle}>
          Enter your address and upload a{' '}
          {accountType === 'Landlord'
            ? 'proof of house ownership'
            : 'recent utility bill (e.g. NEPA bill)'}
          .
        </Text>
        <TextInput
          style={styles.input}
          placeholder='Address'
          value={address}
          onChangeText={t => {
            setAddress(t)
            setError('')
          }}
        />
        <View style={styles.row2}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 7 }]}
            placeholder='City'
            value={city}
            onChangeText={t => {
              setCity(t)
              setError('')
            }}
          />
          <TextInput
            style={[styles.input, { flex: 1, marginLeft: 7 }]}
            placeholder='State'
            value={state}
            onChangeText={t => {
              setState(t)
              setError('')
            }}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder='Postal Code'
          value={postalCode}
          onChangeText={t => {
            setPostalCode(t.replace(/[^0-9]/g, '').slice(0, 10))
            setError('')
          }}
          keyboardType='number-pad'
        />

        <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
          <Ionicons name='cloud-upload-outline' size={20} color='#000' />
          <Text style={styles.uploadText}>
            {docImage
              ? 'Change ' +
                (accountType === 'Landlord'
                  ? 'Proof of Ownership'
                  : 'Utility Bill')
              : 'Upload ' +
                (accountType === 'Landlord'
                  ? 'Proof of Ownership'
                  : 'Utility Bill')}
          </Text>
        </TouchableOpacity>
        {docImage && (
          <Image
            source={{ uri: docImage }}
            style={{
              width: 120,
              height: 90,
              borderRadius: 8,
              alignSelf: 'center',
              marginVertical: 7
            }}
            resizeMode='cover'
          />
        )}
        {error ? <Text style={styles.error}>{error}</Text> : null}
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  card: {
    width: width * 0.93,
    minHeight: 400,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.93)',
    padding: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 15,
    elevation: 7,
    marginTop: -30
  },
  iconCircle: {
    backgroundColor: '#e3f1ff',
    padding: 16,
    borderRadius: 999,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#c8e1fa'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
    letterSpacing: 0.5
  },
  subtitle: {
    color: '#555',
    fontSize: 14,
    marginBottom: 14,
    textAlign: 'center'
  },
  input: {
    width: '100%',
    padding: 13,
    borderRadius: 10,
    borderWidth: 1.3,
    borderColor: '#000',
    backgroundColor: 'rgba(229,241,255,0.65)',
    fontSize: 15,
    color: '#222',
    marginBottom: 10
  },
  row2: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#e3f1ff',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 2
  },
  uploadText: {
    marginLeft: 8,
    color: '#000',
    fontSize: 15,
    fontWeight: '600'
  },
  error: {
    color: '#ff4a4a',
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 4,
    textAlign: 'center'
  },
  btnRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 19,
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
