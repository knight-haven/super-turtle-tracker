import * as React from "react";
import { List } from "react-native-paper";
import { firebase } from "../../../env";
import { Turtle } from "../../utils/interfaces/Turtle";

export const TurtleListItem = ({ turtle }: { turtle: Turtle }): JSX.Element => {
  const getPhoto = async (photoName: string) => {
    const ref = firebase.storage().ref().child(`images/${photoName}`);
    const url = await ref.getDownloadURL();
    return url;
  };

  return (
    <List.Item
      description={turtle.sex}
      // left={(props) => {
      //   return <List.Icon {...props} icon={{uri: getPhoto(turtle.avatar)}} />;
      // }}
      title={turtle.mark}
    />
  );
};
