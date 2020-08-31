import * as React from "react";
import { StyleSheet } from "react-native";
import { formatDate } from "../../utils/helpers/functions";
import { Sighting } from "../../utils/interfaces/Sighting";
import { Text, View } from "../reusables";

const styles = StyleSheet.create({});

export const SightingCard = ({ sighting }: { sighting: Sighting }): JSX.Element => {
  return (
    <View>
      <Text>Date: {formatDate(sighting.time)}</Text>
      <Text>Location: {sighting.location}</Text>
      <Text>Length: {sighting.length}</Text>
      <Text>Notes: {sighting.notes}</Text>
    </View>
  );
};
