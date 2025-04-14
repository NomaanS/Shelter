import React from 'react';
import { Ionicons } from '@expo/vector-icons';

type IconProps = {
  name: string;
  size: number;
  color: string;
};

// Default implementation for Android and web using Ionicons
export function IconSymbol({ name, size, color }: IconProps) {
  // Map SF Symbol names to Ionicons names
  const iconMap: { [key: string]: string } = {
    'house.fill': 'home',
    'paperplane.fill': 'paper-plane',
    'building.2.fill': 'business',
    'calendar': 'calendar',
    'person.fill': 'person',
    'gear': 'settings',
    'bell.fill': 'notifications',
    'magnifyingglass': 'search',
    'checkmark.circle.fill': 'checkmark-circle',
    'xmark.circle.fill': 'close-circle',
    'plus.circle.fill': 'add-circle',
    'minus.circle.fill': 'remove-circle',
    'heart.fill': 'heart',
    'heart': 'heart-outline',
    'star.fill': 'star',
    'star': 'star-outline',
    'bookmark.fill': 'bookmark',
    'bookmark': 'bookmark-outline'
  };

  // Convert SF Symbol name to Ionicons name or use original if not in map
  const ioniconsName = iconMap[name] || name;

  return <Ionicons name={ioniconsName as any} size={size} color={color} />;
} 