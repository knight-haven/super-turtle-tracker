import { StyleSheet } from "react-native";

/* A Shared StyleSheet
 */

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    flex: 1,
    justifyContent: "space-evenly",
    marginBottom: 4,
    marginTop: 4,
    padding: 7,
  },
  shadow: {
    elevation: 4,
    // TODO? Maybe remove this UI feature.
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
});
