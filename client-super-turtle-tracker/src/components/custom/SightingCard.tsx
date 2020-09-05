import * as React from "react";
import { StyleSheet } from "react-native";
import { styles as s } from "../../utils/constants";
import { formatDate } from "../../utils/helpers/functions";
import { Sighting } from "../../utils/interfaces/Sighting";
import { BottomDivider, StackedText, View } from "../reusables";

const styles = StyleSheet.create({
  baseText: {
    flex: 1,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "right",
  },

  bottom: {
    marginBottom: 15,
  },
  // buttonTitle: {
  //   fontSize: 12,
  // },
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    flex: 1,
    justifyContent: "space-evenly",
    marginBottom: 7,
    marginTop: 7,
    padding: 7,
  },
  divider: {
    marginBottom: 15,
    marginTop: 15,
  },
  textContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    marginTop: 4,
    maxWidth: "100%",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "300",
    textAlign: "left",
  },
  top: {
    marginTop: 15,
  },
});

export const SightingCard = ({ sighting }: { sighting: Sighting }): JSX.Element => {
  return (
    <View style={[styles.container, s.shadow]}>
      <View>
        <StackedText
          baseStyle={styles.baseText}
          baseText={formatDate(sighting.time)}
          titleStyle={styles.titleText}
          titleText="Date"
          viewStyle={[styles.textContainer, styles.top]}
        />
        <BottomDivider containerStyle={styles.divider} />
        <StackedText
          baseStyle={styles.baseText}
          baseText={sighting.location}
          titleStyle={styles.titleText}
          titleText="Location"
          viewStyle={styles.textContainer}
        />
        <BottomDivider containerStyle={styles.divider} />
        <StackedText
          baseStyle={styles.baseText}
          baseText={sighting.length === null ? "" : `${sighting.length} mm`}
          titleStyle={styles.titleText}
          titleText="Length"
          viewStyle={styles.textContainer}
        />
        <BottomDivider containerStyle={styles.divider} />
        <StackedText
          baseStyle={styles.baseText}
          baseText={sighting.notes}
          titleStyle={styles.titleText}
          titleText="Notes"
          viewStyle={[styles.textContainer, styles.bottom]}
        />
        {/* <Button
          bold
          onPress={() => {
            return navigation.navigate("SightingView", {
              sightingId: sighting.id,
              turtleId: sighting.turtle_id,
            });
          }}
          title="View Sighting"
          titleStyle={styles.buttonTitle}
          type="solid"
        /> */}
      </View>
    </View>
  );
};
