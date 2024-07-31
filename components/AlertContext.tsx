import React, { createContext, useContext, useState, ReactNode } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type AlertContextType = {
  showAlert: (
    message: string,
    alertType?: "success" | "error" | "warning"
  ) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );

  const showAlert = (
    msg: string,
    type: "success" | "error" | "warning" = "success"
  ) => {
    setMessage(msg);
    setAlertType(type);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 800);
  };

  const hideAlert = () => {
    setVisible(false);
  };

  const getIconName = (type: "success" | "error" | "warning") => {
    switch (type) {
      case "success":
        return "check-circle";
      case "error":
        return "times-circle";
      case "warning":
        return "exclamation-circle";
      default:
        return "check-circle";
    }
  };

  const getIconColor = (type: "success" | "error" | "warning") => {
    switch (type) {
      case "success":
        return "green";
      case "error":
        return "red";
      case "warning":
        return "orange";
      default:
        return "green";
    }
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Modal
        transparent={true}
        animationType="slide"
        visible={visible}
        onRequestClose={hideAlert}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Icon
              name={getIconName(alertType)}
              color={getIconColor(alertType)}
              size={50}
              style={styles.icon}
            />
            <Text style={styles.alertText}>{message}</Text>
          </View>
        </View>
      </Modal>
    </AlertContext.Provider>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  icon: {
    marginBottom: 20,
  },
  alertText: {
    fontSize: 20,
    fontWeight: "bold",
      textAlign: "center",
      justifyContent:"center",
    marginBottom: 20,
  },
});

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
