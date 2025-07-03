import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

const cryptos = [
  {
    name: 'Bitcoin',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    network: 'BTC'
  },
  {
    name: 'Ethereum',
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    network: 'ERC-20'
  },
  {
    name: 'USDT (TRC-20)',
    address: 'TSs6hD2p7nYxxwWr9Lr7H8oKkS6J7KJjvU',
    network: 'TRC-20'
  }
]

export default function CryptocurrencyScreen () {
  const [step, setStep] = useState(1) // 1: show/copy, 2: upload, 3: loading, 4: success
  const [copiedIdx, setCopiedIdx] = useState(null)

  const handleCopy = (text, idx) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text)
    }
    setCopiedIdx(idx)
    setTimeout(() => setStep(2), 900)
  }

  const handleUploadProof = () => {
    setStep(3)
    setTimeout(() => {
      setStep(4)
      setTimeout(() => {
        router.replace('/(tabs)/HistoryScreen')
      }, 4100)
    }, 1700)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {step === 1 && (
          <>
            <Text style={styles.title}>Cryptocurrency Deposit</Text>
            <Text style={styles.subtitle}>
              Choose a cryptocurrency below and send your deposit to the
              displayed address. Click the copy icon to copy the wallet address,
              then proceed to upload your payment proof.
            </Text>
            {cryptos.map((item, idx) => (
              <View key={idx} style={styles.card}>
                <Text style={styles.cryptoName}>{item.name}</Text>
                <Text style={styles.label}>Network</Text>
                <Text style={styles.value}>{item.network}</Text>
                <Text style={styles.label}>Wallet Address</Text>
                <View style={styles.copyRow}>
                  <Text
                    style={[
                      styles.value,
                      {
                        flex: 1,
                        fontSize: 14,
                        marginRight: 10
                      }
                    ]}
                    numberOfLines={1}
                    ellipsizeMode='middle'
                  >
                    {item.address}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleCopy(item.address, idx)}
                  >
                    <Ionicons name='copy-outline' size={20} color='#fc8403' />
                  </TouchableOpacity>
                </View>
                {copiedIdx === idx && (
                  <Text style={styles.copiedMsg}>
                    Copied! Proceed to upload proof.
                  </Text>
                )}
              </View>
            ))}
          </>
        )}

        {step === 2 && (
          <View style={styles.centered}>
            <Text style={styles.title}>Upload Proof of Payment</Text>
            <Text style={styles.subtitle}>
              Please upload your payment proof or screenshot. Our team will
              verify and process your deposit.
            </Text>
            <TouchableOpacity style={styles.uploadBox}>
              <Ionicons name='cloud-upload-outline' size={38} color='#fc8403' />
              <Text
                style={{
                  color: '#fc8403',
                  marginTop: 10,
                  fontSize: 16,
                  fontWeight: '600'
                }}
              >
                Choose File
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.proofBtn}
              onPress={handleUploadProof}
            >
              <Text style={styles.proofBtnText}>Submit Proof</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 3 && (
          <View style={styles.centered}>
            <ActivityIndicator
              size='large'
              color='#fc8403'
              style={{ marginBottom: 24 }}
            />
            <Text style={styles.title}>Processing...</Text>
            <Text style={styles.subtitle}>
              Please wait while we process your submission.
            </Text>
          </View>
        )}

        {step === 4 && (
          <View style={styles.centered}>
            <Ionicons
              name='checkmark-circle-outline'
              size={60}
              color='#1bc47d'
              style={{ marginBottom: 18 }}
            />
            <Text style={styles.title}>Congratulations!</Text>
            <Text style={styles.subtitle}>
              Your proof of payment has been submitted successfully.
              Congratulations on your house hunt down!{'\n\n'}Wait, while You
              are been redirected to your transaction history.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fb',
    flex: 1,
    height: '100%'
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
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    marginHorizontal: 10
  },
  cryptoName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  label: {
    fontSize: 12,
    color: '#888'
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222'
  },
  copyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 2
  },
  copiedMsg: {
    color: '#00b74a',
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600'
  },
  proofBtn: {
    marginTop: 30,
    backgroundColor: '#fc8403',
    padding: 14,
    borderRadius: 4,
    alignItems: 'center'
  },
  proofBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 46,
    paddingHorizontal: 10
  },
  uploadBox: {
    backgroundColor: '#f2f6fa',
    borderWidth: 1.5,
    borderColor: '#fc840355',
    borderStyle: 'dashed',
    borderRadius: 11,
    width: 170,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10
  }
})
