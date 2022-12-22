import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeScreen from "../../screens/HomeScreen";
import LoginScreen from "../../screens/LoginScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import ImgDetail from "../../screens/ImgDetail";
import ResgisterModal from "../../screens/ResgisterModal";
import { createStackNavigator } from "@react-navigation/stack";
import PostingScreen from "../../screens/PostingScreen";
import PostDetail from "../../screens/PostDetail";
import SearchScreen from "../../screens/SearchScreen";
import OptionScreen from "../../screens/OptionScreen";
import ChatScreen from "../../screens/ChatScreen";

const stack = createStackNavigator();

export default function AuthNavigation() {
  return (
    <stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <stack.Group>
        <stack.Screen name="Login" component={LoginScreen} />
        <stack.Screen name="Register" component={ResgisterModal} />
        <stack.Screen name="Home" component={HomeScreen} />
        <stack.Screen name="Profile" component={ProfileScreen} />
        <stack.Screen name="ImgDetail" component={ImgDetail} />
        <stack.Screen name="Post" component={PostingScreen} />
        <stack.Screen name="PostDetail" component={PostDetail} />
        <stack.Screen name="Search" component={SearchScreen} />
        <stack.Screen name="Options" component={OptionScreen} />
        <stack.Screen name="Chat" component={ChatScreen} />
      </stack.Group>
    </stack.Navigator>
  );
}
