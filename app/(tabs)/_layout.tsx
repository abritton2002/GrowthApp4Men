import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { Home, BookText, User } from "lucide-react-native";
import colors from "@/constants/colors";
import { useDisciplinesStore } from "@/store/disciplines-store";
import { useWisdomStore } from "@/store/wisdom-store";
import { useJournalStore } from "@/store/journal-store";
import { useLearnStore } from "@/store/learn-store";
import { useThemeStore } from "@/store/theme-store";

export default function TabLayout() {
  const initializeDisciplines = useDisciplinesStore(state => state.initialize);
  const initializeWisdom = useWisdomStore(state => state.initialize);
  const initializeJournal = useJournalStore(state => state.initialize);
  const initializeLearn = useLearnStore(state => state.initialize);
  const theme = useThemeStore(state => state.theme);
  const colorScheme = theme === 'dark' ? colors.dark : colors.light;
  
  useEffect(() => {
    // Initialize all stores when the app starts
    initializeDisciplines();
    initializeWisdom();
    initializeJournal();
    initializeLearn();
  }, [initializeDisciplines, initializeWisdom, initializeJournal, initializeLearn]);
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme.primary,
        tabBarInactiveTintColor: colorScheme.text.muted,
        tabBarStyle: {
          backgroundColor: colorScheme.background,
          borderTopColor: colorScheme.border,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Growth",
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
          tabBarIcon: ({ color, size }) => (
            <BookText size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}