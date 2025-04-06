import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigation } from "@react-navigation/native";
import RevenueDashboard from "./RevenueDashboard";

export default function ProfileScreen({navigation}) {
  const [name, setName] = useState("");
  const [userRole, setUserRole] = useState("");
  
    

  useEffect(() => {
    const loadProfileData = async () => {
      try {
          const storedUserRole = await AsyncStorage.getItem("userRole");
          const storedName = await AsyncStorage.getItem("Name");
          setName(storedName);
        if (storedUserRole) {
          setUserRole(storedUserRole);
        }
      } catch (error) {
        console.log("Error loading profile data:", error);
      }
    };

    loadProfileData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("auth_token");
      Alert.alert("Logged out", "You have been logged out successfully.");
      navigation.navigate("Login"); // Navigate and remove previous screens
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  const handleChangePassword = () => {
    navigation.navigate("ChangePassword");
  };

  return (
    <View style={styles.container}>
      <Navbar title="Profile" />
      <View style={styles.content}>
        <Text style={styles.title}>Hello, {name}!</Text>
        <Text style={styles.subtitle}>Role: {userRole ? userRole : "Unknown"}</Text>

        <View style={styles.buttonContainer}>
          <Button title="Change Password" onPress={handleChangePassword} color="#4CAF50" />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Logout" onPress={handleLogout} color="#f44336" />
              </View>
             <Button title="View Dashboard" onPress={()=>navigation.navigate("Dashboard")} color="#4CAF50" />
             
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "#f2f2f2",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "80%",
    marginVertical: 10,
  },
});
