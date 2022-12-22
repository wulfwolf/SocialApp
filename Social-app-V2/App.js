import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./src/navigation/Auth/AuthNavigation";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store from "./src/store/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Black": require("./src/assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Thin": require("./src/assets/fonts/Roboto-Thin.ttf"),
    "karla-regular": require("./src/assets/fonts/karla.regular.ttf"),
    "karla-bold": require("./src/assets/fonts/karla.bold.ttf"),
    "holligate-signature-demo.regular": require("./src/assets/fonts/holligate-signature-demo.regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AuthNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    );
  }
}
