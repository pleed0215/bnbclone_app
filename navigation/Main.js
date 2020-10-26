import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Explorer from "../screens/Main/Explorer";
import MapScreen from "../screens/Main/Map";
import Profile from "../screens/Main/Profile";
import Saved from "../screens/Main/Saved";

import ThemeColor from "../color";
import utils from "../utils";
import { Ionicons } from "@expo/vector-icons";

const Main = createBottomTabNavigator();

export default () => (
  <Main.Navigator
    tabBarOptions={{
      activeTintColor: ThemeColor.red,
      labelStyle: { textTransform: "uppercase", fontSize: 12 },
      fontWeight: "600",
      tabStyle: {
        paddingTop: 10,
      },
    }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        const iconPrefix = utils.isAndroid() ? "md-" : "ios-";
        let iconName = null;
        switch (route.name) {
          case "Explorer":
            iconName = iconPrefix + "search";
            break;
          case "Map":
            iconName = iconPrefix + "map";
            break;
          case "Profile":
            iconName = iconPrefix + "person";
            break;
          case "Saved":
            iconName = iconPrefix + "heart";
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            color={focused ? ThemeColor.red : ThemeColor.grey}
          />
        );
      },
    })}
  >
    <Main.Screen name="Explorer" component={Explorer} />
    <Main.Screen name="Saved" component={Saved} />
    <Main.Screen name="Map" component={MapScreen} />
    <Main.Screen name="Profile" component={Profile} />
  </Main.Navigator>
);
