import React from "react";
import { Button,Alert } from "react-native";

export default function MorningTip() {
    const handleAction = () => {
        Alert.alert("Sidekick say:", "please do not forget to make coffe");
    };
    return <Button title="give tip for a morning" onPress={handleAction} />
}