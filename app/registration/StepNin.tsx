import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

const { width } = Dimensions.get('window')

export default function StepNin ({
  onNext,
  onBack
}: {
  onNext: () => void
  onBack: () => void
}) {
  const [nin, setNin] = useState('')
  const [error, setError] = useState('')

  const handleNext = () => {
    if (nin.length !== 11) {
      setError('NIN must be exactly 11 digits')
      return
    }
    setError('')
    onNext()
  }

  return (
    <KeyboardAvoidingView
      style={styles.outer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <LinearGradient
        colors={['#fff6e6', '#d2e6fa']}
        style={styles.bgGradient}
      />
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Ionicons name='card-outline' size={32} color='#fc8403' />
        </View>
        <Text style={styles.title}>NIN Verification</Text>
        <Text style={styles.subtitle}>
          Enter your National Identification Number
        </Text>
        <TextInput
          style={styles.input}
          placeholder='Enter NIN'
          placeholderTextColor='#b0b0b0'
          keyboardType='number-pad'
          value={nin}
          onChangeText={text => {
            setNin(text.replace(/[^0-9]/g, '').slice(0, 11))
            setError('')
          }}
          maxLength={11}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.button} onPress={onBack}>
            <LinearGradient
              colors={['#f5f5f5', '#ebebeb']}
              style={styles.btnGradient}
            >
              <Ionicons
                name='arrow-back'
                size={20}
                color='#fc8403'
                style={{ marginRight: 6 }}
              />
              <Text style={styles.buttonTextAlt}>Back</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <LinearGradient
              colors={['#fc8403', '#3fd0b3']}
              style={styles.btnGradient}
            >
              <Text style={styles.buttonText}>Next</Text>
              <Ionicons
                name='arrow-forward'
                size={20}
                color='#fff'
                style={{ marginLeft: 6 }}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bgGradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1
  },
  card: {
    width: width * 0.92,
    minHeight: 340,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.85)',
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 15,
    elevation: 7,
    marginTop: -60
  },
  iconCircle: {
    backgroundColor: '#e3f1ff',
    padding: 18,
    borderRadius: 999,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#c8e1fa'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fc8403',
    marginBottom: 6,
    letterSpacing: 0.5
  },
  subtitle: {
    color: '#555',
    fontSize: 14,
    marginBottom: 22,
    textAlign: 'center'
  },
  input: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.4,
    borderColor: '#fc8403',
    backgroundColor: 'rgba(229,241,255,0.6)',
    fontSize: 18,
    color: '#222',
    letterSpacing: 2,
    marginBottom: 8
  },
  error: {
    color: '#ff4a4a',
    fontWeight: '600',
    marginBottom: 5
  },
  btnRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 32,
    justifyContent: 'space-between'
  },
  button: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 10,
    overflow: 'hidden'
  },
  btnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderRadius: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  buttonTextAlt: {
    color: '#fc8403',
    fontWeight: 'bold',
    fontSize: 18
  }
})
