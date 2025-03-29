import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check, Circle } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { Discipline } from '@/types/disciplines';

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
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onEdit(discipline)}
      activeOpacity={0.7}
    >
      <TouchableOpacity 
        style={styles.checkButton}
        onPress={() => onToggleComplete(discipline.id)}
      >
        {discipline.completed ? (
          <View style={styles.completedCircle}>
            <Check size={16} color={colors.text.inverse} />
          </View>
        ) : (
          <View style={styles.incompleteCircle} />
        )}
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text style={[
          styles.title, 
          discipline.completed && styles.completedText
        ]}>
          {discipline.title}
        </Text>
        <Text style={[
          styles.description,
          discipline.completed && styles.completedText
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
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  checkButton: {
    marginRight: 16,
  },
  incompleteCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.text.muted,
  },
  completedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    ...typography.subtitle,
    color: colors.text.primary,
    marginBottom: 4,
  },
  description: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  completedText: {
    color: colors.text.muted,
    textDecorationLine: 'line-through',
  },
});