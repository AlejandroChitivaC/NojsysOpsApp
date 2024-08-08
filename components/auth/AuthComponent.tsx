import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import {
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from "expo-auth-session";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Animated,
  Easing,
  TouchableOpacity,
  Alert,
  Dimensions,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { HelloWave } from "../HelloWave";
import { RootStackParamList } from "@/constants/Types";
import { StackNavigationProp } from "@react-navigation/stack";
const { EXPO_PUBLIC_CLIENT_ID, EXPO_PUBLIC_AUTH_URL } = process.env;

WebBrowser.maybeCompleteAuthSession();

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, "Auth">;

const Auth: React.FC = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const [token, setToken] = React.useState<string | null>(null);

  const discovery = useAutoDiscovery(`${EXPO_PUBLIC_AUTH_URL}`);
  const redirectUri = makeRedirectUri({
    scheme: undefined,
    path: "/signin-oidc",
  });

  const clientId = `${EXPO_PUBLIC_CLIENT_ID}`;

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ["openid", "profile", "email", "offline_access"],
      redirectUri,
    },
    discovery
  );

  const handleLogin = () => {
    promptAsync().then((codeResponse) => {
      if (request && codeResponse?.type === "success" && discovery) {
        exchangeCodeAsync(
          {
            clientId,
            code: codeResponse.params.code,
            extraParams: request.codeVerifier
              ? { code_verifier: request.codeVerifier }
              : undefined,
            redirectUri,
          },
          discovery
        ).then((res) => {
          setToken(res.accessToken);
          Alert.alert(
            "Autenticación exitosa",
            "¡Has iniciado sesión correctamente!"
          );
        });
      }
    });
  };

  const fadeIn = React.useRef(new Animated.Value(0)).current;
  const logoOpacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ImageBackground
      source={require("@/assets/images/giphy.webp")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Animated.View
          style={{ opacity: fadeIn, alignItems: "center", flex: 1 }}
        >
          <Animated.View style={[styles.header, { opacity: logoOpacity }]}>
            <Animated.Image
              source={require("@/assets/images/logo_bbic-removebg-preview.png")}
              style={[styles.logo, { opacity: logoOpacity }]}
            />
          </Animated.View>
          <View style={styles.body}>
            <Text style={styles.title}>
              NojsysOps App <HelloWave />{" "}
            </Text>
            <Animated.Text style={[styles.subtitle, { opacity: fadeIn }]}>
              Gestión Operativa Eficiente
            </Animated.Text>
            <TouchableOpacity
              style={styles.microsoftButton}
              onPress={handleLogin}
              disabled={!request}
            >
              <Icon
                name="logo-microsoft"
                size={25}
                color="#fff"
                style={styles.microsoftLogo}
              />
              <Text style={styles.microsoftButtonText}>
                Iniciar sesión con Microsoft
              </Text>
            </TouchableOpacity>
            {token && <Text style={styles.tokenText}>{token}</Text>}
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>¿Necesitas ayuda?</Text>
            <TouchableOpacity>
              <Icon name="chatbubble-ellipses" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    width: windowWidth,
    height: windowHeight,
  },
  logo: {
    width: 270,
    height: 270,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 20,
  },
  microsoftButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0078D4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 50,
  },
  microsoftLogo: {
    marginRight: 10,
  },
  microsoftButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  footerText: {
    color: "#fff",
    marginEnd: 10,
  },
  tokenText: {
    color: "#fff",
    marginTop: 20,
    textAlign: "center",
  },
});

export default Auth;
