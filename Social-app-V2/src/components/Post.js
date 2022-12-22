import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FONTS, COLORS } from "../constants/theme";
import Avatar from "./Avatar";
import { Ionicons } from "@expo/vector-icons";
import ImgCalculating from "../components/ImgCalculating";
import axios from "axios";
import { localhost } from "../constants";

export default function Post({
  avatarURL,
  uName,
  uAlias,
  textContent,
  imgContent,
  likeQuantity,
  shareQuantity,
  navigation,
  cmtHandle,
  token,
  post_id,
  user,
  myInfor,
}) {
  const [updatedLike, setlike] = useState();
  const [cmtQuantity, setcmtQuantity] = useState();
  const likeHandle = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.put(
        `http://${localhost}:3000/api/posts/like/${post_id}`
      );
      if (response.data.message === "Liked!") {
        console.log("liked");
        setlike(response.data.post.likes.length);
      } else {
        console.log("dislike");
        setlike(response.data.post.likes.length);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCmtQuantity();
  }, []);
  const getCmtQuantity = async (post) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(
        `http://${localhost}:3000/api/comment/${post_id}`
      );

      if (response.data.success) {
        setcmtQuantity(response.data.comment.length);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  function shareHandle() {
    console.log("share");
  }
  function optionsHandle() {
    console.log("optionsHandle");
  }
  function bookmarkHandle() {
    console.log("bookmarkHandle");
  }

  return (
    <View
      style={{
        borderTopWidth: 1,
        borderColor: "#17175b",
        paddingVertical: 15,
      }}
    >
      <View style={{ width: "90%", alignSelf: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <Avatar
            URL={avatarURL}
            clickAvatarHandle={() =>
              navigation.navigate("Profile", { user, myInfor })
            }
          />
          <View
            style={{
              marginLeft: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <View>
              <Text
                style={{
                  ...FONTS.bold,
                  color: COLORS.inputText,
                  lineHeight: 25,
                }}
              >
                {uName}
              </Text>
              <Text style={{ ...FONTS.normal, color: COLORS.inputText }}>
                /{uAlias}
              </Text>
            </View>
            <TouchableOpacity onPress={optionsHandle}>
              <Ionicons
                name="ellipsis-vertical-outline"
                size={25}
                style={{ color: COLORS.borderBox }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            textAlign: "justify",
            paddingTop: 20,
            ...FONTS.normal,
            color: COLORS.inputText,
            paddingBottom: 10,
          }}
        >
          {textContent}
        </Text>

        <View style={{ alignItems: "center" }}>
          {imgContent && (
            <ImgCalculating
              imgURL={imgContent}
              w={"70%"}
              mb={20}
              navigation={navigation}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={likeHandle}>
              <Ionicons
                name="heart-outline"
                size={30}
                style={{ color: COLORS.borderBox }}
              />
            </TouchableOpacity>

            <Text
              style={{
                marginRight: 15,
                color: COLORS.inputText,
                ...FONTS.normal,
                fontSize: 17,
              }}
            >
              {updatedLike == 0 || updatedLike ? updatedLike : likeQuantity}
            </Text>

            <TouchableOpacity onPress={cmtHandle}>
              <Ionicons
                name="chatbubble-outline"
                size={30}
                style={{ color: COLORS.borderBox }}
              />
            </TouchableOpacity>

            <Text
              style={{
                marginRight: 15,
                color: COLORS.inputText,
                ...FONTS.normal,
                fontSize: 17,
              }}
            >
              {cmtQuantity}
            </Text>

            <TouchableOpacity onPress={shareHandle}>
              <Ionicons
                name="paper-plane-outline"
                size={30}
                style={{ color: COLORS.borderBox }}
              />
            </TouchableOpacity>
            <Text
              style={{ color: COLORS.inputText, ...FONTS.normal, fontSize: 17 }}
            >
              {shareQuantity}
            </Text>
          </View>
          <TouchableOpacity onPress={bookmarkHandle}>
            <Ionicons
              name="bookmark-outline"
              size={30}
              style={{ color: COLORS.borderBox }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
