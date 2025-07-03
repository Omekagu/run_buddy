import { Feather, FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

export default function WriteReviewScreen () {
  const [review, setReview] = useState('')
  const maxChars = 400

  const handleUpload = () => {
    alert('Upload tapped!')
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <FontAwesome name='angle-left' size={36} color='#222' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Write a Review</Text>
        <View style={{ width: 28 }} /> {/* For symmetry */}
      </View>

      {/* Product Info */}
      <ScrollView>
        <View style={styles.productRow}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg'
            }}
            style={styles.productImg}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.productTitle}>Elegushin mansion</Text>
            <Text style={styles.productDesc}>
              Luxurious mansion with modern amenities, located in the heart of
              the city of San Francisco.
            </Text>
          </View>
        </View>

        {/* Upload */}
        <Text style={styles.sectionLabel}>Add Photo or Video</Text>
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={handleUpload}
          activeOpacity={0.7}
        >
          <Feather name='upload-cloud' size={28} color='#888' />
          <Text style={styles.uploadText}>Click here to upload</Text>
        </TouchableOpacity>

        {/* Review Input */}
        <Text style={styles.sectionLabel}>Write your Review</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder='Would you like to write anything about this product?'
            placeholderTextColor='#aaa'
            multiline
            value={review}
            onChangeText={text => text.length <= maxChars && setReview(text)}
            maxLength={maxChars}
          />
          <Text style={styles.charCount}>
            {maxChars - review.length} characters remaining
          </Text>
        </View>
      </ScrollView>
      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn}>
        <Text style={styles.submitBtnText}>Submit Review</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    borderBottomWidth: 0.5,
    borderColor: '#EEE'
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222'
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 18,
    marginHorizontal: 16,
    marginBottom: 18,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 12
  },
  productImg: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#eee'
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#232323'
  },
  productDesc: {
    color: '#777',
    fontSize: 13,
    marginTop: 2
  },
  sectionLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#232323',
    marginLeft: 16,
    marginTop: 18,
    marginBottom: 8
  },
  uploadBox: {
    marginHorizontal: 16,
    backgroundColor: '#f3f3f3',
    borderRadius: 9,
    minHeight: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.3,
    borderStyle: 'dashed',
    borderColor: '#e0e0e0'
  },
  uploadText: {
    marginTop: 8,
    color: '#888',
    fontSize: 15
  },
  input: {
    minHeight: 100,
    marginHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    padding: 14,
    fontSize: 15,
    color: '#222',
    textAlignVertical: 'top'
  },
  charCount: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 4,
    color: '#888',
    fontSize: 12
  },
  submitBtn: {
    marginTop: 32,
    backgroundColor: '#fc8403',
    marginHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17
  }
})
