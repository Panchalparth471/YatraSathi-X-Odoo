import React, { useState, useEffect } from "react";
import { Text, View, Button,ScrollView,Image, TouchableOpacity,StyleSheet } from "react-native";
import * as Location from "expo-location";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import filter from "../assets/sliders-h-svgrepo-com (2).png"
import { TextInput } from "react-native-gesture-handler";
import man from "../assets/man.png";
import r from "../assets/R.png";
import truck from "../assets/truck3.png";
export default function ChooseProvider({navigation}) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    loadStoredLocation(); // Load saved location when the screen opens
    getLocation(); // Get new location when the screen loads
  }, []);

  // Get location and store in AsyncStorage
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);

    // Save location to AsyncStorage
      await AsyncStorage.setItem("userLocation", JSON.stringify(location.coords));
     console.log(await AsyncStorage.getItem("userLocation"))
  };

  // Load stored location from AsyncStorage
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

  return (
    <View style={{height:"100%",backgroundColor:"white"}}>
        <View style={{display:"flex",justifyContent:"space-between",marginTop:30}}>
                <View>
                     <Navbar navigation={navigation} title="Choose your Service Provider" />
                </View>
        </View>
        <ScrollView style={{width:"100%",height:"100%"}}>
          
        <View style={{ display: "flex", padding: 20, width: "100%", alignItems: "center" }}>
                  <View style={{ width:"100%",display: "flex", flexDirection: "row",justifyContent:"space-between" }}>
                      <Text style={{ fontSize: 16, fontWeight: 700 }}>Service provider near by you</Text>
                      <View style={{ display: "flex", flexDirection: "row",alignItems:"center" }}>
                      <Ionicons name="location" size={17} color="#DA4F41" />
                                     <Text style={styles.locationText}>Delhi</Text>
                                     <Ionicons name="chevron-down" style={{ marginLeft: 8 }} />
                      </View>
         </View>
          
                  
          <View style={{ width: "100%", marginTop: 10 }}>
            
                      {/* Mechanic Component Start */}
                      <TouchableOpacity onPress={() => navigation.navigate("RequestConfirmation")}>
            <View   style={{ width: "100%",borderWidth:1,marginTop:5,borderColor:"#E7E7E7",borderRadius:15, height:130,padding:8,display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:10}}>
              <View style={{ width: "28%", height: "100%", borderRadius: 15, backgroundColor: "#DA4F41",display:"flex",justifyContent:"center",alignItems:"center" }}>
                <View style={{ width: 50, height: 50, backgroundColor: "white", borderRadius: 100,display:"flex",justifyContent:"center",alignItems:"center" }}>
                  <Ionicons name="build" color="black" size={30}></Ionicons>
                </View>
              </View>
              <View style={{ width: "68%", height: "100%", display: "flex", justifyContent: "space-evenly"}}>
                <View style={{ width: "100%",display:"flex",justifyContent:"flex-end" , height: "40%", padding: 2,gap:5 }}>
                  <View><Text style={{fontSize:18,fontWeight:600}}>Gotham Car Reparation</Text></View>
                  <View style={{width:"100%"}}><Text style={{width:"100%",fontSize:12,color:"gray",fontWeight:500}}>House 57, Road 8, Block A, Bringham</Text></View>
                 </View>
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
                              <Text style={{color:"#DA4F41",fontWeight:700}}>Currently Available for Service</Text>
              </View>
                          </View>
                          </TouchableOpacity>
                      {/* Mechanic Component End */}
                      
                      {/* Mechanic Component Start */}
                      <TouchableOpacity onPress={() => navigation.navigate("RequestConfirmation")}>
            <View style={{ width: "100%",borderWidth:1,marginTop:5,borderColor:"#E7E7E7",borderRadius:15, height:130,padding:8,display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:10}}>
              <View style={{ width: "28%", height: "100%", borderRadius: 15, backgroundColor: "#DA4F41",display:"flex",justifyContent:"center",alignItems:"center" }}>
                <View style={{ width: 50, height: 50, backgroundColor: "white", borderRadius: 100,display:"flex",justifyContent:"center",alignItems:"center" }}>
                  <Ionicons name="build" color="black" size={30}></Ionicons>
                </View>
              </View>
              <View style={{ width: "68%", height: "100%", display: "flex", justifyContent: "space-evenly"}}>
                <View style={{ width: "100%",display:"flex",justifyContent:"flex-end" , height: "40%", padding: 2,gap:5 }}>
                  <View><Text style={{fontSize:18,fontWeight:600}}>Gotham Car Reparation</Text></View>
                  <View style={{width:"100%"}}><Text style={{width:"100%",fontSize:12,color:"gray",fontWeight:500}}>House 57, Road 8, Block A, Bringham</Text></View>
                 </View>
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
                              <Text style={{color:"#DA4F41",fontWeight:700}}>Currently Available for Service</Text>
              </View>
                          </View>
                          </TouchableOpacity>
                      {/* Mechanic Component End */}
                      
                      {/* Mechanic Component Start */}
                      <TouchableOpacity onPress={() => navigation.navigate("RequestConfirmation")}>
            <View style={{ width: "100%",borderWidth:1,marginTop:5,borderColor:"#E7E7E7",borderRadius:15, height:130,padding:8,display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:10}}>
              <View style={{ width: "28%", height: "100%", borderRadius: 15, backgroundColor: "#DA4F41",display:"flex",justifyContent:"center",alignItems:"center" }}>
                <View style={{ width: 50, height: 50, backgroundColor: "white", borderRadius: 100,display:"flex",justifyContent:"center",alignItems:"center" }}>
                  <Ionicons name="build" color="black" size={30}></Ionicons>
                </View>
              </View>
              <View style={{ width: "68%", height: "100%", display: "flex", justifyContent: "space-evenly"}}>
                <View style={{ width: "100%",display:"flex",justifyContent:"flex-end" , height: "40%", padding: 2,gap:5 }}>
                  <View><Text style={{fontSize:18,fontWeight:600}}>Gotham Car Reparation</Text></View>
                  <View style={{width:"100%"}}><Text style={{width:"100%",fontSize:12,color:"gray",fontWeight:500}}>House 57, Road 8, Block A, Bringham</Text></View>
                 </View>
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
                              <Text style={{color:"#DA4F41",fontWeight:700}}>Currently Available for Service</Text>
              </View>
                          </View>
                          </TouchableOpacity>
            {/* Mechanic Component End */}
             
                        <View style={{ width: "100%", display: "flex", alignItems: "center" ,marginTop:180}}>
                                    <TouchableOpacity onPress={() => navigation.navigate("RequestConfirmation")}>
                                      <View style={styles.confirmButton}>
                                        <Text style={styles.confirmText}>Continue</Text>
                                      </View>
                                    </TouchableOpacity>
                                  </View>

          </View>
        </View>


  
        
      </ScrollView>
       {/*Footer*/}
    

      </View>
  );
}


const styles = StyleSheet.create({

  locationText: {
    fontSize: 16,
    },
    
  confirmButton: {
    width: 350,
    borderRadius: 10,
    marginTop: 10,
    height: 50,
    backgroundColor: "#DA4F41",
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmText: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
});

