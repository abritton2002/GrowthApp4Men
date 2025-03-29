import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar } from 'lucide-react-native';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { useJournalStore } from '@/store/journal-store';
import colors from '@/constants/colors';
import typography from '@/constants/typography';

export default function JournalEntryScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const entries = useJournalStore(state => state.entries);
  const prompts = useJournalStore(state => state.prompts);
  
  const entry = entries.find(e => e.id === id);
  
  if (!entry) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={typography.body}>Entry not found</Text>
        <Button 
          title="Go Back" 
          onPress={() => router.back()}
          style={styles.backButton}
        />
      </SafeAreaView>
    );
  }
  
  const prompt = prompts.find(p => p.id === entry.promptId);
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.dateContainer}>
            <Calendar size={20} color={colors.text.light} style={styles.calendarIcon} />
            <Text style={styles.date}>{formatDate(entry.date)}</Text>
          </View>
        </View>
        
        <Card style={styles.promptCard}>
          <Text style={typography.subtitle}>Prompt:</Text>
          <Text style={styles.promptText}>
            {prompt ? prompt.text : 'No prompt available'}
          </Text>
        </Card>
        
        <Card style={styles.entryCard}>
          <Text style={typography.subtitle}>Your Reflection:</Text>
          <Text style={styles.entryContent}>{entry.content}</Text>
        </Card>
        
        <Button 
          title="Back to History" 
          onPress={() => router.back()}
          style={styles.backButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    marginRight: 8,
  },
  date: {
    ...typography.h3,
  },
  promptCard: {
    marginBottom: 16,
  },
  promptText: {
    ...typography.body,
    fontStyle: 'italic',
    marginTop: 8,
    color: colors.text.secondary,
  },
  entryCard: {
    marginBottom: 24,
  },
  entryContent: {
    ...typography.body,
    marginTop: 8,
    lineHeight: 24,
  },
  backButton: {
    marginBottom: 24,
  },
});