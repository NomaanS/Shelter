import React, { useContext } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { AuthContext } from '../_layout';

export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;

  const featuredProperties = [
    {
      id: '1',
      title: 'Luxury Beach House',
      location: 'Malibu, CA',
      price: '$250/night',
      image: 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80'
    },
    {
      id: '2',
      title: 'Mountain Cabin',
      location: 'Aspen, CO',
      price: '$180/night',
      image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80'
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <ThemedText style={styles.welcomeTitle}>
            Welcome{user ? `, ${user.displayName || 'Guest'}` : ''}!
          </ThemedText>
          <ThemedText style={styles.welcomeSubtitle}>
            Find your perfect stay
          </ThemedText>
        </View>

        {/* Featured Properties */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Featured Properties</ThemedText>
            <TouchableOpacity onPress={() => router.push('/properties')}>
              <ThemedText style={styles.seeAllText}>See All</ThemedText>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredListContainer}
          >
            {featuredProperties.map((property) => (
              <TouchableOpacity 
                key={property.id}
                style={[styles.featuredItem, { width: screenWidth * 0.75 }]}
                onPress={() => router.push(`/properties/${property.id}`)}
              >
                <Image 
                  source={{ uri: property.image }} 
                  style={styles.featuredImage} 
                  resizeMode="cover"
                />
                <View style={styles.featuredInfo}>
                  <ThemedText style={styles.featuredTitle}>{property.title}</ThemedText>
                  <ThemedText style={styles.featuredLocation}>{property.location}</ThemedText>
                  <ThemedText style={styles.featuredPrice}>{property.price}</ThemedText>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Links */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Quick Links</ThemedText>
          <View style={styles.quickLinks}>
            <TouchableOpacity 
              style={styles.quickLinkItem}
              onPress={() => router.push('/properties')}
            >
              <View style={styles.quickLinkIcon}>
                <ThemedText style={styles.quickLinkIconText}>🏠</ThemedText>
              </View>
              <ThemedText style={styles.quickLinkText}>Properties</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickLinkItem}
              onPress={() => router.push('/bookings')}
            >
              <View style={styles.quickLinkIcon}>
                <ThemedText style={styles.quickLinkIconText}>📅</ThemedText>
              </View>
              <ThemedText style={styles.quickLinkText}>Bookings</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickLinkItem}
              onPress={() => router.push('/explore')}
            >
              <View style={styles.quickLinkIcon}>
                <ThemedText style={styles.quickLinkIconText}>🔍</ThemedText>
              </View>
              <ThemedText style={styles.quickLinkText}>Explore</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  welcomeSection: {
    marginBottom: 25,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#4a90e2',
    fontWeight: '500',
  },
  featuredListContainer: {
    paddingRight: 20,
  },
  featuredItem: {
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 180,
  },
  featuredInfo: {
    padding: 15,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  featuredLocation: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  featuredPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a90e2',
  },
  quickLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickLinkItem: {
    alignItems: 'center',
    width: '30%',
  },
  quickLinkIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickLinkIconText: {
    fontSize: 24,
  },
  quickLinkText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
