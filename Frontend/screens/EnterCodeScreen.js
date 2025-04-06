import { View, ScrollView, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import Navbar from "../components/Navbar";
import { useRef, useState } from "react";

export default function EnterCodeScreen({ navigation, route }) {
    const { data } = route.params;
    console.log("data received:", data);

    const [code, setCode] = useState(["", "", "", "", "", ""]); // 6 inputs
    const inputs = useRef([]);

    const handleChangeText = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text && index < inputs.current.length - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyPress = ({ nativeEvent }, index) => {
        if (nativeEvent.key === "Backspace" && code[index] === "" && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const handleVerify = async () => {
        const otp = code.join(""); // Join the 6 digits into a string

        if (otp.length !== 6) {
            Alert.alert("Invalid OTP", "Please enter the 6-digit OTP.");
            return;
        }

        try {
            const response = await fetch('http://192.168.64.54:4000/api/v1/sendotp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data?.tempUser?.email,
                    otp,
                    tempUser: data.tempUser,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert("Success", result.message);

                if (data?.tempUser?.accountType === "Mechanic") {
                    navigation.navigate("Complete"); // Navigate to WhatScreen if accountType is Mechanic
                } else {
                    navigation.navigate("Login"); // Otherwise navigate to Login
                }
            } else {
                Alert.alert("Error", result.message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
    };

    return (
        <View style={{ height: "100%", backgroundColor: "white" }}>
            <View style={{ display: "flex", justifyContent: "space-between", marginTop: 30 }}>
                <Navbar navigation={navigation} title="Verification" />
            </View>

            <ScrollView style={{ width: "100%", height: "100%", marginTop: 30 }}>
                <Text style={{ marginHorizontal: 15, fontSize: 40, fontWeight: "700" }}>
                    Enter your Verification Code
                </Text>

                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 20,
                        width: "100%",
                        paddingHorizontal: 20,
                        paddingVertical: 10
                    }}
                >
                    {[0, 1, 2, 3, 4, 5].map((index) => ( // 6 boxes
                        <View
                            key={index}
                            style={{
                                width: 50,
                                height: 60,
                                borderWidth: 1,
                                borderColor: "red",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 10
                            }}
                        >
                            <TextInput
                                ref={(ref) => (inputs.current[index] = ref)}
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    textAlign: "center",
                                    fontSize: 24
                                }}
                                maxLength={1}
                                keyboardType="number-pad"
                                onChangeText={(text) => handleChangeText(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                value={code[index]}
                            />
                        </View>
                    ))}
                </View>

                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontWeight: "600" }}>
                        We sent a Verification code to your email 
                        <Text style={{ color: "#DA4F41" }}>
                            {data?.tempUser?.email ? `${data.tempUser.email.slice(0, 5)}*****@gmail.com` : ""}
                        </Text>
                        . Check your inbox.
                    </Text>
                </View>

                <TouchableOpacity>
                    <Text
                        style={{
                            marginHorizontal: 20,
                            marginTop: 30,
                            fontSize: 15,
                            color: "#DA4F41",
                            textDecorationLine: "underline",
                            fontWeight: "600"
                        }}
                    >
                        I didn't receive code? Send again
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleVerify}>
                    <View
                        style={{
                            width: 300,
                            height: 50,
                            backgroundColor: "#DA4F41",
                            alignSelf: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 20,
                            borderRadius: 15
                        }}
                    >
                        <Text style={{ color: "white", fontSize: 18 }}>Verify</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
