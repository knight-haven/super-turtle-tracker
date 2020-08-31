import * as React from "react";
import { ListScreenNavigationContext, ListScreenNavigationProp } from "../../utils/constants";
import { View } from "../reusables";
import { TurtleList } from "../custom/TurtleList";

// const styles = StyleSheet.create({});

export const ListScreen = ({
  navigation,
}: {
  navigation: ListScreenNavigationProp;
}): JSX.Element => {
  return (
    <ListScreenNavigationContext.Provider value={navigation}>
      <View>
        <TurtleList />
      </View>
    </ListScreenNavigationContext.Provider>
  );
};
