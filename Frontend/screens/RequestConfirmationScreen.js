import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import * as Location from "expo-location";
import Navbar from "../components/Navbar";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RequestConfirmation({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    loadStoredLocation();
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    await AsyncStorage.setItem("userLocation", JSON.stringify(location.coords));
    console.log(await AsyncStorage.getItem("userLocation"));
  };

  const loadStoredLocation = async () => {
    try {
      const storedLocation = await AsyncStorage.getItem("userLocation");
      if (storedLocation) {
        setLocation(JSON.parse(storedLocation));
      }
    } catch (error) {
      console.error("Error loading stored location:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginTop: 30 }}>
        <Navbar navigation={navigation} title="Request Confirmation" />
      </View>

      <ScrollView style={{ width: "100%" }}>
        <View style={styles.container}>
          {/* Vehicle Info */}
          <View style={styles.infoRow}>
            <Ionicons name="car" color="#DA4F41" size={30} style={styles.icon} />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Maruti Suzuki Ertiga</Text>
              <Text style={styles.infoSubtitle}>DL 01 HA 5212</Text>
            </View>
          </View>

          {/* Location Info */}
          <View style={styles.infoRow}>
            <Ionicons name="location" color="#DA4F41" size={30} style={styles.icon} />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Delhi City</Text>
              <Text style={styles.infoSubtitle}>67 Street, delhi-110007</Text>
            </View>
          </View>

          {/* Details */}
          <View style={styles.infoRow}>
            <Ionicons name="alert" color="#DA4F41" size={30} style={styles.icon} />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Details</Text>
              <Text style={styles.infoSubtitle}>
                My Maruti Ertiga started showing serious issues recently. Despite regular servicing, the engine began stalling unexpectedly, especially in traffic. The AC stopped cooling effectively, and strange noises came from the suspension. I also faced a problem with the power steering becoming unusually stiff during turns. The infotainment system froze often, and the fuel efficiency dropped drastically.
              </Text>
            </View>
          </View>

          {/* Garage Info */}
          <View style={styles.infoRow}>
            <Ionicons name="business" color="#DA4F41" size={30} style={styles.icon} />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Akshar Car Reparation</Text>
              <Text style={styles.infoSubtitle}>DL 01 HA 5212</Text>
            </View>
          </View>

          {/* Confirm Button */}
          <View style={styles.confirmWrapper}>
            <TouchableOpacity onPress={() => navigation.navigate("ProviderDetails")}>
              <View style={styles.confirmButton}>
                <Text style={styles.confirmText}>Continue</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 60,
  },
  icon: {
    width: 40,
    marginTop: 3,
  },
  infoText: {
    flex: 1,
    paddingLeft: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  infoSubtitle: {
    color: "gray",
    marginTop: 3,
  },
  confirmWrapper: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
  },
  confirmButton: {
    width: 350,
    borderRadius: 10,
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
});
