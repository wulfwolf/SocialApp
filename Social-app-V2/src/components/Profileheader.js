import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "../components/Avatar";
import HeaderNav from "./HeaderNav";
import { TouchableOpacity } from "react-native";

export default function Profileheader({
  navigation,
  uname,
  ualias,
  followers,
  followings,
  followHandle,
  check,
  avatarURL,
  myInfor,
  myToken,
  receiver,
  posts,
}) {
  return (
    <View>
      <HeaderNav navigation={navigation} />
      <View
        style={{
          borderWidth: 1,
          padding: 20,
          borderRadius: 20,
          marginVertical: 20,
          borderColor: COLORS.borderColor,
          marginHorizontal: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Avatar h={(48 * 3) / 2} w={(48 * 3) / 2} URL={avatarURL} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",

              marginLeft: 10,
              flex: 1,
            }}
          >
            <View>
              <Text style={{ ...FONTS.bold, color: COLORS.inputText }}>
                {uname}
              </Text>
              <Text style={{ ...FONTS.normal, color: COLORS.inputText }}>
                /{ualias}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Chat", {
                    myInfor,
                    myToken,
                    receiver,
                  })
                }
              >
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={25}
                  style={{ marginRight: 20, color: COLORS.borderBox }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={followHandle}>
                {check ? (
                  <Ionicons
                    name="person-add-outline"
                    size={25}
                    style={{ color: COLORS.borderBox }}
                  />
                ) : (
                  <Ionicons
                    name="person-remove-outline"
                    size={25}
                    style={{ color: COLORS.borderBox }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingTop: 16,
          }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ ...FONTS.bold, color: COLORS.inputText }}>
              {followers}
            </Text>
            <Text style={{ ...FONTS.normal, color: COLORS.inputText }}>
              Follower
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderColor: COLORS.borderColor,
            }}
          >
            <Text style={{ ...FONTS.bold, color: COLORS.inputText }}>
              {followings}
            </Text>
            <Text style={{ ...FONTS.normal, color: COLORS.inputText }}>
              Following
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ ...FONTS.bold, color: COLORS.inputText }}>
              {posts}
            </Text>
            <Text style={{ ...FONTS.normal, color: COLORS.inputText }}>
              Posts
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
