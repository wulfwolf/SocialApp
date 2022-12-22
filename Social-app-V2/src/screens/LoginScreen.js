import { View, Image } from "react-native";
import React, { useState } from "react";
import { SIZES } from "../constants";
import ResgisterModal from "./ResgisterModal";
import LoginModal from "./LoginModal";

export default function LoginScreen({ navigation }) {
  const [ModalVisible, setModalVisible] = useState({
    LoginVisible: true,
    RegisterVisible: false,
  });
  function closeLoginModal() {
    setModalVisible({ ...ModalVisible, LoginVisible: false });
  }

  return (
    <View>
      <View style={{ backgroundColor: "#7f7f7f" }}>
        <Image
          style={{
            height: "100%",
            width: SIZES.width,
            opacity: 0.6,
          }}
          source={require("../assets/imgs/bg.png")}
        />
      </View>

      <View
        style={{
          flex: 1,
          position: "absolute",
          height: "100%",
          width: "100%",
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ResgisterModal
            ModalVisible={ModalVisible.RegisterVisible}
            closeModalHandle={() =>
              setModalVisible({
                RegisterVisible: false,
                LoginVisible: true,
              })
            }
          />
          <LoginModal
            ModalVisible={ModalVisible.LoginVisible}
            closeModalHandle={() =>
              setModalVisible({
                RegisterVisible: true,
                LoginVisible: false,
              })
            }
            navigation={navigation}
            closeLoginModal={closeLoginModal}
          />
        </View>
      </View>
    </View>
  );
}
