import React from "react";
import { View, Text, Button } from "react-native";
import { auth } from "../../utils/firebase";

function UserLogged() {
  return (
    <View>
      <Text>UserLogged...</Text>
      <Button title="Logout" onPress={() => auth.signOut()} />
    </View>
  );
}

export default UserLogged;
