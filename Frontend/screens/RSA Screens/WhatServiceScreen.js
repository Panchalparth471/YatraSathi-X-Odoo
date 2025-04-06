import { View, Image, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import what from "../../assets/what.png";
import bike from "../../assets/bike.png";
import rickshaw from "../../assets/rickshaw.png";
import other from "../../assets/other.png";

export default function WhatServiceScreen({navigation}) {
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  const toggleVehicleSelect = (type) => {
    if (selectedVehicles.includes(type)) {
      setSelectedVehicles(selectedVehicles.filter((item) => item !== type));
    } else {
      setSelectedVehicles([...selectedVehicles, type]);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.headerImage} source={what} />
      <Text style={styles.title}>Choose vehicle service you provide for?</Text>
      <Text style={styles.subtitle}>
        Please select vehicles. It will help to find your client faster.
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        style={{ marginTop: 20 }}
      >
        <TouchableOpacity
          style={[
            styles.card,
            selectedVehicles.includes("car") && styles.selectedCard,
          ]}
          onPress={() => toggleVehicleSelect("car")}
        >
          <Ionicons name="car" color="black" size={80} />
          <Text style={styles.text}>Car</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.card,
            selectedVehicles.includes("bike") && styles.selectedCard,
          ]}
          onPress={() => toggleVehicleSelect("bike")}
        >
          <Image style={styles.image} source={bike} />
          <Text style={styles.text}>Motorcycle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.card,
            selectedVehicles.includes("rickshaw") && styles.selectedCard,
          ]}
          onPress={() => toggleVehicleSelect("rickshaw")}
        >
          <Image style={styles.image} source={rickshaw} />
          <Text style={styles.text}>Rickshaw</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.card,
            selectedVehicles.includes("other") && styles.selectedCard,
          ]}
          onPress={() => toggleVehicleSelect("other")}
        >
          <Image style={styles.image} source={other} />
          <Text style={styles.text}>Other</Text>
        </TouchableOpacity>
          </ScrollView>
          
          <View style={{ width: "80%",marginBottom:20 }}>
              <TouchableOpacity onPress={()=>navigation.navigate("Complete")}>
                  <View style={{ width: 60, height: 60, alignSelf: "flex-end", backgroundColor: "#DA4F41", borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
                  <Ionicons name="chevron-forward" color="white" size={30}></Ionicons>
              </View>
              </TouchableOpacity>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
        backgroundColor: "#fff",
    marginTop:30,
  },
  headerImage: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    color: "black",
    fontWeight: "800",
    width: "100%",
    textAlign: "center",
  },
  subtitle: {
    color: "gray",
    marginTop: 20,
    width: "100%",
    textAlign: "center",
    fontSize: 16,
  },
  scrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: 140,
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
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
