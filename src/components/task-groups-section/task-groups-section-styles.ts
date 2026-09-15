import { StyleSheet } from "react-native";

const ICON_BADGE_SIZE = 52;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  countBadge: {
    minWidth: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBadge: {
    width: ICON_BADGE_SIZE,
    height: ICON_BADGE_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
