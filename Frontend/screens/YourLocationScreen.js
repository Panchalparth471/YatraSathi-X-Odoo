import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Navbar from "../components/Navbar";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

export default function YourLocationScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [loading, setLoading] = useState(true);

  const getAddress = async (latitude, longitude) => {
    try {
      const address = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (address.length > 0) {
        const addr = address[0];

        setCity(addr.city || addr.subregion || "");
        setDistrict(addr.district || addr.region || "");

        const fullAddress = `${addr.name || ""} ${addr.street || ""}, ${addr.city || ""}, ${addr.region || ""} ${addr.postalCode || ""}`;
        setAddressLine(fullAddress.trim());
      }
    } catch (err) {
      console.error("Error getting address:", err);
    }
  };

  const fetchCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required to continue.");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

      const newLocation = { latitude, longitude };

      setLocation(newLocation);
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      await getAddress(latitude, longitude);
    } catch (err) {
      console.error("Failed to get location:", err);
    }
  };

  useEffect(() => {
    const initLocation = async () => {
      try {
        const storedLocation = await AsyncStorage.getItem("userLocation");
        if (storedLocation) {
          const parsed = JSON.parse(storedLocation);
          setLocation(parsed);
          setRegion({
            latitude: parsed.latitude,
            longitude: parsed.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          await getAddress(parsed.latitude, parsed.longitude);
        } else {
          await fetchCurrentLocation();
        }
      } catch (err) {
        console.error("Error loading location from storage:", err);
      } finally {
        setLoading(false);
      }
    };

    initLocation();
  }, []);

  const handleConfirmLocation = async () => {
    try {
      if (location) {
        await AsyncStorage.setItem("userLocation", JSON.stringify(location));

        const routes = navigation.getState()?.routes;
        const previousRoute = routes?.[routes.length - 2]?.name;
        console.log(previousRoute);

        if (previousRoute === "Complete") {
          navigation.navigate("Complete", {
            selectedCity: city,
            selectedDistrict: district,
            selectedAddress: addressLine,
          });
        } else {
          navigation.navigate("AddDetails");
        }
      }
    } catch (err) {
      console.error("Failed to save location:", err);
    }
  };

  const handleRefreshLocation = async () => {
    setLoading(true);
    await fetchCurrentLocation();
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginTop: 30 }}>
        <Navbar navigation={navigation} title="Your Location" />
      </View>

      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {loading ? (
          <ActivityIndicator size="large" color="#DA4F41" style={{ marginTop: 100 }} />
        ) : (
          <>
            <MapView
              style={{ width: "100%", height: 500, borderRadius: 10 }}
              region={region}
              showsUserLocation
              loadingEnabled
            >
              <Marker coordinate={region} />
            </MapView>

            <View
              style={{
                width: "30%",
                height: 10,
                backgroundColor: "#E7E7E7",
                marginTop: 20,
                borderRadius: 20,
              }}
            />

            <View
              style={{
                marginTop: 20,
                alignItems: "flex-start",
                width: "100%",
                padding: 20,
                gap: 10,
              }}
            >
              <View style={styles.row}>
                <Ionicons size={20} color="#DA4F41" name="compass" />
                <Text style={styles.value}>{city}</Text>
              </View>

              <View style={styles.row}>
                <Ionicons color="#DA4F41" size={20} name="location" />
                <Text style={styles.value}>{district}</Text>
              </View>

              <View style={styles.row}>
                <Ionicons color="#DA4F41" size={20} name="home" />
                <Text style={styles.value}>{addressLine}</Text>
              </View>
            </View>

            <View
              style={{
                borderTopWidth: 1,
                borderColor: "#E7E7E7",
                width: "100%",
                padding: 20,
              }}
            >
              <TouchableOpacity onPress={handleConfirmLocation}>
                <View style={styles.confirmButton}>
                  <Text style={styles.confirmText}>Confirm Location</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleRefreshLocation} style={{ marginTop: 10 }}>
                <View style={styles.refreshButton}>
                  <Text style={styles.refreshText}>Refresh Location</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  value: {
    fontSize: 16,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  confirmButton: {
    width: "100%",
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
  refreshButton: {
    width: "100%",
    borderRadius: 10,
    height: 45,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  refreshText: {
    fontSize: 16,
    color: "#DA4F41",
    fontWeight: "500",
  },
});
