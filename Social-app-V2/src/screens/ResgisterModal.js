import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Image,
  // Button,
} from "react-native";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { COLORS, FONTS, localhost } from "../constants";
import GetCammeraPermission from "../utils/utils";
import * as ImagePicker from "expo-image-picker";
import { Button } from "@rneui/base";

export default function ResgisterModal({ ModalVisible, closeModalHandle }) {
  var buttonColor = "#361945";
  var buttonSwitch = true;
  const [AccInfo, setAccInfo] = useState({
    username: "",
    password: "",
    alias: "",
    avatarURL: "",
  });
  const inputScale0 = useRef(new Animated.Value(1)).current;
  const inputScale1 = useRef(new Animated.Value(1)).current;
  const inputScale2 = useRef(new Animated.Value(1)).current;

  const submitHandle = async () => {
    try {
      const res = await axios.post(
        `http://${localhost}:3000/api/auth/register`,
        {
          username: AccInfo.username,
          password: AccInfo.password,
          alias: AccInfo.alias,
          avatarURL: AccInfo.avatarURL,
        }
      );
      if (res.data.success) {
        console.log(res.data);

        alert("SignUp successfully!!!");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function inputHandle() {
    if (AccInfo.uName != "" && AccInfo.eMail != "" && AccInfo.password != "") {
      buttonColor = "#581c77";
      buttonSwitch = false;
    } else {
      buttonColor = "#361945";
      buttonSwitch = true;
    }
  }

  const PickingAvatarHandle = async () => {
    GetCammeraPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
    });
    if (!result.cancelled) {
      setAccInfo({
        ...AccInfo,
        avatarURL: result.uri,
      });
    }
  };

  function InputOnFocus(index) {
    Animated.timing(index, {
      toValue: 1.1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }
  function InputOnBlur(index) {
    Animated.timing(index, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  inputHandle();

  return (
    <Modal animationType="slide" transparent={true} visible={ModalVisible}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={closeModalHandle}>
          <View style={{ height: "100%" }}>
            <Text
              style={{
                color: "#581b76",
                alignSelf: "center",
                top: 15,
                ...FONTS.greet,
                fontSize: 50,
              }}
            >
              Hello
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          alignSelf: "center",
          height: "100%",
          width: "95%",
          marginTop: 100,
          borderRadius: 20,
          position: "absolute",
          backgroundColor: COLORS.primary,
        }}
      >
        <View style={{ width: "80%", top: "10%" }}>
          <View
            style={{
              alignItems: "center",
              marginBottom: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: 100,
                height: 100,
                borderColor: "#581b76",
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
              }}
              onPress={PickingAvatarHandle}
            >
              <Text style={{ fontSize: 40, color: "#581b76" }}>+</Text>
              {AccInfo.avatarURL && (
                <Image
                  source={{ uri: AccInfo.avatarURL }}
                  style={{
                    position: "absolute",
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
          <Animated.View
            style={{
              transform: [{ scale: inputScale0 }],
              backgroundColor: COLORS.inputBox,
              borderRadius: 5,
            }}
          >
            <TextInput
              placeholder="Alias ? "
              style={{
                padding: 5,
                marginBottom: 5,
                paddingHorizontal: 20,
                color: COLORS.inputText,
              }}
              onFocus={() => InputOnFocus(inputScale0)}
              onBlur={() => InputOnBlur(inputScale0)}
              onChangeText={(alias) => {
                setAccInfo({
                  ...AccInfo,
                  alias: alias,
                });
              }}
            />
          </Animated.View>
          <Animated.View
            style={{
              transform: [{ scale: inputScale1 }],
              backgroundColor: COLORS.inputBox,
              marginVertical: 7,
              borderRadius: 5,
            }}
          >
            <TextInput
              placeholder="username is required ? "
              style={{
                padding: 5,
                marginBottom: 5,
                paddingHorizontal: 20,
                color: COLORS.inputText,
              }}
              onFocus={() => InputOnFocus(inputScale1)}
              onBlur={() => InputOnBlur(inputScale1)}
              onChangeText={(username) => {
                setAccInfo({
                  ...AccInfo,
                  username: username,
                });
              }}
            />
          </Animated.View>
          <Animated.View
            style={{
              transform: [{ scale: inputScale2 }],
              backgroundColor: COLORS.inputBox,
              borderRadius: 5,
            }}
          >
            <TextInput
              placeholder="Password is required ? "
              style={{
                padding: 5,
                marginBottom: 5,
                paddingHorizontal: 20,
                color: COLORS.inputText,
              }}
              onFocus={() => InputOnFocus(inputScale2)}
              onBlur={() => InputOnBlur(inputScale2)}
              secureTextEntry={true}
              onChangeText={(password) => {
                setAccInfo({
                  ...AccInfo,
                  password: password,
                });
              }}
            />
          </Animated.View>
        </View>
        <View
          style={{
            top: 90,
            padding: 10,
          }}
        >
          <Button
            title={"Sign up!"}
            color={buttonColor}
            titleStyle={{ color: "white" }}
            disabled={buttonSwitch}
            disabledStyle={{ backgroundColor: buttonColor }}
            disabledTitleStyle={{ color: "black" }}
            onPress={submitHandle}
          />
        </View>
        <TouchableOpacity onPress={closeModalHandle} style={{ top: 200 }}>
          <Text style={{ color: "white" }}>Already had an account ?</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
