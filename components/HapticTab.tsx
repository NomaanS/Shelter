import React from 'react';
import { TouchableOpacity, GestureResponderEvent, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

type HapticTabProps = {
  accessibilityState?: { selected?: boolean };
  onPress?: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
};

export function HapticTab({ 
  accessibilityState, 
  onPress, 
  children,
  ...props 
}: HapticTabProps) {
  
  const handlePress = (event: GestureResponderEvent) => {
    // Only trigger haptic feedback when the tab is not already selected
    if (!accessibilityState?.selected && Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    // Call the original onPress handler
    onPress?.(event);
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      onPress={handlePress}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
} 