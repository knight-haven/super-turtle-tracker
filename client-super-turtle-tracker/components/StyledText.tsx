import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, TextProps } from "./Themed";

const styles = StyleSheet.create({
  text: {
    // fontFamily: "space-mono",
  },
});

export const MonoText = (props: TextProps): JSX.Element => {
  const { style } = props;
  return <Text {...props} style={[style, styles.text]} />;
};
