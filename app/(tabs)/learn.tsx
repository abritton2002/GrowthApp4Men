import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check } from 'lucide-react-native';
import HeaderBar from '@/components/HeaderBar';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { useLearnStore } from '@/store/learn-store';
import { useDisciplinesStore } from '@/store/disciplines-store';
import { formatDate, getTodayDateString } from '@/utils/date-utils';
import colors from '@/constants/colors';
import typography from '@/constants/typography';

export default function LearnScreen() {
  const { 
    categories, 
    learningItems, 
    selectedItemId, 
    selectLearningItem,
    completeLearningItem,
    isItemCompleted
  } = useLearnStore();
  
  const addDiscipline = useDisciplinesStore(state => state.addDiscipline);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // If there's already a selected item, show that category
  useEffect(() => {
    if (selectedItemId) {
      const item = learningItems.find(item => item.id === selectedItemId);
      if (item) {
        setSelectedCategory(item.category);
      }
    }
  }, [selectedItemId, learningItems]);
  
  const handleCategorySelect = (category: string) => {
    if (selectedItemId) {
      // If an item is already selected, don't allow changing categories
      return;
    }
    setSelectedCategory(category);
  };
  
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
  
  const getCategoryItems = (category: string) => {
    return learningItems.filter(item => 
      item.category === category && 
      item.date === getTodayDateString()
    );
  };
  
  const isItemSelected = (itemId: string) => {
    return selectedItemId === itemId;
  };
  
  const renderCategories = () => {
    return (
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Select a Focus Area</Text>
        <View style={styles.categoriesGrid}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryCard,
                selectedCategory === category && styles.selectedCategoryCard,
                selectedItemId && selectedCategory !== category && styles.disabledCategoryCard
              ]}
              onPress={() => handleCategorySelect(category)}
              disabled={selectedItemId !== null && selectedCategory !== category}
            >
              <Text 
                style={[
                  styles.categoryTitle,
                  selectedCategory === category && styles.selectedCategoryTitle
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  
  const renderLearningItems = () => {
    if (!selectedCategory) return null;
    
    const items = getCategoryItems(selectedCategory);
    
    if (items.length === 0) {
      return (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyText}>
            No learning items available for this category today.
          </Text>
        </Card>
      );
    }
    
    return (
      <View style={styles.learningItemsContainer}>
        <Text style={styles.sectionTitle}>Today's Focus</Text>
        {items.map(item => (
          <Card key={item.id} style={styles.learningCard}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemContent}>{item.content}</Text>
            
            {!isItemSelected(item.id) ? (
              <Button
                title="Select as Today's Learning"
                onPress={() => handleSelectItem(item.id)}
                style={styles.selectButton}
              />
            ) : (
              <View style={styles.selectedContainer}>
                <Text style={styles.selectedText}>
                  Selected for today's learning
                </Text>
                <Button
                  title={isItemCompleted(item.id) ? "Completed" : "Mark as Complete"}
                  onPress={handleCompleteItem}
                  disabled={isItemCompleted(item.id)}
                  icon={isItemCompleted(item.id) ? <Check size={18} color={colors.text.primary} /> : undefined}
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
    <SafeAreaView style={styles.container} edges={['top']}>
      <HeaderBar 
        title="Daily Learning" 
        date={formatDate(new Date())} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {renderCategories()}
        {renderLearningItems()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: 16,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedCategoryCard: {
    borderColor: colors.primary,
    backgroundColor: colors.cardBackgroundAlt,
  },
  disabledCategoryCard: {
    opacity: 0.5,
  },
  categoryTitle: {
    ...typography.subtitle,
    textAlign: 'center',
  },
  selectedCategoryTitle: {
    color: colors.primary,
  },
  learningItemsContainer: {
    marginBottom: 16,
  },
  learningCard: {
    padding: 20,
    marginBottom: 16,
  },
  itemTitle: {
    ...typography.h3,
    marginBottom: 12,
  },
  itemContent: {
    ...typography.body,
    marginBottom: 20,
    lineHeight: 24,
  },
  selectButton: {
    marginTop: 8,
  },
  selectedContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
  },
  selectedText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  completeButton: {
    backgroundColor: isItemCompleted => isItemCompleted ? colors.success : colors.primary,
  },
  emptyCard: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});