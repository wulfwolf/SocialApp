import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants";
import Avatar from "./Avatar";
import { TextInput } from "react-native";

export default function CmtBox({ URL, name, ualias, content }) {
  return (
    <View
      style={{ borderWidth: 1, borderColor: COLORS.borderBox, padding: 10 }}
    >
      <View style={{ width: "90%", alignSelf: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <Avatar URL={URL} h={34} w={34} r={50} />
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                ...FONTS.bold,
                color: COLORS.inputText,
                lineHeight: 25,
              }}
            >
              {name}
            </Text>
            <Text style={{ ...FONTS.normal, color: COLORS.inputText }}>
              /{ualias}
            </Text>
          </View>
        </View>

        <Text
          style={{
            ...FONTS.normal,
            color: COLORS.inputText,
            fontSize: 20,
          }}
        >
          {content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
