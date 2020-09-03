import useAxios from "axios-hooks";
import * as React from "react";
import { FlatList } from "react-native";
import { BACKEND_SECRET, BASE_URL } from "../../../env";
import { TurtleSightingPhoto } from "../../utils/interfaces";
import { View } from "../reusables";
import { PhotoList } from "./PhotoList";
import { SightingCard } from "./SightingCard";
import { TurtleCard } from "./TurtleCard";

export const TurtleViewList = ({ turtleId }: { turtleId: number }): JSX.Element => {
  const [{ data, loading, error }, refetch] = useAxios<TurtleSightingPhoto>({
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
            const recentSighting = data.sightings[0];
            const oldestSighting = data.sightings[data.sightings.length - 1];
            const dateFound = oldestSighting.time;
            const dateLastSeen = recentSighting.time;
            const recentLength = recentSighting.length;
            const turtleCardData = {
              dateFound,
              dateLastSeen,
              length: recentLength,
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
