import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Posts } from "../data/data";
import ImgCalculating from "./ImgCalculating";
import { COLORS, localhost, SIZES } from "../constants";
import axios from "axios";

export default function Profilealbum({ navigation, user_id, token }) {
  const [img, setImg] = useState([]);
  useEffect(() => {
    getImg();
  }, []);

  const getImg = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(
        `http://${localhost}:3000/api/user/${user_id}`
      );

      if (response.data.success) {
        setImg(response.data.wholeImg);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  const renderImgs = (index, posts) => {
    var images = [];
    for (let i = index; i < posts.length; i += 3) {
      images.push(
        // <View style={{ padding: 4 }} key={i}>
        //   <ImgCalculating
        //     imgURL={posts[i].Content.imageContent}
        //     navigation={navigation}
        //   />
        // </View>
        <View style={{ padding: 4 }} key={i}>
          <ImgCalculating
            imgURL={posts[i].img || posts[i].avatarURL}
            navigation={navigation}
          />
        </View>
      );
    }
    return <View style={{ flex: 1 }}>{images}</View>;
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            paddingVertical: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: COLORS.borderColor,
            alignItems: "center",
          }}
        >
          <Ionicons name="brush-outline" size={20} color={COLORS.borderBox} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            paddingVertical: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: COLORS.borderColor,
            alignItems: "center",
          }}
          onPress={() => console.log("first")}
        >
          <Ionicons name="grid-outline" size={20} color={COLORS.borderBox} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.borderColor,
        }}
      >
        <ScrollView
          style={{
            marginTop: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              paddingHorizontal: 20,
              paddingBottom: SIZES.height - 50,
              flexDirection: "row",
            }}
          >
            {renderImgs(0, img)}
            {renderImgs(1, img)}
            {renderImgs(2, img)}
          </View>
          <View style={{ marginTop: 20 }}></View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
