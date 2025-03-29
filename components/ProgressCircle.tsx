import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import colors from '@/constants/colors';

interface ProgressCircleProps {
  progress: number; // 0 to 1
  size: number;
  strokeWidth: number;
  backgroundColor?: string;
  progressColor?: string;
}

export default function ProgressCircle({
  progress,
  size,
  strokeWidth,
  backgroundColor = colors.progress.track,
  progressColor = colors.progress.indicator,
}: ProgressCircleProps) {
  // Ensure progress is between 0 and 1
  const validProgress = Math.min(1, Math.max(0, progress));
  
  // Calculate radius and center point
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate stroke dashoffset based on progress
  const strokeDashoffset = circumference * (1 - validProgress);
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress Circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90, ${center}, ${center})`}
        />
      </Svg>
      
      {/* Percentage text can be added here if needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});