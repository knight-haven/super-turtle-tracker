import { RouteProp, useRoute } from "@react-navigation/native";
import * as React from "react";
import { ListParamList } from "../../utils";
import { TurtleViewList } from "../custom";
import { View } from "../reusables";

export const TurtleViewScreen = (): JSX.Element => {
  const route: RouteProp<ListParamList, "TurtleViewScreen"> = useRoute();
  const { turtleId } = route.params;

  return (
    <View>
      <TurtleViewList turtleId={turtleId} />
    </View>
  );
};
