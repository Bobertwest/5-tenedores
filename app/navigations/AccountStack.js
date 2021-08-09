import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Account from "../screens/Account";

function AccountStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={Account}
        options={{ title: "Cuenta" }}
      />
    </Stack.Navigator>
  );
}

export default AccountStack;
