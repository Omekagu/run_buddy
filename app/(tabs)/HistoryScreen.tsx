import { useNavigation } from '@react-navigation/native'
import * as Sharing from 'expo-sharing'
import React, { useState } from 'react'
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import RNHTMLtoPDF from 'react-native-html-to-pdf'

const generateReceiptPDF = async house => {
  const htmlContent = `
    <h1>Rental Receipt</h1>
    <p><strong>House Name:</strong> ${house.houseName}</p>
    <p><strong>Location:</strong> ${house.location}</p>
    <p><strong>Rented Period:</strong> ${house.date}</p>
    <p><strong>Amount Paid:</strong> ${house.amount}</p>
    <p><strong>Status:</strong> ${house.status}</p>
  `

  try {
    const file = await RNHTMLtoPDF.convert({
      html: htmlContent,
      fileName: `${house.houseName.replace(/\s+/g, '_')}_Receipt`,
      directory: 'Documents'
    })

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(file.filePath)
    } else {
      alert('Receipt saved to: ' + file.filePath)
    }
  } catch (err) {
    console.log(err)
    alert('Failed to generate PDF.')
  }
}

const allData = [
  {
    id: '1',
    image: 'https://images.pexels.com/photos/323776/pexels-photo-323776.jpeg',
    houseName: 'Sunset Villa',
    location: 'Lekki Phase 1, Lagos',
    date: 'Jan 2024 - Jan 2025',
    amount: '₦2,500,000',
    status: 'Completed'
  },
  {
    id: '2',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    houseName: 'Ocean View Apartment',
    location: 'Victoria Island, Lagos',
    date: '2nd Feb 2024 - Ongoing',
    amount: '₦2,200,000',
    status: 'Ongoing'
  },
  {
    id: '3',
    image: 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg',
    houseName: 'Harmony Court',
    location: 'Gwarinpa, Abuja',
    date: '2022 - 2023',
    amount: '₦1,800,000',
    status: 'Canceled'
  }
]

const tabs = ['Ongoing', 'Completed', 'Canceled']

export default function HouseHistoryScreen () {
  const [activeTab, setActiveTab] = useState('Ongoing')
  const [receiptModal, setReceiptModal] = useState(false)
  const [selectedHouse, setSelectedHouse] = useState(null)
  const navigation = useNavigation()

  const filtered = allData.filter(item => item.status === activeTab)

  const handleRebook = house => {
    navigation.navigate('BookingScreen', { house }) // Make sure 'BookingScreen' is in your stack
  }

  const handleDownloadReceipt = house => {
    setSelectedHouse(house)
    setReceiptModal(true)
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.houseName}>{item.houseName}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.date}>Rented: {item.date}</Text>
        <Text style={styles.amount}>Amount: {item.amount}</Text>
        <Text style={[styles.status, styles[`status${item.status}`]]}>
          {item.status}
        </Text>

        <View style={styles.actions}>
          {item.status === 'Completed' && (
            <TouchableOpacity
              style={styles.receiptBtn}
              onPress={() => generateReceiptPDF(item)}
            >
              <Text style={styles.actionText}>Download Receipt</Text>
            </TouchableOpacity>
          )}
          {item.status !== 'Canceled' && (
            <TouchableOpacity
              style={styles.rebookBtn}
              onPress={() => handleRebook(item)}
            >
              <Text style={styles.actionText}>Rehunt</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Rental History</Text> */}
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filtered.length === 0 ? (
        <Text style={styles.empty}>No records found for {activeTab}</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {/* Receipt Modal */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={receiptModal}
        onRequestClose={() => setReceiptModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Rental Receipt</Text>
            {selectedHouse && (
              <>
                <Text>🏠 {selectedHouse.houseName}</Text>
                <Text>📍 {selectedHouse.location}</Text>
                <Text>📅 {selectedHouse.date}</Text>
                <Text>💰 {selectedHouse.amount}</Text>
                <Text>Status: ✅ {selectedHouse.status}</Text>
              </>
            )}
            <Pressable
              onPress={() => setReceiptModal(false)}
              style={styles.closeModalBtn}
            >
              <Text style={{ color: '#fff' }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    paddingTop: 40,
    paddingHorizontal: 16
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center'
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 8
  },
  activeTab: { backgroundColor: '#fc8403' },
  tabText: { textAlign: 'center', color: '#333' },
  activeTabText: { color: '#fff', fontWeight: 'bold' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    padding: 10,
    elevation: 2
  },
  image: { width: 100, height: '100%', borderRadius: 10 },
  details: { flex: 1, padding: 10 },
  houseName: { fontSize: 16, fontWeight: 'bold' },
  location: { fontSize: 14, color: '#555' },
  date: { fontSize: 13, color: '#777', marginTop: 4 },
  amount: { fontSize: 14, fontWeight: '600', color: '#222', marginTop: 4 },
  status: {
    marginTop: 6,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignSelf: 'flex-start',
    fontSize: 12
  },
  statusOngoing: { backgroundColor: '#FFF3CD', color: '#856404' },
  statusCompleted: { backgroundColor: '#D4EDDA', color: '#155724' },
  statusCanceled: { backgroundColor: '#F8D7DA', color: '#721C24' },
  actions: { flexDirection: 'row', marginTop: 8, gap: 10 },
  rebookBtn: {
    backgroundColor: '#fc8403',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 3
  },
  receiptBtn: {
    backgroundColor: '#007bff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6
  },
  actionText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 14, color: '#888' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '85%',
    alignItems: 'center'
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12
  },
  closeModalBtn: {
    marginTop: 16,
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8
  }
})
