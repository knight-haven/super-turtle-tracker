import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Avatar, List } from "react-native-paper";
import { View } from ".";
import { firebase } from "../../../env";
import { capitalizeFirstLetter } from "../../utils/helpers/functions";
import { Turtle } from "../../utils/interfaces/Turtle";

const styles = StyleSheet.create({
  item: {
    borderBottomColor: "#cdc",
    borderBottomWidth: 0.5,
  },
});

export const TurtleListItem = ({ turtle }: { turtle: Turtle }): JSX.Element => {
  // TODO: Store url in database if possible
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
  }, [turtle.avatar]);

  return (
    <View>
      {imageUrl === "" ? undefined : (
        <List.Item
          description={capitalizeFirstLetter(turtle.sex)}
          left={(props) => {
            return <Avatar.Image {...props} source={{ uri: imageUrl }} />;
          }}
          right={(props) => {
            return <List.Icon {...props} icon="chevron-right" />;
          }}
          style={styles.item}
          title={turtle.mark}
        />
      )}
    </View>
  );
};
