import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [token, setToken] = useState(""); // NEW: Token state
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

const BACKEND_URL = "http://172.20.10.7:4000";


  const handleRegister = async () => {
    const firstName = fullName.split(" ")[0];
    const lastName = fullName.split(" ")[1];
    if (!fullName || (!email && !phoneNumber) || !password || !userType) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (email && !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      Alert.alert("Error", "Please enter a valid Gmail address.");
      return;
    }

    if (phoneNumber.length !== 10) {
      Alert.alert("Error", "Phone number must be exactly 10 digits.");
      return;
    }

    // If userType is Worker, token must be provided
    if (userType === "Worker" && !token) {
      Alert.alert("Error", "Token is required for Worker registration.");
      return;
    }

    setLoading(true);
    try {
      const signupData = {
        firstName,
        lastName,
  email,
  phoneNumber,
  password,
  accountType:userType,
  ...(token && { token }),  // Only adds token if it exists
};
      const response = await fetch(`${BACKEND_URL}/api/v1/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
         body: JSON.stringify(signupData),
      });

      const data = await response.json();
      console.log(data);
      setLoading(false);

      if (response.ok) {
       
        navigation.navigate("EnterCode",{data});
      } else {
        Alert.alert("Error", data.message || "Registration failed.");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.header}>Register</Text>
        <Text style={styles.subheader}>Let's Get Started</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex. Earl J. Smiley"
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="+91 8596XXXXXX"
          onChangeText={(text) => {
            const filtered = text.replace(/[^0-9]/g, "");
            setPhoneNumber(filtered);
          }}
          value={phoneNumber}
          keyboardType="number-pad"
          maxLength={10}
        />

        {/* User Type Dropdown */}
        <Text style={styles.label}>User Type</Text>
        <TouchableOpacity
          style={[styles.input, { justifyContent: "center" }]}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={{ color: userType ? "black" : "#999" }}>
            {userType || "Select user type"}
          </Text>
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => {
                setUserType("User");
                setShowDropdown(false);
              }}
            >
              <Text>User</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => {
                setUserType("Mechanic");
                setShowDropdown(false);
              }}
            >
              <Text>Mechanic</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => {
                setUserType("Worker");
                setShowDropdown(false);
              }}
            >
              <Text>Worker</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* If Worker is selected, show Token input */}
        {userType === "Worker" && (
          <>
            <Text style={styles.label}>Token</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your worker token"
              onChangeText={setToken}
              value={token}
            />
          </>
        )}

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Registering..." : "Register"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text
            onPress={() => navigation.navigate("Login")}
            style={styles.loginLink}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "900",
    alignSelf: "center",
  },
  subheader: {
    fontSize: 25,
    fontWeight: "600",
    alignSelf: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginTop: 10,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  orText: {
    fontSize: 16,
    color: "gray",
    alignSelf: "center",
    marginVertical: 10,
  },
  registerButton: {
    backgroundColor: "#DA4F41",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginText: {
    fontSize: 14,
    alignSelf: "center",
    marginTop: 10,
  },
  loginLink: {
    color: "#DA4F41",
    fontWeight: "bold",
  },
  dropdown: {
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  dropdownOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});
