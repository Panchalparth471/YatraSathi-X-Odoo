import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import VehicleDetailsScreen from "./screens/VehicleDetailsScreen";
import ServiceScreen from "./screens/ServiceScreen";
import RequestService from "./screens/RequestService";
import ConfirmIssueScreen from "./screens/ConfirmIssueScreen";
import YourLocationScreen from "./screens/YourLocationScreen";
import AddDetailsScreen from "./screens/AddDetailsScreen";
import ChooseProviderScreen from "./screens/ChooseProviderScreen";
import RequestConfirmationScreen from "./screens/RequestConfirmationScreen";
import ServiceProviderLocation from "./screens/ServiceProviderLocation";
import FeedBackScreen from "./screens/FeedBackScreen";
import PaymentScreen from "./screens/PaymentScreen";
import WhatServiceScreen from "./screens/RSA Screens/WhatServiceScreen";
import CompleteScreen from "./screens/RSA Screens/CompleteScreen";
import ThanksScreen from "./screens/RSA Screens/ThanksScreen";
import ClientIssueScreen from "./screens/RSA Screens/ClientIssueScreen";
import MechanicServiceScreen from "./screens/RSA Screens/MechanicServiceScreen";
import TrackScreen from "./screens/RSA Screens/TrackScreen";
import VerifyEmailScreen from "./screens/VerifyEmailScreen";
import EnterCodeScreen from "./screens/EnterCodeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();
const role = await AsyncStorage.getItem("userRole");
//Custom Drawer Content: Only show selected links
const CustomDrawerContent = (props) => {
  let allowedRoutes = [];
  if (role === "user") {
      allowedRoutes = ["Home", "Profile", "Service","Vehicle"];
  }
  else {
    allowedRoutes=["Home","MechanicService","Track","Profile"]
  }
  const filteredRoutes = props.state.routes.filter((route) =>
    allowedRoutes.includes(route.name)
  );

  const filteredState = {
    ...props.state,
    routes: filteredRoutes,
    index: Math.max(
      0,
      filteredRoutes.findIndex(
        (route) => route.key === props.state.routes[props.state.index]?.key
      )
    ),
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} state={filteredState} />
    </DrawerContentScrollView>
  );
};


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="EnterCode"
          screenOptions={{ headerShown: false,drawerActiveTintColor: "#DA4F41" }}
          drawerContent={(props) => <CustomDrawerContent {...props} />} // Use custom drawer
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Signup" component={SignupScreen} />
          <Drawer.Screen name="Service" component={ServiceScreen} />
          <Drawer.Screen name="RequestService" component={RequestService} />
          <Drawer.Screen name="Vehicle" component={VehicleDetailsScreen} />
          <Drawer.Screen name="ConfirmIssue" component={ConfirmIssueScreen} />
          <Drawer.Screen name="YourLocation" component={YourLocationScreen} />
          <Drawer.Screen name="AddDetails" component={AddDetailsScreen} />
          <Drawer.Screen name="ChooseProvider" component={ChooseProviderScreen} />
          <Drawer.Screen name="RequestConfirmation" component={RequestConfirmationScreen} />
          <Drawer.Screen name="ProviderDetails" component={ServiceProviderLocation} />
          <Drawer.Screen name="Feedback" component={FeedBackScreen} />
          <Drawer.Screen name="Payment" component={PaymentScreen} />
          <Drawer.Screen name="WhatService" component={WhatServiceScreen} />
          <Drawer.Screen name="Complete" component={CompleteScreen} />
          <Drawer.Screen name="Thanks" component={ThanksScreen} />
          <Drawer.Screen name="ClientIssue" component={ClientIssueScreen} />
          <Drawer.Screen name="MechanicService" component={MechanicServiceScreen} />
          <Drawer.Screen name="Track" component={TrackScreen} />
          <Drawer.Screen name="VerifyEmail" component={VerifyEmailScreen} />
             <Drawer.Screen name="EnterCode" component={EnterCodeScreen} />
          
          
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
