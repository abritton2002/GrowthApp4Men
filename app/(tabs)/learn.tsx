import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, ChevronRight, ChevronDown } from 'lucide-react-native';
import HeaderBar from '@/components/HeaderBar';
import Card from '@/components/Card';
import Button from '@/components/Button';
import LearningStreakCard from '@/components/LearningStreakCard';
import { useLearnStore } from '@/store/learn-store';
import { useDisciplinesStore } from '@/store/disciplines-store';
import { formatDate, getTodayDateString } from '@/utils/date-utils';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useThemeStore } from '@/store/theme-store';

export default function LearnScreen() {
  const { 
    categories, 
    learningItems, 
    selectedItemId, 
    selectLearningItem,
    completeLearningItem,
    isItemCompleted,
    getLearningStats
  } = useLearnStore();
  
  const theme = useThemeStore(state => state.theme);
  const colorScheme = theme === 'dark' ? colors.dark : colors.light;
  
  const addDiscipline = useDisciplinesStore(state => state.addDiscipline);
  
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  
  // Get learning stats
  const { currentStreak, weeklyProgress } = getLearningStats();
  
  const handleSelectItem = (itemId: string) => {
    if (selectedItemId) {
      // If an item is already selected, don't allow selecting another
      return;
    }
    
    selectLearningItem(itemId);
    
    // Add to disciplines
    const item = learningItems.find(item => item.id === itemId);
    if (item) {
      addDiscipline({
        title: `Learn: ${item.title}`,
        description: `Complete today's learning on ${item.category}`,
        reminderTime: '12:00'
      });
    }
  };
  
  const handleCompleteItem = () => {
    if (selectedItemId) {
      completeLearningItem(selectedItemId);
    }
  };
  
  const toggleExpandItem = (itemId: string) => {
    setExpandedItemId(expandedItemId === itemId ? null : itemId);
  };
  
  const getTodayItems = () => {
    return learningItems.filter(item => item.date === getTodayDateString());
  };
  
  const isItemSelected = (itemId: string) => {
    return selectedItemId === itemId;
  };
  
  const renderDashboard = () => {
    return (
      <View style={styles.dashboardContainer}>
        <LearningStreakCard 
          currentStreak={currentStreak}
          weeklyProgress={weeklyProgress}
        />
      </View>
    );
  };
  
  const renderLearningItems = () => {
    const todayItems = getTodayItems();
    
    if (todayItems.length === 0) {
      return (
        <Card style={styles.emptyCard}>
          <Text style={[styles.emptyText, { color: colorScheme.text.secondary }]}>
            No learning items available for today.
          </Text>
        </Card>
      );
    }
    
    return (
      <View style={styles.learningItemsContainer}>
        <Text style={[styles.sectionTitle, { color: colorScheme.text.primary }]}>Today's Focus</Text>
        {todayItems.map(item => (
          <Card key={item.id} style={styles.learningCard} variant="elevated">
            <TouchableOpacity 
              style={styles.itemHeader}
              onPress={() => toggleExpandItem(item.id)}
            >
              <Text style={[styles.itemTitle, { color: colorScheme.text.primary }]}>{item.title}</Text>
              {expandedItemId === item.id ? (
                <ChevronDown size={20} color={colorScheme.text.muted} />
              ) : (
                <ChevronRight size={20} color={colorScheme.text.muted} />
              )}
            </TouchableOpacity>
            
            {expandedItemId === item.id && (
              <View style={styles.expandedContent}>
                <Text style={[styles.itemContent, { color: colorScheme.text.secondary }]}>{item.content}</Text>
              </View>
            )}
            
            {!isItemSelected(item.id) ? (
              <Button
                title="Select as Today's Learning"
                onPress={() => handleSelectItem(item.id)}
                style={styles.selectButton}
              />
            ) : (
              <View style={[styles.selectedContainer, { borderTopColor: colorScheme.border }]}>
                <Text style={[styles.selectedText, { color: colorScheme.primary }]}>
                  Selected for today's learning
                </Text>
                <Button
                  title={isItemCompleted(item.id) ? "Completed" : "Mark as Complete"}
                  onPress={handleCompleteItem}
                  disabled={isItemCompleted(item.id)}
                  icon={isItemCompleted(item.id) ? <Check size={18} color={colorScheme.text.primary} /> : undefined}
                  style={styles.completeButton}
                />
              </View>
            )}
          </Card>
        ))}
      </View>
    );
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme.background }]} edges={['top']}>
      <HeaderBar 
        title="Daily Learning" 
        date={formatDate(new Date())} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {renderDashboard()}
        {renderLearningItems()}
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
  contentContainer: {
    paddingBottom: 32,
  },
  dashboardContainer: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  learningItemsContainer: {
    marginBottom: 16,
  },
  learningCard: {
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  itemContent: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  selectButton: {
    marginTop: 8,
  },
  selectedContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    paddingTop: 16,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
  },
  emptyCard: {
    padding: 20,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});