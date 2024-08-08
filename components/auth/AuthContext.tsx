// AuthContext.tsx
import { showAlert } from "@/app/services/alertService";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { useNavigation } from "@react-navigation/native"; // Importa useNavigation
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/constants/Types"; // Asegúrate de tener el tipo correcto

interface AuthContextType {
  token: string | null;
  handleLogin: (token: string) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); // Usa useNavigation

  const handleLogin = (newToken: string) => {
    setToken(newToken);
  };

  const handleLogout = async () => {
    setToken(null);
    showAlert("Sesión Cerrada", "success");
    navigation.navigate("Auth"); // Redirige al componente de autenticación
  };

  return (
    <AuthContext.Provider value={{ token, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
