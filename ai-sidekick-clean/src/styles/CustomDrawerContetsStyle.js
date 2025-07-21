import { StyleSheet } from "react-native";

import { COLORS } from "../constans/constans";

export default StyleSheet.create({
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 10,
  },
  logoutButton: {
    paddingVertical: 10,
  },
  logoutText: {
    color: COLORS.ERROR,
    fontWeight: "bold",
    fontSize: 16,
  },
});