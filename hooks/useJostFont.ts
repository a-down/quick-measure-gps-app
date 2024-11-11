import { StyleSheet } from "react-native";

// stylesheet containing font styles and default sizes
const jostFontStyles = StyleSheet.create({
  regular: {
    fontFamily: "Jost_400Regular",
    fontSize: 18,
  },
  medium: {
    fontFamily: "Jost_500Medium",
    fontSize: 18,
  },
  semibold: {
    fontFamily: "Jost_600SemiBold",
    fontSize: 18,
  },
  bold: {
    fontFamily: "Jost_700Bold",
    fontSize: 18,
  },
});

export const regular = jostFontStyles.regular;
export const medium = jostFontStyles.medium;
export const semibold = jostFontStyles.semibold;
export const bold = jostFontStyles.bold;
