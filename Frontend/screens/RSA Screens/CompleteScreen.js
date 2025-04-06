import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Navbar from "../../components/Navbar";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CompleteScreen({ navigation, route }) {
  const [branch, setBranch] = useState("");
  const [branchAddress, setBranchAddress] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        await AsyncStorage.setItem("userRole", "Mechanic");

        if (route?.params?.selectedDistrict) {
          setBranch(route.params.selectedDistrict);
        }

        if (route?.params?.selectedCity) {
          setBranchAddress(route.params.selectedCity);
        }
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };

    init();
  }, [route?.params]); // <-- safely depend on params

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginTop: 30 }}>
        <Navbar navigation={navigation} title="Complete all steps" />
      </View>

      <ScrollView style={{ width: "100%" }}>
        <View style={{ padding: 20, alignItems: "center" }}>
          <Text style={styles.sectionTitle}>Corporate Identity</Text>
          <Text style={styles.subText}>
            Please fill the identity for validation purposes
          </Text>

          <View style={{ width: "100%" }}>
            {/* Corporate Name */}
            <Text style={styles.label}>Name of the corporate</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Ex. Sarthi Automobile"
                style={styles.input}
              />
            </View>

            {/* Corporate Email */}
            <Text style={styles.label}>Email of corporate</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="example@gmail.com"
                style={styles.input}
                keyboardType="email-address"
              />
            </View>

            {/* Corporate Phone */}
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="+91 1234567890"
                style={styles.input}
                keyboardType="phone-pad"
              />
            </View>

            {/* Corporate Detail */}
            <Text style={styles.label}>Detail about corporate</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Sarthi automobile is a famous ..."
                style={styles.input}
              />
            </View>

            {/* Personal Identity */}
            <Text style={styles.sectionTitle}>Personal Identity</Text>
            <Text style={styles.subText}>
              Please fill the identity for validation purposes
            </Text>

            {/* Owner Name */}
            <Text style={styles.label}>Name of the owner</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Ex. Parth Panchal"
                style={styles.input}
              />
            </View>

            {/* Home Address */}
            <Text style={styles.label}>Home Address</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="123 Main Street, Ahmedabad"
                style={styles.input}
              />
            </View>

            {/* Branch */}
            <Text style={styles.label}>Branch</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Ex. Navrangpura"
                style={styles.input}
                value={branch}
                onChangeText={setBranch}
              />
            </View>

            {/* Branch Address */}
            <Text style={styles.label}>Branch Address</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Branch address here"
                style={styles.input}
                value={branchAddress}
                onChangeText={setBranchAddress}
              />
            </View>

            {/* Choose Location */}
            <TouchableOpacity
              onPress={() => navigation.navigate("YourLocation")}
              style={styles.locationButton}
            >
              <Text style={styles.locationButtonText}>
                Choose location in map
              </Text>
            </TouchableOpacity>

            {/* Number of Employees */}
            <Text style={styles.label}>Number of employees you have</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="e.g. 12"
                style={styles.input}
                keyboardType="numeric"
              />
            </View>

            {/* Register Button */}
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Thanks")}
              >
                <View style={styles.confirmButton}>
                  <Text style={styles.confirmText}>Register</Text>
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
  sectionTitle: {
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 2,
    marginTop: 10,
  },
  subText: {
    color: "gray",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 15,
  },
  inputContainer: {
    width: "100%",
    height: 50,
    borderRadius: 15,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#E7E7E7",
    display: "flex",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
  },
  confirmButton: {
    width: 350,
    borderRadius: 10,
    marginTop: 10,
    height: 50,
    backgroundColor: "#DA4F41",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmText: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
  locationButton: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#DA4F41",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  locationButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
