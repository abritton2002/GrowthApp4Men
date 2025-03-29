import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  Calendar, 
  BookText, 
  Settings, 
  TrendingUp, 
  ChevronRight,
  Edit3,
  BookOpen
} from 'lucide-react-native';
import Card from '@/components/Card';
import { useProfileStore } from '@/store/profile-store';
import { useDisciplinesStore } from '@/store/disciplines-store';
import { useJournalStore } from '@/store/journal-store';
import { useLearnStore } from '@/store/learn-store';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useThemeStore } from '@/store/theme-store';

export default function ProfileScreen() {
  const router = useRouter();
  const profile = useProfileStore(state => state.profile);
  const completionHistory = useDisciplinesStore(state => state.completionHistory);
  const journalEntries = useJournalStore(state => state.getAllEntries());
  const { getLearningStats } = useLearnStore();
  const theme = useThemeStore(state => state.theme);
  const colorScheme = theme === 'dark' ? colors.dark : colors.light;
  
  // Calculate stats
  const totalDays = completionHistory ? Object.keys(completionHistory).length : 0;
  const journalCount = journalEntries.length;
  
  // Get learning stats
  const { totalCompleted } = getLearningStats();
  
  // Calculate streak
  const streakCount = calculateStreak(completionHistory);
  
  const navigateToSettings = () => {
    router.push('/settings');
  };
  
  const navigateToGrowthHistory = () => {
    router.push('/growth/history');
  };
  
  const navigateToJournalHistory = () => {
    router.push('/journal/history');
  };
  
  const navigateToLearningHistory = () => {
    router.push('/learning/history');
  };
  
  const navigateToEditProfile = () => {
    // This would go to a profile edit screen
    // For now, we'll just go to settings
    router.push('/settings');
  };
  
  if (!profile) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colorScheme.background }]}>
        <Text style={[typography.body, { color: colorScheme.text.primary }]}>Loading profile...</Text>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme.background }]} edges={['top']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.header, { borderBottomColor: colorScheme.border }]}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              {profile.avatar ? (
                <Image source={{ uri: profile.avatar }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatarPlaceholder, { backgroundColor: colorScheme.primary }]}>
                  <Text style={[styles.avatarInitial, { color: colorScheme.text.inverse }]}>
                    {profile.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
            </View>
            
            <View style={styles.nameContainer}>
              <Text style={[styles.name, { color: colorScheme.text.primary }]}>{profile.name}</Text>
              {profile.bio && <Text style={[styles.bio, { color: colorScheme.text.secondary }]}>{profile.bio}</Text>}
            </View>
            
            <TouchableOpacity 
              style={[styles.editButton, { backgroundColor: colorScheme.cardBackgroundAlt }]}
              onPress={navigateToEditProfile}
            >
              <Edit3 size={20} color={colorScheme.text.primary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colorScheme.cardBackground }]}>
            <Text style={[styles.statValue, { color: colorScheme.text.primary }]}>{totalDays}</Text>
            <Text style={[styles.statLabel, { color: colorScheme.text.secondary }]}>Days</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colorScheme.cardBackground }]}>
            <Text style={[styles.statValue, { color: colorScheme.text.primary }]}>{streakCount}</Text>
            <Text style={[styles.statLabel, { color: colorScheme.text.secondary }]}>Streak</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colorScheme.cardBackground }]}>
            <Text style={[styles.statValue, { color: colorScheme.text.primary }]}>{totalCompleted}</Text>
            <Text style={[styles.statLabel, { color: colorScheme.text.secondary }]}>Learned</Text>
          </View>
        </View>
        
        <Text style={[styles.sectionTitle, { color: colorScheme.text.secondary }]}>History</Text>
        
        <TouchableOpacity onPress={navigateToGrowthHistory}>
          <Card style={styles.menuCard}>
            <View style={styles.menuItem}>
              <View style={[styles.menuIconContainer, { backgroundColor: colorScheme.cardBackgroundAlt }]}>
                <Calendar size={20} color={colorScheme.text.primary} />
              </View>
              <Text style={[styles.menuText, { color: colorScheme.text.primary }]}>Growth History</Text>
              <ChevronRight size={20} color={colorScheme.text.muted} />
            </View>
          </Card>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={navigateToJournalHistory}>
          <Card style={styles.menuCard}>
            <View style={styles.menuItem}>
              <View style={[styles.menuIconContainer, { backgroundColor: colorScheme.cardBackgroundAlt }]}>
                <BookText size={20} color={colorScheme.text.primary} />
              </View>
              <Text style={[styles.menuText, { color: colorScheme.text.primary }]}>Journal History</Text>
              <ChevronRight size={20} color={colorScheme.text.muted} />
            </View>
          </Card>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={navigateToLearningHistory}>
          <Card style={styles.menuCard}>
            <View style={styles.menuItem}>
              <View style={[styles.menuIconContainer, { backgroundColor: colorScheme.cardBackgroundAlt }]}>
                <BookOpen size={20} color={colorScheme.text.primary} />
              </View>
              <Text style={[styles.menuText, { color: colorScheme.text.primary }]}>Learning History</Text>
              <ChevronRight size={20} color={colorScheme.text.muted} />
            </View>
          </Card>
        </TouchableOpacity>
        
        <Text style={[styles.sectionTitle, { color: colorScheme.text.secondary }]}>Settings</Text>
        
        <TouchableOpacity onPress={navigateToSettings}>
          <Card style={styles.menuCard}>
            <View style={styles.menuItem}>
              <View style={[styles.menuIconContainer, { backgroundColor: colorScheme.cardBackgroundAlt }]}>
                <Settings size={20} color={colorScheme.text.primary} />
              </View>
              <Text style={[styles.menuText, { color: colorScheme.text.primary }]}>App Settings</Text>
              <ChevronRight size={20} color={colorScheme.text.muted} />
            </View>
          </Card>
        </TouchableOpacity>
        
        <View style={styles.appInfo}>
          <Text style={[styles.appVersion, { color: colorScheme.text.muted }]}>Men of Honor v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper function to calculate streak
function calculateStreak(completionHistory: Record<string, boolean> = {}): number {
  if (!completionHistory || Object.keys(completionHistory).length === 0) return 0;
  
  const dates = Object.keys(completionHistory)
    .filter(date => completionHistory[date])
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
  if (dates.length === 0) return 0;
  
  let streak = 1;
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  
  for (let i = 0; i < dates.length - 1; i++) {
    const current = new Date(dates[i]);
    const next = new Date(dates[i + 1]);
    
    // Check if dates are consecutive
    const diffDays = Math.round(Math.abs((current.getTime() - next.getTime()) / oneDay));
    
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  menuCard: {
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 0,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    flex: 1,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: Platform.OS === 'ios' ? 16 : 0,
  },
  appVersion: {
    fontSize: 12,
  },
});