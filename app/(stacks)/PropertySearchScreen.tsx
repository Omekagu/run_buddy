import React from 'react'
import { ScrollView } from 'react-native'
import PropertySearchCard from '../components/PropertySearchCard'

export const propertyListWide = [
  {
    image: 'https://images.pexels.com/photos/2098913/pexels-photo-2098913.jpeg',
    title: 'Sports Proof',
    address: '59539 Crist Mount - Yogyakarta',
    beds: 4,
    garages: 1,
    baths: 2,
    price: '32',
    rating: '4.9'
  },
  {
    image: 'https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg0',
    title: 'Modern Villa',
    address: '2201 Palm St - Los Angeles',
    beds: 5,
    garages: 2,
    baths: 4,
    price: '45',
    rating: '4.8'
  },
  {
    image: 'https://images.pexels.com/photos/453201/pexels-photo-453201.jpeg',
    title: 'Urban Flat',
    address: '11 Market Ave - New York',
    beds: 2,
    garages: 0,
    baths: 1,
    price: '21',
    rating: '4.7'
  },
  {
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    title: 'Family Home',
    address: '85 Family Rd - Houston',
    beds: 3,
    garages: 1,
    baths: 2,
    price: '28',
    rating: '4.6'
  },
  {
    image: 'https://images.pexels.com/photos/275484/pexels-photo-275484.jpeg',
    title: 'Lake House',
    address: '799 Lake View - Austin',
    beds: 4,
    garages: 1,
    baths: 2,
    price: '39',
    rating: '4.8'
  },
  {
    image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg',
    title: 'Studio Loft',
    address: '17 Loft St - Chicago',
    beds: 1,
    garages: 0,
    baths: 1,
    price: '19',
    rating: '4.5'
  },
  {
    image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg',
    title: 'Eco Home',
    address: '52 Green Way - Portland',
    beds: 3,
    garages: 1,
    baths: 2,
    price: '31',
    rating: '4.9'
  },
  {
    image: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg',
    title: 'Penthouse',
    address: '1100 Sky Ave - Miami',
    beds: 6,
    garages: 3,
    baths: 5,
    price: '89',
    rating: '5.0'
  },
  {
    image: 'https://images.pexels.com/photos/2155202/pexels-photo-2155202.jpeg',
    title: 'Cottage',
    address: '2 Old Mill - Boston',
    beds: 2,
    garages: 1,
    baths: 1,
    price: '23',
    rating: '4.4'
  },
  {
    image: 'https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg',
    title: 'Garden House',
    address: '4 Garden Lane - San Diego',
    beds: 3,
    garages: 1,
    baths: 2,
    price: '34',
    rating: '4.7'
  }
]

const PropertySearchScreen = () => {
  return (
    <ScrollView
      style={{ padding: 16, marginTop: 30 }}
      contentContainerStyle={{ gap: 16 }}
    >
      {propertyListWide.map((property, idx) => (
        <PropertySearchCard key={idx} {...property} />
      ))}
    </ScrollView>
  )
}
export default PropertySearchScreen

// const styles = StyleSheet.create({
