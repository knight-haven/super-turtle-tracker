import React from "react";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Text, View } from "./Themed";

const styles = StyleSheet.create({
  baseText: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    width: "100%",
  },
  container: {
    display: "flex",
    flex: 1,
    flexWrap: "wrap",
    marginTop: 4,
    // borderBottomWidth:0.5,
    // borderColor:'#c2c2c2'
  },
  titleText: {
    fontSize: 12,
    fontWeight: "300",
    textAlign: "center",
  },
});

interface StackedTextProps {
  baseStyle?: StyleProp<TextStyle>;
  baseText: string;
  titleStyle?: StyleProp<TextStyle>;
  titleText: string;
  viewStyle?: StyleProp<ViewStyle>;
}

export const StackedText = ({
  baseStyle,
  baseText,
  titleStyle,
  titleText,
  viewStyle,
}: StackedTextProps): JSX.Element => {
  return (
    <View style={[styles.container, viewStyle]}>
      <Text style={[styles.titleText, titleStyle]}>{titleText}</Text>
      <Text style={[styles.baseText, baseStyle]}>{baseText}</Text>
    </View>
  );
};

StackedText.defaultProps = {
  baseStyle: styles.baseText,
  titleStyle: styles.titleText,
  viewStyle: styles.container,
};
