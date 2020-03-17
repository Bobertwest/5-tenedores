import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon } from "react-native-elements";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button loading={true} />
      <Button
        title="click me"
        icon={
          <Icon
            type="material-community"
            name="check-outline"
            size={15}
            color="white"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
