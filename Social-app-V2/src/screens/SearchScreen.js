import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, localhost } from "../constants";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import UserItem from "../components/UserItem";
import { useState } from "react";
import axios from "axios";

export default function SearchScreen({ navigation, route }) {
  const myInfor = route.params;
  const [user, setUser] = useState();

  function getUserData(text) {
    const getdata = async () => {
      try {
        const res = await axios.post(`http://${localhost}:3000/api/search`, {
          username: text,
        });
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (error) {
        setUser("");
      }
    };
    getdata();
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
        <TextInput
          placeholder="Search my app!"
          placeholderTextColor={COLORS.placeholder}
          style={{
            flex: 1,
            textAlign: "left",
            marginLeft: 30,
            color: COLORS.inputText,
          }}
          onChangeText={getUserData}
        />
      </View>
      {user && (
        <UserItem
          name={user.username}
          URL={user.avatarURL}
          alias={user.alias}
          clickItemHandle={() =>
            navigation.navigate("Profile", {
              user,
              myInfor,
            })
          }
        />
      )}
    </SafeAreaView>
  );
}
