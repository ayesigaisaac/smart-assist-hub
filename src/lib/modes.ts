import { DollarSign, Heart, GraduationCap, Sprout } from "lucide-react";

export type ChatMode = "budget" | "health" | "school" | "agriculture";

export const modes: Record<
  ChatMode,
  {
    label: string;
    icon: typeof DollarSign;
    description: string;
    color: string;
    greeting: string;
    suggestions: string[];
  }
> = {
  budget: {
    label: "Budget Planner",
    icon: DollarSign,
    description: "Structured financial planning and pocket money optimization",
    color: "text-mode-budget",
    greeting:
      "Welcome to SmartAssist — Budget Planner. Provide your total pocket money and term duration, and I will create a structured spending and savings plan covering essentials, events, and emergency reserves.",
    suggestions: [
      "Create a structured budget for 200,000 UGX over 2 months",
      "How should I divide my pocket money for savings and spending?",
      "Weekly spending plan for school canteen",
      "How to build a small emergency fund during the term"
    ],
  },

  health: {
    label: "Health Assistant",
    icon: Heart,
    description: "General wellness, nutrition, and lifestyle guidance",
    color: "text-mode-health",
    greeting:
      "Welcome to SmartAssist — Health Assistant. I provide general wellness guidance including nutrition, exercise, sleep optimization, and healthy habit planning. How can I assist you today?",
    suggestions: [
      "Design a simple weekly fitness plan",
      "Balanced meal plan for a student",
      "How to improve sleep quality naturally",
      "Daily hydration recommendations"
    ],
  },

  school: {
    label: "Academic Support",
    icon: GraduationCap,
    description: "Structured explanations, study planning, and homework support",
    color: "text-mode-school",
    greeting:
      "Welcome to SmartAssist — Academic Support. I can help explain concepts, structure essays, solve problems step by step, and create efficient study plans. What topic are you working on?",
    suggestions: [
      "Explain photosynthesis in simple terms",
      "Create a structured study plan for final exams",
      "Help outline an argumentative essay",
      "Solve this algebra problem step by step"
    ],
  },

  agriculture: {
    label: "Agriculture Advisor",
    icon: Sprout,
    description: "Crop planning, soil management, and sustainable farming advice",
    color: "text-mode-agriculture",
    greeting:
      "Welcome to SmartAssist — Agriculture Advisor. I provide guidance on crop selection, soil improvement, planting schedules, and pest management. What crop or farming challenge would you like assistance with?",
    suggestions: [
      "Best crops for semi-arid regions",
      "How to improve soil fertility sustainably",
      "Integrated pest management methods",
      "Optimal planting season for tomatoes"
    ],
  },
};
