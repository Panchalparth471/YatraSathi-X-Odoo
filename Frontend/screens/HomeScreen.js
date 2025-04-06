import React, { useState, useEffect } from "react";
import { Text, View, Button, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import * as Location from "expo-location";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";
import filter from "../assets/sliders-h-svgrepo-com (2).png";
import man from "../assets/man.png";
import r from "../assets/R.png";
import truck from "../assets/truck3.png";
import WorkerScreen from "./WorkerScreen";

export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [role, setRole] = useState("");
    const [mechanic, setMechanic] = useState(null);

  useEffect(() => {
    loadStoredLocation();
    getLocation();

    const getRole = async () => {
      const token = await AsyncStorage.getItem("auth_token");
      const storedRole = await AsyncStorage.getItem("userRole");
      setRole(storedRole);
      if (!token) {
        navigation.navigate("Login");
      }
    };
     const fetchMechanicDetails = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) return;

        const response = await fetch(`http://172.20.10.7:4000/api/v1/getMechanicDetailById/${userId}`);
        const data = await response.json();
        console.log(response)
        if (data.success) {
          setMechanic(data.mechanic);
        } else {
          console.log('Error fetching mechanic:', data.message);
        }
      } catch (error) {
        console.error('Error fetching mechanic details:', error);
      }
    };

    // fetchMechanicDetails();

    getRole();
  }, []);
  


  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);

    // Save to AsyncStorage
    await AsyncStorage.setItem("userLocation", JSON.stringify(location.coords));
    console.log(await AsyncStorage.getItem("userLocation"));

    // After getting location, call saveLocation API
    saveLocationToServer(location.coords);
  };

  const loadStoredLocation = async () => {
    try {
      const storedLocation = await AsyncStorage.getItem("userLocation");
      if (storedLocation) {
        setLocation(JSON.parse(storedLocation));
      }
    } catch (error) {
      console.error("Error loading stored location:", error);
    }
  };

  // 🆕 Function to save location to server
  const saveLocationToServer = async (coords) => {
    try {
      const userId = await AsyncStorage.getItem("userId"); // assuming you stored userId on login
      if (!userId) {
        console.error("User ID not found in AsyncStorage");
        return;
      }

      const response = await fetch("http://192.168.68.136:4000/api/v1/save-location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          latitude: coords.latitude,
          longitude: coords.longitude,
        }),
      });

      const data = await response.json();
      if (data.success) {
        console.log("Location saved successfully:", data.location);
      } 
    } catch (error) {
      console.error("Error saving location to server:", error);
    }
  };

  return (
    
   
    <View style={{ height: "100%", backgroundColor: "white" }}>
      {role === "Worker" ? (<WorkerScreen />) : (
        <>
          <View style={{display:"flex",justifyContent:"space-between",marginTop:30}}>
                <View>
                     <Navbar navigation={navigation} title="Home" />
                </View>
        </View>
        <ScrollView style={{width:"100%",height:"100%"}}>
        
        {role === "User" ? (
        <View style={{ display: "flex", padding: 20, width: "100%", alignItems: "center" }}>
          <View style={{width:"100%",display:"flex",flexDirection:"row",alignItems:"center",gap:"10"}}>
          <View style={{width:"75%",padding:15,display:"flex",flexDirection:"row",borderRadius:25,alignSelf:"flex-start",marginLeft:5}}>
              <Ionicons name="search-outline" size={40}></Ionicons>
              <TextInput style={{fontSize:18,width:"85%",borderRadius:25}} multiline={false} numberOfLines={1} returnKeyType="search"  placeholder="Search Services"></TextInput>
          </View>
            <View style={{ width: 65, height: 65, borderRadius: 100, backgroundColor: "#DA4F41",display:"flex",justifyContent:"center",alignItems:"center" }}>
              <Image style={{width:30,height:30}} source={filter}></Image>
            </View>
          </View>
          

          <View style={{ display: "flex",backgroundColor:"#E7E7E7",width:"100%",borderRadius:10 ,padding:20, height:200, marginTop:30,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
            <View style={{width:"60%"}}>
              <Text style={{ fontSize: 22, fontWeight: 600 }}>Get services from your location</Text>
              <TouchableOpacity onPress={()=>navigation.navigate("Service")}>
                <View style={{display:"flex", flexDirection:"row", justifyContent:"center",marginTop:20, borderRadius:20,backgroundColor:"#DA4F41",width:110,padding:8}}><Text style={{color:"white",fontSize:12}}>Find Service</Text></View>
              </TouchableOpacity>
            </View>

            <View style={{width:"40%"}}>
              <Image style={{width:140,height:220,marginBottom:20}} source={man}></Image>
            </View>
          </View>


          <View style={{width:"100%",marginTop:30}}> 
            <Text style={{ alignSelf: "flex-start", fontSize: 18, fontWeight: 700 }}>Book a Service</Text>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
              <View style={{display:"flex",justifyContent:"center",alignItems:"center",width:"48%",height:200,borderRadius:15,borderWidth:2,borderColor:"#E7E7E7"}}>
                <Image style={{ width: 80, height: 80,marginBottom:20 }} source={r}></Image>
                <Text style={{fontSize:20,fontWeight:600}}>Vehicle Service</Text>
              </View>
               <View style={{display:"flex",justifyContent:"center",alignItems:"center",width:"48%",height:200,borderRadius:15,borderWidth:2,borderColor:"#E7E7E7"}}>
                <Image style={{ width: 80, height: 80,marginBottom:20 }} source={truck}></Image>
                <Text style={{fontSize:20,fontWeight:600}}>RSA Service</Text>
              </View>
            </View>
          </View>
          <View style={{ width: "100%", marginTop: 30 }}>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between", alignSelf: "flex-start", width: "100%" }}>
              <Text style={{ alignSelf: "flex-start", fontSize: 18, fontWeight: 700 }}>Near you</Text>
              <Text style={{color:"#DA4F41",fontWeight:700}}>See all</Text>
            </View>

            {/* Mechanic Component Start */}
            <TouchableOpacity onPress={()=>navigation.navigate("RequestService")}>
              <View style={{ width: "100%",borderWidth:1,marginTop:5,borderColor:"#E7E7E7",borderRadius:15, height: 120,padding:8,display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
              <View style={{ width: "28%", height: "100%", borderRadius: 15, backgroundColor: "#DA4F41",display:"flex",justifyContent:"center",alignItems:"center" }}>
                <View style={{ width: 50, height: 50, backgroundColor: "white", borderRadius: 100,display:"flex",justifyContent:"center",alignItems:"center" }}>
                  <Ionicons name="car" color="black" size={30}></Ionicons>
                </View>
              </View>
              <View style={{ width: "68%", height: "100%", display: "flex", justifyContent: "space-between"}}>
                <View style={{ width: "100%", height: "30%", padding: 5,display:"flex",flexDirection:"row",justifyContent:"space-between" }}>
                  <View style={{display:"flex",flexDirection:"row",gap:5,alignItems:"center"}}>
                    <View><Ionicons name="time" color="#DA4F41" size={18}></Ionicons></View>
                    <View><Text style={{color:"gray",fontWeight:500}}>8am - 5pm</Text></View>
                  </View>
                  <View style={{display:"flex",flexDirection:"row",gap:5,alignItems:"center"}}>
                    <View><Ionicons name="star" color="#DA4F41" size={18}></Ionicons></View>
                    <View><Text style={{fontWeight:500}}>4.5</Text></View>
                  </View>
                </View>
                <View style={{ width: "100%",display:"flex",justifyContent:"flex-end",paddingBottom:8 , height: "70%", padding: 2,gap:5 }}>
                  <View><Text style={{fontSize:18,fontWeight:600}}>Gotham Car Reparation</Text></View>
                  <View style={{width:"100%"}}><Text style={{width:"100%",fontSize:12,color:"gray",fontWeight:500}}>House 57, Road 8, Block A, Bringham</Text></View>
                 </View>
              </View>
            </View>
            </TouchableOpacity>
            {/* Mechanic Component End */}
             

          </View>
        </View>
        ) : (
            <>
<View style={{ height: 150, justifyContent: "center", alignItems: "center" }}>
  {/* Red Box (base) */}
  <View style={{
    height: 100,
    backgroundColor: "#DA4F41",
    padding: 20,
    width: "90%",
    alignItems: "center",
    borderRadius: 15,
    zIndex: 1
  }}>
    <Text style={{ fontSize: 18, color: "white" }}>Akshar Car Reparation</Text>
  </View>

  {/* Black Box (on top, overlapping) */}
  <View style={{
    position: "absolute",
    top: 80,
                  backgroundColor: "white",
    elevation:5,
    width: "84%",
    height: 100,
                  borderRadius: 10,
                  padding: 20,
                  display: "flex",
                  flexDirection: "row",
    alignItems:"center",
    zIndex: 2
                }} >
                  <View style={{ height: "100%", width: "64%",justifyContent:"space-between" }}>
                    <View style={{ display: "flex", flexDirection: "row",gap:5 }}>
                      <Ionicons name="location" size={20} color="#DA4F41" />
                      <Text style={{fontWeight:600}}>Dumas Road, Surat</Text>
                    </View>
                     <View style={{ display: "flex", flexDirection: "row",gap:5 }}>
                      <Ionicons name="time" size={20} color="#DA4F41" />
                      <Text style={{fontWeight:600}}>08:00 AM - 05:00PM</Text>
                    </View>
                  </View>
                 
                  <View style={{ display: "flex", flexDirection: "row",alignItems:"center",justifyContent:"space-between" }}>
                    <View style={{ height: 60, width: 3, backgroundColor: "#E7E7E7", borderRadius: 10 }}></View>
                    <View style={{width:100,display:"flex",alignItems:"center",backgroundColor:"#DA4F41",marginLeft:7,padding:7,borderRadius:20}}><Text style={{color:"white"}}>Available</Text></View>
                  </View>

                  
                </View>
              
              </View>
              <View style={{width:"90%", marginTop: 50,height:"auto",alignSelf:"center"}}>
                <Text style={{ fontSize: 18, fontWeight: 700 }}>Service Request List</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("ClientIssue")}>
                {/*Request Component Starts */}
                <View style={{ width: "100%", height: 80, borderWidth: 1, borderColor: "#E7E7E7", marginTop: 10, borderRadius: 10,padding:10,gap:1,justifyContent:"center" }}>
                  <Text style={{ fontSize: 14, fontWeight: 600 }}>Mr Parth</Text>
                  <Text style={{ color: "gray", fontSize: 10,fontWeight:"500" }}>Car | Toyata | Innova | Petrol | DL 01 MN 5632</Text>
                   <View style={{ width: "100%", display: "flex", flexDirection: "row",marginTop:5,gap:10 }}>
                    <TouchableOpacity>
                      <View style={{ width: 60, height: 20, borderWidth: 1, borderColor: "red", borderRadius: 10,display:"flex",justifyContent:"center",alignItems:"center" }}>
                      <Text style={{color:"red"}}>Decline</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate("Available")}}>
                       <View style={{ width: 60, height: 20, borderWidth: 1, borderColor: "green", borderRadius: 10,display:"flex",justifyContent:"center",alignItems:"center" }}>
                      <Text style={{color:"green"}}>Accept</Text>
                  </View>
                    </TouchableOpacity>
                   
                </View>
                  </View>
                  </TouchableOpacity>
                {/*Request Component Starts */}
                
                {/*Request Component Starts */}
                  <TouchableOpacity onPress={()=>navigation.navigate("ClientIssue")}>
                <View style={{ width: "100%", height: 80, borderWidth: 1, borderColor: "#E7E7E7", marginTop: 10, borderRadius: 10,padding:10,gap:1,justifyContent:"center" }}>
                  <Text style={{ fontSize: 14, fontWeight: 600 }}>Mr Samarth</Text>
                  <Text style={{ color: "gray", fontSize: 10,fontWeight:"500" }}>Car | Toyata | Innova | Petrol | DL 01 MN 5632</Text>
                   <View style={{ width: "100%", display: "flex", flexDirection: "row",marginTop:5,gap:10 }}>
                    <TouchableOpacity>
                      <View style={{ width: 60, height: 20, borderWidth: 1, borderColor: "red", borderRadius: 10,display:"flex",justifyContent:"center",alignItems:"center" }}>
                      <Text style={{color:"red"}}>Decline</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>{navigation.navigate("Available")}}>
                       <View style={{ width: 60, height: 20, borderWidth: 1, borderColor: "green", borderRadius: 10,display:"flex",justifyContent:"center",alignItems:"center" }}>
                      <Text style={{color:"green"}}>Accept</Text>
                  </View>
                    </TouchableOpacity>
                   
                </View>
                  </View>
                  </TouchableOpacity>
                {/*Request Component Ends */}
                
                   <TouchableOpacity onPress={()=>navigation.navigate("ClientIssue")}>
                {/*Request Component Starts */}
                <View style={{ width: "100%", height: 80, borderWidth: 1, borderColor: "#E7E7E7", marginTop: 10, borderRadius: 10,padding:10,gap:1,justifyContent:"center" }}>
                  <Text style={{ fontSize: 14, fontWeight: 600 }}>Mr Samarth</Text>
                  <Text style={{ color: "gray", fontSize: 10,fontWeight:"500" }}>Car | Toyata | Innova | Petrol | DL 01 MN 5632</Text>
                   <View style={{ width: "100%", display: "flex", flexDirection: "row",marginTop:5,gap:10 }}>
                    <TouchableOpacity>
                      <View style={{ width: 60, height: 20, borderWidth: 1, borderColor: "red", borderRadius: 10,display:"flex",justifyContent:"center",alignItems:"center" }}>
                      <Text style={{color:"red"}}>Decline</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>{navigation.navigate("Available")}}>
                       <View style={{ width: 60, height: 20, borderWidth: 1, borderColor: "green", borderRadius: 10,display:"flex",justifyContent:"center",alignItems:"center" }}>
                      <Text style={{color:"green"}}>Accept</Text>
                  </View>
                    </TouchableOpacity>
                   
                </View>
                </View>
                  {/*Request Component Ends */}
                  </TouchableOpacity>
                  <Text style={{ fontSize: 18, fontWeight: 700,marginTop:20 }}>Past Services</Text>
               
                {/*Request Component Starts */}
                <View style={{ width: "100%", height: 80, borderWidth: 1, borderColor: "#E7E7E7", marginTop: 10, borderRadius: 10,padding:10,gap:1,justifyContent:"center" }}>
                  <Text style={{ fontSize: 14, fontWeight: 600 }}>Mr Pankeet</Text>
                  <Text style={{ color: "gray", fontSize: 10,fontWeight:"500" }}>Car | Toyata | Innova | Petrol | DL 01 MN 5632</Text>
                   <View style={{ width: "100%", display: "flex", flexDirection: "row",marginTop:5,gap:10 }}>
                    <TouchableOpacity>
                      <View style={{ width: 60, height: 20,backgroundColor:"#DA4F41",  borderRadius: 10,display:"flex",justifyContent:"center",alignItems:"center" }}>
                      <Text style={{color:"white"}}>Done</Text>
                    </View>
                    </TouchableOpacity>
                   
                   
                </View>
                </View>
                {/*Request Component Ends */}
               
              </View>

              
              </>
       )}


  
        
      </ScrollView>
       {/*Footer*/}
      <View style={{display:"flex",justifyContent:"space-between"}}>
                <View>
                     <Footer></Footer>
                </View>
        </View>
</>
        )}
      
      </View>
  );
}
