import { StyleSheet } from "react-native";

const MENU_BUTTON_SIZE = 36;

const styles = StyleSheet.create({
  card: {
    position: "relative",
  },
  content: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexShrink: 1,
  },
  viewTasksButton: {
    alignSelf: "flex-start",
  },
});

export default styles;
