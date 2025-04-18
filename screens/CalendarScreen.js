import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { getmontDays } from "../services/CalendarUtils";
import globalStyles from "../styles/globalStyles";

const screenWidth = Dimensions.get("window").width;
const cellSize = (screenWidth - 32) / 7; // פחות padding צדדים

export default function CalendarScreen() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const days = getmontDays(year, month);

  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>
        📆 {now.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
      </Text>

      <View style={styles.grid}>
        {days.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.cell,
              selectedDay === item.day && styles.selectedCell,
            ]}
            onPress={() => setSelectedDay(item.day)}
          >
            <Text style={styles.cellText}>{item.day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedDay && (
        <Text style={styles.selectedText}>
          📌 You selected day {selectedDay}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   paddingTop: 50,
  //   paddingHorizontal: 16,
  //   backgroundColor: "#fff",
  // },
  // title: {
  //   fontSize: 24,
  //   marginBottom: 20,
  //   fontWeight: "bold",
  // },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  cell: {
    width: cellSize,
    height: cellSize,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 2,
    borderRadius: 6,
  },
  selectedCell: {
    backgroundColor: "#cce5ff",
    borderColor: "#3399ff",
  },
  cellText: {
    fontSize: 16,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
});
