import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";

export default function ImageSelector({ onPress, imageUri }) {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <Text>🖼️ בחר תמונה מהגלריה</Text>
      </TouchableOpacity>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, marginTop: 10 }}
        />
      )}
    </>
  );
}
