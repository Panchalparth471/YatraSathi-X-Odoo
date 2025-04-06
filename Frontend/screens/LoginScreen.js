import React, { useState } from "react";
import { 
  View, 
  Image, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const BACKEND_URL="http://172.20.10.7:4000"
      const response = await fetch(`${BACKEND_URL}/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        console.log(data);
        await AsyncStorage.setItem("user_email", email);
        await AsyncStorage.setItem("auth_token", data.token);
        await AsyncStorage.setItem("userId", data.user._id);
        await AsyncStorage.setItem("userRole", data.user.accountType)
        await AsyncStorage.setItem("Name", data.user.firstName);
        console.log(await AsyncStorage.getItem("auth_token"))
        console.log(await AsyncStorage.getItem("userId"))
        console.log(await AsyncStorage.getItem("userRole"))
        Alert.alert("Success", "Login successful!");
      
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", data.message || "Login failed.");
      }
    } catch (error) {
      setLoading(false);
      console.log(error)
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
          <View style={{width:"100%",marginTop:20,display:"flex",justifyContent:"center",alignItems:"center"}}>
              <Image source={require('../assets/login.png')} style={{ width:"90%",height:300}}></Image>
          </View>
          <View style={{ display: "flex", flexDirection: "column", width: "100%", padding: 20 }}>
              <Text style={{alignSelf:"center",fontSize:32,fontWeight:"900"}}>Login</Text>
              <View style={{width:"100%",marginTop:30}}>
                  <Text style={{fontSize:25,fontWeight:"600",justifyContent:"flex-start"}}>Lets Get Started</Text>
                  <Text style={{color:"gray"}}>login to your account</Text>
              </View>
              <View style={{width:"100%",marginTop:20}}>
                  <View>
                      <Text style={{ fontSize: 18, fontWeight: "600" }}>Email</Text>
                      <TextInput 
                        style={styles.input} 
                        placeholder="Enter Your Email" 
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                  </View>
                  <View>
                      <Text style={{ fontSize: 18, fontWeight: "600" }}>Password</Text>
                      <TextInput 
                        style={styles.input} 
                        placeholder="Enter Your Password" 
                        onChangeText={setPassword}
                        secureTextEntry
                      />
                      <TouchableOpacity>
                            <Text style={{alignSelf:"flex-end"}} onPress={()=>navigation.navigate("forgot")}>Forgot Password?</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={{marginTop:8}}>
                      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
                           <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
                      </TouchableOpacity>
                      <Text style={{alignSelf:"center"}}>Already have an account? <Text onPress={()=>navigation.navigate("Signup")} style={{color:"#DA4F41"}}>Sign up</Text></Text>
                  </View>
              </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    container: {
    width: "100%",
    height:"100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding:10
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subheader: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    color: "#007bff",
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: "#DA4F41",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop:4,
    marginBottom: 20,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  signupText: {
    fontSize: 14,
  },
  signupLink: {
    color: "#007bff",
    fontWeight: "bold",
  },
});