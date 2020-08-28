import useAxios from "axios-hooks";
import * as React from "react";
import { FlatList } from "react-native";
import { Turtle } from "utils/interfaces/Turtle";
import { View } from ".";
import { BACKEND_SECRET, BASE_URL } from "../../../env";
import { TurtleListItem } from "./TurtleListItem";

export const TurtleList = (): JSX.Element => {
  const [{ data, loading, error }, refetch] = useAxios({
    headers: { Authorization: `Bearer ${BACKEND_SECRET}` },
    url: `${BASE_URL}/turtle`,
  });

  const renderItem = ({ item }: { item: Turtle }) => {
    return <TurtleListItem key={item.id} turtle={item} />;
  };

  return (
    <View>
      {loading || error ? undefined : (
        <FlatList
          data={data}
          keyExtractor={(item) => {
            return item.id.toString();
          }}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};
