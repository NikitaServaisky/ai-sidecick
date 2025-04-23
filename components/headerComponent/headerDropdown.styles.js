import { StyleSheet, Platform } from "react-native";
import { spacing, colors, fontSizes } from "../../styles/theme";

export default StyleSheet.create({
  headerWrapper: {
    height: 60,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderColor: colors.border,
    zIndex: 10,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        // shadow* props removed for web compatibility
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      },
      web: {
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      },
    }),
  },

  fullArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
  },

  title: {
    fontSize: fontSizes.large,
    fontWeight: "bold",
    color: colors.text,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "flex-start",
    paddingTop: 60,
  },

  menu: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 10,
    margin: spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },

  option: {
    fontSize: fontSizes.medium,
    paddingVertical: spacing.sm,
    color: colors.text,
  },
});
