import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";
import React, { useState } from "react";
import { COLORS, FONTS, localhost } from "../constants";

export default function LoginModal({
  ModalVisible,
  closeModalHandle,
  navigation,
  closeLoginModal,
}) {
  const [AccInfo, setAccInfo] = useState({
    username: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      if (AccInfo.eMail != "" && AccInfo.password != "") {
        const res = await axios.post(
          `http://${localhost}:3000/api/auth/login`,
          {
            username: AccInfo.username,
            password: AccInfo.password,
          }
        );
        if (res.data.success) {
          closeLoginModal();
          navigation.replace("Home", res.data);
        } else {
          alert(res.data.message);
        }
      } else {
        alert("Please fill the form!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={ModalVisible}>
      <View
        style={{
          alignItems: "center",
          alignSelf: "center",
          height: "100%",
          width: "95%",
          marginTop: 100,
          borderRadius: 20,
          backgroundColor: COLORS.primary,
        }}
      >
        <View
          style={{
            width: "80%",
            top: "10%",
            alignSelf: "center",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.inputBox,
              opacity: 0.8,
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <TextInput
              placeholder="username"
              style={{
                padding: 5,
                marginBottom: 5,
                paddingHorizontal: 20,
                color: COLORS.inputText,
              }}
              onChangeText={(username) => {
                setAccInfo({
                  ...AccInfo,
                  username: username,
                });
              }}
            />
            <TextInput
              placeholder="Password"
              style={{
                padding: 5,
                paddingHorizontal: 20,
                color: COLORS.inputText,
              }}
              secureTextEntry={true}
              onChangeText={(password) => {
                setAccInfo({
                  ...AccInfo,
                  password: password,
                });
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: COLORS.inputBox,
                borderBottomRightRadius: 20,
                paddingHorizontal: 20,
                opacity: 0.8,
              }}
              onPress={onLogin}
            >
              <Text
                style={{
                  ...FONTS.normal,
                  fontSize: 17,
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  padding: 11,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={closeModalHandle}
              >
                <Text style={{ color: "white" }}>Don't have an account ?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
