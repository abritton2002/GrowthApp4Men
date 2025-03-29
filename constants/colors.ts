// Theme configuration with light and dark modes
const colors = {
  // Dark slate theme with minimal, clean aesthetic
  dark: {
    primary: '#4A6FA5', // Steel blue accent
    secondary: '#6D597A', // Muted purple for secondary actions
    accent: '#E56B6F', // Subtle red accent for important elements
    background: '#0A0A0A', // Darker background for more contrast
    cardBackground: '#141414', // Slightly lighter card background
    cardBackgroundAlt: '#1A1A1A', // Alternative card background for contrast
    text: {
      primary: '#FFFFFF', // Brighter white for primary text
      secondary: '#BBBBBB', // Light gray for secondary text
      muted: '#777777', // Muted gray for less important text
      inverse: '#0A0A0A', // Dark text on light backgrounds
      light: '#999999', // Light text for placeholders
    },
    border: '#222222', // Subtle border color
    success: '#4CAF50', // Success green
    error: '#E57373', // Error red
    warning: '#FFB74D', // Warning orange
    inactive: '#333333', // Inactive elements
    shadow: 'rgba(0, 0, 0, 0.5)', // Shadow color (used minimally)
    progress: {
      track: '#222222', // Progress bar track
      indicator: '#4A6FA5', // Progress bar indicator
    },
    chart: {
      grid: '#222222',
      line: '#4A6FA5',
    },
    readiness: {
      high: '#4CAF50', // Green for high readiness
      medium: '#FFB74D', // Orange for medium readiness
      low: '#E57373', // Red for low readiness
    }
  },
  
  // Light theme with clean, minimal aesthetic
  light: {
    primary: '#4A6FA5', // Keep the same primary color for brand consistency
    secondary: '#6D597A', // Keep the same secondary color
    accent: '#E56B6F', // Keep the same accent color
    background: '#F5F5F7', // Light background
    cardBackground: '#FFFFFF', // White card background
    cardBackgroundAlt: '#F0F0F5', // Slightly darker card background for contrast
    text: {
      primary: '#1A1A1A', // Dark text for primary content
      secondary: '#555555', // Medium gray for secondary text
      muted: '#888888', // Light gray for less important text
      inverse: '#FFFFFF', // Light text on dark backgrounds
      light: '#AAAAAA', // Very light text for placeholders
    },
    border: '#E0E0E0', // Light border color
    success: '#4CAF50', // Keep success green
    error: '#E57373', // Keep error red
    warning: '#FFB74D', // Keep warning orange
    inactive: '#DDDDDD', // Light inactive elements
    shadow: 'rgba(0, 0, 0, 0.1)', // Light shadow
    progress: {
      track: '#E0E0E0', // Light progress bar track
      indicator: '#4A6FA5', // Same as primary
    },
    chart: {
      grid: '#E0E0E0',
      line: '#4A6FA5',
    },
    readiness: {
      high: '#4CAF50', // Green for high readiness
      medium: '#FFB74D', // Orange for medium readiness
      low: '#E57373', // Red for low readiness
    }
  },
  
  // Helper function to get readiness color based on score
  getReadinessColor: function(score: number, theme: 'dark' | 'light' = 'dark') {
    const themeColors = theme === 'dark' ? this.dark : this.light;
    if (score >= 80) return themeColors.readiness.high;
    if (score >= 50) return themeColors.readiness.medium;
    return themeColors.readiness.low;
  }
};

export default colors;