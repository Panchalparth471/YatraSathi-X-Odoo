import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function AvailableWorkerScreen() {
  const [workers, setWorkers] = useState([
    { id: 1, name: "Mr Dhruv", phone: "9876543210", status: "Free" },
    { id: 2, name: "Mr Rahul", phone: "9876543211", status: "Busy" },
    { id: 3, name: "Mr Aryan", phone: "9876543212", status: "Free" },
    { id: 4, name: "Mr Deepak", phone: "9876543213", status: "Busy" },
  ]);

  const handleAssign = (workerId) => {
    setWorkers(prevWorkers =>
      prevWorkers.map(worker =>
        worker.id === workerId ? { ...worker, status: "Busy" } : worker
      )
    );
    alert("Worker assigned successfully!");
  };

  const handleCancelRequest = () => {
    alert("Request has been cancelled.");
    // You can also navigate back or reset here if needed
  };

  // Filter only available (Free) workers
  const availableWorkers = workers.filter(worker => worker.status === "Free");

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 20, marginTop: 20 }}>
      <Navbar title="Available Workers" />
      
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 20 }}>
        Available Workers
      </Text>

      <ScrollView>
        {availableWorkers.length > 0 ? (
          availableWorkers.map((worker) => (
            <View
              key={worker.id}
              style={{
                borderWidth: 1,
                borderColor: "#E7E7E7",
                borderRadius: 10,
                padding: 15,
                marginBottom: 15,
                backgroundColor: "#F9F9F9",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "600" }}>{worker.name}</Text>
              <Text style={{ fontSize: 14, marginTop: 5 }}>Phone: {worker.phone}</Text>

              <TouchableOpacity
                onPress={() => handleAssign(worker.id)}
                style={{
                  marginTop: 10,
                  backgroundColor: "#DA4F41",
                  paddingVertical: 10,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "600" }}>Assign</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text style={{ fontSize: 16, color: "gray", marginBottom: 20 }}>
              No available workers.
            </Text>
            <TouchableOpacity
              onPress={handleCancelRequest}
              style={{
                backgroundColor: "#DA4F41",
                paddingVertical: 12,
                paddingHorizontal: 30,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
                Cancel Request
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
