import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../constants";
import Avatar from "./Avatar";

function UserItem({ name, alias, URL, clickItemHandle }) {
  return (
    <TouchableOpacity onPress={clickItemHandle}>
      <View style={{ padding: 10, flexDirection: "row" }}>
        <Avatar URL={URL} />

        <View
          style={{
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{ fontSize: 16, ...FONTS.bold, color: COLORS.placeholder }}
          >
            {name}
          </Text>
          <Text
            style={{ fontSize: 13, ...FONTS.normal, color: COLORS.placeholder }}
          >
            /{alias}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default UserItem;
