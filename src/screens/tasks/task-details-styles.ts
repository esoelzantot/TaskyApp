import { StyleSheet } from "react-native";

const AVATAR_SIZE = 40;
const CHECKBOX_SIZE = 28;
const ARROW_SIZE = 24;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerSideSlot: {
    width: AVATAR_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleSlot: {
    flex: 1,
    alignItems: "center",
  },
  arrowIcon: {
    width: ARROW_SIZE,
    height: ARROW_SIZE,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  avatarFallback: {
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    // background/radius/padding/shadow applied inline from theme
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryPill: {
    alignSelf: "flex-start",
  },
  completedRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: CHECKBOX_SIZE,
    height: CHECKBOX_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    width: "100%",
  },
  metaRow: {
    flexDirection: "row",
  },
  metaColumn: {
    flex: 1,
  },
  dueDateRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  priorityPill: {
    alignSelf: "flex-start",
  },
  buttonRow: {
    flexDirection: "row",
  },
  buttonSlot: {
    flex: 1,
  },
});

export default styles;
