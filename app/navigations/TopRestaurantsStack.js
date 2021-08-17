import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopRestaurants from "../screens/TopRestaurants";

export default function TopRestaurantsStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="top-restaurant"
        component={TopRestaurants}
        options={{ title: "Top 5" }}
      />
    </Stack.Navigator>
  );
}
