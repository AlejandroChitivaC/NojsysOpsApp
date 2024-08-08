// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   ImageBackground,
//   Modal,
//   TextInput,
//   ScrollView,
// } from "react-native";
// import { fetchHouseDetails } from "@/app/services/houseDetailsService";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { RootStackParamList } from "@/constants/Types";
// import { Wave } from "react-native-animated-spinkit";
// import { Button, Card, Icon } from "@rneui/base";
// import { HouseDetail } from "@/app/entities/HouseDetail";

// type HouseDetailsScreenNavProps = StackNavigationProp<
//   RootStackParamList,
//   "HouseDetails"
// >;
// type Props = {
//   route: any;
//   navigation: HouseDetailsScreenNavProps;
// };

// const ICON_SIZE = 24; // Tamaño estándar para todos los iconos

// const HouseDetails: React.FC<Props> = ({ route, navigation }) => {
//   const [houseData, setHouseData] = useState<HouseDetail | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [modalVisible, setModalVisible] = useState<boolean>(true);
//   const [houseNo, setHouseNo] = useState<string>("");

//   useEffect(() => {
//     if (!modalVisible && houseNo) {
//       const getHouseDetails = async () => {
//         try {
//           setLoading(true);
//           const data = await fetchHouseDetails(houseNo);
//           if (data) {
//             setHouseData(data);
//             setError(null);
//           } else {
//             navigation.goBack();
//             setError("No data found");
//           }
//         } catch (err) {
//           navigation.goBack();
//           setError("Error fetching house details");
//           setHouseData(null);
//         } finally {
//           setLoading(false);
//         }
//       };

//       getHouseDetails();
//     }
//   }, [modalVisible, houseNo]);

