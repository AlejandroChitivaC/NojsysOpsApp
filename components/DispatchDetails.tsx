import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Card } from "@rneui/base"; // Asegúrate de tener esta dependencia instalada

// Asegúrate de que tu ruta esté bien definida
import { RouteProp, useRoute } from "@react-navigation/native";
import { Dispatch } from "@/app/entities/Dispatch";
import { formatDate, formatMasterNumber } from "@/app/services/utils/utils";

type DispatchDetailsRouteProp = RouteProp<
  { DispatchDetails: { dispatch: Dispatch } },
  "DispatchDetails"
>;

const DispatchDetails: React.FC = () => {
  const route = useRoute<DispatchDetailsRouteProp>();
  const { dispatch } = route.params;

  return (
    <ImageBackground
      source={require("@/assets/images/loader_bg.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Card containerStyle={styles.card}>
          <Text style={styles.title}>Detalles del Despacho</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>{formatDate(dispatch.dateUpdate)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Número Master:</Text>
            <Text style={styles.value}>
              {formatMasterNumber(dispatch.masterNumber)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Estado:</Text>
            <Text style={styles.value}>
              {dispatch.open ? "Abierto" : "Cerrado"}
            </Text>
          </View>
          {/* Agrega aquí el resto de los detalles que desees mostrar */}
        </Card>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Ajusta la imagen para cubrir el contenedor
    justifyContent: "center", // Centra el contenido verticalmente
    alignItems: "center", // Centra el contenido horizontalmente
  },
  container: {
    flex: 1,
    justifyContent: "center", // Centra el contenido verticalmente
    alignItems: "center", // Centra el contenido horizontalmente
  },
  card: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: "#ffffff", // Fondo blanco para que el texto sea legible
    width: "90%",
    elevation: 5, // Añade una sombra a la tarjeta
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333", // Color del texto de la etiqueta
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: "#666", // Color del texto del valor
    flex: 1,
    textAlign: "right", // Alinea el texto del valor a la derecha
  },
});

export default DispatchDetails;
