import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    letterSpacing: 0.25,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    letterSpacing: 0.15,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    letterSpacing: 0.15,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.secondary,
    letterSpacing: 0.1,
  },
  body: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    color: colors.text.muted,
    letterSpacing: 0.4,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});