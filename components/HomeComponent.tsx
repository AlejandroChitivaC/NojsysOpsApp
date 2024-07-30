import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Pressable,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IconMaterialCE from "react-native-vector-icons/MaterialCommunityIcons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../constants/Types";
import StorageService from "@/app/services/storage/storageService";
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;
type Props = {
  navigation: HomeScreenNavigationProp;
};

const openLink = () => {
  const phoneNumber = "+573113117939";
  const message = "Hola, necesito ayuda";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  Linking.openURL(url).catch(() => {
    Alert.alert("No se pudo abrir WhatsApp. Asegúrate de tenerlo instalado.");
  });
};

const Home: React.FC<Props> = ({ navigation }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [currentOption, setCurrentOption] = useState("¿Necesita ayuda?");

  StorageService.removeItem("masterData");
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOption((prevOption) =>
        prevOption === "¿Necesita ayuda?" ? "Cerrar Sesión" : "¿Necesita ayuda?"
      );
    }, 1800);

    return () => clearInterval(interval);
  }, []);
  const renderIcon = () => {
    return currentOption === "¿Necesita ayuda?"
      ? "chatbubble-ellipses"
      : "log-out";
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/wave_background.png")}
        style={styles.background}
      />
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/logo_bbic-removebg-preview.png")}
          style={styles.logo}
        />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("SearchMaster")}
        >
          <Icon style={styles.icon} name="eye" size={60} />
          <Text style={styles.cardText}>Preinspección Mercancía</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("ScanHouses")}
        >
          <Icon style={styles.icon} name="qr-code" size={60} />
          <Text style={styles.cardText}>Escanear Guía</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <IconMaterialCE
            style={styles.icon}
            name="truck-fast-outline"
            size={60}
          />
          <Text style={styles.cardText}>Despachos</Text>
        </TouchableOpacity>
      </ScrollView>
      <Pressable onPress={() => setShowOptions(!showOptions)}>
        <View style={styles.footer}>
          <Text style={styles.footerText}>{currentOption}</Text>
          <TouchableOpacity>
            <Icon name={renderIcon()} size={25} color="#3857B3" />
          </TouchableOpacity>
        </View>
      </Pressable>
      {showOptions && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option} onPress={openLink}>
            <Text style={styles.optionText}>¿Necesita ayuda?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => Alert.alert("Cerrando sesión...")}
          >
            <Text style={styles.optionText}>Cerrar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionClose}
            onPress={() => setShowOptions(false)}
          >
            <Text style={styles.optionTextClose}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: "#3857B3",
    marginBottom: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignContent: "center",
    minWidth: "100%",
    minHeight: "100%",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  header: {
    alignItems: "center",
    backgroundColor: "#ffff",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    height: "auto",
  },
  logo: {
    width: 100,
    height: 70,
  },
  logOut: {
    color: "#3857B3",
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#ffff",
    borderRadius: 50,
    padding: 40,
    alignItems: "center",
    width: "80%",
    marginVertical: 20,
  },
  cardText: {
    fontSize: 20,
    color: "#000000",
    fontWeight: "600",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    backgroundColor: "#ffff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: "auto",
  },
  footerText: {
    color: "#226363",
    marginRight: 10,
    fontSize: 18,
    height: "auto",
    fontWeight: "400",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 18,
    color: "#3857B3",
    alignContent: "center",
  },
  optionClose: {
    marginTop: 10,
    alignItems: "center",
  },
  optionTextClose: {
    fontSize: 18,
    color: "red",
  },
});

export default Home;
