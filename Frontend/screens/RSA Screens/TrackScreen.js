import { View, ScrollView, TouchableOpacity, Text, TextInput } from "react-native";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TrackScreen({ navigation }) {
  const [workers, setWorkers] = useState([
    { id: 1, name: "Mr Samarth", phone: "9876543210", status: "Free" },
    { id: 2, name: "Mr Rahul", phone: "9876543211", status: "Busy" },
    { id: 3, name: "Mr Aryan", phone: "9876543212", status: "Busy" },
    { id: 4, name: "Mr Deepak", phone: "9876543213", status: "Free" },
  ]);

  const [newWorkerName, setNewWorkerName] = useState("");
  const [newWorkerPhone, setNewWorkerPhone] = useState("");

  const handleAddWorker = () => {
    if (newWorkerName.trim() !== "" && newWorkerPhone.trim() !== "") {
      setWorkers([
        ...workers,
        {
          id: workers.length + 1,
          name: newWorkerName,
          phone: newWorkerPhone,
          status: "Free",
        },
      ]);
      setNewWorkerName("");
      setNewWorkerPhone("");
    }
  };

  const handleDeleteWorker = (workerId) => {
    setWorkers(workers.filter((worker) => worker.id !== workerId));
  };

  const handleCheckLocation = (worker) => {
    // Navigate to TrackUserLocation instead of WorkerLocationScreen
    navigation.navigate("TrackUserLocation");
  };

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <View style={{ marginTop: 30 }}>
        <Navbar navigation={navigation} title="Track Workers" />
      </View>

      <ScrollView style={{ width: "100%", padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>Workers List</Text>

        {workers.map((worker) => (
          <View
            key={worker.id}
            style={{
              width: "100%",
              borderWidth: 1,
              borderColor: "#E7E7E7",
              marginTop: 10,
              borderRadius: 10,
              padding: 10,
              gap: 5,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "600" }}>{worker.name}</Text>
            <Text style={{ fontSize: 12, fontWeight: "500", marginTop: 3 }}>
              Phone: {worker.phone}
            </Text>
            <Text
              style={{
                color: worker.status === "Busy" ? "#DA4F41" : "green",
                fontSize: 12,
                fontWeight: "600",
                marginTop: 5,
              }}
            >
              Status: {worker.status}
            </Text>

            {worker.status === "Busy" && (
              <TouchableOpacity
                onPress={() => handleCheckLocation(worker)}
                style={{ marginTop: 10 }}
              >
                <View
                  style={{
                    width: 140,
                    height: 30,
                    backgroundColor: "#DA4F41",
                    borderRadius: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "600" }}>Check Location</Text>
                </View>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => handleDeleteWorker(worker.id)}
              style={{ marginTop: 10 }}
            >
              <View
                style={{
                  width: 140,
                  height: 30,
                  backgroundColor: "#DA4F41",
                  borderRadius: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                  <Text style={{ color: "white", fontWeight: "600" }}>Delete Worker</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}

        <Text style={{ fontSize: 18, fontWeight: "700", marginTop: 20 }}>Add Worker</Text>

        <View
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: "#E7E7E7",
            marginTop: 10,
            borderRadius: 10,
            padding: 10,
            gap: 10,
          }}
        >
          <TextInput
            value={newWorkerName}
            onChangeText={setNewWorkerName}
            placeholder="Enter worker name"
            style={{
              borderWidth: 1,
              borderColor: "#E7E7E7",
              borderRadius: 8,
              padding: 10,
              fontSize: 14,
            }}
          />

          <TextInput
            value={newWorkerPhone}
            onChangeText={setNewWorkerPhone}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            style={{
              borderWidth: 1,
              borderColor: "#E7E7E7",
              borderRadius: 8,
              padding: 10,
              fontSize: 14,
              marginTop: 10,
            }}
          />

          <TouchableOpacity onPress={handleAddWorker}>
            <View
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "#DA4F41",
                borderRadius: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>Add Worker</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
}
