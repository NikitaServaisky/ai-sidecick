import { StyleSheet } from "react-native";

import { COLORS } from "../constans/constans";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.BACKGROUND, paddingTop: 50 },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    left: 20,
  },
  addButtonText: {
    color: COLORS.BACKGROUND,
    fontSize: 32,
  },
});