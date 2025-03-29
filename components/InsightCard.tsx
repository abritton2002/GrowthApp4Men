import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Lightbulb } from 'lucide-react-native';
import Card from './Card';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { WisdomEntry } from '@/types/wisdom';

interface InsightCardProps {
  insight: WisdomEntry;
  style?: any;
}

export default function InsightCard({ insight, style }: InsightCardProps) {
  return (
    <Card style={[styles.card, style]}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Lightbulb size={22} color={colors.primary} />
        </View>
        <Text style={styles.title}>Insight of the Day</Text>
      </View>
      
      <View style={styles.divider} />
      
      <Text style={styles.insightText}>{insight.content}</Text>
      
      {insight.source && (
        <Text style={styles.source}>— {insight.source}</Text>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    marginBottom: 16,
  },
  insightText: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '500',
    lineHeight: 24,
    marginBottom: 12,
    fontSize: 17,
  },
  source: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: 'right',
    marginTop: 8,
  },
});