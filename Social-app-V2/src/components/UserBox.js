import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Avatar from "./Avatar";
import { COLORS, FONTS } from "../constants";

export default function UserBox({
  URL,
  uname,
  uid,
  navigation,
  clickAvatarHandle,
}) {
  return (
    <View>
      <Avatar
        URL={URL}
        navigation={navigation}
        clickAvatarHandle={clickAvatarHandle}
      />
      <Text
        style={{
          fontSize: 12,
          alignSelf: "center",
          ...FONTS.normal,
          color: COLORS.inputText,
        }}
      >
        {uname}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
