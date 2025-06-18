import React from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function WeekCarusel({ weekDays, selectedDay, onDayPress }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.dayCard,
        item.key === selectedDay && styles.selectedCard,
        item.isToday && styles.todayCard,
      ]}
      onPress={() => {
        onDayPress(item);
      }}
    >
      <Text style={styles.dayText}>{item.label}</Text>
      <Text style={styles.dateText}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={weekDays}
      horizontal
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.weekList}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  dayCard: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  selectedCard: {
    backgroundColor: "#007AFF",
  },
  todayCard: {
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  dayText: {
    color: "#333",
    textAlign: "center",
  },
  dateText: {
    color: "#666",
    textAlign: "center",
  },
  weekList: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
