import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { fetchHouseDetails } from "@/app/services/houseDetailsService";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/constants/Types";
import { Wave } from "react-native-animated-spinkit";
import { Button, Card, Icon } from "@rneui/base";
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
            navigation.goBack();
            setError("No data found");
          }
        } catch (err) {
          navigation.goBack();
          setError("Error fetching house details");
          setHouseData(null);
        } finally {
          setLoading(false);
        }
      };

      getHouseDetails();
    }
  }, [modalVisible, houseNo]);

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
                size: 30,
                color: "white",
              }}
              buttonStyle={styles.searchButton}
            />
            <Button
              icon={{
                name: "arrow-back-circle",
                type: "ionicon",
                size: 30,
                color: "white",
              }}
              onPress={() => navigation.goBack()}
              buttonStyle={styles.backButton}
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
        <ScrollView contentContainerStyle={styles.cardsContainer}>
          <Card containerStyle={styles.card}>
            <Card.Title style={{ color: "#318d8c" }}>
              {houseData?.houseNo ?? "No Disponible"}
            </Card.Title>
            <Card.Divider />
            <View style={styles.row}>
              <Icon name="home" type="font-awesome" color="#318d8c" />
              <Text style={styles.value}>
                {" "}
                <Text style={{ fontWeight: "bold" }}> # Máster:</Text>{" "}
                {houseData?.masterNumber ?? "No Disponible"}
              </Text>
            </View>
          </Card>
          <Card containerStyle={styles.card}>
            <Card.Title style={{ color: "#318d8c" }}>Remitente</Card.Title>
            <Card.Divider />
            <View style={styles.row}>
              <Icon name="user" type="font-awesome" color="#318d8c" />
              <Text style={styles.value}>
                <Text style={{ fontWeight: "bold" }}> Nombre:</Text>
                {houseData?.senderName ?? "No Disponible"}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="building" type="font-awesome" color="#318d8c" />
              <Text style={styles.value}>
                <Text style={{ fontWeight: "bold" }}>Ciudad:</Text>
                {houseData?.senderCity ?? "No Disponible"}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="map-marker" type="font-awesome" color="#318d8c" />
              <Text style={styles.value}>
                <Text style={{ fontWeight: "bold" }}>Estado:</Text>{" "}
                {houseData?.senderState ?? "No Disponible"}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="flag-circle" type="materialicons" color="#318d8c" />
              <Text style={styles.value}>
                <Text style={{ fontWeight: "bold" }}>País:</Text>{" "}
                {houseData?.senderCountry ?? "No Disponible"}
              </Text>
            </View>
          </Card>
          <Card containerStyle={styles.card}>
            <Card.Title style={{ color: "#318d8c" }}>Destinatario</Card.Title>
            <Card.Divider />
            <View style={styles.row}>
              <Icon name="user" type="font-awesome" color="#318d8c" />
              <Text style={styles.value}>
                {" "}
                <Text style={{ fontWeight: "bold" }}> Nombre:</Text>
                {houseData?.recipientName ?? "No Disponible"}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="building" type="font-awesome" color="#318d8c" />
              <Text style={styles.value}>
                {" "}
                <Text style={{ fontWeight: "bold" }}>Ciudad:</Text>
                {houseData?.recipientCity ?? "No Disponible"}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="map-marker" type="font-awesome" color="#318d8c" />
              <Text style={styles.value}>
                {"  "}
                <Text style={{ fontWeight: "bold" }}>Estado:</Text>{" "}
                {houseData?.recipientState ?? "No Disponible"}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="flag-circle" type="materialicons" color="#318d8c" />
              <Text style={styles.value}>
                <Text style={{ fontWeight: "bold" }}>País:</Text>{" "}
                {houseData?.recipientCountry ?? "No Disponible"}
              </Text>
            </View>
          </Card>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardsContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  card: {
    width: "90%",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginLeft: 5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
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
    width: "90%",
    height: "50%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#214b6c",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: "#318d8c",
    borderRadius: 30,
    marginVertical: 15,
    width: "100%",
  },
  backButton: {
    backgroundColor: "#d9534f",
    borderRadius: 50,
    width: "100%",
  },
});

export default HouseDetails;
