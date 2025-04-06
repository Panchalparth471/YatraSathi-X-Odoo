import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, ActivityIndicator } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Picker } from "@react-native-picker/picker";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(218, 79, 65, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "#DA4F41"
  }
};

export default function RevenueDashboard() {
  const [selectedType, setSelectedType] = useState("weekly");
  const [loading, setLoading] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [total, setTotal] = useState(0);

  const mechanicId = "67f211cab80157a0b830169e";
  const ownerId = "67f210e4b80157a0b8301690";


  const fetchRevenue = async (type) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://172.20.10.7:4000/api/v1/income?type=${type}&ownerId=${ownerId}&mechanicId=${mechanicId}`
      );
        const data = await response.json();
        console.log(data)
      setTotal(data.totalIncome);

      // Replace dummy data with actual data from backend if available.
      const points = Array(7).fill(0).map(() => Math.floor(Math.random() * 1000));
      setIncomeData(points);
    } catch (err) {
      console.error("Failed to fetch revenue:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenue(selectedType);
  }, [selectedType]);

  const labels = {
    weekly: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    monthly: ["W1", "W2", "W3", "W4"],
    quarterly: ["Jan", "Feb", "Mar"]
  };

  const getChartLabels = () => {
    switch (selectedType) {
      case "weekly":
        return labels.weekly;
      case "monthly":
        return labels.monthly;
      case "quarterly":
        return labels.quarterly;
      default:
        return [];
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Revenue Dashboard</Text>

      <Picker
        selectedValue={selectedType}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedType(itemValue)}
      >
        <Picker.Item label="Weekly" value="weekly" />
        <Picker.Item label="Monthly" value="monthly" />
        <Picker.Item label="Quarterly" value="quarterly" />
      </Picker>

      {loading ? (
        <ActivityIndicator size="large" color="#DA4F41" style={{ marginTop: 30 }} />
      ) : (
        <>
          <Text style={styles.total}>Total Revenue Chart:</Text>
          <LineChart
            data={{
              labels: getChartLabels(),
              datasets: [{ data: incomeData }]
            }}
            width={screenWidth - 40}
            height={250}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    height: "100%",
    marginTop: 50
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#DA4F41"
  },
  picker: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20
  },
  total: {
    fontSize: 18,
      marginBottom: 10,
    marginTop:120,
    fontWeight: "600"
  },
  chart: {
    borderRadius: 15
  }
});
