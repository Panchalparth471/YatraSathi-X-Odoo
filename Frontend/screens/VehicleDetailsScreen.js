import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import two from "../assets/two.png";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import truck from "../assets/truck3.png";
import bike from "../assets/bike.png";
import rickshaw from "../assets/rickshaw.png";
import other from "../assets/other.png";
import { TextInput } from "react-native-gesture-handler";

export default function VechicleDetailsScreen({ navigation }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);

  const handleVehicleSelect = (type) => {
    setSelectedVehicleType(type);
  };

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ display: "flex", justifyContent: "space-between", marginTop: 30 }}>
        <Navbar navigation={navigation} title="My Vehicle" />
      </View>

      <ScrollView style={{ width: "100%", height: "100%" }}>
        <View style={{ display: "flex", padding: 20, width: "100%", alignItems: "center" }}>
          <Text style={{ alignSelf: "flex-start", fontSize: 18, fontWeight: "700" }}>See your Vehicle</Text>

          {/* Existing Vehicle Card */}
          <View style={styles.vehicleCard}>
            <View style={styles.vehicleIconContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name="car" color="black" size={30} />
              </View>
            </View>
            <View style={styles.vehicleInfo}>
              <View style={{ width: "100%", padding: 2, gap: 5 }}>
                <View style={styles.vehicleRow}>
                  <Text style={{ fontSize: 18, fontWeight: 600 }}>Maruti Ertiga</Text>
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

          {/* Add New Vehicle Section */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.addVehicleText}>Add a Vehicle</Text>
            <View style={styles.divider} />
          </View>

          <View style={{ width: "100%", display: "flex", marginTop: 20 }}>
            <Text style={styles.label}>Choose your Vehicle</Text>

            {/* Selectable Vehicle Type Cards */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}
              style={{ marginTop: 10 }}
            >
              <TouchableOpacity
                style={[
                  styles.card,
                  selectedVehicleType === "car" && styles.selectedCard,
                ]}
                onPress={() => handleVehicleSelect("car")}
              >
                <Ionicons name="car" color="black" size={80} />
                <Text style={styles.text}>Car</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.card,
                  selectedVehicleType === "bike" && styles.selectedCard,
                ]}
                onPress={() => handleVehicleSelect("bike")}
              >
                <Image style={styles.image} source={bike} />
                <Text style={styles.text}>Motorcycle</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.card,
                  selectedVehicleType === "rickshaw" && styles.selectedCard,
                ]}
                onPress={() => handleVehicleSelect("rickshaw")}
              >
                <Image style={styles.image} source={rickshaw} />
                <Text style={styles.text}>Rickshaw</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.card,
                  selectedVehicleType === "other" && styles.selectedCard,
                ]}
                onPress={() => handleVehicleSelect("other")}
              >
                <Image style={styles.image} source={other} />
                <Text style={styles.text}>Other</Text>
              </TouchableOpacity>
            </ScrollView>

            {/* Input Fields */}
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
              <TouchableOpacity>
                <View style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>Save Vehicle</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  vehicleCard: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#E7E7E7",
    borderRadius: 15,
    height: 90,
    padding: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  vehicleIconContainer: {
    width: "20%",
    height: "100%",
    borderRadius: 15,
    backgroundColor: "#DA4F41",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircle: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  vehicleInfo: {
    width: "75%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  vehicleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
  },
  vehicleDesc: {
    fontSize: 12,
    color: "gray",
    fontWeight: "500",
  },
  options: {
    width: 80,
    position: "absolute",
    top: 20,
    right: 0,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 1000,
  },
  optionText: {
    fontSize: 12,
    paddingVertical: 2,
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
  saveButton: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: "#DA4F41",
    width: 140,
    padding: 15,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
});
