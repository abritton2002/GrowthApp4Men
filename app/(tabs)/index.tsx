import React, { useCallback } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Plus, Dumbbell } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import HeaderBar from '@/components/HeaderBar';
import DisciplineItem from '@/components/DisciplineItem';
import EmptyState from '@/components/EmptyState';
import { useDisciplinesStore } from '@/store/disciplines-store';
import { formatDate } from '@/utils/date-utils';
import colors from '@/constants/colors';
import { Discipline } from '@/types/disciplines';

export default function DisciplinesScreen() {
  const router = useRouter();
  const disciplines = useDisciplinesStore(state => state.disciplines);
  const toggleComplete = useDisciplinesStore(state => state.toggleComplete);
  
  const handleToggleComplete = (id: string) => {
    toggleComplete(id);
  };
  
  const handleEditDiscipline = (discipline: Discipline) => {
    router.push({
      pathname: '/discipline/edit',
      params: { id: discipline.id }
    });
  };
  
  const handleAddDiscipline = () => {
    router.push('/discipline/create');
  };
  
  const renderEmptyState = () => (
    <EmptyState
      icon={<Dumbbell size={40} color={colors.primary} />}
      title="No Disciplines Yet"
      description="Add your first daily discipline to start building better habits."
      buttonTitle="Add Discipline"
      onButtonPress={handleAddDiscipline}
    />
  );
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HeaderBar 
        title="Daily Disciplines" 
        date={formatDate(new Date())} 
      />
      
      <FlatList
        data={disciplines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DisciplineItem
            discipline={item}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditDiscipline}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
      />
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddDiscipline}
      >
        <Plus size={24} color={colors.text.inverse} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});