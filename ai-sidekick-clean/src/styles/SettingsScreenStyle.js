import { StyleSheet } from "react-native";

import { COLORS } from "../constans/constans";

export default  StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.BACKGROUND,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "right",
  },
  section: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "right",
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#aaa",
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: "#eee",
    borderColor: COLORS.TEXT,
  },
  optionText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#ffdddd",
    padding: 12,
    borderRadius: 8,
  },
  deleteText: {
    color: "#cc0000",
    textAlign: "center",
    fontWeight: "bold",
  },
});
