import * as React from "react";
import { useEffect, useState } from "react";
import { List } from "react-native-paper";
import { firebase } from "../../../env";
import { capitalizeFirstLetter } from "../../utils/helpers/functions";
import { Turtle } from "../../utils/interfaces/Turtle";
import { View } from ".";

export const TurtleListItem = ({ turtle }: { turtle: Turtle }): JSX.Element => {
  const getPhoto = async (photoName: string): Promise<string> => {
    const ref = firebase.storage().ref().child(`images/${photoName}`);
    const url = await ref.getDownloadURL();
    return url;
  };

  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    getPhoto(turtle.avatar).then((url) => {
      setImageUrl(url);
    });
  }, [imageUrl]);

  return (
    <View>
      {imageUrl === "" ? undefined : (
        <List.Item
          description={capitalizeFirstLetter(turtle.sex)}
          left={(props) => {
            return <List.Icon {...props} icon={{ uri: imageUrl }} />;
          }}
          title={turtle.mark}
        />
      )}
    </View>
  );
};
