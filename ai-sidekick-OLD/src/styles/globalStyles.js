import { StyleSheet } from "react-native";
import { colors, fontSizes, spacing } from "./theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: fontSizes.large,
    fontWeight: "bold",
    marginBottom: spacing.sm,
    color: colors.text,
  },
  subTitle: {
    fontSize: fontSizes.medium,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    color: colors.text,
  },
  text: {
    fontSize: fontSizes.small,
    color: colors.text,
  },
});
