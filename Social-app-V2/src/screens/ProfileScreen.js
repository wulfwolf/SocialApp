import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Profileheader from "../components/Profileheader";
import Profilealbum from "../components/Profilealbum";
import { COLORS, localhost } from "../constants";
import axios from "axios";

export default function ProfileScreen({ navigation, route }) {
  const [check, setCheck] = useState(true);
  const data = route.params.user;
  const myInfor = route.params.myInfor.user;
  const myToken = route.params.myInfor.accessToken;
  // console.log(route.params);

  const [length, setLength] = useState({
    followers: 0,
    followings: 0,
  });
  const checkHandle = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${myToken}`;
    const followers = await axios.get(
      `http://${localhost}:3000/api/follow/followers/${data._id}`
    );
    const followings = await axios.get(
      `http://${localhost}:3000/api/follow/followings/${data._id}`
    );
    setLength({
      followers: followers.data.followers.length,
      followings: followings.data.followings.length,
    });
    const check = followers.data.followers.find(
      (user) => user._id == myInfor._id
    );

    if (check) {
      console.log("found");
      setCheck(false);
    } else {
      console.log("not found");
      setCheck(true);
    }
  };

  useEffect(() => {
    checkHandle();
  }, [check]);

  const followHandle = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${myToken}`;
    const followResult = await axios.post(
      `http://${localhost}:3000/api/follow/${data._id}`
    );
    if (followResult.data.message == "Followed!") {
      setCheck(false);
    } else {
      setCheck(true);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.primary }}>
      <Profileheader
        navigation={navigation}
        avatarURL={data.avatarURL}
        uname={data.username}
        ualias={data.alias}
        followers={length.followers}
        followings={length.followings}
        followHandle={followHandle}
        check={check}
        myInfor={myInfor}
        myToken={myToken}
        receiver={data}
      />
      <Profilealbum
        navigation={navigation}
        token={myToken}
        user_id={data._id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
