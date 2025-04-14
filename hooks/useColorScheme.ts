import { useColorScheme as useNativeColorScheme } from 'react-native';

type ColorScheme = 'light' | 'dark';
 
export function useColorScheme(): ColorScheme | null {
  return useNativeColorScheme() as ColorScheme | null;
} 