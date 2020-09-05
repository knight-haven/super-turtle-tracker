import * as React from "react";
import { FlatList, Image, StyleSheet } from "react-native";
import { Photo } from "../../utils/interfaces/Photo";

const styles = StyleSheet.create({
  image: {
    margin: 2,
  },
});

export const PhotoList = ({ photos }: { photos: Photo[] }): JSX.Element => {
  return (
    <FlatList
      data={photos}
      horizontal
      keyExtractor={(item) => {
        return item.id.toString();
      }}
      renderItem={({ item }) => {
        return <Image source={{ height: 200, uri: item.url, width: 200 }} style={styles.image} />;
      }}
    />
  );
};
