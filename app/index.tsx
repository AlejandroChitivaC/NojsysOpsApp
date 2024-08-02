import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "@/components/auth/AuthComponent";
import Home from "@/components/HomeComponent";
import ScanHouses from "@/components/ScanHousesComponent";
import { RootStackParamList } from "@/constants/Types";
import Preinspection from "@/components/PreinspectionComponent";
import SearchMaster from "@/components/SearchMaster";
import { AlertProvider, useAlert } from "@/components/AlertContext";
import { setAlertFunction } from "@/app/services/alertService";
import HouseDetails from "@/components/HouseDetails";

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  const { showAlert } = useAlert();

  useEffect(() => {
    setAlertFunction(showAlert);
  }, [showAlert]);

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
        options={{ title: "Escanear Guía Hija"}}
        component={ScanHouses}
      />
      <Stack.Screen
        name="Preinspection"
        options={{ title: "Preinspección por cajas"}}
        component={Preinspection}
      />
      <Stack.Screen
        name="SearchMaster"
        options={{ title: "Buscar Master" }}
        component={SearchMaster}
      />
      <Stack.Screen
        name="HouseDetails"
        options={{ title: "Detalles de la guía" }}
        component={HouseDetails}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <AlertProvider>
      <MainNavigator />
    </AlertProvider>
  );
};

export default App;
