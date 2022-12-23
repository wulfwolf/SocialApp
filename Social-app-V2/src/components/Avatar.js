import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../constants";

export default function Avatar({ URL, h, w, clickAvatarHandle }) {
  return (
    <TouchableOpacity onPress={clickAvatarHandle} activeOpacity={0.9}>
      <View
        style={{
          height: h ? h : 48,
          width: w ? w : 48,
          justifyContent: "center",
          alignItems: "center",
          borderColor: COLORS.borderBox,
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            position: "absolute",
            fontSize: 30,
            color: COLORS.borderBox,
          }}
        >
          +
        </Text>
        <Image
          source={{ uri: URL }}
          style={{ width: "100%", height: "100%", borderRadius: 6 }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
