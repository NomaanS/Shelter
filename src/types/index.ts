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
  }
  
  export interface Booking {
    id?: string;
    propertyId: string;
    userId: string;
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    message?: string;
  }
  