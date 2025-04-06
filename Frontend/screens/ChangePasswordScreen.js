import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }

    try {
      const response = await fetch("http://192.168.68.136:4000/api/v1/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer YOUR_TOKEN_HERE`, // Uncomment if your API needs a token
        },
        body: JSON.stringify({
          oldPassword: currentPassword,
          newPassword: newPassword,
        }),
      });

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        if (response.ok) {
          Alert.alert("Success", data.message || "Password changed successfully!");
          setCurrentPassword("");
          setNewPassword("");
        } else {
          Alert.alert("Error", data.message || "Failed to change password.");
        }
      } else {
        const errorText = await response.text();
        console.error("Unexpected response:", errorText);
        Alert.alert("Error", "Server returned an unexpected response.");
      }
    } catch (error) {
      console.error("Change Password Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Navbar title="Change Password" />
      <View style={styles.content}>
        <Text style={styles.label}>Current Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Enter current password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Enter new password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <View style={styles.buttonContainer}>
          <Button title="Update Password" onPress={handleChangePassword} color="#DA4F41" />
        </View>
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
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginTop: 10,
  },
});
