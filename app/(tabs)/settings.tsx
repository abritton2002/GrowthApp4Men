import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RefreshCw, BookText, Calendar, ChevronRight, Info, Moon, Sun } from 'lucide-react-native';
import Card from '@/components/Card';
import { useDisciplinesStore } from '@/store/disciplines-store';
import { useWisdomStore } from '@/store/wisdom-store';
import { useJournalStore } from '@/store/journal-store';
import { useLearnStore } from '@/store/learn-store';
import { useRouter } from 'expo-router';
import colors from '@/constants/colors';
import { useThemeStore } from '@/store/theme-store';
import { useProfileStore } from '@/store/profile-store';

export default function SettingsScreen() {
  const router = useRouter();
  const resetCompletionStatus = useDisciplinesStore(state => state.resetCompletionStatus);
  const refreshTodayEntries = useWisdomStore(state => state.refreshTodayEntries);
  const refreshTodayPrompt = useJournalStore(state => state.refreshTodayPrompt);
  
  const theme = useThemeStore(state => state.theme);
  const toggleTheme = useThemeStore(state => state.toggleTheme);
  const colorScheme = theme === 'dark' ? colors.dark : colors.light;
  
  const updateSettings = useProfileStore(state => state.updateSettings);
  
  const handleToggleTheme = () => {
    toggleTheme();
    updateSettings({ theme: theme === 'dark' ? 'light' : 'dark' });
  };
  
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
  
  const navigateToJournalHistory = () => {
    router.push('/journal/history');
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme.background }]} edges={['top']}>
      <View style={[styles.header, { borderBottomColor: colorScheme.border }]}>
        <Text style={[styles.title, { color: colorScheme.text.primary }]}>Settings</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colorScheme.text.secondary }]}>Appearance</Text>
          
          <Card style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <View style={[styles.iconContainer, { backgroundColor: colorScheme.cardBackgroundAlt }]}>
                  {theme === 'dark' ? (
                    <Moon size={20} color={colorScheme.text.primary} />
                  ) : (
                    <Sun size={20} color={colorScheme.text.primary} />
                  )}
                </View>
                <Text style={[styles.settingLabel, { color: colorScheme.text.primary }]}>
                  {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </Text>
              </View>
              <Switch
                value={theme === 'dark'}
                onValueChange={handleToggleTheme}
                trackColor={{ false: colorScheme.inactive, true: colorScheme.primary }}
                thumbColor={colorScheme.text.primary}
              />
            </View>
          </Card>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colorScheme.text.secondary }]}>Content</Text>
          
          <TouchableOpacity onPress={navigateToJournalHistory}>
            <Card style={styles.settingCard}>
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <View style={[styles.iconContainer, { backgroundColor: colorScheme.cardBackgroundAlt }]}>
                    <BookText size={20} color={colorScheme.text.primary} />
                  </View>
                  <Text style={[styles.settingLabel, { color: colorScheme.text.primary }]}>Journal History</Text>
                </View>
                <ChevronRight size={20} color={colorScheme.text.muted} />
              </View>
            </Card>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => router.push('/growth/history')}>
            <Card style={styles.settingCard}>
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <View style={[styles.iconContainer, { backgroundColor: colorScheme.cardBackgroundAlt }]}>
                    <Calendar size={20} color={colorScheme.text.primary} />
                  </View>
                  <Text style={[styles.settingLabel, { color: colorScheme.text.primary }]}>Growth History</Text>
                </View>
                <ChevronRight size={20} color={colorScheme.text.muted} />
              </View>
            </Card>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colorScheme.text.secondary }]}>Actions</Text>
          
          <Card style={styles.settingCard}>
            <TouchableOpacity onPress={handleResetDisciplines} style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <View style={[styles.iconContainer, { backgroundColor: colorScheme.cardBackgroundAlt }]}>
                  <RefreshCw size={20} color={colorScheme.text.primary} />
                </View>
                <Text style={[styles.settingLabel, { color: colorScheme.text.primary }]}>Reset Today's Disciplines</Text>
              </View>
            </TouchableOpacity>
          </Card>
          
          <Card style={styles.settingCard}>
            <TouchableOpacity onPress={handleRefreshJournalPrompt} style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <View style={[styles.iconContainer, { backgroundColor: colorScheme.cardBackgroundAlt }]}>
                  <RefreshCw size={20} color={colorScheme.text.primary} />
                </View>
                <Text style={[styles.settingLabel, { color: colorScheme.text.primary }]}>Refresh Journal Prompt</Text>
              </View>
            </TouchableOpacity>
          </Card>
          
          <Card style={styles.settingCard}>
            <TouchableOpacity onPress={handleRefreshWisdom} style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <View style={[styles.iconContainer, { backgroundColor: colorScheme.cardBackgroundAlt }]}>
                  <RefreshCw size={20} color={colorScheme.text.primary} />
                </View>
                <Text style={[styles.settingLabel, { color: colorScheme.text.primary }]}>Refresh Wisdom Content</Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colorScheme.text.secondary }]}>About</Text>
          
          <Card style={styles.settingCard}>
            <View style={styles.aboutContainer}>
              <View style={styles.aboutHeader}>
                <View style={[styles.iconContainer, { backgroundColor: colorScheme.cardBackgroundAlt }]}>
                  <Info size={20} color={colorScheme.text.primary} />
                </View>
                <Text style={[styles.aboutTitle, { color: colorScheme.text.primary }]}>Men of Honor - v1.0.0</Text>
              </View>
              <Text style={[styles.aboutDescription, { color: colorScheme.text.secondary }]}>
                An app for men of faith and values to build daily disciplines, gain wisdom, and reflect through journaling.
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginLeft: 4,
  },
  settingCard: {
    marginBottom: 8,
    padding: 0,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
  },
  aboutContainer: {
    padding: 16,
  },
  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  aboutDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});