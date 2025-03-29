import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ErrorBoundary } from "./error-boundary";
import colors from "@/constants/colors";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="discipline/edit" 
        options={{ 
          title: "Edit Discipline",
          presentation: "modal",
        }} 
      />
      <Stack.Screen 
        name="discipline/create" 
        options={{ 
          title: "New Discipline",
          presentation: "modal",
        }} 
      />
      <Stack.Screen 
        name="settings" 
        options={{ 
          title: "Settings",
        }} 
      />
      <Stack.Screen 
        name="journal/history" 
        options={{ 
          title: "Journal History",
        }} 
      />
      <Stack.Screen 
        name="journal/entry" 
        options={{ 
          title: "Journal Entry",
        }} 
      />
      <Stack.Screen 
        name="growth/history" 
        options={{ 
          title: "Growth History",
        }} 
      />
    </Stack>
  );
}