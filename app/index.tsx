import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import { auth } from "../src/utils/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);
  
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#f4511e" />
      </SafeAreaView>
    );
  }
  
  if (user) {
    return <Redirect href="/home" />;
  } else {
    return <Redirect href="/auth/login" />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
