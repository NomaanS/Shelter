import { NativeEventEmitter } from 'react-native';

// Monkey patch the NativeEventEmitter to filter out topInsetsChange events
const originalAddListener = NativeEventEmitter.prototype.addListener;
NativeEventEmitter.prototype.addListener = function(eventType, listener, ...rest) {
  if (eventType === 'topInsetsChange') {
    // Return a dummy subscription that does nothing
    return {
      remove: () => {}
    };
  }
  return originalAddListener.call(this, eventType, listener, ...rest);
};

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
  
  // Export other types and utilities
  export * from './module';
  