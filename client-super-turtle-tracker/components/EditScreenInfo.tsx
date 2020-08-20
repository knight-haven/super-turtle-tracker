import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

const styles = StyleSheet.create({
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  // codeHighlightText: {
  //   color: "rgba(96,100,109, 0.8)",
  // },
  // container: {
  //   backgroundColor: "#fff",
  //   flex: 1,
  // },
  // contentContainer: {
  //   paddingTop: 30,
  // },
  // developmentModeText: {
  //   fontSize: 14,
  //   lineHeight: 19,
  //   marginBottom: 20,
  //   textAlign: "center",
  // },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 15,
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  // welcomeContainer: {
  //   alignItems: "center",
  //   marginBottom: 20,
  //   marginTop: 10,
  // },
  // welcomeImage: {
  //   height: 80,
  //   marginLeft: -10,
  //   marginTop: 3,
  //   resizeMode: "contain",
  //   width: 100,
  // },
});

const handleHelpPress = () => {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet",
  );
};

export const EditScreenInfo = ({ path }: { path: string }): JSX.Element => {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          darkColor="rgba(255,255,255,0.8)"
          lightColor="rgba(0,0,0,0.8)"
          style={styles.getStartedText}
        >
          Open up the code for this screen:
        </Text>

        <View
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)"
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
        >
          <MonoText>{path}</MonoText>
        </View>

        <Text
          darkColor="rgba(255,255,255,0.8)"
          lightColor="rgba(0,0,0,0.8)"
          style={styles.getStartedText}
        >
          Change any of the text, save the file, and your app will automatically update.
        </Text>
      </View>

      <View style={styles.helpContainer}>
        <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
          <Text lightColor={Colors.light.tint} style={styles.helpLinkText}>
            Tap here if your app doesn&apos;t automatically update after making changes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
