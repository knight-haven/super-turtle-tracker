import * as React from "react";
import { StyleSheet } from "react-native";
import { Avatar, List } from "react-native-paper";
import { capitalizeFirstLetter } from "../../utils/helpers/functions";
import { Turtle } from "../../utils/interfaces/Turtle";

const styles = StyleSheet.create({
  item: {
    borderBottomColor: "#cdc",
    borderBottomWidth: 0.5,
  },
});

export const TurtleListItem = ({ turtle }: { turtle: Turtle }): JSX.Element => {
  return (
    <List.Item
      description={capitalizeFirstLetter(turtle.sex)}
      left={(props) => {
        return <Avatar.Image {...props} source={turtle.url === null ? {} : { uri: turtle.url }} />;
      }}
      right={(props) => {
        return <List.Icon {...props} icon="chevron-right" />;
      }}
      style={styles.item}
      title={turtle.mark}
    />
  );
};
