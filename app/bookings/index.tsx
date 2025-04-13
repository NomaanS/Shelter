import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@utils/firebaseConfig';
import { getAuth } from 'firebase/auth';

interface Booking {
  id: string;
  message: string;
  propertyId: string;
  createdAt: { seconds: number };
}

const BookingsScreen = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    try {
      const q = query(
        collection(db, 'bookings'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Booking[];
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Bookings</Text>
      {bookings.length === 0 ? (
        <Text style={styles.text}>No bookings yet</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.bookingCard}>
              <Text style={styles.text}>Property ID: {item.propertyId}</Text>
              <Text style={styles.text}>Message: {item.message}</Text>
              <Text style={styles.text}>
                Booked At: {new Date(item.createdAt.seconds * 1000).toLocaleString()}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default BookingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  bookingCard: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
});
