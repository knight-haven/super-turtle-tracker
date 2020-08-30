import { RouteProp } from "@react-navigation/native";
import useAxios from "axios-hooks";
import * as React from "react";
import { Image, StyleSheet } from "react-native";
import { BACKEND_SECRET, BASE_URL } from "../../../env";
import { ListParamList } from "../../utils";
import { View } from "../reusables";

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
          <Image source={{ uri: "url" }} />
        </View>
      )}
    </View>
  );
};
