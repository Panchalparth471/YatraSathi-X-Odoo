import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";

export default function Footer() {
  const navigation = useNavigation();
  const route = useRoute();

  const [role, setRole] = useState(null);

  useEffect(() => {
    const getRole = async () => {
      const storedRole = await AsyncStorage.getItem("userRole");
      setRole(storedRole);
    };
    getRole();
  }, []);

  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 60, backgroundColor: "#fff", elevation: 5, paddingHorizontal: 30 }}>
      
      {/* Home Button */}
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <View style={{ position: "relative", alignItems: "center", justifyContent: "center",display:"flex",flexDirection:"row",gap:8 }}>
          {/* Background Box */}
          {route.name === "Home" && (
                      <View style={{ 
                display:"flex",flexDirection:"row",
              position: "absolute", 
              backgroundColor: "#DA4F41", 
              width: 120, 
              height: 45, 
              borderRadius: 25, 
                          zIndex: 0,
                          gap: 8,
            
            }} />
          )}
          {/* Icon & Text */}
          <Ionicons name="home" size={30} color={route.name === "Home" ? "white" : "gray"} style={{ zIndex: 1 }} />
          {route.name === "Home" && <Text style={{ color: "white", fontSize: 12, zIndex: 1 }}>Home</Text>}
        </View>
      </TouchableOpacity>

      {role === "user" ? (
          <TouchableOpacity onPress={() => navigation.navigate("Vehicle")}>
        <View style={{ position: "relative", alignItems: "center", justifyContent: "center",display:"flex",flexDirection:"row",gap:8 }}>
          {route.name === "Vehicle" && (
            <View style={{ display:"flex",flexDirection:"row",gap:8, position: "absolute", backgroundColor: "#DA4F41", width: 120, height: 50, borderRadius: 25, zIndex: 0 }} />
          )}
          <Ionicons name="car" size={30} color={route.name === "Vehicle" ? "white" : "gray"} style={{ zIndex: 1 }} />
          {route.name === "Vehicle" && <Text style={{ color: "white", fontSize: 12, zIndex: 1 }}>Vehicle</Text>}
        </View>
      </TouchableOpacity>
      ) : (
              <TouchableOpacity onPress={() => navigation.navigate("MechanicService")}>
        <View style={{ position: "relative", alignItems: "center", justifyContent: "center",display:"flex",flexDirection:"row",gap:8 }}>
          {route.name === "MechanicService" && (
            <View style={{ display:"flex",flexDirection:"row",gap:8, position: "absolute", backgroundColor: "#DA4F41", width: 120, height: 50, borderRadius: 25, zIndex: 0 }} />
          )}
          <Ionicons name="settings-outline" size={30} color={route.name === "MechanicService" ? "white" : "gray"} style={{ zIndex: 1 }} />
          {route.name === "MechanicService" && <Text style={{ color: "white", fontSize: 12, zIndex: 1 }}>Service</Text>}
        </View>
      </TouchableOpacity>
      )}
      {/* Car Service Button */}
  

      {/* Service Button */}
      {role === "user" ? (
       <TouchableOpacity onPress={() => navigation.navigate("Service")}>
        <View style={{position: "relative", alignItems: "center", justifyContent: "center",display:"flex",flexDirection:"row",gap:8}}>
          {route.name === "Service" && (
            <View style={{  display:"flex",flexDirection:"row",gap:8,position: "absolute", backgroundColor: "#DA4F41", width: 120, height: 45, borderRadius: 25, zIndex: 0 }} />
          )}
          <Ionicons name="build" size={30} color={route.name === "Service" ? "white" : "gray"} style={{ zIndex: 1 }} />
          {route.name === "Service" && <Text style={{ color: "white", fontSize: 12, zIndex: 1 }}>Service</Text>}
        </View>
      </TouchableOpacity>
      ) : (
            <TouchableOpacity onPress={() => navigation.navigate("Track")}>
        <View style={{position: "relative", alignItems: "center", justifyContent: "center",display:"flex",flexDirection:"row",gap:8}}>
          {route.name === "Track" && (
            <View style={{  display:"flex",flexDirection:"row",gap:8,position: "absolute", backgroundColor: "#DA4F41", width: 120, height: 45, borderRadius: 25, zIndex: 0 }} />
          )}
          <Ionicons name="map-outline" size={30} color={route.name === "Track" ? "white" : "gray"} style={{ zIndex: 1 }} />
          {route.name === "Track" && <Text style={{ color: "white", fontSize: 12, zIndex: 1 }}>Track</Text>}
        </View>
      </TouchableOpacity>
     )}

      {/* Profile Button */}
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <View style={{position: "relative", alignItems: "center", justifyContent: "center",display:"flex",flexDirection:"row",gap:8 }}>
          {route.name === "Profile" && (
            <View style={{display:"flex",flexDirection:"row",gap:8,  position: "absolute", backgroundColor: "#DA4F41", width: 120, height: 45, borderRadius: 25, zIndex: 0 }} />
          )}
          <Ionicons name="person" size={30} color={route.name === "Profile" ? "white" : "gray"} style={{ zIndex: 1 }} />
          {route.name === "Profile" && <Text style={{ color: "white", fontSize: 12, zIndex: 1 }}>Profile</Text>}
        </View>
      </TouchableOpacity>

    </View>
  );
}
