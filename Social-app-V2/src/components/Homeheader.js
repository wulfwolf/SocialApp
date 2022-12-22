import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import UserBox from "./UserBox";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, localhost } from "../constants";
import { TouchableOpacity } from "react-native";
import axios from "axios";

export default function Homeheader({ navigation, myInfor }) {
  const token = myInfor.accessToken;
  const [followings, setfollowings] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(
          `http://${localhost}:3000/api/follow/followings/${myInfor.user._id}`
        );

        if (response) {
          setfollowings(response.data.followings);
        }
      } catch (error) {
        // console.log(error);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: 20,
      }}
    >
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <UserBox
          uname={"me"}
          navigation={navigation}
          clickAvatarHandle={myInfor}
        />
        {followings &&
          followings.length > 0 &&
          followings.map((user, index) => (
            <View style={{ marginHorizontal: 2 }} key={index}>
              <UserBox
                uname={user.username}
                URL={user.avatarURL}
                navigation={navigation}
                clickAvatarHandle={() =>
                  navigation.navigate("Profile", { user, myInfor })
                }
              />
            </View>
          ))}
      </ScrollView>
    </View>
  );
}
