import React from "react";
import { StyleSheet, ViewStyle, StyleProp } from "react-native";
import { View } from "./Themed";

const styles = StyleSheet.create({
  bottomDivider: {
    borderBottomWidth: 1,
    borderColor: "#d3d3d3",
    marginBottom: 5,
    marginTop: 5,
    width: "100%",
  },
  divider: {
    borderColor: "#d3d3d3",
    borderLeftWidth: 1,
    height: "50%",
    top: "5%",
  },
});

export const Divider = (): JSX.Element => {
  return <View style={styles.divider} />;
};

export const BottomDivider = ({
  containerStyle,
}: {
  containerStyle?: StyleProp<ViewStyle>;
}): JSX.Element => {
  return <View style={[styles.bottomDivider, containerStyle]} />;
};

BottomDivider.defaultProps = {
  containerStyle: styles.bottomDivider,
};
