import { RouteProp } from "@react-navigation/native";
import useAxios from "axios-hooks";
import * as React from "react";
import { FlatList, Image, StyleSheet } from "react-native";
import { BACKEND_SECRET, BASE_URL } from "../../../env";
import { ListParamList } from "../../utils";
import { Text, View } from "../reusables";

const styles = StyleSheet.create({});

export const TurtleViewScreen = ({
  route,
}: {
  route: RouteProp<ListParamList, "TurtleViewScreen">;
}): JSX.Element => {
  const { turtleId } = route.params;
  const [{ data, loading, error }, refetch] = useAxios({
    headers: { Authorization: `Bearer ${BACKEND_SECRET}` },
    url: `${BASE_URL}/turtle/sighting/photo/${turtleId}`,
  });
  return (
    <View>
      {loading || error ? null : (
        <View>
          <Text>Number: {data.turtle.number}</Text>
          <Text>Mark: {data.turtle.mark}</Text>
          <Text>Sex: {data.turtle.sex}</Text>
          <Text>Length: {data.sightings[0].length}</Text>
          <Text>Date Found: {data.sightings[data.sightings.length - 1].time}</Text>
          <Text>Date Last Seen: {data.sightings[0].time}</Text>
          <FlatList
            data={data.photos}
            horizontal
            keyExtractor={(item) => {
              return item.id.toString();
            }}
            renderItem={({ item }) => {
              return <Image source={{ height: 200, uri: item.url, width: 200 }} />;
            }}
          />
          <FlatList
            data={data.sightings}
            keyExtractor={(item) => {
              return item.id.toString();
            }}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text>Date: {item.time}</Text>
                  <Text>Location: {item.location}</Text>
                  <Text>Length: {item.length}</Text>
                  <Text>Notes: {item.notes}</Text>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};
