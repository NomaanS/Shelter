import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { db, auth } from '@/constants/firebase/firebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc, getDoc, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Booking, Property } from '@/types/types';
import { useRouter } from 'expo-router';

type BookingWithProperty = Booking & {
  property?: Partial<Property>;
};

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<BookingWithProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!auth.currentUser) {
          router.replace('/(tabs)');
          return;
        }

        const userId = auth.currentUser.uid;
        const bookingsCollection = collection(db, 'bookings');
        const bookingsQuery = query(bookingsCollection, where('userId', '==', userId));
        const bookingsSnapshot = await getDocs(bookingsQuery);

        const bookingsList: BookingWithProperty[] = bookingsSnapshot.docs.map((document: QueryDocumentSnapshot<DocumentData>) => {
          const data = document.data();
          return {
            id: document.id,
            ...data,
            startDate: data.startDate?.toDate() || new Date(),
            endDate: data.endDate?.toDate() || new Date(),
            createdAt: data.createdAt?.toDate() || new Date(),
          } as BookingWithProperty;
        });

        // Fetch property details for each booking
        for (const booking of bookingsList) {
          if (booking.propertyId) {
            const propertyDoc = doc(db, 'properties', booking.propertyId);
            const propertySnapshot = await getDoc(propertyDoc);
            
            if (propertySnapshot.exists()) {
              const propertyData = propertySnapshot.data();
              booking.property = {
                id: propertySnapshot.id,
                title: propertyData.title,
                price: propertyData.price,
                location: propertyData.location,
                images: propertyData.images,
              };
            }
          }
        }

        setBookings(bookingsList);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        Alert.alert('Error', 'Failed to load your bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [router]);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      await updateDoc(bookingRef, {
        status: 'cancelled'
      });

      // Update the local state
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'cancelled' as 'cancelled' } 
            : booking
        )
      );

      Alert.alert('Success', 'Booking cancelled successfully');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      Alert.alert('Error', 'Failed to cancel booking');
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>My Bookings</ThemedText>
      
      {bookings.length === 0 ? (
        <ThemedText style={styles.noBookings}>You have no bookings</ThemedText>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.bookingCard}>
              <ThemedText style={styles.propertyTitle}>
                {item.property?.title || 'Unknown Property'}
              </ThemedText>
              
              <View style={styles.bookingDetails}>
                <ThemedText>From: {formatDate(item.startDate)}</ThemedText>
                <ThemedText>To: {formatDate(item.endDate)}</ThemedText>
                <ThemedText style={styles.price}>
                  Total: ${item.totalPrice}
                </ThemedText>
              </View>
              
              <View style={styles.statusContainer}>
                <ThemedText style={[
                  styles.status,
                  item.status === 'confirmed' ? styles.confirmedStatus :
                  item.status === 'cancelled' ? styles.cancelledStatus :
                  styles.pendingStatus
                ]}>
                  {item.status.toUpperCase()}
                </ThemedText>
                
                {item.status !== 'cancelled' && (
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => handleCancelBooking(item.id)}
                  >
                    <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  noBookings: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  listContent: {
    paddingBottom: 20,
  },
  bookingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bookingDetails: {
    marginBottom: 12,
  },
  price: {
    fontWeight: 'bold',
    marginTop: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    marginTop: 8,
  },
  status: {
    fontWeight: 'bold',
    padding: 6,
    borderRadius: 4,
  },
  pendingStatus: {
    backgroundColor: '#FFF9C4',
    color: '#F57F17',
  },
  confirmedStatus: {
    backgroundColor: '#C8E6C9',
    color: '#2E7D32',
  },
  cancelledStatus: {
    backgroundColor: '#FFCDD2',
    color: '#C62828',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
  },
  cancelButtonText: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
}); 