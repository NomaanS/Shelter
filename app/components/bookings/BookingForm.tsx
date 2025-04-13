import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@utils/firebaseConfig';
import { getAuth } from 'firebase/auth';

interface BookingFormProps {
  propertyId: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ propertyId }) => {
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const auth = getAuth();

  const handleBooking = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Please log in to book a viewing');
      return;
    }

    if (!message.trim()) {
      Alert.alert('Please enter a message');
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(db, 'bookings'), {
        propertyId,
        userId: user.uid,
        userEmail: user.email,
        message,
        createdAt: serverTimestamp(),
      });

      Alert.alert('Success', 'Your viewing has been booked!');
      setMessage('');
    } catch (error) {
      console.error('Error booking viewing:', error);
      Alert.alert('Error', 'Could not book the viewing');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={{ gap: 10 }}>
      <TextInput
        placeholder="Write a message (e.g. preferred date/time)"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
        style={{
          borderColor: '#ccc',
          borderWidth: 1,
          padding: 10,
          borderRadius: 6,
        }}
      />
      <Button title={submitting ? 'Booking...' : 'Book Viewing'} onPress={handleBooking} disabled={submitting} />
    </View>
  );
};

export default BookingForm;
