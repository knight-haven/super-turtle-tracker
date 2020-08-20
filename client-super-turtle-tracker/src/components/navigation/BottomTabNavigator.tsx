import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import { BottomTabParamList, Colors, TabOneParamList, TabTwoParamList } from "../../utils";
import { useColorScheme } from "../../utils/hooks/useColorScheme";
import { TabOneScreen } from "../screens/TabOneScreen";
import { TabTwoScreen } from "../screens/TabTwoScreen";

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
const TabOneStack = createStackNavigator<TabOneParamList>();

const TabOneNavigator = () => {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        component={TabOneScreen}
        name="TabOneScreen"
        options={{ headerTitle: "Tab One Title" }}
      />
    </TabOneStack.Navigator>
  );
};

const TabTwoStack = createStackNavigator<TabTwoParamList>();

const TabTwoNavigator = () => {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        component={TabTwoScreen}
        name="TabTwoScreen"
        options={{ headerTitle: "Tab Two Title" }}
      />
    </TabTwoStack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = (): JSX.Element => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        component={TabOneNavigator}
        name="TabOne"
        options={{
          tabBarIcon: ({ color }: { color: string }) => {
            return <TabBarIcon color={color} name="ios-code" />;
          },
        }}
      />
      <BottomTab.Screen
        component={TabTwoNavigator}
        name="TabTwo"
        options={{
          tabBarIcon: ({ color }: { color: string }) => {
            return <TabBarIcon color={color} name="ios-code" />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
};
