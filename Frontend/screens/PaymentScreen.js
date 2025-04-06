import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

export default function PaymentScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('razorpay'); // default selected

  const handlePayment = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount.");
      return;
    }

    if (method === 'cash') {
      Alert.alert("Cash Selected", "Please pay the mechanic in cash.");
      navigation.navigate("Feedback"); // or next screen
      return;
    }

    const options = {
      description: 'Mechanic Service Payment',
      image: 'https://your-app-logo-url.com/logo.png',
      currency: 'INR',
      key: 'rzp_test_YourApiKeyHere', // Replace with your Razorpay key
      amount: numericAmount * 100,
      name: 'AutoFix',
      prefill: {
        email: 'user@example.com',
        contact: '9999999999',
        name: 'John Doe',
      },
      theme: { color: '#DA4F41' },
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        Alert.alert("Payment Success", `Payment ID: ${data.razorpay_payment_id}`);
        navigation.navigate("Feedback");
      })
      .catch((error) => {
        Alert.alert("Payment Failed", error.description || "Something went wrong");
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Complete Your Payment</Text>

      <TextInput
        style={styles.input}
        placeholder="₹ Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.subtitle}>Select Payment Method:</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.methodButton,
            method === 'razorpay' && styles.selectedButton
          ]}
          onPress={() => setMethod('razorpay')}
        >
          <Text style={method === 'razorpay' ? styles.selectedText : styles.methodText}>
            Razorpay
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.methodButton,
            method === 'cash' && styles.selectedButton
          ]}
          onPress={() => setMethod('cash')}
        >
          <Text style={method === 'cash' ? styles.selectedText : styles.methodText}>
            Cash
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payText}>Pay Now</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    fontSize: 18,
    borderRadius: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  methodButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#DA4F41',
    borderColor: '#DA4F41',
  },
  methodText: {
    color: '#333',
    fontWeight: '600',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#DA4F41',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  payText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
