import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { map } from "lodash";
import { ListItem, Icon } from "react-native-elements";
import Modal from "./Modal";
import ChangeNameForm from "./ChangeNameForm";

export default function AccountOptions(props) {
  const { userInfo, toastRef, setReloadUser } = props;
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const imprimir = (key) => {
    switch (key) {
      case "displayName":
        setRenderComponent(
          <ChangeNameForm
            displayName={userInfo.displayName}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setReloadUser={setReloadUser}
          />
        );
        setShowModal(true);
        break;
      case "Email":
        setRenderComponent(<Text>Cambiar Email...</Text>);
        setShowModal(true);
        break;
      case "Password":
        setRenderComponent(<Text>Cambiar Contraseña...</Text>);
        setShowModal(true);
        break;
      default:
        setRenderComponent(false);
        break;
    }
  };
  const menuOptions = generateOptions(imprimir);

  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem key={index} style={styles.container} onPress={menu.onpress}>
          <Icon
            name={menu.iconNameLeft}
            type={menu.iconType}
            iconColor={menu.iconColor}
          />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color="#ccc" />
        </ListItem>
      ))}
      {renderComponent && (
        <Modal isVisible={showModal} setIsVisible={setShowModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

function generateOptions(ejecutar) {
  return [
    {
      title: "Cambiar Nombre",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColor: "ccc",
      onpress: () => ejecutar("displayName"),
    },
    {
      title: "Cambiar Email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColor: "ccc",
      onpress: () => ejecutar("Email"),
    },
    {
      title: "Cambiar Contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColor: "ccc",
      onpress: () => ejecutar("Password"),
    },
  ];
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#c3c3c3",
  },
});
