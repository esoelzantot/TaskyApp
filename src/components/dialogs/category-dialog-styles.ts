import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "90%",
    maxWidth: 340,
  },
  title: {
    textAlign: "center",
  },
  input: {
    borderWidth: 0,
  },
  buttonRow: {
    flexDirection: "row",
  },
  buttonSlot: {
    flex: 1,
  },
});

export default styles;
