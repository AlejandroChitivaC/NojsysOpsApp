import { RootStackParamList } from "@/constants/Types";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "@rneui/base";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Animated,
  Modal,
  ImageBackground,
} from "react-native";
import { getMasterData } from "@/app/services/masterService";
import { Audio } from "expo-av";
import Icon from "@expo/vector-icons/FontAwesome";
import StorageService from "@/app/services/storage/storageService";

type SearchMasterNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SearchMaster"
>;
type Props = {
  navigation: SearchMasterNavigationProp;
};

const SearchMaster: React.FC<Props> = ({ navigation }) => {
  const [masterNumber, setMasterNumber] = useState("");
  const [error, setError] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [searchData, setSearchData] = useState<any>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const handleInputChange = (text: string) => {
    setMasterNumber(text);
    if (text.trim() === "") {
      setError("El campo no puede estar vacío.");
    } else if (!/^[a-zA-Z0-9\s._-]+$/.test(text)) {
      setError(
        "El número de máster debe contener solo letras, números, espacios y puntos."
      );
    } else {
      setError("");
    }
  };

  const [opacity] = useState(new Animated.Value(1));

  const handleSearchPress = async () => {
    if (error || masterNumber.trim() === "") {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("@/assets/audio/error.mp3")
      );
      setSound(newSound);
      await newSound.playAsync();
      showAlert("error", "Por favor, ingrese el número de la máster.", 950);
      return;
    }

    Animated.timing(opacity, {
      toValue: 0.5,
      duration: 300,
      useNativeDriver: true,
    }).start(async () => {
      try {
        const data = await getMasterData(masterNumber);
        if (data.isValid && data.dataSingle != null) {
          showAlert("success", data.message, 1000);
          setSearchData(data.dataSingle);
          // StorageService.removeItem("masterData");
          StorageService.setItem("masterNumber", masterNumber);
          StorageService.setItem("masterData", data.dataSingle);
          navigation.navigate("Preinspection", { data: data.dataSingle });
        } else if (data.isValid === false || data.dataSingle === null) {
          const { sound: newSound } = await Audio.Sound.createAsync(
            require("@/assets/audio/error.mp3")
          );
          setSound(newSound);
          await newSound.playAsync();
          setSearchData(null);
          showAlert("error", "Información no encontrada", 1000);
          setTimeout(() => {
            navigation.navigate("Home");
          }, 800);
        }
      } catch (err) {
        if (isAxiosError(err) && err.response && err.response.status === 400) {
          showAlert(
            "error",
            "Solicitud incorrecta. Verifique el número de máster e intente nuevamente.",
            1200
          );
        } else {
          showAlert("error", `Búsqueda fallida: ${err}`, 1200);
        }
        setTimeout(() => {
          navigation.navigate("Home");
        }, 3000);
      } finally {
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    });
  };

  function isAxiosError(
    error: unknown
  ): error is { response: { status: number } } {
    return (error as { response: { status: number } }).response !== undefined;
  }

  const showAlert = (
    type: "success" | "error",
    message: string,
    time: number
  ) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, time);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Número de máster</Text>
        <TextInput
          style={[styles.input, error ? styles.errorInput : null]}
          value={masterNumber}
          onChangeText={handleInputChange}
          focusable={true}
          placeholder="# Master"
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Button
          title="Buscar"
          onPress={handleSearchPress}
          icon={{
            name: "search",
            type: "material-icons",
            size: 40,
            color: "white",
          }}
          iconContainerStyle={{ marginRight: 10 }}
          titleStyle={{
            fontWeight: "700",
            fontSize: 22,
            alignItems: "center",
          }}
          buttonStyle={{
            backgroundColor: "#318D8C",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 100,
          }}
          containerStyle={{
            width: 200,
          }}
        />
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={alertVisible}
        onRequestClose={() => {
          setAlertVisible(!alertVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Icon
              name={
                alertType === "success" ? "check-circle" : "exclamation-circle"
              }
              size={50}
              color={alertType === "success" ? "green" : "red"}
              style={styles.icon}
            />
            <Text style={styles.alertText}>{alertMessage}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 24,
    marginBottom: 20,
    color: "#000000",
    fontWeight: "600",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#000000",
    fontSize: 20,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#318D8C",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    textAlign: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  icon: {
    marginBottom: 10,
  },
  alertText: {
    fontSize: 20,
    color: "#000",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});

export default SearchMaster;
