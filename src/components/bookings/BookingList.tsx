import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import type { Booking, Property } from '../../utils/types';

interface BookingListProps {
  bookings: Array<Booking & { property?: Property }>;
  loading: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
}

const BookingList: React.FC<BookingListProps> = ({ 
  bookings, 
  loading, 
  onRefresh,
  refreshing = false
}) => {
  if (bookings.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No bookings found</Text>
      </View>
    );
  }

  const renderBookingItem = ({ item }: { item: Booking & { property?: Property } }) => (
    <View style={styles.bookingCard}>
      <View style={styles.header}>
        <Text style={styles.propertyName}>{item.property?.title || 'Property'}</Text>
        <Text style={styles.date}>{item.date} at {item.time}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailLabel}>Name:</Text>
        <Text style={styles.detailValue}>{item.name}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailLabel}>Email:</Text>
        <Text style={styles.detailValue}>{item.email}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailLabel}>Phone:</Text>
        <Text style={styles.detailValue}>{item.phone}</Text>
      </View>
      {item.message && (
        <View style={styles.message}>
          <Text style={styles.detailLabel}>Message:</Text>
          <Text style={styles.messageText}>{item.message}</Text>
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      data={bookings}
      keyExtractor={(item) => item.id || Math.random().toString()}
      renderItem={renderBookingItem}
      onRefresh={onRefresh}
      refreshing={refreshing}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: '#f4511e',
    fontWeight: '500',
  },
  details: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    width: 80,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  message: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  messageText: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
    lineHeight: 20,
  },
});

export default BookingList;