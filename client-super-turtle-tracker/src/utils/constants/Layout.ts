import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const Layout = {
  isSmallDevice: width < 375,
  window: {
    height,
    width,
  },
};
