import { StyleSheet } from "react-native";

import { COLORS } from "../constans/constans";

export default StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: COLORS.BACKGROUND },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 8,
  },
  link: {
    color: "blue",
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: COLORS.PRIMARY,
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: "center",
  },
  saveButtonText: {
    color: COLORS.BACKGROUND,
    fontSize: 18,
  },
});
