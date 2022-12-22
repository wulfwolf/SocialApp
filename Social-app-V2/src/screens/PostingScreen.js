import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderNav from "../components/HeaderNav";
import { COLORS, FONTS, localhost, SIZES } from "../constants";
import UserBox from "../components/UserBox";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import GetCammeraPermission from "../utils/utils";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function PostingScreen({ navigation, route }) {
  const myInfor = route.params.myInfor.user;
  const token = route.params.token;

  const [postContent, setPostContent] = useState({
    content: "",
    img: "",
  });

  const submitHandle = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const res = await axios.post(`http://${localhost}:3000/api/posts`, {
      content: postContent.content,
      img: postContent.img,
    });
    if (res.data.success) {
      alert("posted successfully!!!");
      navigation.goBack();
    } else {
      alert(res.data.message);
    }
  };
  const imgHandle = async () => {
    GetCammeraPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    if (!result.cancelled) {
      setPostContent({
        ...postContent,
        img: result.uri,
      });
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.primary, flex: 1 }}>
      <HeaderNav navigation={navigation} />
      <View style={{ width: "90%", alignSelf: "center" }}>
        <View style={{ flexDirection: "row", paddingTop: 15 }}>
          <UserBox URL={myInfor.avatarURL} />
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                ...FONTS.bold,
                color: COLORS.inputText,
                lineHeight: 25,
              }}
            >
              {myInfor.username}
            </Text>
            <Text style={{ ...FONTS.normal, color: COLORS.inputText }}>
              /{myInfor.alias}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderRadius: 1,
            borderColor: COLORS.borderColor,
            borderWidth: 1,
            height: 150,
            borderRadius: 10,
          }}
        >
          <TextInput
            placeholder="What's on your mind ?"
            placeholderTextColor={"#b1b1bc"}
            style={{
              color: COLORS.inputText,
              padding: 10,
            }}
            multiline
            onChangeText={(content) =>
              setPostContent({
                ...postContent,
                content: content,
              })
            }
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 2,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={imgHandle}>
              <Ionicons
                name="image-outline"
                size={30}
                style={{ color: COLORS.borderBox }}
              />
            </TouchableOpacity>
            <Ionicons
              name="pricetag-outline"
              size={30}
              style={{ color: COLORS.borderBox }}
            />
            <Ionicons
              name="location-outline"
              size={30}
              style={{ color: COLORS.borderBox }}
            />
            <Ionicons
              name="happy-outline"
              size={30}
              style={{ color: COLORS.borderBox }}
            />
          </View>
          <TouchableOpacity
            onPress={submitHandle}
            style={{ flex: 3, alignItems: "flex-end" }}
          >
            <Text
              style={{
                ...FONTS.bold,
                color: COLORS.inputText,
              }}
            >
              Share!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
