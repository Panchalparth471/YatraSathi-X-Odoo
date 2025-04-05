import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Navbar = ({ title = "Home" }) => {
  const navigation = useNavigation(); // Get navigation context

  return (
    <View style={styles.navbar}>
      {/* Left Hamburger Menu */}
      
       {
          (title === "Home" || title === "My Vehicle" || title === "Service") ? (
            <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.icon}
      >
              <Ionicons name="menu" size={30} color="black" />
                 </TouchableOpacity>
          ) : (
               <TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Home")}>
  <Ionicons name="arrow-back" size={30} color="black" />
</TouchableOpacity>
  )
}

       
   

      {/* Center Title (positioned absolutely) */}
      {(title !== "Home" && title !== "Service") && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}

      {/* Right side options (for Home or Service screens) */}
      {(title === "Home" || title === "Service") && (
        <View style={styles.notificationContainer}>
          <TouchableOpacity>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={17} color="#DA4F41" />
              <Text style={styles.locationText}>Delhi</Text>
              <Ionicons name="chevron-down" style={{ marginLeft: 8 }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="notifications" size={26} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingHorizontal: 15,
  },
  titleContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  icon: {
    padding: 5,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
  },
});

export default Navbar;
