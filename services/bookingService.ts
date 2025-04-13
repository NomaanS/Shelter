import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import { getCurrentUser } from './authService';
import { Booking } from '../utils/types';

const bookingsRef = collection(db, "bookings");

export const createBooking = async (bookingData: Partial<Booking>): Promise<string> => {
  const user = getCurrentUser();
  if (!user) throw new Error('User must be logged in');

  const booking = {
    ...bookingData,
    userId: user.uid,
    createdAt: new Date()
  };

  const docRef = await addDoc(bookingsRef, booking);
  return docRef.id;
};

export const getUserBookings = async (): Promise<Booking[]> => {
  const user = getCurrentUser();
  if (!user) throw new Error('User must be logged in');

  const q = query(bookingsRef, where("userId", "==", user.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
};
