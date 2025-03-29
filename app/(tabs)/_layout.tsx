import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { Home, Dumbbell, BookOpen, BookText } from "lucide-react-native";
import colors from "@/constants/colors";
import { useDisciplinesStore } from "@/store/disciplines-store";
import { useWisdomStore } from "@/store/wisdom-store";
import { useJournalStore } from "@/store/journal-store";
import { useLearnStore } from "@/store/learn-store";

export default function TabLayout() {
  const initializeDisciplines = useDisciplinesStore(state => state.initialize);
  const initializeWisdom = useWisdomStore(state => state.initialize);
  const initializeJournal = useJournalStore(state => state.initialize);
  const initializeLearn = useLearnStore(state => state.initialize);
  
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
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.muted,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
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
        name="home"
        options={{
          title: "Growth",
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Disciplines",
          tabBarIcon: ({ color, size }) => (
            <Dumbbell size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
          tabBarIcon: ({ color, size }) => (
            <BookOpen size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
          tabBarIcon: ({ color, size }) => (
            <BookText size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}