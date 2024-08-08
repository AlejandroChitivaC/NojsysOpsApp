import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  ImageBackground,
} from "react-native";
import { Button, Card } from "@rneui/base";
import IconFA5 from "react-native-vector-icons/FontAwesome5";
import IconMaterialCE from "react-native-vector-icons/MaterialCommunityIcons";
import { Wave } from "react-native-animated-spinkit";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/constants/Types";
import { House } from "@/app/entities/House";
import useStore from "@/hooks/useGlobalStore";
import { showAlert } from "@/app/services/alertService";

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

  // Call useStore at the top level
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
        // Update Zustand store values
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
      }, 1600);
      setTimeout(() => {
        if (tBoxesMissing === 0) {
          showAlert("La máster está completada", "success");
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

  const redirectToScan = () => {
    Animated.timing(opacity, {
      toValue: 0.5,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate("ScanHouses");
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  if (loading) {
    return (
      <ImageBackground
        source={require("@/assets/images/peak_background.jpg")}
        style={[styles.loaderContainer, styles.background]}
      >
        <Wave size={100} color="#214b6c" animating={true} />
      </ImageBackground>
    );
  }

  // Use Zustand store values for display
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/peak_background.jpg")}
        style={styles.background}
      />
      <Text style={styles.label}>Escanear Guías</Text>
      <View style={styles.inputContainer}>
        <Button
          title="Escanear"
          onPress={redirectToScan}
          icon={{
            name: "qr-code-scanner",
            type: "material-icons",
            size: 50,
            color: "white",
          }}
          iconContainerStyle={{ marginRight: 10 }}
          titleStyle={{ fontWeight: "800" }}
          buttonStyle={{
            backgroundColor: "#318D8C",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 100,
          }}
          containerStyle={{
            width: 250,
          }}
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
