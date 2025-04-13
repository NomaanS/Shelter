export interface Property {
  id?: string;
  title: string;
  description: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  latitude: number;
  longitude: number;
  userId: string;
  createdAt?: any;
}

export interface Booking {
  id?: string;
  propertyId: string;
  userId: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  createdAt?: any;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