//   return (
//     <View style={styles.container}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Ingrese el número de guía</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="# Número de guía"
//               value={houseNo}
//               onChangeText={(text) => setHouseNo(text)}
//             />
//             <Button
//               title="Buscar"
//               onPress={() => {
//                 if (houseNo) {
//                   setModalVisible(false);
//                 }
//               }}
//               icon={{
//                 name: "search",
//                 type: "material-icons",
//                 size: 30,
//                 color: "white",
//               }}
//               buttonStyle={styles.searchButton}
//             />
//             <Button
//               icon={{
//                 name: "arrow-back-circle",
//                 type: "ionicon",
//                 size: 30,
//                 color: "white",
//               }}
//               onPress={() => navigation.goBack()}
//               buttonStyle={styles.backButton}
//             />
//           </View>
//         </View>
//       </Modal>
//       {loading ? (
//         <ImageBackground
//           source={require("@/assets/images/peak_background.jpg")}
//           style={[styles.loaderContainer, styles.background]}
//         >
//           <Wave size={100} color="#214b6c" animating={true} />
//         </ImageBackground>
//       ) : error ? (
//         <Text style={styles.errorText}>{error}</Text>
//       ) : (
//         <ScrollView contentContainerStyle={styles.cardsContainer}>
//           {/* Card House Data */}
//           <Card containerStyle={styles.card}>
//             <Card.Title style={{ color: "#318d8c" }}>
//               {houseData?.houseNo}
//             </Card.Title>
//             <Card.Divider />
//             <View style={styles.row}>
//               <View style={styles.iconContainer}>
//                 <Icon
//                   name="home"
//                   type="font-awesome"
//                   color="#318d8c"
//                   style={styles.icon}
//                 />
//               </View>
//               <View style={styles.textContainer}>
//                 <Text style={styles.label}>#Master:</Text>{" "}
//                 {houseData?.masterNumber ?? "No Disponible"}
//               </View>
//             </View>
//             <View style={styles.row}>
//               <View style={styles.iconContainer}>
//                 <Icon
//                   name="user"
//                   type="font-awesome"
//                   color="#318d8c"
//                   style={styles.icon}
//                 />
//               </View>
//               <View style={styles.textContainer}>
//                 <Text style={styles.label}> Cliente Master:</Text>{" "}
//                 {houseData?.masterClientName ?? "No Disponible"}
//               </View>
//             </View>
//             <View style={styles.row}>
//               <View style={styles.iconContainer}>
//                 <Icon
//                   name="clipboard-list"
//                   type="font-awesome-5"
//                   color="#318d8c"
//                   style={styles.icon}
//                 />
//               </View>
//               <View style={styles.textContainer}>
//                 <Text style={styles.label}> Reajuste:</Text>{" "}
//                 {houseData?.readjustmentDescription ?? "No Disponible"}
//               </View>
//             </View>
//             <View style={styles.row}>
//               <View style={styles.iconContainer}>
//                 <Icon
//                   name="comments"
//                   type="font-awesome"
//                   color="#318d8c"
//                   style={styles.icon}
//                 />
//               </View>
//               <View style={styles.textContainer}>
//                 <Text style={styles.label}> Comentarios:</Text>{" "}
//                 {houseData?.comments ?? "No Disponible"}
//               </View>
//             </View>
//             <View style={styles.row}>
//               <View style={styles.iconContainer}>
//                 <Icon
//                   name="box"
//                   type="font-awesome-5"
//                   color="#318d8c"
//                   style={styles.icon}
//                 />
//               </View>
//               <View style={styles.textContainer}>
//                 <Text style={styles.label}> Total Piezas:</Text>{" "}
//                 {houseData?.pieces ?? "No Disponible"}
//               </View>
//             </View>
//             <View style={styles.row}>
//               <View style={styles.iconContainer}>
//                 <Icon
//                   name="box-open"
//                   type="font-awesome-5"
//                   color="#318d8c"
//                   style={styles.icon}
//                 />
//               </View>
//               <View style={styles.textContainer}>
//                 <Text style={styles.label}> Piezas Entregadas:</Text>{" "}
//                 {houseData?.deliveredPieces ?? "No Disponible"}
//               </View>
//             </View>
//           </Card>
//           {/* Card Sender Data */}
//           <Card containerStyle={styles.card}>
//             <Card.Title style={{ color: "#318d8c" }}>Remitente</Card.Title>
//             <Card.Divider />
//             <View style={styles.row}>
//               <View style={styles.iconContainer}>
//                 <Icon
//                   name="user"
//                   type="font-awesome"
//                   color="#318d8c"
//                   style={styles.icon}
//                 />
//               </View>
//               <View style={styles.textContainer}>
//                 <Text style={styles.label}>Nombre:</Text>{" "}
//                 {houseData?.senderName ?? "No Disponible"}
//               </View>
//             </View>
//             <View style={styles.row}>
//               <View style={styles.iconContainer}>
//                 <Icon
//                   name="building"
//                   type="font-awesome"
//                   color="#318d8c"
//                   style={styles.icon}
//                 />
//               </View>
//               <View style={styles.textContainer}>
//                 <Text style={styles.label}>Ciudad:</Text>{" "}
//                 {houseData?.senderCity ?? "No Disponible"}
//               </View>
//             </View>
//             <View style={styles.row}>
//               <View style={styles.iconContainer}>
//                 <Icon
//                   name="map-marker"
//                   type="font-awesome"
//                   color="#318d8c"
//                   style={styles.icon}
//                 />
//               </View>
//               <View style={styles.textContainer}>
//                 <Text style={styles.label}>Estado:</Text>{" "}
//                 {houseData?.senderState ?? "No Disponible"}
//               </View>
//             </View>
//             <View style={styles.row}>
//               <View style={styles.iconContainer}>
//                 <Icon
//                   name="flag-circle"
//                   type="materialicons"
//                   color="#318d8c"
//                   style={styles.icon}
//                 />
//               </View>
//               <View style={styles.textContainer}>
//                 <Text style={styles.label}>País:</Text>{" "}
//                 {houseData?.senderCountry ?? "No Disponible"}
//               </View>
//             </View>
//           </Card>
//           {/* Card Recipient Data */}
//           <Card containerStyle={styles.card}>
//             <Card.Title style={{ color: "#318d8c" }}>Destinatario</Card.Title>
//             <Card.Divider />
//             <View style={styles.row}>
//               <View style={styles.iconContainer}>
//                 <Icon
//                   name="user"
//                   type="font-awesome"
//                   color="#318d8c"
//                   style={styles.icon}
//                 />
//               </View>
//               <View style={styles.textContainer}>
//                 <Text style={styles.label}>Nombre:</Text>{" "}
//                 {houseData?.recipientName ?? "No Disponible"}
//               </View>
//             </View>
//             <View style={styles.row}>
//               <View style={styles.iconContainer}>
//                 <Icon
//                   name="building"
//                   type="font-awesome"
//                   color="#318d8c"
//                   style={styles.icon}
//                 />
//               </View>
//               <View style={styles.textContainer}>
//                 <Text style={styles.label}>Ciudad:</Text>{" "}
//                 {houseData?.recipientCity ?? "No Disponible"}
//               </View>
//             </View>
//             <View style={styles.row}>
//               <View style={styles.iconContainer}>
//                 <Icon
//                   name="map-marker"
//                   type="font-awesome"
//                   color="#318d8c"
//                   style={styles.icon}
//                 />
//               </View>
//               <View style={styles.textContainer}>
//                 <Text style={styles.label}>Estado:</Text>{" "}
//                 {houseData?.recipientState ?? "No Disponible"}
//               </View>
//             </View>
//             <View style={styles.row}>
//               <View style={styles.iconContainer}>
//                 <Icon
//                   name="flag-circle"
//                   type="materialicons"
//                   color="#318d8c"
//                   style={styles.icon}
//                 />
//               </View>
//               <View style={styles.textContainer}>
//                 <Text style={styles.label}>País:</Text>{" "}
//                 {houseData?.recipientCountry ?? "No Disponible"}
//               </View>
//             </View>
//           </Card>
//         </ScrollView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   loaderContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100%",
//   },
//   background: {
//     flex: 1,
//   },
//   cardsContainer: {
//     paddingVertical: 20,
//     alignItems: "center",
//   },
//   card: {
//     width: "90%",
//     borderRadius: 10,
//     borderColor: "#318d8c",
//     backgroundColor: "#fafafa",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 5,
//   },
//   iconContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 10,
//     flex: 0.2,
//   },
//   icon: {
//     fontSize: ICON_SIZE,
//   },
//   textContainer: {
//     flex: 0.5,
//   },
//   label: {
//     fontWeight: "bold",
//     color: "#214b6c",
//   },
//   value: {
//     color: "#214b6c",
//     textAlign: "right",
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center",
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   input: {
//     height: 40,
//     borderColor: "#318d8c",
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     width: 200,
//   },
//   searchButton: {
//     backgroundColor: "#318d8c",
//     marginVertical: 10,
//   },
//   backButton: {
//     backgroundColor: "#214b6c",
//     marginVertical: 10,
//   },
//   errorText: {
//     textAlign: "center",
//     color: "red",
//     fontSize: 18,
//     marginVertical: 20,
//   },
// });

// export default HouseDetails;
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
          source={require("@/assets/images/peak_background.jpg")}
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
                <Text style={styles.label}>Master:</Text>{" "}
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
                <Text style={styles.label}>Cliente:</Text>{" "}
                <Text style={styles.value}>
                  {houseData?.masterClientName ?? "No Disponible"}
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
                <Text style={styles.label}>Comentarios:</Text>{" "}
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
                <Text style={styles.label}>Rejuste:</Text>{" "}
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
                <Text style={styles.label}>Estado:</Text>{" "}
                <Text style={styles.value}>
                  {houseData?.statusDescription ?? "No Disponible"}
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
                <Text style={styles.label}>Nombre:</Text>{" "}
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
                <Text style={styles.label}>Ciudad:</Text>{" "}
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
                <Text style={styles.label}>Estado:</Text>{" "}
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
                <Text style={styles.label}>País:</Text>{" "}
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
                <Text style={styles.label}>Nombre:</Text>{" "}
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
                <Text style={styles.label}>Ciudad:</Text>{" "}
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
                <Text style={styles.label}>Estado:</Text>{" "}
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
                <Text style={styles.label}>País:</Text>{" "}
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
    fontSize: 18,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    width: 250,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: "#318d8c",
    marginBottom: 10,
    borderRadius: 50,
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
