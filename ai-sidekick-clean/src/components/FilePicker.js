import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function FilePicker({ onPress, attachment} ) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={{color: "blue", marginTop: 10}}>{attachment ? attachment.name : "📎 צרף מסמך"}</Text>
        </TouchableOpacity>
    );
};