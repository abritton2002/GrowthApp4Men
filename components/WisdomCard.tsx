import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BookOpen, DollarSign, Quote } from 'lucide-react-native';
import Card from './Card';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { WisdomEntry } from '@/types/wisdom';

interface WisdomCardProps {
  entry: WisdomEntry;
}

export default function WisdomCard({ entry }: WisdomCardProps) {
  const getIcon = () => {
    switch (entry.type) {
      case 'quote':
        return <Quote size={20} color={colors.text.primary} />;
      case 'financial':
        return <DollarSign size={20} color={colors.text.primary} />;
      case 'parable':
        return <BookOpen size={20} color={colors.text.primary} />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (entry.type) {
      case 'quote':
        return 'Daily Quote';
      case 'financial':
        return 'Financial Wisdom';
      case 'parable':
        return 'Reflection';
      default:
        return 'Wisdom';
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {getIcon()}
        </View>
        <Text style={styles.title}>{getTitle()}</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.content}>
        <Text style={styles.contentText}>{entry.content}</Text>
        
        {entry.source && (
          <Text style={styles.source}>
            — {entry.source}
          </Text>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.cardBackgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  content: {
    marginTop: 4,
  },
  contentText: {
    ...typography.body,
    color: colors.text.primary,
    lineHeight: 24,
  },
  source: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: 16,
    textAlign: 'right',
    fontStyle: 'italic',
  },
});