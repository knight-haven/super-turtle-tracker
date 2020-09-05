import * as React from "react";
import { TurtleList } from "../custom/TurtleList";
import { View } from "../reusables";

export const ListScreen = (): JSX.Element => {
  return (
    <View>
      <TurtleList />
    </View>
  );
};
