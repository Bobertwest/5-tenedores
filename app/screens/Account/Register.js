import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import RegisterForm from "../../components/Account/RegisterForm";

function Register() {
  return (
    <View>
      <KeyboardAwareScrollView>
        <Image
          source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
          resizeMode="contain"
          style={styles.logo}
        />
        <View style={styles.viewForm}>
          <RegisterForm />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default Register;

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
});
