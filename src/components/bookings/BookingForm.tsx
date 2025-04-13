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
import { Property } from '@utils/types';

interface BookingFormProps {
  property: Property;
  onSuccess: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ property, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !phone || !date || !time) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const bookingData = {
        propertyId: property.id!,
        name,
        email,
        phone,
        date,
        time,
        message,
      };

      await createBooking(bookingData);
      Alert.alert('Success', 'Your viewing has been scheduled!');
      
      setName('');
      setEmail('');
      setPhone('');
      setDate('');
      setTime('');
      setMessage('');
      
      onSuccess();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to schedule viewing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Schedule a Viewing</Text>
      <Text style={styles.propertyTitle}>{property.title}</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Your full name"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Your email address"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Phone *</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Your phone number"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Preferred Date *</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="MM/DD/YYYY"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Preferred Time *</Text>
        <TextInput
          style={styles.input}
          value={time}
          onChangeText={setTime}
          placeholder="HH:MM AM/PM"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Message (Optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={message}
          onChangeText={setMessage}
          placeholder="Any additional information..."
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Schedule Viewing</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  propertyTitle: {
    fontSize: 16,
    marginBottom: 24,
    color: '#666',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#f4511e',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 24,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default BookingForm;
