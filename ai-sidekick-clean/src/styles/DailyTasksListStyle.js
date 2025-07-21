import { StyleSheet } from "react-native";

export default StyleSheet.create({
    taskList: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  taskItem: {
    flexDirection: "row",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#eef",
    borderRadius: 10,
  },
  taskTime: {
    fontWeight: "bold",
    width: 60,
  },
  taskTitle: {
    flex: 1,
  },
  noTasksText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#999",
  },
});