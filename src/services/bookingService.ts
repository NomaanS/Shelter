import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import { getCurrentUser } from './authService';
import { Booking } from '../utils/types';

  const bookingsRef = collection(db, "bookings");

/**
 * Create a new booking
 * @param bookingData The booking data
 * @returns The ID of the created booking
 */
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

/**
 * Get all bookings for the current user
 * @returns Array of bookings
 */
export const getUserBookings = async (): Promise<Booking[]> => {
  const user = getCurrentUser();
  if (!user) throw new Error('User must be logged in');

  const q = query(bookingsRef, where("userId", "==", user.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
};

/**
 * Get bookings for a specific user
 * @param userId The user ID
 * @returns Array of bookings
 */
export const getBookingsByUserId = async (userId: string): Promise<Booking[]> => {
  const q = query(bookingsRef, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
};
