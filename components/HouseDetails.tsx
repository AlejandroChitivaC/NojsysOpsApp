import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
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

const ICON_SIZE = 24; // Tamaño estándar para todos los iconos

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
          source={require("@/assets/images/loader_bg.jpg")}
          style={[styles.loaderContainer, styles.background]}
        >
          <Wave size={100} color="#214b6c" animating={true} />
        </ImageBackground>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.cardsContainer}>
          {/* Card House Data */}
          <Card containerStyle={styles.card}>
            <Card.Title style={styles.cardTitle}>
              {houseData?.houseNo}
            </Card.Title>
            <Card.Divider />
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Icon
                  name="barcode-sharp"
                  type="ionicon"
                  color="#318d8c"
                  style={styles.icon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Master:</Text>
                <Text style={styles.value}>
                  {houseData?.masterNumber ?? "No Disponible"}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Icon
                  name="user"
                  type="font-awesome"
                  color="#318d8c"
                  style={styles.icon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Cliente:</Text>
                <Text style={styles.value}>
                  {houseData?.masterClientName ?? "No Disponible"}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Icon
                  name="dropbox"
                  type="entypo"
                  color="#318d8c"
                  style={styles.icon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Contenido:</Text>
                <Text style={styles.value}>
                  {houseData?.contents || "No Disponible"}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Icon
                  name="message1"
                  type="antdesign"
                  color="#318d8c"
                  style={styles.icon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Comentarios:</Text>
                <Text style={styles.value}>
                  {houseData?.comments || "No Disponible"}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Icon
                  name="info"
                  type="font-awesome-6"
                  color="#318d8c"
                  style={styles.icon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Rejuste:</Text>
                <Text style={styles.value}>
                  {houseData?.readjustmentDescription ?? "No Disponible"}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Icon
                  name="list-status"
                  type="material-community"
                  color="#318d8c"
                  style={styles.icon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Estado:</Text>
                <Text style={styles.value}>
                  {houseData?.statusDescription ?? "No Disponible"}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Icon
                  name="box"
                  type="entypo"
                  color="#318d8c"
                  style={styles.icon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Piezas:</Text>
                <Text style={styles.value}>
                  {houseData?.pieces ?? "No Disponible"}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Icon
                  name="checkmark-circle"
                  type="ionicon"
                  color="#318d8c"
                  style={styles.icon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Piezas Entregadas:</Text>
                <Text style={styles.value}>
                  {houseData?.deliveredPieces ?? "No Disponible"}
                </Text>
              </View>
            </View>
          </Card>
          {/* Card Sender Data */}
          <Card containerStyle={styles.card}>
            <Card.Title style={styles.cardTitle}>Remitente</Card.Title>
            <Card.Divider />
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Icon
                  name="user"
                  type="font-awesome"
                  color="#318d8c"
                  style={styles.icon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Nombre:</Text>
                <Text style={styles.value}>
                  {houseData?.senderName ?? "No Disponible"}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Icon
                  name="building"
                  type="font-awesome"
                  color="#318d8c"
                  style={styles.icon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Ciudad:</Text>
                <Text style={styles.value}>
                  {houseData?.senderCity ?? "No Disponible"}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Icon
                  name="map-marker"
                  type="font-awesome"
                  color="#318d8c"
                  style={styles.icon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Estado:</Text>
                <Text style={styles.value}>
                  {houseData?.senderState ?? "No Disponible"}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Icon
                  name="globe"
                  type="font-awesome"
                  color="#318d8c"
                  style={styles.icon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>País:</Text>
                <Text style={styles.value}>
                  {houseData?.senderCountry ?? "No Disponible"}
                </Text>
              </View>
            </View>
          </Card>
          {/* Card Recipient Data */}
          <Card containerStyle={styles.card}>
            <Card.Title style={styles.cardTitle}>Destinatario</Card.Title>
            <Card.Divider />
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Icon
                  name="user"
                  type="font-awesome"
                  color="#318d8c"
                  style={styles.icon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Nombre:</Text>
                <Text style={styles.value}>
                  {houseData?.recipientName ?? "No Disponible"}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Icon
                  name="building"
                  type="font-awesome"
                  color="#318d8c"
                  style={styles.icon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Ciudad:</Text>
                <Text style={styles.value}>
                  {houseData?.recipientCity ?? "No Disponible"}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Icon
                  name="map-marker"
                  type="font-awesome"
                  color="#318d8c"
                  style={styles.icon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Estado:</Text>
                <Text style={styles.value}>
                  {houseData?.recipientState ?? "No Disponible"}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Icon
                  name="globe"
                  type="font-awesome"
                  color="#318d8c"
                  style={styles.icon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>País:</Text>
                <Text style={styles.value}>
                  {houseData?.recipientCountry ?? "No Disponible"}
                </Text>
              </View>
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
    backgroundColor: "#f2f2f2",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    color: "#333",
    fontWeight:"800"
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    width: 250,
    paddingHorizontal: 10,
    borderRadius:10
  },
  searchButton: {
    backgroundColor: "#318d8c",
    marginBottom: 20,
    borderRadius: 50,
    width: 150,
  },
  backButton: {
    backgroundColor: "#31488d",
    marginBottom: 10,
    borderRadius: 50,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    margin: 20,
  },
  cardsContainer: {
    flexGrow: 1,
    padding: 10,
  },
  card: {
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#318d8c",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconContainer: {
    width: 30,
    alignItems: "center",
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  label: {
    fontSize: 16,
    color: "#318d8c",
    fontWeight: "700",
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
});

export default HouseDetails;
