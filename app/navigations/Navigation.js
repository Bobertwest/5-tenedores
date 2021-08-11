import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import SearchStack from "./SearchStack";
import FavoriteStack from "./FavoriteStack";
import TopRestaurantsStack from "./TopRestaurantsStack";
import AccountStack from "./AccountStack";
import RestaurantsStack from "./RestaurantsStack";

function Navigation() {
  const Tab = createBottomTabNavigator();

  const screenOptions = (route, color) => {
    let iconName;

    switch (route.name) {
      case "restaurants":
        iconName = "compass-outline";
        break;
      case "favorites":
        iconName = "heart-outline";
        break;
      case "top-restaurants":
        iconName = "star-outline";
        break;
      case "searches":
        iconName = "magnify";
        break;
      case "accounts":
        iconName = "home-outline";
        break;
      default:
        break;
    }
    return (
      <Icon type="material-community" name={iconName} size={22} color={color} />
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="restaurants"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
          headerShown: false,
          tabBarInactiveTintColor: "#646464",
          tabBarActiveTintColor: "#00a680",
          tabBarStyle: [
            {
              paddingLeft: 5,
              paddingRight: 5,
              paddingBottom: 10,
              height: 60,
            },
          ],
        })}>
        <Tab.Screen
          name="restaurants"
          component={RestaurantsStack}
          options={{ title: "Restaurantes" }}
        />
        <Tab.Screen
          name="favorites"
          component={FavoriteStack}
          options={{ title: "Favoritos" }}
        />
        <Tab.Screen
          name="top-restaurants"
          component={TopRestaurantsStack}
          options={{ title: "Top 5" }}
        />
        <Tab.Screen
          name="searches"
          component={SearchStack}
          options={{ title: "Buscar" }}
        />
        <Tab.Screen
          name="accounts"
          component={AccountStack}
          options={{ title: "Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
