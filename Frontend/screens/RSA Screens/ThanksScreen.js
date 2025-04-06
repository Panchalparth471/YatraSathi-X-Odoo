import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import React from "react";


export default function ThanksScreen({ navigation}) {


  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ display: "flex", justifyContent: "space-between", marginTop: 30 }}>
        <Navbar navigation={navigation} title="" />
      </View>

      <ScrollView style={{ width: "100%", height: "100%",marginTop:100 }}>
        <View style={{ display: "flex", padding: 20, width: "100%", alignItems: "center" }}>
                  <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100", height: "100", backgroundColor: "#DA4F41", borderRadius: 100 }}>
                      <Ionicons name="checkmark" size={50} color="white"></Ionicons>
                  </View>
                  <Text style={{ fontSize: 18, fontWeight: 700, marginTop: 10 }}>Well Done</Text>
                  
                  <View style={{marginTop:50}}>
                      <Text style={{fontSize:25,fontWeight:600}}>Thanks for register</Text>
                  </View>

                  <Text style={{color:"gray",marginTop:30}}>Registered Successfully, you can now proceed to home page</Text>
        </View>
      </ScrollView>
         <View style={{ width: "100%", display: "flex", alignItems: "center",marginBottom:15 }}>
                     <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                       <View style={styles.confirmButton}>
                         <Text style={styles.confirmText}>Go to Home</Text>
                       </View>
                     </TouchableOpacity>
                   </View>
    </View>
  );
}

const styles = StyleSheet.create({
 
  scrollContainer: {
    flexDirection: "row",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#E7E7E7",
    marginRight: 10,
    backgroundColor: "white",
  },
  selectedCard: {
    borderColor: "#DA4F41",
    backgroundColor: "#FFF1EF",
  },
  image: {
    width: 80,
    height: 80,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  inputContainer: {
      width: "100%",
      height:"100%",
    height: 50,
    borderRadius: 15,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#E7E7E7",
    display: "flex",
  },
  input: {
    width: "100%",
    height: "auto",
      padding: 10,
    
  },
  confirmButton: {
    width: 350,
    borderRadius: 10,
    marginTop: 10,
    height: 50,
    backgroundColor: "#DA4F41",
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmText: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
  vehicleCard: {
    width: "100%",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E7E7E7",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  vehicleIconContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#DA4F41",
      borderRadius: 10,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  vehicleInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  vehicleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  vehicleDesc: {
    fontSize: 14,
    color: "#666",
  },
  options: {
    position: "absolute",
    top: 25,
    right: 0,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    zIndex: 1000,
  },
  optionText: {
    paddingVertical: 5,
    fontSize: 14,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#E7E7E7",
    borderRadius: 10,
    color: "black",
    paddingRight: 30,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E7E7E7",
    borderRadius: 10,
    color: "black",
    paddingRight: 30,
    marginBottom: 10,
  },
};
