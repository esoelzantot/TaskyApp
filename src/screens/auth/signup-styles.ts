import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  topSection: {
    paddingVertical: 40,
    alignItems: "center",
  },
  card: {
    flex: 1,
    padding: 24,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  iconBox: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  divider: {
    height: 1,
    width: "100%",
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 32,
  },
});

export default styles;
