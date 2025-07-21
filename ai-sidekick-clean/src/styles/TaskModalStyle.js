import { StyleSheet } from "react-native";

import { COLORS } from "../constans/constans";
export default StyleSheet.create({
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
    backgroundColor: COLORS.SECONDARY,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: COLORS.ERROR,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});
