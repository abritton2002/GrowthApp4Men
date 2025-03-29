import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Settings } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';

interface HeaderBarProps {
  title: string;
  date?: string;
  showSettings?: boolean;
}

export default function HeaderBar({ 
  title, 
  date, 
  showSettings = true 
}: HeaderBarProps) {
  const router = useRouter();
  
  const navigateToSettings = () => {
    router.push('/settings');
  };
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {date && <Text style={styles.date}>{date}</Text>}
      </View>
      
      {showSettings && (
        <TouchableOpacity 
          onPress={navigateToSettings}
          style={styles.settingsButton}
        >
          <Settings size={24} color={colors.text.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
  },
  date: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: 4,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cardBackgroundAlt,
  },
});