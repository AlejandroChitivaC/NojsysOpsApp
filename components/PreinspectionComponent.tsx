import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Card, Input } from "@rneui/base";
import IconFA5 from "react-native-vector-icons/FontAwesome5";
import IconMaterialCE from "react-native-vector-icons/MaterialCommunityIcons";
import { Wave } from "react-native-animated-spinkit";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/constants/Types";
import { House } from "@/app/entities/House";
import useStore from "@/hooks/useGlobalStore";
import { showAlert } from "@/app/services/alertService";
import StorageService from "@/app/services/storage/storageService";
import { useNavigation } from "@react-navigation/native";
import { MasterDataItem, validateBox } from "@/app/services/masterService";

type PreInspectionNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Preinspection"
>;

type Props = {
  route: any;
  navigation: PreInspectionNavigationProp;
};

const Preinspection: React.FC<Props> = ({ route, navigation }) => {
  const [item1, setItem1] = useState<House[]>([]);
  const [item2, setItem2] = useState<House[]>([]);
  const [opacity] = useState(new Animated.Value(1));
  const [loading, setLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [scanning, setScanning] = useState(true);

  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (value.trim()) {
      handleSubmit(value);
    }
  };

  const handleSubmit = async (value: string) => {
    if (!scanning || !value.trim()) return; 

    setScanning(false);
    let data = value.toUpperCase();

    try {
      await StorageService.setStringItem("houseNo", data);
      let masterData = await StorageService.getItem<MasterDataItem>("masterData");
      let scannedHouse = await StorageService.getStringItem("houseNo");

      if (scannedHouse != null) {
        navigation.navigate("Preinspection", {
          data: masterData,
          houseNo: scannedHouse,
        });

        validateBox(scannedHouse); 

        setInputValue("");

        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 100); 
      }
    } catch (e) {
      console.error("Error retrieving data:", e);
    }

    setTimeout(() => setScanning(true), 1500);
  };

  
  const {
    tBoxes,
    tBoxesOutline,
    tBoxesStatusProcessed,
    tBoxesStatusOutline,
    tBoxesMissing,
    tHousesToOutline,
    tHousesInOutline,
    setTBoxes,
    setTBoxesOutline,
    setTBoxesStatusProcessed,
    setTBoxesStatusOutline,
    setTBoxesMissing,
    setTHousesToOutline,
    setTHousesInOutline,
  } = useStore();

  useEffect(() => {
    if (route.params && route.params.data) {
      const { item1, item2 } = route.params.data;
      setItem1(item1 || []);
      setItem2(item2 || []);
    }
  }, [route.params]);

  useEffect(() => {
    if (item1.length > 0) {
      if (isFirstLoad) {

        setTBoxes(item1.length);
        setTBoxesOutline(
          item1.filter((item: { toOutline: any }) => item.toOutline).length
        );
        setTBoxesStatusProcessed(
          item1.filter((item: { statusId: number }) => item.statusId === 1)
            .length
        );
        setTBoxesStatusOutline(
          item1.filter((item: { statusId: number }) => item.statusId === 2)
            .length
        );
        setTBoxesMissing(
          item1.filter((item: { statusId: number }) => item.statusId === 0)
            .length
        );
        setTHousesToOutline(
          item2.filter((item: { toOutline: any }) => item.toOutline).length
        );
        setTHousesInOutline(
          item2.filter((item: { statusId: number }) => item.statusId === 2)
            .length
        );
        setIsFirstLoad(false);
      }

      setTimeout(() => {
        setLoading(false);
      }, 150);

      setTimeout(() => {
        if (tBoxesMissing == 0 && tBoxesStatusProcessed != 0) {
          showAlert("La máster esta completa.", "success");
        }
      }, 1800);
    }
  }, [
    item1,
    item2,
    isFirstLoad,
    setTBoxes,
    setTBoxesOutline,
    setTBoxesStatusProcessed,
    setTBoxesStatusOutline,
    setTBoxesMissing,
    setTHousesToOutline,
    setTHousesInOutline,
  ]);

  if (loading) {
    return (
      <ImageBackground
        source={require("@/assets/images/loader_bg.jpg")}
        style={[styles.loaderContainer, styles.background]}
      >
        <Wave size={100} color="#214b6c" animating={true} />
      </ImageBackground>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/loader_bg.jpg")}
          style={styles.background}
        />
        <Text style={styles.label}>Escanear Guías</Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder="# Guía"
            rightIcon={{ type: "font-awesome", name: "qrcode" ,color: "#318D8C" ,size: 30}}
            inputStyle={{ textAlign: "center" }}
            value={inputValue}
            autoFocus
            onChangeText={handleInputChange} 
          />
        </View>
        <Card containerStyle={styles.card1}>
          <View style={styles.cardRow3}>
            <View style={styles.cardSection}>
              <Text style={styles.cardNumber}>{tBoxes}</Text>
              <IconFA5 name="box" color={"#FFFF"} size={30} />
              <Text style={styles.cardLabel}>Total cajas</Text>
            </View>
            <View style={styles.cardSection}>
              <Text style={styles.cardNumber}>{tBoxesOutline}</Text>
              <IconFA5 name="box-open" color={"#FFFF"} size={30} />
              <Text style={styles.cardLabel}>Cajas para perfilar</Text>
            </View>
            <View style={styles.cardSection}>
              <Text style={styles.cardNumber}>{tHousesToOutline}</Text>
              <IconFA5 name="inbox" color={"#FFFF"} size={30} />
              <Text style={styles.cardLabel}>Guías perfiladas</Text>
            </View>
          </View>
        </Card>

        <Card containerStyle={styles.card2}>
          <View style={styles.cardRow3}>
            <View style={styles.cardSection}>
              <Text style={styles.cardNumber}>{tBoxesStatusProcessed}</Text>
              <IconFA5 name="box" color={"#FFFF"} size={30} />
              <Text style={styles.cardLabel}>Cajas procesadas</Text>
            </View>
            <View style={styles.cardSection}>
              <Text style={styles.cardNumber}>{tBoxesStatusOutline}</Text>
              <IconFA5 name="box-open" color={"#FFFF"} size={30} />
              <Text style={styles.cardLabel}>Cajas en inspección</Text>
            </View>
            <View style={styles.cardSection}>
              <Text style={styles.cardNumber}>{tHousesInOutline}</Text>
              <IconFA5 name="inbox" color={"#FFFF"} size={30} />
              <Text style={styles.cardLabel}>Guías en inspección</Text>
            </View>
          </View>
        </Card>

        <Card containerStyle={styles.card3}>
          <View style={styles.cardRow2}>
            <View style={styles.cardSection}>
              <Text style={styles.cardNumber}>{tBoxesMissing}</Text>
              <IconMaterialCE name="lightbulb-on" color={"#FFFF"} size={30} />
              <Text style={styles.cardLabel}>Cajas faltantes</Text>
            </View>
            <View style={styles.cardSection}>
              <Text style={styles.cardNumber}>{"-"}</Text>
              <IconMaterialCE name="printer-check" color={"#FFFF"} size={40} />
              <Text style={styles.cardLabel}>Guías para perfilar</Text>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    alignItems: "center",
    height: "100%",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center",
    fontWeight: "700",
  },
  card1: {
    borderRadius: 30,
    padding: 16,
    backgroundColor: "#318D8C",
    width: "90%",
  },
  card2: {
    borderRadius: 30,
    padding: 16,
    backgroundColor: "#214b6c",
    width: "90%",
  },
  card3: {
    borderRadius: 30,
    padding: 16,
    marginBottom: 15,
    backgroundColor: "#004573",
    width: "90%",
  },
  cardRow3: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardRow2: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cardSection: {
    flex: 1,
    alignItems: "center",
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFF",
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 15,
    color: "#FFF",
    textAlign: "center",
    fontWeight: "800",
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default Preinspection;
