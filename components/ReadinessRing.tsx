import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import colors from '@/constants/colors';
import typography from '@/constants/typography';

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
      useNativeDriver: true,
    }).start();
  }, [validScore]);
  
  // Calculate stroke dashoffset based on animated progress
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  // For web, use a non-animated version to avoid the collapsable warning
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
            stroke={colors.progress.track}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          
          {/* Progress Circle - Static for web */}
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
            transform={`rotate(-90, ${center}, ${center})`}
          />
        </Svg>
        
        {/* Score and label in the center */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{validScore}%</Text>
          <Text style={[styles.zoneLabel, { color: zoneColor }]}>{zoneLabel}</Text>
        </View>
      </View>
    );
  }
  
  // For native platforms, use the animated version
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={colors.progress.track}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress Circle - Animated */}
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
          transform={`rotate(-90, ${center}, ${center})`}
        />
      </Svg>
      
      {/* Score and label in the center */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>{validScore}%</Text>
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
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
  },
  zoneLabel: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
  },
});