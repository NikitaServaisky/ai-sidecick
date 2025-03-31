import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { getWeekDays } from './services/CalendarUtils';
import CalendarScreen from './screens/CalendarScreen';
import { PanGestureHandler } from 'react-native-gesture-handler';

export default function App() {
  const week = getWeekDays();
  const [viewMode, setViewMode] = useState('week');
  const [selectedDate, setSelectedDate] = useState(week[0].formatted);
  const [tasksByDate, setTasksByDate] = useState({
    [week[0].formatted]: [
      { id: '1', title: 'Buy milk', done: false },
      { id: '2', title: 'Feed the cat', done: true },
    ],
    [week[1].formatted]: [
      { id: '3', title: 'Call Mom', done: false },
    ]
  });

  const toggleTaskDone = (id) => {
    setTasksByDate(prev => {
      const updatedTasks = prev[selectedDate].map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      );
      return { ...prev, [selectedDate]: updatedTasks };
    });
  };

  const onSwipe = (event) => {
    const { translationX } = event.nativeEvent;
    if (translationX < -50) {
      setViewMode('month'); // החלקה שמאלה
    } else if (translationX > 50) {
      setViewMode('week'); // החלקה ימינה
    }
  };

  return (
    <PanGestureHandler onGestureEvent={onSwipe}>
      <View style={styles.container}>
        {/* טאב עליון */}
        <View style={styles.nav}>
          <Text style={[styles.navText, viewMode === 'week' && styles.active]}>שבוע</Text>
          <Text style={[styles.navText, viewMode === 'month' && styles.active]}>חודש</Text>
        </View>

        {viewMode === 'week' ? (
          <>
            <Text style={styles.title}>📅 Select a Day</Text>
            <FlatList
              horizontal
              data={week}
              keyExtractor={item => item.formatted}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dayButton,
                    selectedDate === item.formatted && styles.daySelected,
                  ]}
                  onPress={() => setSelectedDate(item.formatted)}
                >
                  <Text>{item.formatted.split(',')[0]}</Text>
                  <Text>{item.formatted.split(',')[1]}</Text>
                </TouchableOpacity>
              )}
            />

            <Text style={styles.subTitle}>📝 Tasks for {selectedDate}</Text>
            <FlatList
              data={tasksByDate[selectedDate] || []}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => toggleTaskDone(item.id)}>
                  <Text style={[styles.task, item.done && styles.done]}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </>
        ) : (
          <CalendarScreen />
        )}
      </View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 16, backgroundColor: '#fff' },
  nav: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  navText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: '#888',
  },
  active: {
    color: '#007bff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  title: { fontSize: 24, marginBottom: 10 },
  subTitle: { fontSize: 20, marginTop: 20, marginBottom: 10 },
  dayButton: {
    padding: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  daySelected: {
    backgroundColor: '#def',
    borderColor: '#39f',
  },
  task: {
    fontSize: 18,
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  done: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
