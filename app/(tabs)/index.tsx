import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { TrendingUp, Calendar, Plus, BookText, ArrowRight } from 'lucide-react-native';
import HeaderBar from '@/components/HeaderBar';
import ReadinessRing from '@/components/ReadinessRing';
import DisciplineItem from '@/components/DisciplineItem';
import EmptyState from '@/components/EmptyState';
import Card from '@/components/Card';
import { useDisciplinesStore } from '@/store/disciplines-store';
import { useJournalStore } from '@/store/journal-store';
import { formatDate, getTodayDateString } from '@/utils/date-utils';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useThemeStore } from '@/store/theme-store';

export default function HomeScreen() {
  const router = useRouter();
  const theme = useThemeStore(state => state.theme);
  const colorScheme = theme === 'dark' ? colors.dark : colors.light;
  
  const disciplines = useDisciplinesStore(state => state.disciplines);
  const completionHistory = useDisciplinesStore(state => state.completionHistory);
  const toggleComplete = useDisciplinesStore(state => state.toggleComplete);
  const currentPrompt = useJournalStore(state => state.currentPrompt);
  
  const completedCount = disciplines.filter(d => d.completed).length;
  const totalCount = disciplines.length;
  
  // Calculate readiness score (percentage)
  const readinessScore = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  // Determine readiness zone and feedback
  const getReadinessZone = (score: number) => {
    if (score >= 80) return { 
      label: "Locked In", 
      color: colorScheme.readiness.high,
      feedback: "You did what you said you would."
    };
    if (score >= 50) return { 
      label: "Needs Adjustment", 
      color: colorScheme.readiness.medium,
      feedback: "Tension is rising."
    };
    return { 
      label: "Off Mission", 
      color: colorScheme.readiness.low,
      feedback: "Realign your habits."
    };
  };
  
  const readinessZone = getReadinessZone(readinessScore);
  
  // Calculate streak (only count days with 80%+ completion)
  const highPerformanceStreak = completionHistory ? 
    Object.keys(completionHistory).length : 0;
  
  const handleToggleComplete = (id: string) => {
    toggleComplete(id);
  };
  
  const handleEditDiscipline = (discipline: any) => {
    router.push({
      pathname: '/discipline/edit',
      params: { id: discipline.id }
    });
  };
  
  const handleAddDiscipline = () => {
    router.push('/discipline/create');
  };
  
  const navigateToJournal = () => {
    router.push('/journal/entry');
  };
  
  const navigateToHistory = () => {
    router.push('/growth/history');
  };
  
  const renderEmptyState = () => (
    <EmptyState
      icon={<Plus size={40} color={colorScheme.primary} />}
      title="No Disciplines Yet"
      description="Add your first daily discipline to start building better habits."
      buttonTitle="Add Discipline"
      onButtonPress={handleAddDiscipline}
    />
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme.background }]} edges={['top']}>
      <HeaderBar 
        title="Growth Outlook" 
        date={formatDate(new Date())} 
      />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.ringContainer}>
          <ReadinessRing 
            score={readinessScore} 
            size={220} 
            strokeWidth={24}
            zoneColor={readinessZone.color}
            zoneLabel={readinessZone.label}
          />
          
          <View style={styles.feedbackContainer}>
            <Text style={[styles.feedbackText, { color: colorScheme.text.primary }]}>{readinessZone.feedback}</Text>
            <Text style={[styles.progressSummary, { color: colorScheme.text.secondary }]}>
              {completedCount} of {totalCount} disciplines completed
            </Text>
            
            {highPerformanceStreak > 1 && (
              <View style={[styles.streakContainer, { backgroundColor: colorScheme.cardBackgroundAlt }]}>
                <TrendingUp size={18} color={colorScheme.primary} style={styles.streakIcon} />
                <Text style={[styles.streakText, { color: colorScheme.text.primary }]}>
                  {highPerformanceStreak} Day Streak
                </Text>
              </View>
            )}
          </View>
          
          <TouchableOpacity 
            style={[styles.calendarButton, { backgroundColor: colorScheme.cardBackgroundAlt }]}
            onPress={navigateToHistory}
          >
            <Calendar size={20} color={colorScheme.text.primary} />
            <Text style={[styles.calendarButtonText, { color: colorScheme.text.primary }]}>View Growth History</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colorScheme.text.primary }]}>Daily Disciplines</Text>
          <TouchableOpacity onPress={handleAddDiscipline}>
            <Plus size={20} color={colorScheme.primary} />
          </TouchableOpacity>
        </View>
        
        {disciplines.length === 0 ? (
          <View style={styles.emptyContainer}>
            {renderEmptyState()}
          </View>
        ) : (
          <View style={styles.disciplinesList}>
            {disciplines.map(discipline => (
              <DisciplineItem
                key={discipline.id}
                discipline={discipline}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditDiscipline}
              />
            ))}
          </View>
        )}
        
        {currentPrompt && (
          <TouchableOpacity onPress={navigateToJournal} activeOpacity={0.8}>
            <Card style={styles.journalCard} variant="elevated">
              <View style={styles.journalHeader}>
                <View style={[styles.iconContainer, { backgroundColor: colorScheme.cardBackgroundAlt }]}>
                  <BookText size={22} color={colorScheme.primary} />
                </View>
                <Text style={[styles.journalTitle, { color: colorScheme.text.primary }]}>Today's Journal</Text>
              </View>
              
              <Text style={[styles.promptText, { color: colorScheme.text.secondary }]} numberOfLines={2}>
                {currentPrompt.text}
              </Text>
              
              <View style={styles.journalButton}>
                <Text style={[styles.journalButtonText, { color: colorScheme.primary }]}>Write Entry</Text>
                <ArrowRight size={18} color={colorScheme.primary} />
              </View>
            </Card>
          </TouchableOpacity>
        )}
        
        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  ringContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  feedbackContainer: {
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 24,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressSummary: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  streakIcon: {
    marginRight: 8,
  },
  streakText: {
    fontSize: 15,
    fontWeight: '600',
  },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 16,
  },
  calendarButtonText: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  disciplinesList: {
    paddingHorizontal: 16,
  },
  emptyContainer: {
    paddingHorizontal: 16,
    height: 200,
  },
  journalCard: {
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
  },
  journalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  journalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  promptText: {
    fontSize: 14,
    marginBottom: 12,
  },
  journalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  journalButtonText: {
    fontWeight: '600',
    fontSize: 14,
    marginRight: 8,
  },
  spacer: {
    height: 24,
  },
});