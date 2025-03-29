import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp } from 'lucide-react-native';
import Card from './Card';
import colors from '@/constants/colors';
import { useThemeStore } from '@/store/theme-store';

interface LearningStreakCardProps {
  currentStreak: number;
  weeklyProgress: number[];
}

export default function LearningStreakCard({ 
  currentStreak, 
  weeklyProgress 
}: LearningStreakCardProps) {
  const theme = useThemeStore(state => state.theme);
  const colorScheme = theme === 'dark' ? colors.dark : colors.light;
  
  // Get day names for the last 7 days
  const getDayNames = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date().getDay();
    const result = [];
    
    for (let i = 6; i >= 0; i--) {
      const dayIndex = (today - i + 7) % 7;
      result.push(days[dayIndex]);
    }
    
    return result;
  };
  
  const dayNames = getDayNames();
  
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: colorScheme.cardBackgroundAlt }]}>
          <TrendingUp size={20} color={colorScheme.primary} />
        </View>
        <Text style={[styles.title, { color: colorScheme.text.primary }]}>Learning Streak</Text>
      </View>
      
      <View style={[styles.streakContainer, { backgroundColor: colorScheme.cardBackgroundAlt }]}>
        <Text style={[styles.streakCount, { color: colorScheme.text.primary }]}>{currentStreak}</Text>
        <Text style={[styles.streakLabel, { color: colorScheme.text.secondary }]}>
          {currentStreak === 1 ? 'Day' : 'Days'} Streak
        </Text>
      </View>
      
      <View style={styles.weekContainer}>
        {weeklyProgress.map((completed, index) => (
          <View key={`day-${index}`} style={styles.dayColumn}>
            <View 
              style={[
                styles.dayIndicator, 
                { 
                  backgroundColor: completed 
                    ? colorScheme.primary 
                    : colorScheme.cardBackgroundAlt,
                  borderColor: completed 
                    ? colorScheme.primary 
                    : colorScheme.border,
                }
              ]} 
            />
            <Text style={[styles.dayLabel, { color: colorScheme.text.secondary }]}>
              {dayNames[index]}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  streakCount: {
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: 8,
  },
  streakLabel: {
    fontSize: 16,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  dayColumn: {
    alignItems: 'center',
  },
  dayIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: 4,
    borderWidth: 1,
  },
  dayLabel: {
    fontSize: 12,
  },
});