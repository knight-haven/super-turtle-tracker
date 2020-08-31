import useAxios from "axios-hooks";
import * as React from "react";
import { FlatList } from "react-native";
import { BACKEND_SECRET, BASE_URL } from "../../../env";
import { View } from "../reusables";
import { PhotoList } from "./PhotoList";
import { SightingCard } from "./SightingCard";
import { TurtleCard } from "./TurtleCard";

export const TurtleViewList = ({ turtleId }: { turtleId: number }): JSX.Element => {
  const [{ data, loading, error }, refetch] = useAxios({
    headers: { Authorization: `Bearer ${BACKEND_SECRET}` },
    url: `${BASE_URL}/turtle/sighting/photo/${turtleId}`,
  });

  return (
    <View>
      {loading || error ? null : (
        <FlatList
          data={data.sightings}
          keyExtractor={(item) => {
            return item.id.toString();
          }}
          ListHeaderComponent={() => {
            const turtleCardData = {
              dateFound: data.sightings[data.sightings.length - 1].time,
              dateLastSeen: data.sightings[0].time,
              length: data.sightings[0].length,
              mark: data.turtle.mark,
              number: data.turtle.number,
              sex: data.turtle.sex,
            };
            return (
              <View>
                <TurtleCard data={turtleCardData} />
                <PhotoList photos={data.photos} />
              </View>
            );
          }}
          renderItem={({ item }) => {
            return <SightingCard sighting={item} />;
          }}
        />
      )}
    </View>
  );
};
