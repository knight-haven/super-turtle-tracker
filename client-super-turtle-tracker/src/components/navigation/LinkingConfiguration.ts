import * as Linking from "expo-linking";

export const LinkingConfiguration = {
  config: {
    screens: {
      NotFound: "*",
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: "one",
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: "two",
            },
          },
        },
      },
    },
  },
  prefixes: [Linking.makeUrl("/")],
};
