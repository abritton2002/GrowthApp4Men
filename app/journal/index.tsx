import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { History } from 'lucide-react-native';
import HeaderBar from '@/components/HeaderBar';
import JournalPrompt from '@/components/JournalPrompt';
import { useJournalStore } from '@/store/journal-store';
import { formatDate, getTodayDateString } from '@/utils/date-utils';
import colors from '@/constants/colors';
import { useThemeStore } from '@/store/theme-store';

export default function JournalScreen() {
  const router = useRouter();
  const currentPrompt = useJournalStore(state => state.currentPrompt);
  const getEntryForDate = useJournalStore(state => state.getEntryForDate);
  const addEntry = useJournalStore(state => state.addEntry);
  const theme = useThemeStore(state => state.theme);
  const colorScheme = theme === 'dark' ? colors.dark : colors.light;
  
  const [journalContent, setJournalContent] = useState('');
  const today = getTodayDateString();
  
  useEffect(() => {
    // Load today's entry if it exists
    const todayEntry = getEntryForDate(today);
    if (todayEntry) {
      setJournalContent(todayEntry.content);
    } else {
      setJournalContent('');
    }
  }, [getEntryForDate, today]);
  
  const handleSaveEntry = () => {
    if (journalContent.trim()) {
      addEntry(journalContent);
    }
  };
  
  const navigateToHistory = () => {
    router.push('/journal/history');
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme.background }]} edges={['top']}>
      <HeaderBar 
        title="Daily Journal" 
        date={formatDate(new Date())} 
      />
      
      {currentPrompt && (
        <JournalPrompt
          prompt={currentPrompt.text}
          value={journalContent}
          onChangeText={setJournalContent}
          onSave={handleSaveEntry}
        />
      )}
      
      <TouchableOpacity 
        style={[styles.historyButton, { backgroundColor: colorScheme.secondary }]}
        onPress={navigateToHistory}
      >
        <History size={24} color={colorScheme.text.inverse} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  historyButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});