import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { Discipline } from '@/types/disciplines';
import { useThemeStore } from '@/store/theme-store';

interface DisciplineItemProps {
  discipline: Discipline;
  onToggleComplete: (id: string) => void;
  onEdit: (discipline: Discipline) => void;
}

export default function DisciplineItem({ 
  discipline, 
  onToggleComplete,
  onEdit
}: DisciplineItemProps) {
  const theme = useThemeStore(state => state.theme);
  const colorScheme = theme === 'dark' ? colors.dark : colors.light;
  
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        { 
          backgroundColor: colorScheme.cardBackground,
          borderColor: colorScheme.border,
        },
        discipline.completed && { 
          backgroundColor: colorScheme.cardBackgroundAlt,
          borderColor: colorScheme.border,
        }
      ]}
      onPress={() => onEdit(discipline)}
      activeOpacity={0.7}
    >
      <TouchableOpacity 
        style={styles.checkButton}
        onPress={() => onToggleComplete(discipline.id)}
      >
        {discipline.completed ? (
          <View style={[styles.completedCircle, { backgroundColor: colorScheme.success }]}>
            <Check size={16} color={colorScheme.text.inverse} />
          </View>
        ) : (
          <View style={[styles.incompleteCircle, { borderColor: colorScheme.text.muted }]} />
        )}
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text style={[
          styles.title, 
          { color: colorScheme.text.primary },
          discipline.completed && { color: colorScheme.text.muted, textDecorationLine: 'line-through' }
        ]}>
          {discipline.title}
        </Text>
        <Text style={[
          styles.description,
          { color: colorScheme.text.secondary },
          discipline.completed && { color: colorScheme.text.muted, textDecorationLine: 'line-through' }
        ]}>
          {discipline.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  checkButton: {
    marginRight: 16,
  },
  incompleteCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
  },
  completedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
  },
});