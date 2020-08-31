import { RouteProp } from "@react-navigation/native";
import * as React from "react";
import { ListParamList } from "../../utils";
import { TurtleViewList } from "../custom";
import { View } from "../reusables";

export const TurtleViewScreen = ({
  route,
}: {
  route: RouteProp<ListParamList, "TurtleViewScreen">;
}): JSX.Element => {
  const { turtleId } = route.params;

  return (
    <View>
      <TurtleViewList turtleId={turtleId} />
    </View>
  );
};
