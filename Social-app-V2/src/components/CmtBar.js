import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { COLORS, localhost } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default function CmtBar({ post_id, token, getCmtList }) {
  const [textContent, setTextContent] = useState("");
  const submitHandle = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const res = await axios.post(
      `http://${localhost}:3000/api/comment/${post_id}`,
      {
        content: textContent,
      }
    );
    if (res) {
      setTextContent("");
      getCmtList();
    } else {
      alert(res.data.message);
    }
  };
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: COLORS.borderColor,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.primary,
      }}
    >
      <TextInput
        placeholder="Leave your comment here!"
        placeholderTextColor={"#b1b1bc"}
        style={{ flex: 1, padding: 15, color: COLORS.inputText }}
        onChangeText={(text) => setTextContent(text)}
        value={textContent}
      />
      <TouchableOpacity onPress={submitHandle}>
        <Ionicons
          name="paper-plane-outline"
          size={25}
          style={{
            color: COLORS.borderBox,
            padding: 15,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
