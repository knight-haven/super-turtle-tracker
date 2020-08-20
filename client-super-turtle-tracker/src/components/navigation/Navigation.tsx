import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import { RootStackParamList } from "../../utils";
import { NotFoundScreen } from "../screens/NotFoundScreen";
import { BottomTabNavigator } from "./BottomTabNavigator";
import { LinkingConfiguration } from "./LinkingConfiguration";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }): JSX.Element => {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
};

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={BottomTabNavigator} name="Root" />
      <Stack.Screen component={NotFoundScreen} name="NotFound" options={{ title: "Oops!" }} />
    </Stack.Navigator>
  );
};
