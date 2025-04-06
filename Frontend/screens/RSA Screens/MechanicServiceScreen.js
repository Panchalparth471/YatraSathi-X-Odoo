import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import bike from "../../assets/bike.png";
import rickshaw from "../../assets/rickshaw.png";
import other from "../../assets/other.png";
import flat from "../../assets/flat-tire.png";
import key from "../../assets/key.png";
import tow from "../../assets/tow-truck.png";
import engine from "../../assets/engine.png";
import battery from "../../assets/battery.png";
import others from "../../assets/technical-support.png";

export default function MechanicServiceScreen({ navigation }) {
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const services = [
    { key: "Flat Tire", label: "Flat Tire", icon: flat },
    { key: "Tow Truck", label: "Tow Truck", icon: tow },
    { key: "Engine Issue", label: "Engine Issue", icon: engine },
    { key: "Battery", label: "Battery", icon: battery },
    { key: "Key Issue", label: "Key Issue", icon: key },
    { key: "Others", label: "Other", icon: others },
  ];

  const toggleVehicleSelect = (type) => {
    if (selectedVehicles.includes(type)) {
      setSelectedVehicles(selectedVehicles.filter((item) => item !== type));
    } else {
      setSelectedVehicles([...selectedVehicles, type]);
    }
  };

  const toggleServiceSelect = (key) => {
    if (selectedServices.includes(key)) {
      setSelectedServices(selectedServices.filter((item) => item !== key));
    } else {
      setSelectedServices([...selectedServices, key]);
    }
  };

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ display: "flex", justifyContent: "space-between", marginTop: 30 }}>
        <Navbar navigation={navigation} title="Home" />
      </View>

      <ScrollView style={{ width: "100%", height: "100%", padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>Service Provide for</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <TouchableOpacity
            style={[styles.card, selectedVehicles.includes("car") && styles.selectedCard]}
            onPress={() => toggleVehicleSelect("car")}
          >
            <Ionicons name="car" color="black" size={80} />
            <Text style={styles.text}>Car</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, selectedVehicles.includes("bike") && styles.selectedCard]}
            onPress={() => toggleVehicleSelect("bike")}
          >
            <Image style={styles.image} source={bike} />
            <Text style={styles.text}>Motorcycle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, selectedVehicles.includes("rickshaw") && styles.selectedCard]}
            onPress={() => toggleVehicleSelect("rickshaw")}
          >
            <Image style={styles.image} source={rickshaw} />
            <Text style={styles.text}>Rickshaw</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, selectedVehicles.includes("other") && styles.selectedCard]}
            onPress={() => toggleVehicleSelect("other")}
          >
            <Image style={styles.image} source={other} />
            <Text style={styles.text}>Other</Text>
          </TouchableOpacity>
        </ScrollView>

        <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 10 }}>Your Services</Text>

        <View style={styles.servicesContainer}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.key}
              style={[
                styles.serviceCard,
                selectedServices.includes(service.key) && styles.selectedCard,
              ]}
              onPress={() => toggleServiceSelect(service.key)}
            >
              <Image style={styles.image} source={service.icon} />
              <Text style={styles.text}>{service.label}</Text>
            </TouchableOpacity>
          ))}
              </View>
              
              <View style={{marginBottom:50,width:140,height:50,backgroundColor:"#DA4F41",alignItems:"center",justifyContent:"center",alignSelf:"center",borderRadius:15,marginTop:10}}><Text style={{color:"white",fontSize:16,fontWeight:"600"}}>Save</Text></View>
      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
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
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  serviceCard: {
    width: "48%", // Two cards per row with spacing
    height: 150,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#E7E7E7",
    backgroundColor: "white",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
