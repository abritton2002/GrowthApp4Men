import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useThemeStore } from '@/store/theme-store';

interface ReadinessRingProps {
  score: number; // 0 to 100
  size: number;
  strokeWidth: number;
  zoneColor: string;
  zoneLabel: string;
}

export default function ReadinessRing({
  score,
  size,
  strokeWidth,
  zoneColor,
  zoneLabel,
}: ReadinessRingProps) {
  // Get current theme
  const theme = useThemeStore(state => state.theme);
  const colorScheme = theme === 'dark' ? colors.dark : colors.light;
  
  // Ensure score is between 0 and 100
  const validScore = Math.min(100, Math.max(0, score));
  
  // Animation value for progress
  const animatedValue = new Animated.Value(0);
  
  // Calculate radius and center point
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  
  useEffect(() => {
    // Animate the progress ring filling up
    Animated.timing(animatedValue, {
      toValue: validScore / 100,
      duration: 1000,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, [validScore]);
  
  // For web, use a non-animated version
  if (Platform.OS === 'web') {
    // Calculate static stroke dashoffset based on progress
    const staticDashoffset = circumference * (1 - (validScore / 100));
    
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <Svg width={size} height={size}>
          {/* Background Circle */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={colorScheme.progress.track}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          
          {/* Progress Circle - Static for web */}
          <G rotation="-90" origin={`${center}, ${center}`}>
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke={zoneColor}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={staticDashoffset}
              strokeLinecap="round"
            />
          </G>
        </Svg>
        
        {/* Score and label in the center */}
        <View style={styles.scoreContainer}>
          <Text style={[styles.scoreText, { color: colorScheme.text.primary }]}>{validScore}%</Text>
          <Text style={[styles.zoneLabel, { color: zoneColor }]}>{zoneLabel}</Text>
        </View>
      </View>
    );
  }
  
  // For native platforms, use the animated version
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  
  // Calculate stroke dashoffset based on animated progress
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={colorScheme.progress.track}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress Circle - Animated */}
        <G rotation="-90" origin={`${center}, ${center}`}>
          <AnimatedCircle
            cx={center}
            cy={center}
            r={radius}
            stroke={zoneColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      
      {/* Score and label in the center */}
      <View style={styles.scoreContainer}>
        <Text style={[styles.scoreText, { color: colorScheme.text.primary }]}>{validScore}%</Text>
        <Text style={[styles.zoneLabel, { color: zoneColor }]}>{zoneLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  scoreContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  zoneLabel: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});