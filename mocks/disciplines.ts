import { Discipline } from '@/types/disciplines';

export const DEFAULT_DISCIPLINES: Discipline[] = [
  {
    id: '1',
    title: 'Morning Prayer',
    description: 'Spend 5 minutes in prayer to start the day',
    completed: false,
    reminderTime: '06:00',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Scripture Reading',
    description: 'Read one chapter from the Bible',
    completed: false,
    reminderTime: '07:30',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Physical Exercise',
    description: 'At least 30 minutes of physical activity',
    completed: false,
    reminderTime: '17:00',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Financial Review',
    description: 'Review spending and budget for 5 minutes',
    completed: false,
    reminderTime: '19:30',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Evening Reflection',
    description: 'Reflect on the day and plan for tomorrow',
    completed: false,
    reminderTime: '21:00',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];