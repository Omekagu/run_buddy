import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

const categories = ['All', 'Fruits', 'Vegetables', 'Snacks', 'Drinks']

const groceryItems = [
  {
    id: '1',
    name: 'Fresh Apples',
    price: '₦1,200',
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg'
  },
  {
    id: '2',
    name: 'Bananas',
    price: '₦800',
    image: 'https://images.pexels.com/photos/208450/pexels-photo-208450.jpeg'
  },
  {
    id: '3',
    name: 'Tomatoes',
    price: '₦1,000',
    image: 'https://images.pexels.com/photos/839727/pexels-photo-839727.jpeg'
  },
  {
    id: '4',
    name: 'Carrots',
    price: '₦600',
    image: 'https://images.pexels.com/photos/65174/pexels-photo-65174.jpeg'
  }
]

export default function GroceryScreen () {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState('All')

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={24} color='#232323' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Grocery</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Banner */}
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/4393661/pexels-photo-4393661.jpeg'
        }}
        style={styles.banner}
      />

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryItem,
              activeCategory === cat && styles.activeCategory
            ]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === cat && styles.activeCategoryText
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Grocery Items */}
      <FlatList
        data={groceryItems}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 16
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardPrice}>{item.price}</Text>
            <TouchableOpacity style={styles.addBtn}>
              <Text style={styles.addBtnText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f6f2'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#232323'
  },
  banner: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 10
  },
  categoryScroll: {
    paddingHorizontal: 16,
    marginBottom: 12
  },
  categoryItem: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#e0dad3',
    borderRadius: 20,
    marginRight: 10
  },
  activeCategory: {
    backgroundColor: '#232323'
  },
  categoryText: {
    color: '#232323',
    fontSize: 13
  },
  activeCategoryText: {
    color: '#fff',
    fontWeight: '600'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 16,
    width: '47%',
    overflow: 'hidden'
  },
  cardImage: {
    width: '100%',
    height: 110
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#232323',
    marginTop: 6,
    paddingHorizontal: 10
  },
  cardPrice: {
    fontSize: 13,
    color: '#666',
    paddingHorizontal: 10,
    marginTop: 2
  },
  addBtn: {
    backgroundColor: '#232323',
    margin: 10,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center'
  },
  addBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600'
  }
})
