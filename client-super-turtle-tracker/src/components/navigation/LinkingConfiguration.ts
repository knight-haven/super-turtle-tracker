import * as Linking from "expo-linking";

export const LinkingConfiguration = {
  config: {
    screens: {
      NotFound: "*",
      Root: {
        screens: {
          List: {
            screens: {
              ListScreen: "two",
              TurtleViewScreen: "three",
            },
          },
          Map: {
            screens: {
              MapScreen: "one",
            },
          },
        },
      },
    },
  },
  prefixes: [Linking.makeUrl("/")],
};
