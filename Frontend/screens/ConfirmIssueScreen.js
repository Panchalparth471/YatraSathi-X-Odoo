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

export default function ConfirmIssueScreen({ navigation, route }) {
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [selectedService, setSelectedService] = useState(route.params.selectedService);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ display: "flex", justifyContent: "space-between", marginTop: 30 }}>
        <Navbar navigation={navigation} title={selectedService} />
      </View>

      <ScrollView style={{ width: "100%", height: "100%" }}>
        <View style={{ display: "flex", padding: 20, width: "100%", alignItems: "center" }}>
          <Text style={{ alignSelf: "flex-start", fontSize: 18, fontWeight: "700", marginBottom: 10 }}>
            Select your Vehicle
          </Text>

          <View style={styles.dropdownContainer}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedVehicleType(value)}
              items={[
                { label: "Maruti Ertiga", value: "ertiga" },
            
              ]}
              placeholder={{ label: "Select a vehicle...", value: null }}
              style={pickerSelectStyles}
              value={selectedVehicleType}
            />
          </View>

          {/* Show selected vehicle card */}
          {selectedVehicleType && (
            <View style={styles.vehicleCard}>
              <View style={styles.vehicleIconContainer}>
                <View style={styles.iconCircle}>
                  <Ionicons name="car" color="black" size={30} />
                </View>
              </View>
              <View style={styles.vehicleInfo}>
                <View style={{ width: "100%", padding: 2, gap: 5 }}>
                  <View style={styles.vehicleRow}>
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>Maruti Ertiga</Text>
                    <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
                      <Image style={{ width: 20, height: 20 }} source={two} />
                    </TouchableOpacity>
                    {showOptions && (
                      <View style={styles.options}>
                        <TouchableOpacity onPress={() => alert("Edit Clicked")}>
                          <Text style={styles.optionText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => alert("Remove Clicked")}>
                          <Text style={styles.optionText}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                  <Text style={styles.vehicleDesc}>Car | Maruti | Ertiga | Black | Petrol</Text>
                </View>
              </View>
            </View>
          )}

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.addVehicleText}>Add a Vehicle</Text>
            <View style={styles.divider} />
          </View>

          {/* Add New Vehicle Form */}
          <View style={{ width: "100%", display: "flex", marginTop: 20 }}>
            <Text style={styles.label}>Choose your Vehicle</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}
              style={{ marginTop: 10 }}
            >
              <TouchableOpacity
                style={[styles.card, selectedVehicleType === "car" && styles.selectedCard]}
                onPress={() => setSelectedVehicleType("car")}
              >
                <Ionicons name="car" color="black" size={80} />
                <Text style={styles.text}>Car</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.card, selectedVehicleType === "bike" && styles.selectedCard]}
                onPress={() => setSelectedVehicleType("bike")}
              >
                <Image style={styles.image} source={bike} />
                <Text style={styles.text}>Motorcycle</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.card, selectedVehicleType === "rickshaw" && styles.selectedCard]}
                onPress={() => setSelectedVehicleType("rickshaw")}
              >
                <Image style={styles.image} source={rickshaw} />
                <Text style={styles.text}>Rickshaw</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.card, selectedVehicleType === "other" && styles.selectedCard]}
                onPress={() => setSelectedVehicleType("other")}
              >
                <Image style={styles.image} source={other} />
                <Text style={styles.text}>Other</Text>
              </TouchableOpacity>
            </ScrollView>

            <Text style={styles.label}>Vehicle Company</Text>
            <View style={styles.inputContainer}>
              <TextInput placeholder="Toyota" style={styles.input} />
            </View>

            <Text style={styles.label}>Vehicle Model</Text>
            <View style={styles.inputContainer}>
              <TextInput placeholder="Innova" style={styles.input} />
            </View>

            <Text style={styles.label}>Colour</Text>
            <View style={styles.inputContainer}>
              <TextInput placeholder="Black" style={styles.input} />
            </View>

            <Text style={styles.label}>Fuel Type</Text>
            <View style={styles.inputContainer}>
              <TextInput placeholder="Petrol" style={styles.input} />
            </View>

            <View style={{ width: "100%", display: "flex", alignItems: "center" }}>
              <TouchableOpacity onPress={() => navigation.navigate("YourLocation", { selectedService })}>
                <View style={styles.confirmButton}>
                  <Text style={styles.confirmText}>Confirm Issue</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    width: "100%",
    marginBottom: 20,
  },
  dividerContainer: {
    width: "100%",
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  divider: {
    width: "30%",
    height: 1,
    backgroundColor: "gray",
  },
  addVehicleText: {
    fontSize: 18,
    fontWeight: "700",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 15,
  },
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
    height: 50,
    borderRadius: 15,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#E7E7E7",
    display: "flex",
  },
  input: {
    width: "100%",
    height: "100%",
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
