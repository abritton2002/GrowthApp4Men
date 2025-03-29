import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dumbbell, BookOpen, BookText, RefreshCw, Info } from 'lucide-react-native';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { useDisciplinesStore } from '@/store/disciplines-store';
import { useWisdomStore } from '@/store/wisdom-store';
import { useJournalStore } from '@/store/journal-store';
import colors from '@/constants/colors';
import typography from '@/constants/typography';

export default function SettingsScreen() {
  const resetCompletionStatus = useDisciplinesStore(state => state.resetCompletionStatus);
  const refreshTodayEntries = useWisdomStore(state => state.refreshTodayEntries);
  const refreshTodayPrompt = useJournalStore(state => state.refreshTodayPrompt);
  
  const handleResetDisciplines = () => {
    Alert.alert(
      "Reset Disciplines",
      "This will mark all disciplines as incomplete. Continue?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Reset", 
          onPress: () => resetCompletionStatus()
        }
      ]
    );
  };
  
  const handleRefreshWisdom = () => {
    refreshTodayEntries();
    Alert.alert("Success", "Today's wisdom entries have been refreshed.");
  };
  
  const handleRefreshJournalPrompt = () => {
    refreshTodayPrompt();
    Alert.alert("Success", "Today's journal prompt has been refreshed.");
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[typography.h2, styles.sectionTitle]}>Settings</Text>
        
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Dumbbell size={24} color={colors.primary} />
            </View>
            <Text style={typography.h3}>Disciplines</Text>
          </View>
          
          <Button
            title="Reset Today's Disciplines"
            variant="outline"
            onPress={handleResetDisciplines}
            style={styles.actionButton}
          />
        </Card>
        
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <BookOpen size={24} color={colors.primary} />
            </View>
            <Text style={typography.h3}>Wisdom Feed</Text>
          </View>
          
          <Button
            title="Refresh Today's Wisdom"
            variant="outline"
            onPress={handleRefreshWisdom}
            style={styles.actionButton}
          />
        </Card>
        
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <BookText size={24} color={colors.primary} />
            </View>
            <Text style={typography.h3}>Journal</Text>
          </View>
          
          <Button
            title="Refresh Today's Prompt"
            variant="outline"
            onPress={handleRefreshJournalPrompt}
            style={styles.actionButton}
          />
        </Card>
        
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Info size={24} color={colors.primary} />
            </View>
            <Text style={typography.h3}>About</Text>
          </View>
          
          <Text style={[typography.body, styles.aboutText]}>
            Men of Honor - v1.0.0
          </Text>
          <Text style={[typography.bodySmall, styles.aboutDescription]}>
            An app for men of faith and values to build daily disciplines, gain wisdom, and reflect through journaling.
          </Text>
        </Card>
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
  sectionTitle: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLabel: {
    ...typography.body,
  },
  actionButton: {
    marginTop: 8,
  },
  aboutText: {
    fontWeight: '600',
    marginBottom: 8,
  },
  aboutDescription: {
    color: colors.text.light,
    lineHeight: 20,
  },
});