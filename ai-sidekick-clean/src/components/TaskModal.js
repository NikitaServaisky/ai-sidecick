import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, selectTasksForDay } from "../features/tasks/tasksSlice";
import styles from "../styles/TaskModalStyle";
export default function TaskModal({ visible, onClose, modalDay }) {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasksForDay(modalDay?.key));
  console.log("rendering tasks:", tasks);
  const taskLists = useSelector((state) => state.tasks.taskLists);

  const handleDelete = (taskId) => {
    console.log("Deleting task:", taskId);
    console.log("🗑️ Deleting task:", taskId, modalDay?.data);
    console.log(
      "📅 All dates in taskLists:",
      taskLists.map((t) => t.dayKey)
    );
    dispatch(deleteTask({ date: modalDay?.key, taskId }));
  };

  if (!modalDay) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            משימות להיום {modalDay?.lable} {modalDay?.date}
          </Text>

          <ScrollView>
            {(tasks?.length ?? 0) === 0 ? (
              <Text>אין משימות להיום</Text>
            ) : (
              tasks.map((task, idx) => (
                <View key={idx} style={styles.taskItem}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.taskTime}>{task.time}</Text>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                  </View>

                  <Pressable
                    onPress={() => handleDelete(task.id)}
                    style={styles.deleteButton}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      ❌
                    </Text>
                  </Pressable>
                </View>
              ))
            )}
          </ScrollView>

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>סגור</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}