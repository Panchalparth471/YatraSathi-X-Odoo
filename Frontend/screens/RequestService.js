import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import React from "react";

import flat from "../assets/flat-tire.png";
import key from "../assets/key.png";
import tow from "../assets/tow-truck.png";
import engine from "../assets/engine.png";
import battery from "../assets/battery.png";
import others from "../assets/technical-support.png";

export default function RequestService({ navigation }) {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    { key: "Flat Tire", label: "Flat Tire", icon: flat },
    { key: "Tow Truck", label: "Tow Truck", icon: tow },
    { key: "Engine Issue", label: "Engine Issue", icon: engine },
    { key: "Battery", label: "Battery", icon: battery },
    { key: "Key Issue", label: "Key Issue", icon: key },
    { key: "Others", label: "Other", icon: others },
  ];

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ display: "flex", justifyContent: "space-between", marginTop: 30 }}>
        <Navbar navigation={navigation} title="Request a Service" />
      </View>

      <ScrollView style={{ width: "100%", height: "100%", padding: 10 }}>
        <View style={{ display: "flex", padding: 10, width: "100%", alignItems: "center" }}>
          <Text style={{ alignSelf: "flex-start", fontSize: 18, fontWeight: "700" }}>How can we assist you?</Text>
        </View>

        {/* Render cards in rows of 2 */}
        <View>
          {Array.from({ length: Math.ceil(services.length / 2) }).map((_, i) => (
            <View key={i} style={styles.row}>
              {[services[i * 2], services[i * 2 + 1]]
                .filter(Boolean)
                .map((service) => (
                  <TouchableOpacity
                    key={service.key}
                    style={[
                      styles.card,
                      selectedService === service.key && styles.selectedCard,
                    ]}
                    onPress={() => setSelectedService(service.key)}
                  >
                    <Image style={styles.image} source={service.icon} />
                    <Text style={styles.text}>{service.label}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          ))}
        </View>

        <TouchableOpacity onPress={()=>navigation.navigate("ConfirmIssue",{ selectedService })}>
          <View style={styles.confirmButton}>
            <Text style={styles.confirmText}>Confirm Issue</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    height: 180,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#E7E7E7",
    backgroundColor: "white",
  },
  selectedCard: {
    borderColor: "#DA4F41",
    backgroundColor: "#FFF1EF",
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  confirmButton: {
    width: "90%",
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
});
