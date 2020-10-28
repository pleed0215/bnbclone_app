import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Explorer from "../screens/Main/Explorer";
import MapScreen from "../screens/Main/Map";
import Profile from "../screens/Main/Profile";
import Saved from "../screens/Main/Saved";
import Room from "../screens/Room";

import ThemeColor from "../color";
import utils from "../utils";
import { Ionicons } from "@expo/vector-icons";
import BackBtn from "../Components/Auth/BackBtn";
import { BlurView } from "expo-blur";

const TabsNavigator = createBottomTabNavigator();

const Tabs = () => (
  <TabsNavigator.Navigator
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
    <TabsNavigator.Screen name="Explorer" component={Explorer} />
    <TabsNavigator.Screen name="Saved" component={Saved} />
    <TabsNavigator.Screen name="Map" component={MapScreen} />
    <TabsNavigator.Screen name="Profile" component={Profile} />
  </TabsNavigator.Navigator>
);
const MainNavigator = createStackNavigator();
export default () => (
  <MainNavigator.Navigator
    mode="modal"
    screenOptions={{
      headerTintColor: "rgb(50,50,50)",
      headerBackTitleVisible: false,
      headerBackImage: () => <BackBtn />,
    }}
  >
    <MainNavigator.Screen
      name="tabs"
      component={Tabs}
      options={{ headerShown: null }}
    />
    <MainNavigator.Screen
      name="RoomDetail"
      component={Room}
      options={{
        headerTransparent: true,
        headerBackground: () => (
          <BlurView
            intensity={50}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    />
  </MainNavigator.Navigator>
);
