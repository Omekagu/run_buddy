import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

type PaymentMethod = {
  id: string
  type: 'Card' | 'Bank' | 'Crypto'
  details: string
}

export default function ManagePaymentScreen () {
  const [methods, setMethods] = useState<PaymentMethod[]>([
    { id: '1', type: 'Card', details: 'Visa **** 4242' },
    { id: '2', type: 'Bank', details: 'GTBank **** 7890' },
    { id: '3', type: 'Crypto', details: 'TrustWallet (BNB)' }
  ])

  const removeMethod = (id: string) => {
    Alert.alert('Remove Payment Method', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Remove',
        onPress: () => setMethods(prev => prev.filter(item => item.id !== id)),
        style: 'destructive'
      }
    ])
  }

  const renderIcon = (type: string) => {
    switch (type) {
      case 'Card':
        return <Ionicons name='card' size={24} color='#444' />
      case 'Bank':
        return <Ionicons name='cash' size={24} color='#444' />
      case 'Crypto':
        return (
          <MaterialCommunityIcons name='currency-eth' size={24} color='#444' />
        )
      default:
        return null
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.title}>Manage Payment Methods</Text> */}

      <FlatList
        data={methods}
        keyExtractor={item => item.id}
        contentContainerStyle={{ gap: 14 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              {renderIcon(item.type)}
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.methodType}>{item.type}</Text>
                <Text style={styles.methodDetails}>{item.details}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeMethod(item.id)}>
              <Ionicons name='trash-outline' size={22} color='red' />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.addBtnText}>+ Add New Method</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9'
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  methodType: {
    fontWeight: 'bold'
  },
  methodDetails: {
    fontSize: 13,
    color: '#555'
  },
  addBtn: {
    marginTop: 30,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    alignItems: 'center'
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})
