import { ScrollView, StyleSheet, View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Post from "./Post";
import Avatar from "./Avatar";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, localhost } from "../constants";
import axios from "axios";

export default function Homebody({ navigation, avatarURL, myInfor, token }) {
  const [res, setRes] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(
          `http://${localhost}:3000/api/posts/${myInfor.user._id}`
        );
        if (response) {
          setRes(response.data.followingPosts.reverse());
        }
      } catch (error) {
        // console.log(error);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginBottom: 172 }}
    >
      <View>
        <View
          style={{
            width: "90%",
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Avatar URL={avatarURL} />
          <Text
            style={{ flex: 1, marginHorizontal: 10, color: "#b1b1bc" }}
            onPress={() => navigation.navigate("Post", { myInfor, token })}
          >
            Share your memory here !
          </Text>
          <View style={{ justifyContent: "center" }}>
            <Ionicons
              name="image-outline"
              size={30}
              style={{ color: COLORS.borderBox }}
            />
          </View>
        </View>
        {res &&
          res.length > 0 &&
          res.map((post, index) => (
            <Post
              avatarURL={post.user.avatarURL}
              uName={post.user.username}
              uAlias={post.user.alias}
              textContent={post.content}
              imgContent={post.img}
              likeQuantity={post.likes.length}
              shareQuantity={post.shares.length}
              user={post.user}
              myInfor={myInfor}
              key={index}
              navigation={navigation}
              cmtHandle={() =>
                navigation.navigate("PostDetail", { token, post })
              }
              token={token}
              post_id={post._id}
            />
          ))}
      </View>
      <View style={{ marginBottom: 400 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
