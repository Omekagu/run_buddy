import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'

export default function StepProgressBar ({ steps, currentStep }) {
  return (
    <SafeAreaView style={styles.overlayContainer}>
      <StatusBar barStyle='dark-content' />
      <View style={styles.barContainer}>
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep
          const isActive = idx === currentStep
          const isLast = idx === steps.length - 1
          return (
            <React.Fragment key={step.label}>
              <View style={styles.stepContainer}>
                <View
                  style={[
                    styles.circle,
                    isCompleted && styles.circleCompleted,
                    isActive && styles.circleActive
                  ]}
                >
                  {isCompleted ? (
                    <Ionicons name='checkmark' size={18} color='#1ec773' />
                  ) : (
                    <Text
                      style={[
                        styles.stepNumber,
                        isActive && { color: '#fc8403' }
                      ]}
                    >
                      {idx + 1}
                    </Text>
                  )}
                </View>
                <Text
                  style={[
                    styles.stepLabel,
                    isCompleted && styles.labelCompleted,
                    isActive && styles.labelActive
                  ]}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >
                  {step.label}
                </Text>
              </View>
              {!isLast && (
                <View
                  style={[
                    styles.line,
                    isCompleted || isActive
                      ? styles.lineActive
                      : styles.lineInactive
                  ]}
                />
              )}
            </React.Fragment>
          )
        })}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  overlayContainer: {
    margin: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.14,
        shadowRadius: 8
      },
      android: {
        elevation: 7
      }
    })
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  stepContainer: { alignItems: 'center', width: 56 },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4
  },
  circleCompleted: {
    borderColor: '#1ec773',
    backgroundColor: 'rgba(30,199,115,0.08)'
  },
  circleActive: {
    borderColor: '#fc8403',
    backgroundColor: 'rgba(37,131,204,0.08)'
  },
  stepNumber: { fontSize: 14, color: '#aaa', fontWeight: 'bold' },
  stepLabel: {
    fontSize: 12,
    color: '#aaa',
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: 56
  },
  labelCompleted: { color: '#1ec773' },
  labelActive: { color: '#fc8403' },
  line: {
    height: 2,
    flex: 1,
    alignSelf: 'center',
    marginHorizontal: 0,
    minWidth: 22,
    backgroundColor: '#e0e0e0'
  },
  lineActive: { backgroundColor: '#1ec773' },
  lineInactive: { backgroundColor: '#e0e0e0' }
})
