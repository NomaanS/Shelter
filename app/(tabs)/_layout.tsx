import { Tabs } from 'expo-router';
import React, { useContext } from 'react';
import { Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { HapticTab } from '../../components/HapticTab';
import { IconSymbol } from '../../components/ui/IconSymbol';
import TabBarBackground from '../../components/ui/TabBarBackground';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from 'react-native';
import { AuthContext } from '../_layout';
import { signOut, Auth } from 'firebase/auth';
import { auth } from '../../constants/firebase/firebaseConfig';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user, setManualUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      // Check if using a demo user by looking at the uid
      const isDemoUser = user && typeof user.uid === 'string' && user.uid.startsWith('demo-');
      
      if (isDemoUser) {
        // For demo users, just clear the user from context
        setManualUser(null as any);
      } else {
        // For real Firebase users, use the signOut method
        // Cast auth to Auth to satisfy TypeScript
        await signOut(auth as Auth);
      }
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
        headerRight: () => (
          user ? (
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          ) : null
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="properties"
        options={{
          title: 'Properties',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="building.2.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 15,
    padding: 8,
  },
  logoutText: {
    color: '#4a90e2',
    fontWeight: 'bold',
  },
});
