import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Account from "../screens/Account/Account";
import Login from "../screens/Account/Login";

function AccountStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={Account}
        options={{ title: "Mi cuenta" }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{ title: "Iniciar sesión" }}
      />
    </Stack.Navigator>
  );
}

export default AccountStack;
