import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import Toast from "react-native-easy-toast";
import { Divider } from "react-native-elements";
import LoginForm from "../../components/Account/LoginForm";

export default function Login() {
  const toastRef = useRef();

  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef} />
        <CreateAccount />
      </View>
      <Divider style={styles.divider} />
      <Text>Social login</Text>
      <Toast
        ref={toastRef}
        position="center"
        opacity={0.9}
        style={{ marginLeft: 30, marginRight: 30 }}
      />
    </ScrollView>
  );
}

function CreateAccount() {
  const navigation = useNavigation();
  return (
    <Text style={styles.textRegister}>
      {`¿Aún no tienes cuenta? `}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("register")}>
        Regístrate
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
  },
  btnRegister: {
    color: "#00a680",
  },
  divider: {
    backgroundColor: "#00a680",
    height: 1,
    margin: 40,
  },
});
