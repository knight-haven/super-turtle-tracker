import * as React from "react";
import { StyleSheet } from "react-native";
import { capitalizeFirstLetter, formatDate } from "../../utils/helpers/functions";
import { styles as s } from "../../utils/constants";
import { BottomDivider, Divider, StackedText, View } from "../reusables";

interface TurtleCardData {
  dateFound: string;
  dateLastSeen: string;
  length: number;
  mark: string;
  number: number;
  sex: string;
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 5,
  },
});

export const TurtleCard = ({ data }: { data: TurtleCardData }): JSX.Element => {
  return (
    <View>
      <View style={[s.card, s.shadow]}>
        <View style={styles.rowContainer}>
          <StackedText baseText={data.number.toString()} titleText="Number" />
          <Divider />
          <StackedText baseText={data.mark} titleText="Mark" />
        </View>
        <BottomDivider />
        <View style={styles.rowContainer}>
          <StackedText baseText={capitalizeFirstLetter(data.sex)} titleText="Sex" />
          <Divider />
          <StackedText
            baseText={data.length === null ? "0 mm" : `${data.length} mm`}
            titleText="Carapace Length"
          />
        </View>
        <BottomDivider />
        <View style={styles.rowContainer}>
          <StackedText baseText={formatDate(data.dateFound)} titleText="Date Found" />
          <Divider />
          <StackedText baseText={formatDate(data.dateLastSeen)} titleText="Date Last Seen" />
        </View>
      </View>
    </View>
  );
};
