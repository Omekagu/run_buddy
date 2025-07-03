import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import { Paystack } from 'react-native-paystack-webview'

export default function BankCardScreen () {
  const [paying, setPaying] = useState(false)
  const [step, setStep] = useState(1) //
  const [amount] = useState(500)

  // Show the Paystack form when user presses "Pay with Card"
  const handlePay = () => {
    setPaying(true)
  }

  // Handle the payment result
  const handlePaymentSuccess = () => {
    setStep(2)
    setTimeout(() => {
      setStep(3)
      setTimeout(() => {
        router.replace('/(tabs)/HistoryScreen')
      }, 3000)
    }, 1500)
  }

  return (
    <View style={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.title}>Pay With Your Card</Text>
          <Text style={styles.subtitle}>
            Enter your card details securely to complete your deposit.
          </Text>
          <TouchableOpacity style={styles.payBtn} onPress={handlePay}>
            <Ionicons
              name='card-outline'
              size={22}
              color='#fff'
              style={{ marginRight: 8 }}
            />
            <Text style={styles.payBtnText}>
              Pay ₦{amount.toLocaleString()} With Card
            </Text>
          </TouchableOpacity>
        </>
      )}

      {paying && handlePaymentSuccess()}

      {step === 2 && (
        <View style={styles.centered}>
          <Ionicons
            name='cloud-upload-outline'
            size={60}
            color='#fc8403'
            style={{ marginBottom: 18 }}
          />
          <Text style={styles.title}>Processing Payment...</Text>
          <Text style={styles.subtitle}>
            Please wait while we process your card payment.
          </Text>
        </View>
      )}

      {step === 3 && (
        <View style={styles.centered}>
          <Ionicons
            name='checkmark-circle-outline'
            size={60}
            color='#1bc47d'
            style={{ marginBottom: 18 }}
          />
          <Text style={styles.title}>Congratulations!</Text>
          <Text style={styles.subtitle}>
            Your card payment was successful!{'\n\n'}You will be redirected to
            your transaction history.
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fb',
    flex: 1,
    height: '100%',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a1a1a',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center'
  },
  payBtn: {
    marginTop: 34,
    backgroundColor: '#fc8403',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    minWidth: 180
  },
  payBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 46,
    paddingHorizontal: 10
  }
})
