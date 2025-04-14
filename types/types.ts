export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  images: string[];
  ownerId: string;
  createdAt: Date;
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
}
