import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { isEmpty, size } from "lodash";
import Loading from "../Loading";
import { Input, Button, Icon } from "react-native-elements";
import { auth } from "../../utils/firebase";
import { validateEmail } from "../../utils/validations";

function RegisterForm(props) {
  const { toastRef } = props;

  const navigation = useNavigation();
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showRepeatPassword, setShowRepeatPassword] = useState(true);
  const [formData, setFormData] = useState(defaultFormValues());

  const onSubmit = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.repeatPassword)
    ) {
      toastRef.current.show("Todos los campos son requeridos");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("Correo no valido");
    } else if (formData.password !== formData.repeatPassword) {
      toastRef.current.show("Las contraseñas no coinciden");
    } else if (size(formData.password) < 6) {
      toastRef.current.show(
        "La contraseña tiene que tener al menos 6 caracteres"
      );
    } else {
      setCreatingAccount(true);
      auth
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then((response) => {
          setCreatingAccount(false);
          navigation.navigate("account");
        })
        .catch((error) => {
          setCreatingAccount(false);
          toastRef.current.show("ha ocurrido un error");
        });
    }
  };

  function defaultFormValues() {
    return {
      email: "",
      password: "",
      repeatPassword: "",
    };
  }

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electrónico"
        onChange={(e) => onChange(e, "email")}
        containerStyle={styles.inputForm}
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
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showPassword}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        placeholder="Repetir contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showRepeatPassword}
        onChange={(e) => onChange(e, "repeatPassword")}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepeatPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowRepeatPassword(!showRepeatPassword)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      />
      <Loading isVisible={creatingAccount} text="Creando cuenta..." />
    </View>
  );
}

export default RegisterForm;

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
  btnContainerRegister: {
    width: "95%",
    marginTop: 20,
  },
  btnRegister: {
    backgroundColor: "#00a680",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
