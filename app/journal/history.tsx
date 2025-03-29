import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Calendar, ChevronRight } from 'lucide-react-native';
import { useJournalStore } from '@/store/journal-store';
import EmptyState from '@/components/EmptyState';
import colors from '@/constants/colors';
import typography from '@/constants/typography';

export default function JournalHistoryScreen() {
  const router = useRouter();
  const entries = useJournalStore(state => state.getAllEntries());
  const prompts = useJournalStore(state => state.prompts);
  
  const getPromptText = (promptId: string): string => {
    const prompt = prompts.find(p => p.id === promptId);
    return prompt ? prompt.text : 'No prompt available';
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  const handleEntryPress = (entryId: string) => {
    router.push({
      pathname: '/journal/entry',
      params: { id: entryId }
    });
  };
  
  const renderEmptyState = () => (
    <EmptyState
      icon={<Calendar size={40} color={colors.primary} />}
      title="No Journal Entries Yet"
      description="Your journal entries will appear here once you start writing."
      buttonTitle="Start Journaling"
      onButtonPress={() => router.push('/journal')}
    />
  );
  
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.entryItem}
      onPress={() => handleEntryPress(item.id)}
    >
      <View style={styles.entryContent}>
        <Text style={styles.entryDate}>{formatDate(item.date)}</Text>
        <Text style={styles.promptText} numberOfLines={2}>
          {getPromptText(item.promptId)}
        </Text>
        <Text style={styles.entryPreview} numberOfLines={2}>
          {item.content}
        </Text>
      </View>
      <ChevronRight size={20} color={colors.text.light} />
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={[typography.h2, styles.title]}>Journal History</Text>
      
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  entryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  entryContent: {
    flex: 1,
  },
  entryDate: {
    ...typography.subtitle,
    marginBottom: 4,
  },
  promptText: {
    ...typography.bodySmall,
    color: colors.text.light,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  entryPreview: {
    ...typography.body,
    color: colors.text.primary,
  },
});