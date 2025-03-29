import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { TrendingUp, Calendar } from 'lucide-react-native';
import HeaderBar from '@/components/HeaderBar';
import ReadinessRing from '@/components/ReadinessRing';
import InsightCard from '@/components/InsightCard';
import ReflectionPrompt from '@/components/ReflectionPrompt';
import { useDisciplinesStore } from '@/store/disciplines-store';
import { useWisdomStore } from '@/store/wisdom-store';
import { formatDate } from '@/utils/date-utils';
import colors from '@/constants/colors';
import typography from '@/constants/typography';

export default function HomeScreen() {
  const router = useRouter();
  const disciplines = useDisciplinesStore(state => state.disciplines);
  const completionHistory = useDisciplinesStore(state => state.completionHistory);
  const completedCount = disciplines.filter(d => d.completed).length;
  const totalCount = disciplines.length;
  
  // Calculate readiness score (percentage)
  const readinessScore = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  // Determine readiness zone and feedback
  const getReadinessZone = (score: number) => {
    if (score >= 80) return { 
      label: "Locked In", 
      color: '#28C76F', // Green
      feedback: "You did what you said you would."
    };
    if (score >= 50) return { 
      label: "Needs Adjustment", 
      color: '#FFD234', // Yellow
      feedback: "Tension is rising."
    };
    return { 
      label: "Off Mission", 
      color: '#FF4C4C', // Red
      feedback: "Realign your habits."
    };
  };
  
  const readinessZone = getReadinessZone(readinessScore);
  
  // Get a quote for the insight card
  const todayEntries = useWisdomStore(state => state.todayEntries);
  const quote = todayEntries.find(entry => entry.type === 'quote');
  
  // Calculate streak (only count days with 80%+ completion)
  const highPerformanceStreak = completionHistory ? 
    Object.keys(completionHistory).length : 0;
  
  const navigateToJournal = () => {
    router.push('/(tabs)/journal');
  };
  
  const navigateToHistory = () => {
    router.push('/growth/history');
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
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
            strokeWidth={18}
            zoneColor={readinessZone.color}
            zoneLabel={readinessZone.label}
          />
          
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackText}>{readinessZone.feedback}</Text>
            <Text style={styles.progressSummary}>
              {completedCount} of {totalCount} disciplines completed
            </Text>
            
            {highPerformanceStreak > 1 && (
              <View style={styles.streakContainer}>
                <TrendingUp size={18} color={colors.primary} style={styles.streakIcon} />
                <Text style={styles.streakText}>
                  {highPerformanceStreak} Day Streak
                </Text>
              </View>
            )}
          </View>
          
          <TouchableOpacity 
            style={styles.calendarButton}
            onPress={navigateToHistory}
          >
            <Calendar size={20} color={colors.text.primary} />
            <Text style={styles.calendarButtonText}>View Growth History</Text>
          </TouchableOpacity>
        </View>
        
        {quote && (
          <InsightCard insight={quote} />
        )}
        
        <ReflectionPrompt onPress={navigateToJournal} />
        
        <View style={styles.spacer} />
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
    ...typography.subtitle,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  progressSummary: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackgroundAlt,
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
    color: colors.text.primary,
  },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackgroundAlt,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 16,
  },
  calendarButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text.primary,
    marginLeft: 8,
  },
  spacer: {
    height: 24,
  },
});