import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Modal,
  TextInput,
} from "react-native";
import { fetchHouseDetails } from "@/app/services/houseDetailsService";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/constants/Types";
import { Wave } from "react-native-animated-spinkit";
import { Button } from "@rneui/base";
import { HouseDetail } from "@/app/entities/HouseDetail";

type HouseDetailsScreenNavProps = StackNavigationProp<
  RootStackParamList,
  "HouseDetails"
>;
type Props = {
  route: any;
  navigation: HouseDetailsScreenNavProps;
};

const HouseDetails: React.FC<Props> = ({ route, navigation }) => {
  const [houseData, setHouseData] = useState<HouseDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const [houseNo, setHouseNo] = useState<string>("");

  useEffect(() => {
    if (!modalVisible && houseNo) {
      const getHouseDetails = async () => {
        try {
          setLoading(true);
          const data = await fetchHouseDetails(houseNo);
          if (data) {
            setHouseData(data);
            setError(null);
          } else {
            setError("No data found");
          }
        } catch (err) {
          setError("Error fetching house details");
          setHouseData(null);
        } finally {
          setLoading(false);
        }
      };

      getHouseDetails();
    }
  }, [modalVisible, houseNo]);

  const filteredData = houseData
    ? {
        "# Máster": houseData.master?.masterNumber ?? "No Disponible",
        "# Guía": houseData.houseNo ?? "No Disponible",
        "Fecha Creación": houseData.dateCreation ?? "No Disponible",
        "Nombre Remitente": houseData.senderName ?? "No Disponible",
        "Ciudad Remitente": houseData.senderCity ?? "No Disponible",
        "Estado Remitente": houseData.senderState ?? "No Disponible",
        "País Remitente": houseData.senderCountry ?? "No Disponible",
        "Nombre Destinatario": houseData.recipientName ?? "No Disponible",
        "Ciudad Destinatario": houseData.recipientCity ?? "No Disponible",
        "Estado Destinatario": houseData.recipientState ?? "No Disponible",
        "País Destinatario": houseData.recipientCountry ?? "No Disponible",
        "Cliente": houseData.master?.client.name ?? "No Disponible",
      }
    : {};

  const tableData = Object.entries(filteredData).map(([key, value]) => ({
    key,
    value,
  }));

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Ingrese el número de guía</Text>
            <TextInput
              style={styles.input}
              placeholder="# Número de guía"
              value={houseNo}
              onChangeText={(text) => setHouseNo(text)}
            />
            <Button
              title="Buscar"
              onPress={() => {
                if (houseNo) {
                  setModalVisible(false);
                }
              }}
              icon={{
                name: "search",
                type: "material-icons",
                size: 40,
                color: "white",
              }}
              buttonStyle={{
                borderRadius: 50,
                width: 150,
                marginTop: 15,
              }}
            />
            <Button
              title="Atrás"
              onPress={() => navigation.goBack()}
              buttonStyle={{
                borderRadius: 50,
                width: 150,
                marginTop: 15,
                backgroundColor: "#d9534f",
              }}
            />
          </View>
        </View>
      </Modal>
      {loading ? (
        <ImageBackground
          source={require("@/assets/images/peak_background.jpg")}
          style={[styles.loaderContainer, styles.background]}
        >
          <Wave size={100} color="#214b6c" animating={true} />
        </ImageBackground>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View style={styles.tableContainer}>
          {tableData.length > 0 ? (
            <FlatList
              data={tableData}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <Text style={styles.key}>{item.key}:</Text>
                  <Text style={styles.value}>{item.value}</Text>
                </View>
              )}
            />
          ) : (
            <Text>No data available</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "200%",
    backgroundColor: "#fff",
  },
  tableContainer: {
    marginTop: 30,
    flex: 1,
    padding: 10,
    height: "100%",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  key: {
    fontWeight: "800",
    width: "50%",
    color: "#31488d",
      textAlign: "auto",
    fontSize:15
  },
  value: {
    flex: 1,
    width: "50%",
      textAlign: "auto",
    fontSize:15
    
  },
  errorText: {
    color: "red",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "92%",
    height: "40%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
      fontSize: 22,
    fontWeight: "bold",
        color: "#214b6c",
    justifyContent: "center",
  },
  input: {
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 50,
    width: "100%",
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 17,
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "700",
  },
});

export default HouseDetails;
