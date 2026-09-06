import { StyleSheet } from "react-native";

const ARROW_SIZE = 30;
const BELL_SIZE = 26;
const BADGE_SIZE = 12;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  sideSlot: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  bellSlot: {
    alignItems: "flex-end",
  },
  titleSlot: {
    flex: 1,
    alignItems: "center",
  },
  arrowIcon: {
    width: ARROW_SIZE,
    height: ARROW_SIZE,
  },
  bellIcon: {
    width: BELL_SIZE,
    height: BELL_SIZE,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 2,
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    borderWidth: 1.5,
  },
});

export default styles;
