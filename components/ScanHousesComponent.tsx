import React, { useState } from "react";
import { CameraView, useCameraPermissions, CameraType } from "expo-camera";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import StorageService from "@/app/services/storage/storageService";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/constants/Types";
import { useNavigation } from "@react-navigation/native";
import { House } from "@/app/entities/House";
import { Audio } from "expo-av";
import { validateBox } from "@/app/services/masterService";

type NavigationProp = StackNavigationProp<RootStackParamList, "Preinspection">;
type MasterDataItem = {
  item1: House[];
  item2: House[];
};
export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [barcodeData, setBarcodeData] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const navigation = useNavigation<NavigationProp>();

  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    data = data.toUpperCase();
    setBarcodeData(data);
    try {
      await StorageService.setStringItem("houseNo", data);
      let masterData = await StorageService.getItem<MasterDataItem>(
        "masterData"
      );
      let scannedHouse = await StorageService.getStringItem("houseNo");
      console.log("Escaneada:", scannedHouse);
      let houseItem = masterData?.item1.find(
        (item) => item.houseNo === scannedHouse
      );

      if (houseItem != null && scannedHouse != null) {
        console.log("House de BD:", houseItem);
        validateBox(scannedHouse);
        await StorageService.setItem("houseItem", houseItem);
        navigation.navigate("Preinspection", {
          data: masterData,
          houseNo: scannedHouse,
        });
      } else if (scannedHouse != null) {
        validateBox(scannedHouse);
        navigation.navigate("Preinspection", {
          data: masterData,
        });
      }
    } catch (e) {
      console.error("Error retrieving data:", e);
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          ¿Permite el uso de la cámara?
        </Text>
        <Button onPress={requestPermission} title="Permitir" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={handleBarCodeScanned}
        facing={facing}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Icon style={styles.icon} name="rotate" />
          </TouchableOpacity>
        </View>
      </CameraView>

      {barcodeData && (
        <View style={styles.barcodeContainer}>
          <Text style={styles.barcodeDataText}>{barcodeData}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  camera: {
    flex: 1,
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  button: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 16,
    borderRadius: 8,
  },
  barcodeContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  barcodeDataText: {
    fontSize: 18,
    color: "white",
    marginBottom: 20,
  },
  icon: {
    fontSize: 50,
    backgroundColor: "transparent",
    color: "white",
  },
});
