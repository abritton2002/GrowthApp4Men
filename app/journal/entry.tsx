import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, ArrowLeft, Check } from 'lucide-react-native';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { useJournalStore } from '@/store/journal-store';
import { useThemeStore } from '@/store/theme-store';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { getTodayDateString } from '@/utils/date-utils';

export default function JournalEntryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const id = params.id;
  
  const entries = useJournalStore(state => state.entries);
  const prompts = useJournalStore(state => state.prompts);
  const currentPrompt = useJournalStore(state => state.currentPrompt);
  const getEntryForDate = useJournalStore(state => state.getEntryForDate);
  const addEntry = useJournalStore(state => state.addEntry);
  
  const theme = useThemeStore(state => state.theme);
  const colorScheme = theme === 'dark' ? colors.dark : colors.light;
  
  const [journalContent, setJournalContent] = useState('');
  const today = getTodayDateString();
  
  // If id is provided, we're viewing an existing entry
  // Otherwise, we're creating a new entry for today
  const isViewingExistingEntry = !!id;
  
  useEffect(() => {
    if (isViewingExistingEntry) {
      const entry = entries.find(e => e.id === id);
      if (entry) {
        setJournalContent(entry.content);
      }
    } else {
      // Load today's entry if it exists
      const todayEntry = getEntryForDate(today);
      if (todayEntry) {
        setJournalContent(todayEntry.content);
      } else {
        setJournalContent('');
      }
    }
  }, [id, entries, getEntryForDate, today]);
  
  const handleSaveEntry = () => {
    if (journalContent.trim()) {
      addEntry(journalContent);
      router.back();
    }
  };
  
  const getPrompt = () => {
    if (isViewingExistingEntry) {
      const entry = entries.find(e => e.id === id);
      if (entry) {
        const prompt = prompts.find(p => p.id === entry.promptId);
        return prompt ? prompt.text : 'No prompt available';
      }
    }
    return currentPrompt ? currentPrompt.text : 'No prompt available';
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  const getEntryDate = () => {
    if (isViewingExistingEntry) {
      const entry = entries.find(e => e.id === id);
      return entry ? formatDate(entry.date) : formatDate(new Date().toISOString());
    }
    return formatDate(new Date().toISOString());
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme.background }]} edges={['top']}>
      <View style={[styles.header, { borderBottomColor: colorScheme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colorScheme.text.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colorScheme.text.primary }]}>
          {isViewingExistingEntry ? 'Journal Entry' : 'Today\'s Journal'}
        </Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.dateContainer}>
          <Calendar size={20} color={colorScheme.text.secondary} style={styles.calendarIcon} />
          <Text style={[styles.dateText, { color: colorScheme.text.secondary }]}>{getEntryDate()}</Text>
        </View>
        
        <Card style={styles.promptCard}>
          <Text style={[styles.promptLabel, { color: colorScheme.text.primary }]}>Prompt:</Text>
          <Text style={[styles.promptText, { color: colorScheme.text.secondary }]}>{getPrompt()}</Text>
        </Card>
        
        <Card style={styles.entryCard}>
          <Text style={[styles.entryLabel, { color: colorScheme.text.primary }]}>Your Reflection:</Text>
          <TextInput
            style={[
              styles.entryInput, 
              { 
                backgroundColor: colorScheme.cardBackgroundAlt,
                color: colorScheme.text.primary
              }
            ]}
            multiline
            placeholder="Write your thoughts here..."
            placeholderTextColor={colorScheme.text.muted}
            value={journalContent}
            onChangeText={setJournalContent}
            editable={!isViewingExistingEntry}
            textAlignVertical="top"
          />
        </Card>
        
        {!isViewingExistingEntry && (
          <Button 
            title="Save Journal Entry" 
            onPress={handleSaveEntry}
            icon={<Check size={18} color={colorScheme.text.primary} />}
            style={styles.saveButton}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarIcon: {
    marginRight: 8,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
  },
  promptCard: {
    marginBottom: 16,
    padding: 16,
  },
  promptLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  promptText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  entryCard: {
    marginBottom: 24,
    padding: 16,
  },
  entryLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  entryInput: {
    borderRadius: 8,
    padding: 12,
    minHeight: 200,
    fontSize: 16,
    lineHeight: 24,
  },
  saveButton: {
    marginBottom: 16,
  },
});