import { collection, getDocs, addDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { Property } from "../utils/types";

const propertyRef = collection(db, "properties");

// Get all properties
export const getAllProperties = async (): Promise<Property[]> => {
  const snapshot = await getDocs(propertyRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Property));
};

// Alias for backward compatibility
export const fetchProperties = getAllProperties;

// Get property by ID
export const getPropertyById = async (id: string) => {
  const docRef = doc(db, "properties", id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

// Add a new property
export const addProperty = async (property: any) => {
  const docRef = await addDoc(propertyRef, property);
  return docRef.id;
};

// Delete a property
export const deleteProperty = async (id: string) => {
  const docRef = doc(db, "properties", id);
  await deleteDoc(docRef);
};
