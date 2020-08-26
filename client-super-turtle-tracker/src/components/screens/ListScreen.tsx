import * as React from "react";
import { View } from "../reusables";
import { TurtleList } from "../reusables/TurtleList";

// const styles = StyleSheet.create({});

export const ListScreen = (): JSX.Element => {
  return (
    <View darkColor="rgba(255,255,255,0.1)" lightColor="#eee">
      <TurtleList />
    </View>
  );
};
