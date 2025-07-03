import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import React, { useState } from 'react'

import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

interface PropertyForm {
  name: string
  title: string
  location: string
  facilities: string
  description: string
  email: string
  contact: string
  price: string
}

const CreatePropertyScreen: React.FC = () => {
  const [step, setStep] = useState<number>(1)

  const [form, setForm] = useState<PropertyForm>({
    name: '',
    title: '',
    location: '',
    facilities: '',
    description: '',
    email: '',
    contact: '',
    price: ''
  })

  const [images, setImages] = useState<string[]>([])
  const [videos, setVideos] = useState<string[]>([])
  const [ownershipDoc, setOwnershipDoc] = useState<string | null>(null)
  const [deedDoc, setDeedDoc] = useState<string | null>(null)
  const [facilityInput, setFacilityInput] = useState('')
  const [facilities, setFacilities] = useState<string[]>([])

  const handleAddFacility = () => {
    if (facilityInput.trim() && !facilities.includes(facilityInput.trim())) {
      setFacilities(prev => [...prev, facilityInput.trim()])
      setFacilityInput('')
    }
  }

  const handleRemoveFacility = (index: number) => {
    setFacilities(prev => prev.filter((_, i) => i !== index))
  }

  const handleChange = (key: keyof PropertyForm, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const pickMultipleMedia = async (
    type: 'image' | 'video',
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes:
        type === 'image'
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      quality: 1
    })

    if (!result.canceled) {
      const uris = result.assets.map(file => file.uri)
      setter(prev => [...prev, ...uris])
    }
  }

  const pickDocument = async (
    setter: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1
    })
    if (!result.canceled && result.assets.length > 0) {
      setter(result.assets[0].uri)
    }
  }

  const handleNext = () => {
    if (step === 1) {
      const requiredFields: (keyof PropertyForm)[] = [
        'name',
        'title',
        'location',
        'email',
        'contact',
        'price'
      ]
      const emptyField = requiredFields.find(field => !form[field])
      if (emptyField) {
        return Alert.alert('Error', `${emptyField} is required.`)
      }
    }
    setStep(prev => prev + 1)
  }

  const handleSubmit = () => {
    if (!ownershipDoc || !deedDoc) {
      return Alert.alert('Missing Files', 'Please upload required documents.')
    }

    Alert.alert(
      'Success',
      'Property successfully submitted for review. An Email will be sent to you once it has been approved by our Housing agent team.'
    )
    router.push('/(tabs)/Home')
  }

  const renderInput = (
    label: string,
    key: keyof PropertyForm,
    keyboardType:
      | 'default'
      | 'email-address'
      | 'phone-pad'
      | 'numeric' = 'default'
  ) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={form[key]}
        onChangeText={text => handleChange(key, text)}
        keyboardType={keyboardType}
        style={styles.input}
        placeholder={`Enter ${label}`}
      />
    </View>
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Step {step} of 4</Text>

        {step === 1 && (
          <>
            <Text style={styles.sectionTitle}>Property Details</Text>
            {renderInput('Owner Name', 'name')}
            {renderInput('Property Title', 'title')}
            {renderInput('Location', 'location')}
            {/* {renderInput('Facilities', 'facilities')} */}
            {renderInput('Email', 'email', 'email-address')}
            {renderInput('Phone Number', 'contact', 'phone-pad')}
            {renderInput('Price (₦)', 'price', 'numeric')}
            <Text style={styles.label}>Facilities</Text>
            <View style={styles.facilityInputWrapper}>
              <TextInput
                placeholder='e.g. Swimming Pool'
                value={facilityInput}
                onChangeText={setFacilityInput}
                onSubmitEditing={handleAddFacility}
                style={[styles.input, { flex: 1 }]}
              />
              <TouchableOpacity
                onPress={handleAddFacility}
                style={styles.addBtn}
              >
                <Ionicons name='add-circle-outline' size={24} color='#fc8403' />
              </TouchableOpacity>
            </View>

            <View style={styles.facilitiesContainer}>
              {facilities.map((item, index) => (
                <View key={index} style={styles.facilityTag}>
                  <Text style={styles.facilityText}>{item}</Text>
                  <TouchableOpacity onPress={() => handleRemoveFacility(index)}>
                    <Ionicons name='close' size={16} color='white' />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                value={form.description}
                onChangeText={text => handleChange('description', text)}
                multiline
                numberOfLines={4}
                style={[styles.input, styles.textArea]}
                placeholder='Enter property description'
              />
            </View>
            <TouchableOpacity
              onPress={() => pickMultipleMedia('image', setImages)}
              style={styles.uploadBtn}
            >
              <Text>Upload Images</Text>
            </TouchableOpacity>
            <ScrollView horizontal>
              {images.map((uri, i) => (
                <Image key={i} source={{ uri }} style={styles.thumbnail} />
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => pickMultipleMedia('video', setVideos)}
              style={styles.uploadBtn}
            >
              <Text>Upload Videos</Text>
            </TouchableOpacity>
            {videos.length > 0 && (
              <Text style={styles.fileInfo}>
                Videos selected: {videos.length}
              </Text>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.sectionTitle}>Upload Proof of Ownership</Text>
            <TouchableOpacity
              onPress={() => pickDocument(setOwnershipDoc)}
              style={styles.uploadBtn}
            >
              <Text>Select Document</Text>
            </TouchableOpacity>
            {ownershipDoc && (
              <Text style={styles.fileInfo}>
                {ownershipDoc.split('/').pop()}
              </Text>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.sectionTitle}>Upload Deed of Assignment</Text>
            <TouchableOpacity
              onPress={() => pickDocument(setDeedDoc)}
              style={styles.uploadBtn}
            >
              <Text>Select Document</Text>
            </TouchableOpacity>
            {deedDoc && (
              <Text style={styles.fileInfo}>{deedDoc.split('/').pop()}</Text>
            )}
          </>
        )}

        {step === 4 && (
          <>
            <Text style={styles.sectionTitle}>Face Recognition</Text>
            <TouchableOpacity style={styles.uploadBtn}>
              <Text>Start Face Scan (Coming Soon)</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 12, marginBottom: 10 }}>
              Ensure you are in good light with camera permission granted.
            </Text>
          </>
        )}

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={step < 4 ? handleNext : handleSubmit}
        >
          <Text style={styles.nextBtnText}>{step < 4 ? 'Next' : 'Submit'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreatePropertyScreen

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 14
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  },
  inputGroup: {
    marginBottom: 12
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '500'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  uploadBtn: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 6
  },
  facilityInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  addBtn: {
    marginLeft: 10
  },
  facilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10
  },
  facilityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#61CE70',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20
  },
  facilityText: {
    color: '#fff',
    marginRight: 6
  },
  thumbnail: {
    height: 80,
    width: 80,
    borderRadius: 8,
    marginRight: 8
  },
  fileInfo: {
    fontSize: 12,
    color: '#555',
    marginBottom: 10
  },
  nextBtn: {
    backgroundColor: '#fc8403',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  nextBtnText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})
