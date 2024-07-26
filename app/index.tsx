import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "@/components/auth/AuthComponent";
import Home from "@/components/HomeComponent";
import ScanHouses from "@/components/ScanHousesComponent";
import { RootStackParamList } from "@/constants/Types";
import Preinspection from "@/components/PreinspectionComponent";
import SearchMaster from "@/components/SearchMaster";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScanHouses"
        options={{ title: "Escanear Guía Hija" }}
        component={ScanHouses}
      />
      <Stack.Screen
        name="Preinspection"
        options={{ title: "Preinspección por cajas" }}
        component={Preinspection}
      />
      <Stack.Screen
        name="SearchMaster"
        options={{ title: "Buscar Master" }}
        component={SearchMaster}
      />
    </Stack.Navigator>
  );
};

export default App;
