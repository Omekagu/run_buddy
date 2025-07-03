import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useEffect, useRef } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

export default function StepSubmit () {
  const router = useRouter()
  const scaleAnim = useRef(new Animated.Value(0)).current
  const opacityAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      })
    ]).start()
  }, [scaleAnim, opacityAnim])

  return (
    <View style={styles.outer}>
      <View style={styles.card}>
        <Animated.View
          style={[
            styles.animatedCircle,
            { transform: [{ scale: scaleAnim }], opacity: opacityAnim }
          ]}
        >
          <Ionicons name='checkmark-circle-outline' size={86} color='#1ec773' />
        </Animated.View>
        <Text style={styles.title}>Registration Complete!</Text>
        <Text style={styles.text}>
          Thank you for registering. We will review your information shortly.
        </Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.82}
          onPress={() => router.push('/(tabs)/Home')}
        >
          <Text style={styles.buttonText}>Finish</Text>
          <Ionicons
            name='arrow-forward'
            size={22}
            color='#fff'
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7fff7'
  },
  card: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 22,
    padding: 36,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 15,
    elevation: 7
  },
  animatedCircle: {
    marginBottom: 20
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1ec773',
    marginBottom: 12,
    letterSpacing: 0.5,
    textAlign: 'center'
  },
  text: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 32
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#1ec773',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    letterSpacing: 0.3
  }
})
