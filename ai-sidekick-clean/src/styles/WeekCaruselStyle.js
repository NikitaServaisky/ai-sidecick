import { StyleSheet } from "react-native";

import { COLORS } from "../constans/constans";

export default StyleSheet.create({
  dayCard: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  selectedCard: {
    backgroundColor: COLORS.SECONDARY,
  },
  todayCard: {
    borderWidth: 1,
    borderColor: COLORS.SECONDARY,
  },
  dayText: {
    color: COLORS.TEXT,
    textAlign: "center",
  },
  dateText: {
    color: "#666",
    textAlign: "center",
  },
  weekList: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
