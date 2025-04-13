import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/styles/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ title, onPress, variant = 'primary' }: ButtonProps) => (
  <TouchableOpacity 
    style={[styles.button, variant === 'secondary' && styles.secondaryButton]} 
    onPress={onPress}
  >
    <Text style={[styles.text, variant === 'secondary' && styles.secondaryText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryText: {
    color: colors.primary,
  },
});
