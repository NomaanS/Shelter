import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { AuthContext } from '../_layout';
import { signOut, Auth } from 'firebase/auth';
import { auth } from '../../constants/firebase/firebaseConfig';

// Define types for Ionicons names to avoid TypeScript errors
type IconName = 
  | 'person-outline' 
  | 'shield-checkmark-outline' 
  | 'card-outline' 
  | 'notifications-outline'
  | 'chevron-forward'
  | 'log-out-outline';

export default function ProfileScreen() {
  const { user, setManualUser } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Check if using a demo user by looking at the uid
      const isDemoUser = user && typeof user.uid === 'string' && user.uid.startsWith('demo-');
      
      if (isDemoUser) {
        // For demo users, just clear the user from context
        setManualUser(null as any);
        router.replace('/auth');
      } else {
        // For real Firebase users, use the signOut method
        await signOut(auth as Auth);
        router.replace('/auth');
      }
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const menuItems = [
    { 
      icon: 'person-outline' as IconName, 
      title: 'Personal Information',
      description: 'Update your profile details'
    },
    { 
      icon: 'shield-checkmark-outline' as IconName, 
      title: 'Security',
      description: 'Password and authentication settings'
    },
    { 
      icon: 'card-outline' as IconName, 
      title: 'Payment Methods',
      description: 'Manage your payment options'
    },
    { 
      icon: 'notifications-outline' as IconName, 
      title: 'Notifications',
      description: 'Control your notification preferences'
    }
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          {user?.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.avatar} />
          ) : (
            <View style={styles.defaultAvatar}>
              <ThemedText style={styles.avatarInitial}>
                {user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
              </ThemedText>
            </View>
          )}
        </View>
        
        <ThemedText style={styles.name}>
          {user?.displayName || 'Guest User'}
        </ThemedText>
        
        <ThemedText style={styles.email}>
          {user?.email || 'No email available'}
        </ThemedText>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Ionicons name={item.icon} size={24} color="#4a90e2" style={styles.menuIcon} />
              <View style={styles.menuText}>
                <ThemedText style={styles.menuTitle}>{item.title}</ThemedText>
                <ThemedText style={styles.menuDescription}>{item.description}</ThemedText>
              </View>
            </View>
            <Ionicons name={'chevron-forward' as IconName} size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name={'log-out-outline' as IconName} size={24} color="#e74c3c" style={styles.logoutIcon} />
        <ThemedText style={styles.logoutText}>Log Out</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  defaultAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4a90e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    opacity: 0.7,
  },
  menuContainer: {
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 3,
  },
  menuDescription: {
    fontSize: 14,
    opacity: 0.6,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#e74c3c',
  },
}); 