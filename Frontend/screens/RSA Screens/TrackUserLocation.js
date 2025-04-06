// TrackUserLocation.js
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { WebView } from "react-native-webview";

export default function TrackUserLocation({ navigation }) {
  const [userLocation, setUserLocation] = useState(null);
  const [mechanicLocation, setMechanicLocation] = useState(null);
  const [loading, setLoading] = useState(true);
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

        await fetchRoute(initialMechanicLoc, parsedUserLoc);

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
        navigation.navigate("Payment"); // Optional: navigate when mechanic reaches
        return;
      }

      const nextCoord = routeCoords[routeIndexRef.current];
      const newLoc = {
        latitude: nextCoord[1],
        longitude: nextCoord[0],
      };

      setMechanicLocation(newLoc);
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

  const sendLocationUpdateToWebView = (userLoc, mechLoc) => {
    if (!webviewRef.current) return;
    webviewRef.current.postMessage(
      JSON.stringify({
        userLocation: userLoc,
        mechanicLocation: mechLoc,
      })
    );
  };

  if (loading || !userLocation || !mechanicLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text>Loading locations...</Text>
      </View>
    );
  }

  const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Tracking Map</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
      <style>
        #map { height: 100vh; width: 100vw; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
      <script>
        var map = L.map('map').setView([${userLocation.latitude}, ${userLocation.longitude}], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        var userMarker = L.marker([${userLocation.latitude}, ${userLocation.longitude}]).addTo(map)
          .bindPopup('Your Location').openPopup();

        var mechanicIcon = L.icon({
          iconUrl: 'https://cdn-icons-png.flaticon.com/512/685/685352.png',
          iconSize: [40, 40],
        });

        var mechanicMarker = L.marker([${mechanicLocation.latitude}, ${mechanicLocation.longitude}], { icon: mechanicIcon }).addTo(map)
          .bindPopup('Mechanic Location');

        // Draw the route (polyline) between mechanic and user
        var routeCoords = ${JSON.stringify(routeCoords.map(([lng, lat]) => [lat, lng]))};
        var routeLine = L.polyline(routeCoords, { color: 'blue', weight: 5 }).addTo(map);

        document.addEventListener("message", function(event) {
          var data = JSON.parse(event.data);
          if (data.mechanicLocation) {
            mechanicMarker.setLatLng([data.mechanicLocation.latitude, data.mechanicLocation.longitude]);
          }
        });
      </script>
    </body>
  </html>
`;


  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        javaScriptEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
