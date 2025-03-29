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
  const chartHeight = 180;
  const barWidth = (chartWidth - 40) / data.length;
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
    ];
    return categoryColors[index % categoryColors.length];
  };
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colorScheme.text.primary }]}>Learning Progress</Text>
      
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
                {value}
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
      
      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={`legend-${index}`} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: getCategoryColor(index) }]} />
            <Text style={[styles.legendText, { color: colorScheme.text.secondary }]}>
              {item.category} ({item.completed}/{item.total})
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  chartContainer: {
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
  },
});