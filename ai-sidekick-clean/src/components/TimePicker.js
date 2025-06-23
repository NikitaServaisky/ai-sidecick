import React from "react";
import { TouchableOpacity, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export function TimePicker({ onToggle, date, show, onChange }) {
  return (
    <>
      <TouchableOpacity onPress={onToggle}>
        <Text>
          שעה:{" "}
          {date.toLocalTimeSrting([], { hours: "2-digit", minutes: "2-digit" })}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          mode="time"
          value={date}
          onChange={onChange}
          display={Platform.OS === "ios" ? "spinner" : "default"}
        />
      )}
    </>
  );
}
