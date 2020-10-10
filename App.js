import { AppLoading } from "expo";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Asset } from "expo-asset";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";

const cacheImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    }
    // react native의 Image class를 이용하는 것이라 한다.
    else {
      return Asset.fromModule(image).downloadAsync();
    }
  });

const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
  const [ready, setReady] = useState(false);
  const loadAssets = async () => {
    const images = [
      require("./assets/login_splash.jpg"),
      "https://maybugs.com/news/photo/201808/625096_485796_2158.png",
    ];
    const fonts = [Ionicons.font];
    const imagesPromise = cacheImages(images);
    const fontsPromise = cacheFonts(fonts);
    return Promise.all([...fontsPromise, ...imagesPromise]);
  };
  return ready ? (
    <Text>Hello</Text>
  ) : (
    <AppLoading
      startAsync={loadAssets}
      onError={console.error}
      onFinish={() => {
        setReady(true);
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
