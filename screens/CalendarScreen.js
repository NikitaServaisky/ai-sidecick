// screens/CalendarScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { getmontDays } from '../services/CalendarUtils';

const screenWidth = Dimensions.get('window').width;
const cellSize = screenWidth / 7; // 7 עמודות – יום בשבוע

export default function CalendarScreen() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // בין 0 ל־11
  const days = getmontDays(year, month);

  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📆 {now.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</Text>

      <View style={styles.grid}>
        {days.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.cell,
              selectedDay === item.day && styles.selectedCell
            ]}
            onPress={() => setSelectedDay(item.day)}
          >
            <Text style={styles.cellText}>{item.day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedDay && (
        <Text style={styles.selectedText}>📌 You selected day {selectedDay}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, alignItems: 'center', backgroundColor: '#fff' },
  header: { fontSize: 24, marginBottom: 20 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: screenWidth,
  },
  cell: {
    width: cellSize,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  selectedCell: {
    backgroundColor: '#def',
  },
  cellText: {
    fontSize: 16,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },
});
