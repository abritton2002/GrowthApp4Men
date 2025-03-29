import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Discipline, DisciplineFormData } from '@/types/disciplines';
import { DEFAULT_DISCIPLINES } from '@/mocks/disciplines';
import { getTodayDateString } from '@/utils/date-utils';

interface DisciplinesState {
  disciplines: Discipline[];
  isInitialized: boolean;
  completionHistory: Record<string, boolean>;
  
  // Actions
  initialize: () => void;
  addDiscipline: (data: DisciplineFormData) => void;
  updateDiscipline: (id: string, data: Partial<DisciplineFormData>) => void;
  deleteDiscipline: (id: string) => void;
  toggleComplete: (id: string) => void;
  resetCompletionStatus: () => void;
}

export const useDisciplinesStore = create<DisciplinesState>()(
  persist(
    (set, get) => ({
      disciplines: [],
      isInitialized: false,
      completionHistory: {},
      
      initialize: () => {
        const { disciplines, isInitialized } = get();
        
        if (!isInitialized) {
          set({ 
            disciplines: DEFAULT_DISCIPLINES,
            isInitialized: true 
          });
        }
      },
      
      addDiscipline: (data) => {
        const newDiscipline: Discipline = {
          id: Date.now().toString(),
          title: data.title,
          description: data.description,
          reminderTime: data.reminderTime,
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          disciplines: [...state.disciplines, newDiscipline],
        }));
      },
      
      updateDiscipline: (id, data) => {
        set((state) => ({
          disciplines: state.disciplines.map((discipline) => 
            discipline.id === id
              ? { 
                  ...discipline, 
                  ...data, 
                  updatedAt: new Date().toISOString() 
                }
              : discipline
          ),
        }));
      },
      
      deleteDiscipline: (id) => {
        set((state) => ({
          disciplines: state.disciplines.filter(
            (discipline) => discipline.id !== id
          ),
        }));
      },
      
      toggleComplete: (id) => {
        const today = getTodayDateString();
        const { disciplines, completionHistory } = get();
        
        // Find the discipline
        const discipline = disciplines.find(d => d.id === id);
        if (!discipline) return;
        
        // Toggle its completion status
        const newCompletionStatus = !discipline.completed;
        
        // Update the discipline
        set((state) => ({
          disciplines: state.disciplines.map((d) =>
            d.id === id
              ? { 
                  ...d, 
                  completed: newCompletionStatus,
                  updatedAt: new Date().toISOString() 
                }
              : d
          ),
        }));
        
        // Update completion history if all disciplines are completed
        if (newCompletionStatus) {
          // Check if all disciplines are now completed
          const updatedDisciplines = get().disciplines;
          const allCompleted = updatedDisciplines.every(d => 
            d.id === id ? newCompletionStatus : d.completed
          );
          
          if (allCompleted) {
            set((state) => ({
              completionHistory: {
                ...state.completionHistory,
                [today]: true
              }
            }));
          }
        } else {
          // If a discipline is uncompleted, remove the day from completion history
          set((state) => {
            const newHistory = { ...state.completionHistory };
            delete newHistory[today];
            return { completionHistory: newHistory };
          });
        }
      },
      
      resetCompletionStatus: () => {
        set((state) => ({
          disciplines: state.disciplines.map((discipline) => ({
            ...discipline,
            completed: false,
            updatedAt: new Date().toISOString(),
          })),
        }));
      },
    }),
    {
      name: 'disciplines-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);