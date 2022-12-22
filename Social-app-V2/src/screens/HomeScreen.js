import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Homeheader from "../components/Homeheader";

import { SafeAreaView } from "react-native-safe-area-context";
import Homebody from "../components/Homebody";
import { COLORS, FONTS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

export default function HomeScreen({ navigation, route }) {
  const myInfor = route.params;

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.primary }}>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 7,
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate("Search", myInfor)}
          >
            <Ionicons
              name="search-outline"
              size={28}
              style={{ color: COLORS.placeholder }}
            />
            <Text
              style={{
                color: COLORS.placeholder,
                ...FONTS.normal,
                fontSize: 20,
              }}
            >
              Search!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Options", myInfor)}
          >
            <Ionicons
              name="reorder-three-outline"
              size={38}
              style={{ color: COLORS.borderBox }}
            />
          </TouchableOpacity>
        </View>

        <Homeheader navigation={navigation} myInfor={myInfor} />

        <Homebody
          navigation={navigation}
          avatarURL={myInfor.user.avatarURL}
          myInfor={myInfor}
          token={myInfor.accessToken}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
