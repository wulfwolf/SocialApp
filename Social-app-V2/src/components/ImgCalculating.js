import { Image } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

export default function Albumimg({ imgURL, w, mb, navigation }) {
  const [size, setSize] = useState(1);

  useEffect(() => {
    if (imgURL) {
      Image.getSize(imgURL, (width, height) => setSize(width / height));
    }
  }, [imgURL]);

  function imgHandle() {
    navigation.navigate("ImgDetail", { size, imgURL });
  }

  return (
    <TouchableOpacity onPress={imgHandle} activeOpacity={0.9}>
      <Image
        source={{
          uri: imgURL,
        }}
        style={{
          aspectRatio: size,
          borderRadius: 8,
          width: w,
          marginBottom: mb,
        }}
      />
    </TouchableOpacity>
  );
}
