import * as React from "react";
import { Image, StyleSheet } from "react-native";
import { View } from "../reusables";

const styles = StyleSheet.create({});

export const TurtleViewScreen = (): JSX.Element => {
  return (
    <View>
      <Image source={{ uri: "url" }} />
    </View>
  );
};
