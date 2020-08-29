import * as React from "react";
import { Text as DefaultText, View as DefaultView } from "react-native";
import { DefaultTheme } from "react-native-paper";
import { Colors } from "../../utils";
import { useColorScheme } from "../../utils/hooks/useColorScheme";

export const useThemeColor = (
  props: { dark?: string; light?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
): string => {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }
  return Colors[theme][colorName];
};

export const useTheme = (lightColor: string, darkColor: string): ReactNativePaper.Theme => {
  const color = useThemeColor({ dark: darkColor, light: lightColor }, "background");
  const scheme = useColorScheme();
  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: color,
    },
    dark: scheme === "dark",
  };
};

type ThemeProps = {
  darkColor?: string;
  lightColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export const Text = (props: TextProps): JSX.Element => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ dark: darkColor, light: lightColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};

export const View = (props: ViewProps): JSX.Element => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ dark: darkColor, light: lightColor }, "background");

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};
