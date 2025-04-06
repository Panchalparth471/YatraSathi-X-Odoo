import { View,ScrollView,Image,Text } from "react-native"
import Navbar from "../components/Navbar"
import verify from "../assets/verify.png"
import { TextInput } from "react-native-gesture-handler"
export default function VerifyEmailScreen({navigation})
{
    return (
         <View style={{height:"100%",backgroundColor:"white"}}>
                <View style={{display:"flex",justifyContent:"space-between",marginTop:30}}>
                        <View>
                             <Navbar navigation={navigation} title="Verification" />
                        </View>
            </View>
            
            <ScrollView style={{ width: "100%", height: "100%",marginTop:50 }}>
                <Image style={{ width: "70%", height: 200, alignSelf: "center" }} source={verify}></Image>
                <Text style={{width:"80%",paddingHorizontal:20,marginTop:30,fontSize:22,fontWeight:600,height:28}}>Don't worry.</Text>
                <Text style={{ width: "80%", paddingHorizontal: 20, fontSize: 22, fontWeight: 600 }}>Enter your email and we'll send you a verification code.</Text>
                <View style={{ paddingHorizontal: 20,marginTop:30 }}>
                    <Text style={{ fontWeight: 800 }}>Email</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: "#DA4F41", borderRadius: 10, }}></TextInput>
                    <View style={{ width: 200, height: 50, backgroundColor: "#DA4F41", marginTop: 20, alignSelf: "center", borderRadius: 15,display:"flex",justifyContent:"center",alignItems:"center" }}>
                        <Text style={{color:"white",fontSize:18,fontWeight:700}}>Send</Text>
                    </View>
                </View>
            </ScrollView>
            </View>
    )
}