import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Navigation } from "./src/components/navigation/Navigation";
import { useCachedResources } from "./src/utils";
import { useColorScheme } from "./src/utils/hooks/useColorScheme";

const App = (): JSX.Element => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return <></>;
  }
  return (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
    </SafeAreaProvider>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
