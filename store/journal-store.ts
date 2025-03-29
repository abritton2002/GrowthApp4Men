import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JournalEntry, JournalPrompt } from '@/types/journal';
import { JOURNAL_PROMPTS } from '@/mocks/journal-prompts';
import { getRandomItemForToday, getTodayDateString } from '@/utils/date-utils';

interface JournalState {
  prompts: JournalPrompt[];
  entries: JournalEntry[];
  currentPrompt: JournalPrompt | null;
  lastPromptDate: string | null;
  
  // Actions
  initialize: () => void;
  refreshTodayPrompt: () => void;
  addEntry: (content: string) => void;
  getEntryForDate: (date: string) => JournalEntry | null;
  getAllEntries: () => JournalEntry[];
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set, get) => ({
      prompts: JOURNAL_PROMPTS,
      entries: [],
      currentPrompt: null,
      lastPromptDate: null,
      
      initialize: () => {
        const { lastPromptDate } = get();
        const today = getTodayDateString();
        
        if (lastPromptDate !== today) {
          get().refreshTodayPrompt();
        }
      },
      
      refreshTodayPrompt: () => {
        const today = getTodayDateString();
        const { prompts } = get();
        
        const todayPrompt = getRandomItemForToday(prompts);
        
        set({
          currentPrompt: todayPrompt,
          lastPromptDate: today,
        });
      },
      
      addEntry: (content) => {
        const { currentPrompt, entries } = get();
        const today = getTodayDateString();
        
        if (!currentPrompt) return;
        
        // Check if there's already an entry for today
        const existingEntryIndex = entries.findIndex(
          entry => entry.date === today
        );
        
        if (existingEntryIndex >= 0) {
          // Update existing entry
          const updatedEntries = [...entries];
          updatedEntries[existingEntryIndex] = {
            ...updatedEntries[existingEntryIndex],
            content,
            updatedAt: new Date().toISOString(),
          };
          
          set({ entries: updatedEntries });
        } else {
          // Create new entry
          const newEntry: JournalEntry = {
            id: Date.now().toString(),
            promptId: currentPrompt.id,
            content,
            date: today,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          set(state => ({
            entries: [...state.entries, newEntry],
          }));
        }
      },
      
      getEntryForDate: (date) => {
        const { entries } = get();
        return entries.find(entry => entry.date === date) || null;
      },
      
      getAllEntries: () => {
        return get().entries.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      },
    }),
    {
      name: 'journal-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);