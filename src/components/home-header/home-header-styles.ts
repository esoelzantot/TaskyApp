import { StyleSheet } from "react-native";

const AVATAR_SIZE = 60;
const BELL_SIZE = 36;
const BADGE_SIZE = 16;

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
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
  userName: {
    textTransform: "uppercase",
  },
  bellButton: {
    padding: 4,
  },
  bellIcon: {
    width: BELL_SIZE,
    height: BELL_SIZE,
  },
  badge: {
    position: "absolute",
    top: 2,
    right: 2,
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    borderWidth: 2,
  },
});

export default styles;
