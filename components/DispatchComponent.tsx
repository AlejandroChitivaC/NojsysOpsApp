import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
import { fetchOpenDispatch } from "@/app/services/dispatchService";
import { Dispatch } from "@/app/entities/Dispatch";
import { FontAwesome } from "@expo/vector-icons";
import { Wave } from "react-native-animated-spinkit";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/constants/Types";
import { formatDate, formatMasterNumber } from "@/app/services/utils/utils";

type DispatchComponentNavigationProp = StackNavigationProp<
  RootStackParamList,
  "DispatchDetails"
>;

const DispatchComponent: React.FC = () => {
  const [data, setData] = useState<Dispatch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<DispatchComponentNavigationProp>();

  useEffect(() => {
    const loadDispatches = async () => {
      try {
        const result = await fetchOpenDispatch();
        if (result) {
          setData(result);
        }
      } catch (err) {
        setError("Error al cargar los despachos.");
      } finally {
        setLoading(false);
      }
    };

    loadDispatches();
  }, []);


  const handleDownload = (url: string | null) => {
    if (url) {
      Linking.openURL(url).catch((err) =>
        console.error("Error al abrir el enlace:", err)
      );
    } else {
      Alert.alert("Error", "No hay URL de PDF disponible.");
    }
  };

  const handleEdit = (dispatch: Dispatch) => {
    navigation.navigate("DispatchDetails", { dispatch });
  };

  const renderItem = ({ item }: { item: Dispatch }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.dispatchId}</Text>
      <Text style={styles.cell}>{formatDate(item.dateUpdate)}</Text>
      <Text style={styles.cell}>{formatMasterNumber(item.masterNumber)}</Text>
      <Text style={styles.cell}>{item.totalPieces}</Text>
      <Text style={styles.cell}>{item.totalGuides}</Text>
      <TouchableOpacity
        onPress={() => handleEdit(item)}
        style={styles.iconContainer}
      >
        <FontAwesome name="edit" size={24} color="blue" />
      </TouchableOpacity>
    </View>
  );

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

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/loader_bg.jpg")}
        style={styles.background}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Despachos Abiertos</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>ID</Text>
            <Text style={styles.headerCell}>Fecha</Text>
            <Text style={styles.headerCell}>Número Master</Text>
            <Text style={styles.headerCell}>Total Piezas</Text>
            <Text style={styles.headerCell}>Total Guías</Text>
            <Text style={styles.headerCell}>Acción</Text>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.dispatchId.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  header: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#318d8c",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContainer: {
    flex: 1,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#318d8c",
    padding: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});

export default DispatchComponent;
