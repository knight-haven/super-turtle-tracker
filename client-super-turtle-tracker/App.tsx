import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Navigation } from "./src/components/navigation/Navigation";
import { useTheme } from "./src/components/reusables";
import { useCachedResources } from "./src/utils";
import { useColorScheme } from "./src/utils/hooks/useColorScheme";

const App = (): JSX.Element => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const theme = useTheme("#006400", "#90ee90");

  if (!isLoadingComplete) {
    return <></>;
  }
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </PaperProvider>
    </SafeAreaProvider>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
