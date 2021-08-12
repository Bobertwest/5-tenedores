import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { isEmpty, size } from "lodash";
import { Button, Input, Icon } from "react-native-elements";
import { auth } from "../../utils/firebase";
import { validateEmail } from "../../utils/validations";
import Loading from "../Loading";
import { useNavigation } from "@react-navigation/native";

function LoginForm(props) {
  const { toastRef } = props;
  const navigation = useNavigation();
  const [formData, setFormData] = useState(defaultFormValue());
  const [showPassword, setShowPassword] = useState(true);
  const [iniciandoSesion, setIniciandoSesion] = useState(false);

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      toastRef.current.show("Todos los campos son requeridos");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("Correo no valido");
    } else if (size(formData.password) < 6) {
      toastRef.current.show(
        "La contraseña tiene que tener al menos 6 caracteres"
      );
    } else {
      setIniciandoSesion(true);
      auth
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          setIniciandoSesion(false);
          navigation.navigate("account");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/user-not-found":
              setIniciandoSesion(false);
              toastRef.current.show("Usuario incorrecto");
              break;
            case "auth/wrong-password":
              setIniciandoSesion(false);
              toastRef.current.show("Contraseña incorrecta");
              break;
            case "auth/too-many-requests":
              setIniciandoSesion(false);
              toastRef.current.show(
                "Acceso inhabilitado temporalmente debido a muchos intentos",
                3000
              );
              break;
            default:
              setIniciandoSesion(false);
              toastRef.current.show("Hubo un error");
              break;
          }
        });
    }
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electrónico"
        style={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        style={styles.inputForm}
        onChange={(e) => onChange(e, "password")}
        password={true}
        secureTextEntry={showPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="Iniciar Sensión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={() => onSubmit()}
      />
      <Loading isVisible={iniciandoSesion} text="Espere..." />
    </View>
  );
}

export default LoginForm;

function defaultFormValue() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerLogin: {
    width: "95%",
    marginTop: 20,
  },
  btnLogin: {
    backgroundColor: "#00a680",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
