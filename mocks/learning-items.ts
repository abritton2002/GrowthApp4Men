import { LearningItem } from '@/types/learning';
import { getTodayDateString } from '@/utils/date-utils';

// Get today's date for the items
const today = getTodayDateString();

export const LEARNING_ITEMS: LearningItem[] = [
  // Leadership items
  {
    id: 'l1',
    category: 'Leadership',
    title: "Decisions reveal values more than words do",
    content: "Your team watches what you do, not what you say. When you claim to value work-life balance but email at midnight, you're teaching them to ignore your stated values. When you say quality matters but rush projects, you signal that deadlines trump excellence. Every decision, especially difficult ones with tradeoffs, reveals your true priorities. Be intentional about what your choices communicate to those you lead.",
    date: today,
  },
  {
    id: 'l2',
    category: 'Leadership',
    title: "The 5-minute intervention principle",
    content: "Address small issues immediately before they become large problems. When you notice a team member veering off course, a quick 5-minute conversation can prevent weeks of misalignment. This requires both awareness and courage. Most leaders wait too long to intervene, allowing small issues to compound. The best leaders make micro-corrections early and often.",
    date: today,
  },
  
  // Productivity items
  {
    id: 'p1',
    category: 'Productivity',
    title: "Batching kills distractions. Try time-blocking.",
    content: "Context switching costs you 23 minutes of focus each time. Instead of reactive work, group similar tasks into dedicated time blocks on your calendar. Spend 90-120 minutes in deep work sessions on a single category of tasks. Your brain operates more efficiently when it doesn't need to constantly recalibrate to different types of thinking. Start with just one batch per day and expand as you see results.",
    date: today,
  },
  {
    id: 'p2',
    category: 'Productivity',
    title: "The 2-minute rule for instant momentum",
    content: "If a task takes less than 2 minutes, do it immediately rather than scheduling it for later. This prevents small tasks from accumulating and creating mental overhead. The principle applies to both work and personal tasks - responding to simple emails, making quick decisions, or putting items away. This habit eliminates the cognitive load of tracking numerous small obligations.",
    date: today,
  },
  
  // Finance items
  {
    id: 'f1',
    category: 'Finance',
    title: "The Rule of 72 – your money's doubling timeline",
    content: "Want to know how long it will take for your investment to double? Divide 72 by your expected annual return rate. At 8% growth, your money doubles in 9 years. At 12%, it takes just 6 years. This simple mental math helps you quickly evaluate investment opportunities and understand the power of compound interest over time. Remember that higher returns typically come with higher risk.",
    date: today,
  },
  {
    id: 'f2',
    category: 'Finance',
    title: "Cash flow trumps net worth for daily freedom",
    content: "Many high-net-worth individuals still feel financially constrained because they focus on accumulating assets rather than generating cash flow. True financial freedom comes from having reliable monthly income that exceeds your expenses without requiring your active work. Prioritize investments that generate consistent cash returns, not just appreciation. This creates both psychological freedom and practical options.",
    date: today,
  },
  
  // Mental Models items
  {
    id: 'm1',
    category: 'Mental Models',
    title: "Inversion: Solve problems backward, not forward",
    content: "Instead of asking \"How do I achieve success?\", ask \"What guarantees failure?\" Avoiding obvious mistakes is often easier and more effective than seeking complex solutions. Charlie Munger calls this \"inversion\" - approaching problems from the opposite direction. For example, to build wealth, first identify all the ways people destroy wealth (debt, emotional trading, etc.) and avoid those behaviors. This negative knowledge often provides clearer guidance than positive advice.",
    date: today,
  },
  {
    id: 'm2',
    category: 'Mental Models',
    title: "Second-order thinking: Look beyond the immediate",
    content: "First-order thinking considers only immediate consequences. Second-order thinking asks \"And then what?\" Most people stop at first-order effects, creating opportunity for those who think deeper. For example, a first-order thinker sees a competitor lowering prices and immediately matches them. A second-order thinker considers how this might trigger a price war, erode industry margins, and explores alternative responses that avoid this destructive cycle.",
    date: today,
  },
  
  // Performance items
  {
    id: 'perf1',
    category: 'Performance',
    title: "Recovery isn't optional, it's part of the work",
    content: "Elite performers don't work more hours - they recover more strategically. Your body and mind adapt and grow during rest periods, not during stress. Without proper recovery (sleep, nutrition, mental downtime), performance plateaus or declines regardless of effort. Schedule recovery with the same discipline you schedule work. The most sustainable high performers view rest as a competitive advantage, not a luxury.",
    date: today,
  },
  {
    id: 'perf2',
    category: 'Performance',
    title: "The minimum effective dose principle",
    content: "More isn't better; better is better. Identify the smallest intervention that produces the desired result. In fitness, this might mean shorter, more intense workouts rather than marathon sessions. In business, it could mean focusing on the 20% of clients that generate 80% of profit. This principle conserves energy and attention for what truly matters, preventing diminishing returns from excessive effort in any single area.",
    date: today,
  },
];