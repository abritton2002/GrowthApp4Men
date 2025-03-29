import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { G, Line, Rect, Text as SvgText } from 'react-native-svg';
import colors from '@/constants/colors';
import { useThemeStore } from '@/store/theme-store';

interface LearningChartProps {
  data: {
    category: string;
    completed: number;
    total: number;
  }[];
}

export default function LearningChart({ data }: LearningChartProps) {
  const theme = useThemeStore(state => state.theme);
  const colorScheme = theme === 'dark' ? colors.dark : colors.light;
  
  const chartWidth = Dimensions.get('window').width - 48;
  const chartHeight = 200;
  const barWidth = (chartWidth - 40) / Math.min(data.length, 10); // Ensure bars fit even with many categories
  const maxValue = Math.max(...data.map(item => item.total), 5);
  
  // Calculate scale for y-axis
  const yScale = (value: number) => {
    return chartHeight - 40 - ((value / maxValue) * (chartHeight - 60));
  };
  
  // Generate category colors
  const getCategoryColor = (index: number) => {
    const categoryColors = [
      colorScheme.primary,
      colorScheme.secondary,
      '#4CAF50',
      '#FF9800',
      '#9C27B0',
      '#2196F3',
      '#E91E63',
      '#00BCD4',
      '#FFEB3B',
      '#795548',
    ];
    return categoryColors[index % categoryColors.length];
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Svg width={chartWidth} height={chartHeight}>
          {/* Y-axis */}
          <Line
            x1={30}
            y1={10}
            x2={30}
            y2={chartHeight - 30}
            stroke={colorScheme.chart.grid}
            strokeWidth={1}
          />
          
          {/* X-axis */}
          <Line
            x1={30}
            y1={chartHeight - 30}
            x2={chartWidth - 10}
            y2={chartHeight - 30}
            stroke={colorScheme.chart.grid}
            strokeWidth={1}
          />
          
          {/* Y-axis labels */}
          {[0, maxValue / 2, maxValue].map((value, index) => (
            <G key={`y-label-${index}`}>
              <Line
                x1={28}
                y1={yScale(value)}
                x2={32}
                y2={yScale(value)}
                stroke={colorScheme.chart.grid}
                strokeWidth={1}
              />
              <SvgText
                x={25}
                y={yScale(value) + 4}
                fontSize={10}
                fill={colorScheme.text.secondary}
                textAnchor="end"
              >
                {Math.round(value)}
              </SvgText>
            </G>
          ))}
          
          {/* Bars */}
          {data.map((item, index) => {
            const x = 40 + (index * barWidth);
            const completedHeight = ((item.completed / maxValue) * (chartHeight - 60));
            const totalHeight = ((item.total / maxValue) * (chartHeight - 60));
            
            return (
              <G key={`bar-${index}`}>
                {/* Total bar (background) */}
                <Rect
                  x={x}
                  y={yScale(item.total)}
                  width={barWidth - 10}
                  height={totalHeight}
                  fill={colorScheme.chart.grid}
                  opacity={0.3}
                  rx={4}
                />
                
                {/* Completed bar */}
                <Rect
                  x={x}
                  y={yScale(item.completed)}
                  width={barWidth - 10}
                  height={completedHeight}
                  fill={getCategoryColor(index)}
                  rx={4}
                />
                
                {/* Category label */}
                <SvgText
                  x={x + (barWidth - 10) / 2}
                  y={chartHeight - 15}
                  fontSize={9}
                  fill={colorScheme.text.secondary}
                  textAnchor="middle"
                >
                  {item.category.substring(0, 4)}
                </SvgText>
              </G>
            );
          })}
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  chartContainer: {
    paddingHorizontal: 8,
    alignItems: 'center',
  },
});