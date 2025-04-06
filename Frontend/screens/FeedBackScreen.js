import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import Navbar from "../components/Navbar";
import { Ionicons } from "@expo/vector-icons";

export default function FeedBackScreen({ navigation }) {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const handleStarPress = (index) => {
    setRating(index + 1);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginTop: 30 }}>
        <Navbar navigation={navigation} title="Feedback" />
      </View>

      <ScrollView style={{ width: "100%" }}>
        <View style={styles.container}>
          <View
            style={{
              width: 100,
              height: 100,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#DA4F41",
              borderRadius: 100,
            }}
          >
            <Ionicons name="build" color="white" size={40} />
          </View>

          <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 10 }}>
            Akshar Car Reparation
          </Text>
          <Text style={{ color: "gray" }}>NCR Delhi</Text>

          <Text style={{ fontSize: 25, fontWeight: "700", marginTop: 40 }}>
            How is your experience?
          </Text>
          <Text style={{ fontSize: 16, color: "gray", fontWeight: "500" }}>
            Your Feedback will help us improve
          </Text>

          <View style={styles.starsRow}>
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
                <Ionicons
                  name="star"
                  size={40}
                  color={index < rating ? "#DA4F41" : "#ccc"}
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Additional comments"
              value={message}
              onChangeText={setMessage}
              multiline
              style={styles.input}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.confirmWrapper}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <View style={styles.confirmButton}>
                <Text style={styles.confirmText}>Submit Review</Text>
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
  starsRow: {
    flexDirection: "row",
    marginTop: 30,
  },
  inputWrapper: {
    width: "100%",
    height: 150,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
  },
  input: {
    width: "100%",
    height: "100%",
    fontSize: 16,
    color: "#333",
  },
  confirmWrapper: {
    width: "100%",
    marginTop: 30,
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
