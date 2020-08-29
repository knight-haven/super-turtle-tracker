import * as React from "react";
import { ListScreenNavigationContext, ListScreenNavigationProp } from "../../utils/constants";
import { View } from "../reusables";
import { TurtleList } from "../reusables/TurtleList";

// const styles = StyleSheet.create({});

export const ListScreen = ({
  navigation,
}: {
  navigation: ListScreenNavigationProp;
}): JSX.Element => {
  return (
    <ListScreenNavigationContext.Provider value={navigation}>
      <View darkColor="rgba(255,255,255,0.1)" lightColor="#eee">
        <TurtleList />
      </View>
    </ListScreenNavigationContext.Provider>
  );
};
