import useAxios from "axios-hooks";
import * as React from "react";
import { FlatList } from "react-native";
import { View } from "../reusables";
import { BACKEND_SECRET, BASE_URL } from "../../../env";
import { TurtleListItem } from "./TurtleListItem";

export const TurtleList = (): JSX.Element => {
  const [{ data, loading, error }, refetch] = useAxios({
    headers: { Authorization: `Bearer ${BACKEND_SECRET}` },
    url: `${BASE_URL}/turtle`,
  });

  return (
    <View>
      {loading || error ? undefined : (
        <FlatList
          data={data}
          keyExtractor={(item) => {
            return item.id.toString();
          }}
          renderItem={({ item }) => {
            return <TurtleListItem key={item.id} turtle={item} />;
          }}
        />
      )}
    </View>
  );
};
