import React, { ReactNode } from 'react';
import { Text, TextProps, useColorScheme, TextStyle, StyleProp } from 'react-native';

interface ThemedTextProps extends TextProps {
  lightColor?: string;
  darkColor?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  type?: 'title' | 'subtitle' | 'body' | 'caption' | 'link';
  style?: StyleProp<TextStyle>;
  children?: ReactNode;
}

export function ThemedText({ 
  style, 
  lightColor = '#000000', 
  darkColor = '#FFFFFF', 
  fontSize = 16,
  fontWeight = 'normal',
  type,
  ...props 
}: ThemedTextProps) {
  const colorScheme = useColorScheme();
  const color = colorScheme === 'dark' ? darkColor : lightColor;
  
  // Apply styles based on type
  let typeStyles = {};
  
  if (type) {
    switch (type) {
      case 'title':
        typeStyles = { fontSize: 24, fontWeight: 'bold' };
        break;
      case 'subtitle':
        typeStyles = { fontSize: 18, fontWeight: '600' };
        break;
      case 'body':
        typeStyles = { fontSize: 16 };
        break;
      case 'caption':
        typeStyles = { fontSize: 14, opacity: 0.8 };
        break;
      case 'link':
        typeStyles = { 
          fontSize: 16, 
          color: colorScheme === 'dark' ? '#4a90e2' : '#2a6db8',
          fontWeight: '500'
        };
        break;
    }
  }
  
  return (
    <Text 
      style={[
        { 
          color,
          fontSize,
          fontWeight
        },
        typeStyles,
        style
      ]} 
      {...props} 
    />
  );
} 