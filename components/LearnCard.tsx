import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './Card';
import colors from '@/constants/colors';
import typography from '@/constants/typography';

interface LearnCardProps {
  category: string;
  title: string;
  content: string;
  icon: React.ReactNode;
  color: string;
}

export default function LearnCard({ 
  category, 
  title, 
  content, 
  icon,
  color 
}: LearnCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          {icon}
        </View>
        <Text style={styles.category}>{category}</Text>
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <Text 
        style={[
          styles.content, 
          !expanded && styles.contentCollapsed
        ]}
        numberOfLines={expanded ? undefined : 2}
      >
        {content}
      </Text>
      
      <TouchableOpacity 
        style={styles.readMoreButton}
        onPress={toggleExpand}
      >
        <Text style={styles.readMoreText}>
          {expanded ? 'Show Less' : 'Read More'}
        </Text>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  category: {
    ...typography.subtitle,
    fontSize: 16,
    color: colors.text.secondary,
  },
  title: {
    ...typography.h3,
    marginBottom: 8,
  },
  content: {
    ...typography.body,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  contentCollapsed: {
    marginBottom: 8,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  readMoreText: {
    color: colors.primary,
    fontWeight: '600',
  },
});