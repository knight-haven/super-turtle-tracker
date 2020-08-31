import * as React from "react";
import { StyleSheet } from "react-native";
import { capitalizeFirstLetter, formatDate } from "../../utils/helpers/functions";
import { Text, View } from "../reusables";

interface TurtleCardData {
  dateFound: string;
  dateLastSeen: string;
  length: number;
  mark: string;
  number: number;
  sex: string;
}

const styles = StyleSheet.create({});

export const TurtleCard = ({ data }: { data: TurtleCardData }): JSX.Element => {
  return (
    <View>
      <Text>Number: {data.number}</Text>
      <Text>Mark: {data.mark}</Text>
      <Text>Sex: {capitalizeFirstLetter(data.sex)}</Text>
      <Text>Length: {data.length}</Text>
      <Text>Date Found: {formatDate(data.dateFound)}</Text>
      <Text>Date Last Seen: {formatDate(data.dateLastSeen)}</Text>
    </View>
  );
};
