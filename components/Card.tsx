import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import colors from '@/constants/colors';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  style?: any;
}

export default function Card({ children, style, ...props }: CardProps) {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
});