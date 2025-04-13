import { collection, getDocs, addDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@utils/firebaseConfig";
import { Property } from "@utils/types";

const propertyRef = collection(db, "properties");

export const getAllProperties = async (): Promise<Property[]> => {
  const snapshot = await getDocs(propertyRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Property));
};

export const getPropertyById = async (id: string) => {
  const docRef = doc(db, "properties", id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

export const addProperty = async (property: any) => {
  const docRef = await addDoc(propertyRef, property);
  return docRef.id;
};

export const deleteProperty = async (id: string) => {
  const docRef = doc(db, "properties", id);
  await deleteDoc(docRef);
};
