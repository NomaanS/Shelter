import { db } from "@/utils/firebaseConfig";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";

const propertyRef = collection(db, "properties");

export const addProperty = async (property: any) => {
  const docRef = await addDoc(propertyRef, property);
  return docRef.id;
};

export const fetchProperties = async () => {
  const snapshot = await getDocs(propertyRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getPropertyById = async (id: string) => {
  const docRef = doc(db, "properties", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};
