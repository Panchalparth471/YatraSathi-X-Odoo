import { View,ScrollView,Text, TouchableOpacity } from "react-native"
import Navbar from "../../components/Navbar"

export default function ClientIssueScreen({navigation})
{
    return (
        <View style={{height:"100%",backgroundColor:"white"}}>
        <View style={{display:"flex",justifyContent:"space-between",marginTop:30}}>
                <View>
                     <Navbar navigation={navigation} title="Client Issue Details" />
                </View>
        </View>
            <ScrollView style={{ width: "100%", height: "100%",padding:20 }}>
                <View><Text style={{ fontSize: 18, fontWeight: "600" }}>Client Details</Text></View>
               <View style={{
  width: "100%",
  padding: 10,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#E7E7E7",
  marginTop: 10
}}>
  {[
    ["Vehicle Owner", "Mr. Samarth"],
    ["Vehicle Type", "Car"],
    ["Vehicle Company", "Toyota"],
    ["Vehicle Name", "Innova"],
    ["Fuel Type", "Petrol"],
    ["License Plate", "DL 01 MN 5632s"]
  ].map(([label, value], index) => (
    <View
      key={index}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        marginVertical: 3
      }}
    >
      <Text style={{ fontSize: 14, fontWeight: "800", width: "40%" }}>{label}</Text>
      <Text style={{ fontSize: 14, fontWeight: "800", width: "5%", textAlign: "center" }}>:</Text>
      <Text style={{ fontSize: 14, fontWeight: "800", width: "45%",marginLeft:20 }}>{value}</Text>
    </View>
  ))}
                </View>
                 <View><Text style={{ fontSize: 18, fontWeight: "600",marginTop:20 }}>Client Service Request</Text></View>
                     <View style={{
  width: "100%",
  padding: 10,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#E7E7E7",
  marginTop: 10
}}>
  {[
    ["Client Issue Type", "Flat Tyre"],
    ["Client Location", "Locate Client"],
    ["Client Address", "Toyota"],
    
  ].map(([label, value], index) => (
    <View
      key={index}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        marginVertical: 3
      }}
    >
      <Text style={{ fontSize: 14, fontWeight: "800", width: "40%" }}>{label}</Text>
      <Text style={{ fontSize: 14, fontWeight: "800", width: "5%", textAlign: "center"}}>:</Text>
          {value == "Locate Client"?(
              <Text style={{ fontSize: 14, fontWeight: "800", width: "45%",marginLeft:20,color:"red",textDecorationLine: "underline" }}>{value}</Text>
          ):(
          <Text style={{ fontSize: 14, fontWeight: "800", width: "45%",marginLeft:20 }}>{value}</Text>
     )} 
    </View>
  ))}
                    
                </View>

                <View><Text style={{ fontSize: 18, fontWeight: "600", marginTop: 20 }}>Client added text</Text></View>
                
                <View style={{
  width: "100%",
  padding: 10,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#E7E7E7",
  marginTop: 10
}}>
  {[
    ["Issue Description", "  My Maruti Ertiga started showing serious issues recently. Despite regular servicing, the engine began stalling unexpectedly, especially in traffic. The AC stopped cooling effectively, and strange noises came from the suspension. I also faced a problem with the power steering becoming unusually stiff during turns. The infotainment system froze often, and the fuel efficiency dropped drastically."],
 
  ].map(([label, value], index) => (
    <View
      key={index}
      style={{
        flexDirection: "row",
        paddingHorizontal: 10,
        marginVertical: 3
      }}
    >
          <Text style={{ fontSize: 14, fontWeight: "800", width: "40%", alignSelf:"flex-start" }}>{label}</Text>
      <Text style={{ fontSize: 14, fontWeight: "800", width: "5%", textAlign: "center",alignSelf:"flex-start" }}>:</Text>
      <Text style={{ fontSize: 10, fontWeight: "500", width: "45%",marginLeft:20,color:"gray" }}>{value}</Text>
    </View>
  ))}
                </View>

                <View style={{width:"100%",height:"100",display:"flex",flexDirection:"row",gap:10,marginTop:10,justifyContent:"center"}}>
            <View style={{ width: 150, height: 50, backgroundColor: "red", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 15 }}><Text style={{ color: "white" }}>Decline</Text></View>
            <TouchableOpacity onPress={()=>{navigation.navigate("Available")}}>
              <View style={{ width: 150, height: 50, backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 15 }}><Text style={{ color: "white" }}>Accept</Text></View>
              </TouchableOpacity>
                </View>

                
            </ScrollView>
            </View>
    )
}

