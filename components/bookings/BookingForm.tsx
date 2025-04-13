import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import { createBooking } from '@services/bookingService';
import type { Property } from '@utils/types';

interface BookingFormProps {
  property: Property;
}

const BookingForm: React.FC<BookingFormProps> = ({ property }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!name || !email || !phone) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      const bookingData = {
        propertyId: property.id!,
        name,
        email,
        phone,
        message,
        date: new Date().toISOString(),
        time: new Date().toLocaleTimeString(),
      };

      await createBooking(bookingData);
      Alert.alert('Success', 'Booking created successfully!');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      Alert.alert('Error', 'Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Book a Visit</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Message (optional)"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      {loading ? (
        <ActivityIndicator size="large" color="#f4511e" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleBooking}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#9e9e9e',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#f4511e',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingForm;