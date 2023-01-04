import { Image, TouchableOpacity, View, Animated, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, localhost, SIZES } from "../constants";
import HeaderNav from "../components/HeaderNav";
import Post from "../components/Post";
import { ScrollView } from "react-native";
import CmtBar from "../components/CmtBar";
import CmtBox from "../components/CmtBox";
import axios from "axios";

export default function PostDetail({ navigation, route }) {
  const post = route.params.post;
  const token = route.params.token;
  const [cmt, setCmt] = useState([]);
  const getCmtList = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(
        `http://${localhost}:3000/api/comment/${post._id}`
      );

      if (response.data.success) {
        setCmt(response.data.comment);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getCmtList();
    // fetch();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.primary }}>
      <HeaderNav navigation={navigation} />
      <ScrollView>
        <Post
          avatarURL={post.user.avatarURL}
          uName={post.user.username}
          uAlias={post.user.alias}
          textContent={post.content}
          imgContent={post.img}
          likeQuantity={post.likes.length}
          navigation={navigation}
          post_id={post._id}
          token={token}
          shareQuantity={post.shares.length}
        />
        <View style={{ width: "90%", alignSelf: "center", marginBottom: 10 }}>
          <Text
            style={{ ...FONTS.normal, color: COLORS.inputText, fontSize: 29 }}
          >
            Comments below.
          </Text>
        </View>
        {cmt &&
          cmt.map((cmtBox, index) => (
            <CmtBox
              name={cmtBox.user.username}
              ualias={cmtBox.user.alias}
              URL={cmtBox.user.avatarURL}
              content={cmtBox.content}
              key={index}
            />
          ))}
        <View style={{ paddingBottom: 400 }}></View>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 35, width: "100%" }}>
        <CmtBar post_id={post._id} token={token} getCmtList={getCmtList} />
      </View>
    </SafeAreaView>
  );
}
