import { View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { COLORS } from "../constants";

export default function HeaderNav({ navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 10,
        paddingHorizontal: 15,
        backgroundColor: COLORS.primary,
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="arrow-back-outline"
          size={30}
          color={COLORS.borderBox}
        />
      </TouchableOpacity>
      <Ionicons
        name="ellipsis-vertical-outline"
        size={30}
        color={COLORS.borderBox}
      />
    </View>
  );
}
