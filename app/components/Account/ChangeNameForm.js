import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { auth } from "../../utils/firebase";

export default function ChangeNameForm(props) {
  const { displayName, setShowModal, toastRef, setReloadUser } = props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const onSubmint = () => {
    setError(null);
    if (!newDisplayName) {
      setError("El nombre no puede estar vacío");
    } else if (newDisplayName === displayName) {
      setError("El nombre no puede ser igual al actual");
    } else {
      setIsLoading(true);
      const update = {
        displayName: newDisplayName,
      };
      auth.currentUser
        .updateProfile(update)
        .then(() => {
          setReloadUser(true);
          setIsLoading(false);
          setShowModal(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setShowModal(false);
          console.log(error);
        });
    }
  };
  return (
    <View style={styles.viewContainer} keyboardShouldPersistTaps={"always"}>
      <Input
        placeholder="Nombre y apellido"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "account-circle",
          color: "#c2c2c2",
        }}
        defaultValue={displayName && displayName}
        onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
        errorMessage={error}
        keyboardType="email-address"
      />
      <Button
        title="Cambiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmint}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    width: "95%",
  },
  btn: {
    backgroundColor: "#00a680",
  },
});
