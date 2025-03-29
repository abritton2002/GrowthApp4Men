import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LearningItem } from '@/types/learning';
import { LEARNING_ITEMS } from '@/mocks/learning-items';
import { getTodayDateString } from '@/utils/date-utils';

interface LearnState {
  categories: string[];
  learningItems: LearningItem[];
  selectedItemId: string | null;
  completedItems: Record<string, boolean>;
  lastSelectedDate: string | null;
  
  // Actions
  initialize: () => void;
  selectLearningItem: (itemId: string) => void;
  completeLearningItem: (itemId: string) => void;
  isItemCompleted: (itemId: string) => boolean;
  resetDailySelection: () => void;
}

export const useLearnStore = create<LearnState>()(
  persist(
    (set, get) => ({
      categories: ['Leadership', 'Productivity', 'Finance', 'Mental Models', 'Performance'],
      learningItems: LEARNING_ITEMS,
      selectedItemId: null,
      completedItems: {},
      lastSelectedDate: null,
      
      initialize: () => {
        const today = getTodayDateString();
        const { lastSelectedDate } = get();
        
        // If it's a new day, reset the selection
        if (lastSelectedDate !== today) {
          get().resetDailySelection();
        }
      },
      
      selectLearningItem: (itemId: string) => {
        const today = getTodayDateString();
        
        set({
          selectedItemId: itemId,
          lastSelectedDate: today,
        });
      },
      
      completeLearningItem: (itemId: string) => {
        set(state => ({
          completedItems: {
            ...state.completedItems,
            [itemId]: true
          }
        }));
      },
      
      isItemCompleted: (itemId: string) => {
        return get().completedItems[itemId] || false;
      },
      
      resetDailySelection: () => {
        const today = getTodayDateString();
        
        set({
          selectedItemId: null,
          lastSelectedDate: today,
        });
      },
    }),
    {
      name: 'learn-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);