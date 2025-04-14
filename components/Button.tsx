import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacityProps 
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
}

export function Button({ 
  title, 
  variant = 'primary', 
  isLoading = false, 
  disabled = false,
  style, 
  ...props 
}: ButtonProps) {
  const getButtonStyle = () => {
    switch(variant) {
      case 'secondary':
        return styles.secondaryButton;
      case 'outline':
        return styles.outlineButton;
      case 'primary':
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch(variant) {
      case 'outline':
        return styles.outlineText;
      case 'secondary':
      case 'primary':
      default:
        return styles.buttonText;
    }
  };

  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        isDisabled && styles.disabledButton,
        style
      ]}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' ? "#3498db" : "#fff"} />
      ) : (
        <Text style={[getTextStyle(), isDisabled && styles.disabledText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  primaryButton: {
    backgroundColor: '#3498db',
  },
  secondaryButton: {
    backgroundColor: '#2ecc71',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3498db',
  },
  disabledButton: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  outlineText: {
    color: '#3498db',
    fontWeight: '600',
    fontSize: 16,
  },
  disabledText: {
    color: '#888',
  },
}); 