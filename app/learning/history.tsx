import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, BookOpen } from 'lucide-react-native';
import Card from '@/components/Card';
import LearningChart from '@/components/LearningChart';
import { useLearnStore } from '@/store/learn-store';
import colors from '@/constants/colors';
import { useThemeStore } from '@/store/theme-store';

export default function LearningHistoryScreen() {
  const router = useRouter();
  const { getLearningStats } = useLearnStore();
  const theme = useThemeStore(state => state.theme);
  const colorScheme = theme === 'dark' ? colors.dark : colors.light;
  
  // Get learning stats
  const { totalCompleted, currentStreak, categoryStats } = getLearningStats();
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme.background }]} edges={['top']}>
      <View style={[styles.header, { borderBottomColor: colorScheme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colorScheme.text.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colorScheme.text.primary }]}>Learning History</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colorScheme.text.primary }]}>{totalCompleted}</Text>
              <Text style={[styles.statLabel, { color: colorScheme.text.secondary }]}>Total Completed</Text>
            </View>
            
            <View style={[styles.divider, { backgroundColor: colorScheme.border }]} />
            
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colorScheme.text.primary }]}>{currentStreak}</Text>
              <Text style={[styles.statLabel, { color: colorScheme.text.secondary }]}>Current Streak</Text>
            </View>
          </View>
        </Card>
        
        <Text style={[styles.sectionTitle, { color: colorScheme.text.primary }]}>Learning Progress by Category</Text>
        
        <Card style={styles.chartCard}>
          <LearningChart data={categoryStats} />
        </Card>
        
        <Text style={[styles.sectionTitle, { color: colorScheme.text.primary }]}>Category Breakdown</Text>
        
        {categoryStats.map((category, index) => (
          <Card key={index} style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <Text style={[styles.categoryName, { color: colorScheme.text.primary }]}>{category.category}</Text>
              <Text style={[styles.categoryCount, { color: colorScheme.primary }]}>
                {category.completed} completed
              </Text>
            </View>
            
            <View style={styles.progressContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { backgroundColor: colorScheme.cardBackgroundAlt }
                ]}
              >
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      backgroundColor: colorScheme.primary,
                      width: `${(category.completed / Math.max(category.total, 1)) * 100}%` 
                    }
                  ]}
                />
              </View>
              <Text style={[styles.progressText, { color: colorScheme.text.secondary }]}>
                {Math.round((category.completed / Math.max(category.total, 1)) * 100)}% Complete
              </Text>
            </View>
          </Card>
        ))}
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
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  statsCard: {
    padding: 20,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  divider: {
    width: 1,
    height: 40,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 12,
  },
  chartCard: {
    padding: 16,
    marginBottom: 24,
  },
  categoryCard: {
    padding: 16,
    marginBottom: 12,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
  },
  categoryCount: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    textAlign: 'right',
  },
});