import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

const { width } = Dimensions.get('window')

export default function StepFacial ({ onNext, onBack }) {
  const scale = React.useRef(new Animated.Value(1)).current

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.92,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad)
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        tension: 120,
        useNativeDriver: true
      })
    ]).start()
  }

  const handleTakeSelfie = () => {
    animateButton()
    setTimeout(() => {
      // Here, you would launch the camera and verify facial identity.
      onNext()
    }, 200)
  }

  return (
    <View style={styles.outer}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Ionicons name='camera-outline' size={38} color='#000' />
        </View>
        <Text style={styles.title}>Facial Verification</Text>
        <Text style={styles.subtitle}>
          Please take a clear selfie to verify your identity.
        </Text>

        <Animated.View
          style={[styles.animatedBtnWrapper, { transform: [{ scale }] }]}
        >
          <TouchableOpacity
            style={styles.bigBtn}
            activeOpacity={0.8}
            onPress={handleTakeSelfie}
          >
            <Ionicons
              name='camera'
              size={22}
              color='#fff'
              style={{ marginRight: 10 }}
            />
            <Text style={styles.bigBtnText}>Take Selfie</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.buttonAlt} onPress={onBack}>
            <Ionicons name='arrow-back' size={20} color='#000' />
            <Text style={styles.buttonTextAlt}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onNext}>
            <Text style={styles.buttonText}>Skip</Text>
            <Ionicons
              name='arrow-forward'
              size={20}
              color='#fff'
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    minHeight: 340,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.87)',
    padding: 28,
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
    padding: 18,
    borderRadius: 999,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#c8e1fa'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 6,
    letterSpacing: 0.5
  },
  subtitle: {
    color: '#555',
    fontSize: 15,
    marginBottom: 30,
    textAlign: 'center'
  },
  animatedBtnWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32
  },
  bigBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 30,
    paddingVertical: 18,
    paddingHorizontal: 42,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.21,
    shadowRadius: 15,
    elevation: 5
  },
  bigBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    letterSpacing: 0.5
  },
  btnRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 8
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
