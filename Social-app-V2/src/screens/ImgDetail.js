import { Image, TouchableOpacity, View, Animated } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants";
import HeaderNav from "../components/HeaderNav";
import CmtBar from "../components/CmtBar";

export default function ImgDetail({ navigation, route }) {
  const [etcDisplay, setEtcDisplay] = useState(true);
  const etcOpacity = useRef(new Animated.Value(1)).current;

  function etcDisplayHandle() {
    if (etcDisplay) {
      Animated.timing(etcOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setEtcDisplay(!etcDisplay);
      });
    } else {
      setEtcDisplay(!etcDisplay);
      Animated.timing(etcOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.primary,
        flex: 1,
      }}
    >
      <View style={{ width: "100%", height: "100%" }}>
        {etcDisplay && (
          <Animated.View
            style={{
              width: "100%",
              zIndex: 2,
              position: "absolute",
              top: 0,
              opacity: etcOpacity,
            }}
          >
            <HeaderNav navigation={navigation} />
          </Animated.View>
        )}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={etcDisplayHandle} activeOpacity={1}>
            <Image
              source={{ uri: route.params.imgURL }}
              style={{
                width: "100%",
                aspectRatio: route.params.size,
              }}
            />
          </TouchableOpacity>
        </View>
        {etcDisplay && (
          <Animated.View
            style={{
              width: "100%",
              zIndex: 2,
              position: "absolute",
              bottom: 0,
              opacity: etcOpacity,
            }}
          >
            <CmtBar />
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}
