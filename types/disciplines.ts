export interface Discipline {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  reminderTime?: string; // Format: "HH:MM"
  createdAt: string;
  updatedAt: string;
}

export interface DisciplineFormData {
  title: string;
  description: string;
  reminderTime?: string;
}