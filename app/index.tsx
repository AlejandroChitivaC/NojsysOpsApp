import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "@/components/auth/AuthComponent";
import Home from "@/components/HomeComponent";
import { RootStackParamList } from "@/constants/Types";
import Preinspection from "@/components/PreinspectionComponent";
import SearchMaster from "@/components/SearchMaster";
import { AlertProvider, useAlert } from "@/components/AlertContext";
import { setAlertFunction } from "@/app/services/alertService";
import HouseDetails from "@/components/HouseDetails";
import { AuthProvider } from "@/components/auth/AuthContext";
import DispatchComponent from "@/components/DispatchComponent";
import DispatchDetails from "@/components/DispatchDetails";
const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  const { showAlert } = useAlert();

  useEffect(() => {
    setAlertFunction(showAlert);
  }, [showAlert]);

  return (
    <AuthProvider>
      <Stack.Navigator initialRouteName="Auth">
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
          name="Preinspection"
          options={{ title: "Preinspección por cajas" }}
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
        <Stack.Screen
          name="Dispatch"
          options={{ title: "Despachos" }}
          component={DispatchComponent}
        />
        <Stack.Screen name="DispatchDetails" component={DispatchDetails} />

      </Stack.Navigator>
    </AuthProvider>
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
