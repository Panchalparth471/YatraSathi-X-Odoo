import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import Navbar from "../components/Navbar";
import { WebView } from "react-native-webview";

export default function ServiceProviderLocation({ navigation }) {
  const [userLocation, setUserLocation] = useState(null);
  const [mechanicLocation, setMechanicLocation] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [mechanicAddress, setMechanicAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [eta, setEta] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const webviewRef = useRef(null);
  const routeIndexRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchLocations = async () => {
      const storedUserLoc = await AsyncStorage.getItem("userLocation");
      if (storedUserLoc) {
        const parsedUserLoc = JSON.parse(storedUserLoc);
        setUserLocation(parsedUserLoc);

        const initialMechanicLoc = {
          latitude: parsedUserLoc.latitude + 0.005,
          longitude: parsedUserLoc.longitude + 0.005,
        };
        setMechanicLocation(initialMechanicLoc);

        getAddress(parsedUserLoc, setUserAddress);
        getAddress(initialMechanicLoc, setMechanicAddress);

        await fetchRoute(initialMechanicLoc, parsedUserLoc);
        updateETA(parsedUserLoc, initialMechanicLoc);

        setLoading(false);
      } else {
        Alert.alert("Location not found", "User location is missing.");
      }
    };

    fetchLocations();
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (routeCoords.length === 0) return;

    intervalRef.current = setInterval(() => {
      routeIndexRef.current += 1;
      if (routeIndexRef.current >= routeCoords.length) {
        clearInterval(intervalRef.current);
        navigation.navigate("Payment");
        return;
      }

      const nextCoord = routeCoords[routeIndexRef.current];
      const newLoc = {
        latitude: nextCoord[1],
        longitude: nextCoord[0],
      };

      setMechanicLocation(newLoc);
      updateETA(userLocation, newLoc);
      getAddress(newLoc, setMechanicAddress);
      sendLocationUpdateToWebView(userLocation, newLoc);
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, [routeCoords]);

  const fetchRoute = async (from, to) => {
    try {
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${from.longitude},${from.latitude};${to.longitude},${to.latitude}?overview=full&geometries=geojson`
      );
      const data = await res.json();
      if (data.routes && data.routes.length > 0) {
        const coords = data.routes[0].geometry.coordinates;
        setRouteCoords(coords);
      } else {
        Alert.alert("Route error", "No route found.");
      }
    } catch (err) {
      Alert.alert("Route error", "Failed to fetch route.");
    }
  };

  const getAddress = async (location, setAddress) => {
    try {
      const res = await Location.reverseGeocodeAsync(location);
      if (res.length > 0) {
        const addr = res[0];
        const addressStr = `${addr.name || ""}, ${addr.street || ""}, ${addr.city || ""}, ${addr.region || ""}`;
        setAddress(addressStr);
      }
    } catch {
      setAddress("Address not available");
    }
  };

  const updateETA = (user, mechanic) => {
    const distance = getDistance(
      user.latitude,
      user.longitude,
      mechanic.latitude,
      mechanic.longitude
    );
    const speed = 30; // km/h
    const etaMinutes = Math.round((distance / speed) * 60);
    setEta(etaMinutes);
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const deg2rad = (deg) => (deg * Math.PI) / 180;

  const handleCancel = () => {
    Alert.alert("Request Cancelled", "You have cancelled the request.");
    navigation.goBack();
  };

  const sendLocationUpdateToWebView = (user, mechanic) => {
    const data = { user, mechanic, route: routeCoords };
    if (webviewRef.current) {
      webviewRef.current.postMessage(JSON.stringify(data));
    }
  };

  const generateLeafletHTML = () => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <style>
        html, body, #map { height: 100%; margin: 0; padding: 0; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script>
        var map = L.map('map').setView([0, 0], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data © OpenStreetMap contributors'
        }).addTo(map);

        var userMarker, mechanicMarker, routeLine;

        function updateMap(user, mechanic, route) {
          if (userMarker) map.removeLayer(userMarker);
          if (mechanicMarker) map.removeLayer(mechanicMarker);
          if (routeLine) map.removeLayer(routeLine);

          userMarker = L.marker([user.latitude, user.longitude]).addTo(map).bindPopup("You");

          mechanicMarker = L.marker([mechanic.latitude, mechanic.longitude], {
            icon: L.icon({
              iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              iconSize: [30, 30]
            })
          }).addTo(map).bindPopup("Mechanic");

          if (route && route.length > 0) {
            routeLine = L.polyline(route.map(c => [c[1], c[0]]), {
              color: 'blue', weight: 4
            }).addTo(map);
            map.fitBounds(routeLine.getBounds(), { padding: [30, 30] });
          }
        }

        document.addEventListener("message", function(event) {
          const data = JSON.parse(event.data);
          updateMap(data.user, data.mechanic, data.route);
        });
      </script>
    </body>
    </html>
  `;

  if (loading || !userLocation || !mechanicLocation) {
    return <ActivityIndicator size="large" color="#DA4F41" style={{ marginTop: 100 }} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginTop: 30 }}>
        <Navbar navigation={navigation} title="Tracking Mechanic" />
      </View>

      <WebView
        ref={webviewRef}
        originWhitelist={["*"]}
        source={{ html: generateLeafletHTML() }}
        javaScriptEnabled={true}
        style={{ flex: 1 }}
        onLoadEnd={() =>
          sendLocationUpdateToWebView(userLocation, mechanicLocation)
        }
      />

      <View style={styles.infoContainer}>
        <Text style={styles.label}>User Address:</Text>
        <Text style={styles.coords}>{userAddress}</Text>

        <Text style={[styles.label, { marginTop: 10 }]}>Mechanic Address:</Text>
        <Text style={styles.coords}>{mechanicAddress}</Text>

        {eta !== null && (
          <>
            <Text style={[styles.label, { marginTop: 10 }]}>Estimated Time of Arrival:</Text>
            <Text style={styles.coords}>{eta} min</Text>
          </>
        )}

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopColor: "#eee",
    borderTopWidth: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  coords: {
    fontSize: 14,
    color: "#333",
  },
  cancelButton: {
    marginTop: 20,
    backgroundColor: "#DA4F41",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
