import { StyleSheet } from "react-native";

const BAR_HEIGHT = 76;
const FAB_SIZE = 64;
const ICON_SIZE = 28;
const FAB_ICON_SIZE = 36;

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    height: BAR_HEIGHT,
  },
  tabGroup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabIconHighlight: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  fab: {
    position: "absolute",
    top: -(FAB_SIZE * 0.55),
    left: "50%",
    marginLeft: -(FAB_SIZE / 2),
    width: FAB_SIZE,
    height: FAB_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  fabIcon: {
    width: FAB_ICON_SIZE,
    height: FAB_ICON_SIZE,
  },
});

export default styles;
