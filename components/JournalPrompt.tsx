import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { BookText } from 'lucide-react-native';
import Card from './Card';
import Button from './Button';
import colors from '@/constants/colors';
import typography from '@/constants/typography';

interface JournalPromptProps {
  prompt: string;
  value: string;
  onChangeText: (text: string) => void;
  onSave: () => void;
}

export default function JournalPrompt({ 
  prompt, 
  value, 
  onChangeText,
  onSave
}: JournalPromptProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <BookText size={20} color={colors.text.primary} />
        </View>
        <Text style={styles.title}>Today's Prompt</Text>
      </View>
      
      <View style={styles.divider} />
      
      <Text style={styles.prompt}>
        {prompt}
      </Text>
      
      <TextInput
        style={styles.input}
        multiline
        placeholder="Write your thoughts here..."
        placeholderTextColor={colors.text.muted}
        value={value}
        onChangeText={onChangeText}
        textAlignVertical="top"
      />
      
      <Button 
        title="Save Journal Entry" 
        onPress={onSave}
        style={styles.button}
      />
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
  prompt: {
    ...typography.subtitle,
    color: colors.text.secondary,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    minHeight: 150,
    backgroundColor: colors.cardBackgroundAlt,
    color: colors.text.primary,
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    marginTop: 16,
  },
});