import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import bike from "../assets/bike.png";
import rickshaw from "../assets/rickshaw.png";
import other from "../assets/other.png";
import two from "../assets/two.png";
import { TextInput } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";

export default function AddDetailsScreen({ navigation, route }) {


  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ display: "flex", justifyContent: "space-between", marginTop: 30 }}>
        <Navbar navigation={navigation} title="Add Details" />
      </View>

      <ScrollView style={{ width: "100%", height: "100%" }}>
        <View style={{ display: "flex", padding: 20, width: "100%", alignItems: "center" }}>
          <Text style={{ alignSelf: "flex-start", fontSize: 18, fontWeight: "700", marginBottom: 10 }}>
            Are there any further details you'd like to pass on to your service provider
          </Text>


          {/* Add New Vehicle Form */}
          <View style={{ width: "100%",height:"100%", display: "flex", marginTop: 20 }}>
            
            <View style={{width:"100%",height:"550"}}>
              <TextInput placeholder="Write something here" style={styles.input} />
            </View>

            <View style={{ width: "100%", display: "flex", alignItems: "center" }}>
              <TouchableOpacity onPress={() => navigation.navigate("ChooseProvider")}>
                <View style={styles.confirmButton}>
                  <Text style={styles.confirmText}>Continue</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

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
