import React from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";
import ChangeNameForm from "./ChangeNameForm";

export default function Modal(props) {
  const { isVisible, setIsVisible, children } = props;
  const closeModal = () => setIsVisible(false);
  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={styles.overlay}
      onBackdropPress={closeModal}>
      {children}
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: "auto",
    width: "90%",
    backgroundColor: "#fff",
    padding: 0,
  },
});
