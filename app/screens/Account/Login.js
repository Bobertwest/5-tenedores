import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";

function Login() {
  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewContainer}>
        <Text style={styles.texto}>Login Form</Text>
        <CreateAccount />
      </View>
      <Divider style={styles.divider} />
      <Text>Social login</Text>
    </ScrollView>
  );
}

export default Login;

function CreateAccount() {
  return (
    <Text style={styles.textRegister}>
      {`¿Aún no tienes cuenta? `}
      <Text
        style={styles.btnRegister}
        onPress={() => console.log("Registro...")}>
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