import * as React from "react";
import { StyleSheet } from "react-native";
import { EditScreenInfo, Text, View } from "../reusables";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  separator: {
    height: 1,
    marginVertical: 30,
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export const TabOneScreen = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View darkColor="rgba(255,255,255,0.1)" lightColor="#eee" style={styles.separator} />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
};
