import { db } from "@/utils/firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export const createBooking = async (booking: any) => {
  const bookingsRef = collection(db, "bookings");
  const docRef = await addDoc(bookingsRef, booking);
  return docRef.id;
};

export const getUserBookings = async (userId: string) => {
  const bookingsRef = collection(db, "bookings");
  const q = query(bookingsRef, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
