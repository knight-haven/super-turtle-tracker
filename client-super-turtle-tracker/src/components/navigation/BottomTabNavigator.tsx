import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import { BottomTabParamList, Colors, ListParamList, MapParamList } from "../../utils";
import { useColorScheme } from "../../utils/hooks/useColorScheme";
import { ListScreen } from "../screens/ListScreen";
import { MapScreen } from "../screens/MapScreen";
import { TurtleViewScreen } from "../screens/TurtleViewScreen";

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3,
  },
});

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
const TabBarIcon = (props: { color: string; name: string }) => {
  return <Ionicons size={30} style={styles.icon} {...props} />;
};

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const MapStack = createStackNavigator<MapParamList>();

const MapNavigator = () => {
  return (
    <MapStack.Navigator>
      <MapStack.Screen component={MapScreen} name="MapScreen" options={{ headerTitle: "Map" }} />
    </MapStack.Navigator>
  );
};

const ListStack = createStackNavigator<ListParamList>();

const ListNavigator = () => {
  return (
    <ListStack.Navigator>
      <ListStack.Screen
        component={ListScreen}
        name="ListScreen"
        options={{ headerTitle: "Turtles" }}
      />
      <ListStack.Screen component={TurtleViewScreen} name="TurtleViewScreen" />
    </ListStack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = (): JSX.Element => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Map"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        component={MapNavigator}
        name="Map"
        options={{
          tabBarIcon: ({ color }: { color: string }) => {
            return <TabBarIcon color={color} name="ios-map" />;
          },
        }}
      />
      <BottomTab.Screen
        component={ListNavigator}
        name="List"
        options={{
          tabBarIcon: ({ color }: { color: string }) => {
            return <TabBarIcon color={color} name="ios-list" />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
};
