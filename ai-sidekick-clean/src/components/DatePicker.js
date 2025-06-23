import React from "react";
import { Platform, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DatePicker({ date, show, onChange, onToggle }) {
  return (
    <>
      <TouchableOpacity onPress={onToggle}>
        <Text>📅 תאריך: {date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          mode="date"
          value={date}
          onChange={onChange}
          display={Platform.OS === "ios" ? "spinner" : "default"}
        />
      )}
    </>
  );
}
