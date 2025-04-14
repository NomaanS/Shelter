import React, { ReactNode } from 'react';
import { View, ViewProps, useColorScheme } from 'react-native';

interface ThemedViewProps extends ViewProps {
  lightBg?: string;
  darkBg?: string;
  children?: ReactNode;
}

export function ThemedView({ 
  style, 
  lightBg = '#FFFFFF', 
  darkBg = '#1A1A1A', 
  ...props 
}: ThemedViewProps) {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? darkBg : lightBg;
  
  return (
    <View 
      style={[
        { backgroundColor },
        style
      ]} 
      {...props} 
    />
  );
}
