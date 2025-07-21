import React from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";

import styles from "../styles/WeekCaruselStyle";

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