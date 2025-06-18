import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function TaskModal({ visible, onClose, modalDay, tasks }) {
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
                  <Text style={styles.taskTime}>{task.time}</Text>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                </View>
              ))
            )}
          </ScrollView>

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={{ color: "white", fontWeight: "bold" }}>סגור</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  taskItem: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#eef",
    borderRadius: 10,
    padding: 10,
  },
  taskTime: {
    fontWeight: "bold",
    width: 60,
  },
  taskTitle: {
    flex: 1,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
});
