import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../constants";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import UserItem from "../components/UserItem";
import { useDispatch } from "react-redux";
import AuthSlice from "../slice/AuthSlice";

export default function OptionSceen({ navigation, route }) {
  const myInfor = route.params.user;
  // const dispatch = useDispatch();
  function logoutHandle() {
    // dispatch(AuthSlice.actions.signOut());
    navigation.replace("Login");
  }
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.primary, flex: 1 }}>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 15,
          backgroundColor: COLORS.primary,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-outline"
            size={30}
            color={COLORS.borderBox}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 16,
          ...FONTS.bold,
          color: COLORS.placeholder,
          marginLeft: 10,
        }}
      >
        Personal Information
      </Text>
      <UserItem
        name={myInfor.username}
        alias={myInfor.alias}
        URL={myInfor.avatarURL}
      />
      <View style={{ width: "100%", marginVertical: 100 }}>
        <TouchableOpacity
          style={{
            width: "100%",
            alignItems: "center",
            borderTopWidth: 1,
            borderTopColor: COLORS.borderBox,
            padding: 5,
          }}
        >
          <Text
            style={{ fontSize: 14, ...FONTS.bold, color: COLORS.placeholder }}
          >
            News
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            alignItems: "center",
            borderTopWidth: 1,
            borderTopColor: COLORS.borderBox,
            padding: 5,
          }}
        >
          <Text
            style={{ fontSize: 14, ...FONTS.bold, color: COLORS.placeholder }}
          >
            Settings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            alignItems: "center",
            borderTopWidth: 1,
            borderColor: COLORS.borderBox,
            borderBottomWidth: 1,
            padding: 5,
          }}
        >
          <Text
            style={{ fontSize: 14, ...FONTS.bold, color: COLORS.placeholder }}
          >
            help&support
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ alignSelf: "center" }} onPress={logoutHandle}>
        <Text
          style={{ fontSize: 12, ...FONTS.bold, color: COLORS.placeholder }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
