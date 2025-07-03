import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

const reviewSummary = {
  total: 23,
  average: 4.0,
  breakdown: {
    excellent: 20,
    good: 6,
    average: 3,
    belowAverage: 1,
    poor: 1
  }
}

const reviews = [
  {
    id: '1',
    name: 'Joan Perkins',
    rating: 5.0,
    date: '1 days ago',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    review:
      'This chair is a great addition for any room in your home, not only just the living room. Featuring a mid-century design with modern available on the market. However, and with that said, if you are like most people in the...'
  },
  {
    id: '2',
    name: 'Frank Garrett',
    rating: 4.0,
    date: '4 days ago',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    review:
      'Suspendisse potenti. Nullam tincidunt lacus tellus, aliquam est vehicula a. Pellentesque consectetur condimentum nulla, eleifend condimentum purus.'
  },
  {
    id: '3',
    name: 'Randy Palmer',
    rating: 4.0,
    date: '1 month ago',
    avatar: 'https://randomuser.me/api/portraits/men/92.jpg',
    review:
      'Aenean ante nisi, gravida non mattis semper, varius et arcu. Etiam et sem porta, hendrerit dui ac, scelerisque mauris.'
  },
  {
    id: '4',
    name: 'Randy Palmer',
    rating: 4.0,
    date: '1 month ago',
    avatar: 'https://randomuser.me/api/portraits/men/92.jpg',
    review:
      'Aenean ante nisi, gravida non mattis semper, varius et arcu. Etiam et sem porta, hendrerit dui ac, scelerisque mauris.'
  },
  {
    id: '5',
    name: 'Randy Palmer',
    rating: 4.0,
    date: '1 month ago',
    avatar: 'https://randomuser.me/api/portraits/men/92.jpg',
    review:
      'Aenean ante nisi, gravida non mattis semper, varius et arcu. Etiam et sem porta, hendrerit dui ac, scelerisque mauris.'
  },
  {
    id: '6',
    name: 'Randy Palmer',
    rating: 4.0,
    date: '1 month ago',
    avatar: 'https://randomuser.me/api/portraits/men/92.jpg',
    review:
      'Aenean ante nisi, gravida non mattis semper, varius et arcu. Etiam et sem porta, hendrerit dui ac, scelerisque mauris.'
  },
  {
    id: '7',
    name: 'Randy Palmer',
    rating: 4.0,
    date: '1 month ago',
    avatar: 'https://randomuser.me/api/portraits/men/92.jpg',
    review:
      'Aenean ante nisi, gravida non mattis semper, varius et arcu. Etiam et sem porta, hendrerit dui ac, scelerisque mauris.'
  }
]

function getBarColor (type: string) {
  switch (type) {
    case 'excellent':
      return '#2ecc40'
    case 'good':
      return '#27ae60'
    case 'average':
      return '#f4d03f'
    case 'belowAverage':
      return '#f5b041'
    case 'poor':
      return '#e74c3c'
    default:
      return '#e0e0e0'
  }
}

function getBarWidth (count: number, total: number) {
  if (total === 0) return '0%'
  return `${(count / total) * 80}%`
}

export default function ReviewScreen () {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name='angle-left' size={36} color='#222' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reviews</Text>
        <TouchableOpacity>
          <FontAwesome name='question-circle-o' size={22} color='#222' />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Average Score */}
        <View style={styles.avgContainer}>
          <Text style={styles.avgScore}>
            {reviewSummary.average.toFixed(1)}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 6 }}>
            {[1, 2, 3, 4, 5].map(i => (
              <FontAwesome
                key={i}
                name={
                  reviewSummary.average >= i
                    ? 'star'
                    : reviewSummary.average >= i - 0.5
                    ? 'star-half-empty'
                    : 'star-o'
                }
                color='#FFD600'
                size={22}
              />
            ))}
          </View>
          <Text style={styles.avgSubtitle}>
            based on {reviewSummary.total} reviews
          </Text>
        </View>

        {/* Breakdown Bars */}
        <View style={styles.breakdown}>
          {[
            { label: 'Excellent', key: 'excellent' },
            { label: 'Good', key: 'good' },
            { label: 'Average', key: 'average' },
            { label: 'Below Average', key: 'belowAverage' },
            { label: 'Poor', key: 'poor' }
          ].map(row => (
            <View key={row.key} style={styles.breakRow}>
              <Text style={styles.breakLabel}>{row.label}</Text>
              <View style={styles.breakBarBg}>
                <View
                  style={[
                    styles.breakBar,
                    {
                      width: getBarWidth(
                        reviewSummary.breakdown[
                          row.key as keyof typeof reviewSummary.breakdown
                        ],
                        reviewSummary.total
                      ) as string,
                      backgroundColor: getBarColor(row.key)
                    }
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Reviews */}
        <FlatList
          data={reviews}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.reviewItem}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />

              {/* Review Content */}
              <View style={{ flex: 1, marginLeft: 10 }}>
                <View
                  style={{ flex: 1, flexDirection: 'row', marginBottom: 4 }}
                >
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      marginBottom: 2
                    }}
                  >
                    <Text style={styles.name}>{item.name}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: 6,
                        marginRight: 0
                      }}
                    >
                      {[1, 2, 3, 4, 5].map(i => (
                        <FontAwesome
                          key={i}
                          name={
                            item.rating >= i
                              ? 'star'
                              : item.rating >= i - 0.5
                              ? 'star-half-empty'
                              : 'star-o'
                          }
                          color='#FFD600'
                          size={15}
                        />
                      ))}
                      <Text style={styles.ratingNum}>
                        {item.rating.toFixed(1)}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.date}>{item.date}</Text>
                  </View>
                </View>
                {/* Review Text */}
                <Text style={styles.reviewText} numberOfLines={3}>
                  {item.review}
                </Text>
              </View>
            </View>
          )}
        />
      </ScrollView>
      {/* Write a Review Button */}
      <TouchableOpacity
        style={styles.writeBtn}
        onPress={() => router.push('/(stacks)/WriteReviewScreen')}
      >
        <Text style={styles.writeBtnText}>Leave a Review</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderColor: '#EEE'
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 19,
    color: '#222'
  },
  avgContainer: {
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 18
  },
  avgScore: {
    fontWeight: 'bold',
    fontSize: 44,
    color: '#222'
  },
  avgSubtitle: {
    marginTop: 4,
    color: '#888',
    fontSize: 15
  },
  breakdown: {
    marginHorizontal: 16,
    marginVertical: 12
  },
  breakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3
  },
  breakLabel: {
    width: 78,
    fontSize: 14,
    color: '#666',
    fontWeight: '700',
    letterSpacing: 0.5
  },
  breakBarBg: {
    flex: 1,
    height: 15,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 2
  },
  breakBar: {
    height: 15,
    borderRadius: 4
  },
  reviewItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderWidth: 0.5,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginTop: 20
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
    marginRight: 5
  },
  date: {
    fontSize: 13,
    color: '#aaa',
    marginLeft: 7
  },
  reviewText: {
    color: '#444',
    fontSize: 14,
    marginTop: 2
  },
  ratingNum: {
    marginLeft: 6,
    color: '#222',
    fontWeight: 'bold',
    fontSize: 13
  },
  writeBtn: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 57,
    marginHorizontal: 16,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: '#fc8403',
    alignItems: 'center',
    justifyContent: 'center'
  },
  writeBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1
  }
})
